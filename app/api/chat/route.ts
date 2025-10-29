import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `Eres el asistente virtual de NexGent. Tu ÚNICA misión es recopilar 5 datos del usuario y luego abrir el calendario de Calendly.

⚠️ REGLAS ESTRICTAS QUE DEBES SEGUIR:

❌ PROHIBIDO ABSOLUTAMENTE:
- NO preguntes NUNCA por fecha, hora, día, horario, disponibilidad temporal
- NO digas NUNCA "he agendado", "tu demo está agendada", "cita confirmada"
- NO inventes fechas, horas ni días
- NO confirmes ninguna cita
- NO preguntes "¿qué día te viene bien?" o "¿qué hora prefieres?"

✅ LO ÚNICO QUE DEBES HACER:

PASO 1: Preguntar nombre
Ejemplo: "¡Hola! 👋 Soy el asistente de NexGent. ¿Cómo te llamas?"

PASO 2: Preguntar empresa
Ejemplo: "Encantado, [nombre] 😊 ¿De qué empresa nos contactas?"

PASO 3: Preguntar email (validar que tenga @)
Ejemplo: "Perfecto. ¿Cuál es tu email?"
Si no tiene @: "Ese email no parece válido. ¿Puedes verificarlo?"

PASO 4: Preguntar teléfono (opcional)
Ejemplo: "¿Me das un teléfono de contacto? (Es opcional, si prefieres no darlo está bien)"
Si dice que no: continúa sin problema

PASO 5: Preguntar qué solución le interesa
Ejemplo: "¿Qué solución de IA te interesa? Tenemos: WhatsApp Business, Llamadas IA, CRM IA, Chatbot Web, Automatización..."

PASO 6: Confirmar datos
Ejemplo: "Perfecto. Para confirmar: [nombre] de [empresa], email [email], te interesa [solución]. ¿Es correcto?"

PASO 7: Cuando confirme, responder EXACTAMENTE esto:
"¡Perfecto! 🎉 Ahora voy a abrir nuestro calendario para que elijas la fecha y hora que mejor te convenga. DATOS_COMPLETOS: {"nombre": "[nombre]", "empresa": "[empresa]", "email": "[email]", "telefono": "[telefono o null]", "interes": "[solucion]"}"

⚠️ EJEMPLO DE LO QUE NO DEBES HACER:
Usuario: "¿Qué horario tienen disponible?"
Tú NO DEBES decir: "Tenemos disponibilidad de 10:00 a 18:00" ❌
Tú DEBES decir: "El calendario se abrirá automáticamente cuando tenga tus datos y ahí verás todas las horas disponibles 😊 Ahora dime, ¿cómo te llamas?" ✅

Usuario: "Prefiero el lunes"
Tú NO DEBES decir: "Perfecto, he agendado para el lunes" ❌
Tú DEBES decir: "Genial, cuando abra el calendario podrás elegir el lunes si hay disponibilidad 👍 Primero necesito tus datos. ¿Cómo te llamas?" ✅

🎯 RECUERDA:
- Haz UNA pregunta a la vez
- Sé amigable y usa emojis (😊, 👍, 🚀, ✨, 🎉)
- Tu objetivo es SOLO recopilar: nombre, empresa, email, teléfono, interés
- Después de confirmar los datos, el calendario de Calendly se abrirá AUTOMÁTICAMENTE
- TÚ NO AGENDAS NADA, solo recopilas datos
- El USUARIO elegirá fecha/hora en Calendly, NO tú

INFORMACIÓN DE NEXGENT (si preguntan):
- Automatización con IA para negocios
- WhatsApp Business, Llamadas IA, CRM IA, Chatbots, Email Automation
- Demos de 30-45 minutos
- Implementación en 24-48 horas
- Soporte 24/7`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId, conversationHistory = [] } = body

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      )
    }

    const supabaseAdmin = getSupabaseAdmin()

    // Buscar o crear conversación
    // @ts-ignore
    let { data: conversation, error: convError } = await supabaseAdmin
      .from('chat_conversations')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (convError && convError.code !== 'PGRST116') {
      console.error('Error fetching conversation:', convError)
    }

    if (!conversation) {
      // Crear nueva conversación
      // @ts-ignore
      const { data: newConv, error: createError } = await supabaseAdmin
        .from('chat_conversations')
        .insert([{ session_id: sessionId }])
        .select()
        .single()

      if (createError) {
        console.error('Error creating conversation:', createError)
        return NextResponse.json(
          { error: 'Failed to create conversation' },
          { status: 500 }
        )
      }
      conversation = newConv
    }

    // Guardar mensaje del usuario
    // @ts-ignore
    await supabaseAdmin.from('chat_messages').insert([
      {
        conversation_id: conversation.id,
        session_id: sessionId,
        role: 'user',
        content: message,
      },
    ])

    // Construir historial de mensajes para OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ]

    // Llamar a OpenAI con temperatura baja para seguir instrucciones estrictamente
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      temperature: 0.3, // Baja para que siga instrucciones sin inventar
      max_tokens: 500,
    })

    const assistantMessage = completion.choices[0].message.content || 'Lo siento, no pude procesar tu mensaje.'

    // Guardar respuesta del asistente
    // @ts-ignore
    await supabaseAdmin.from('chat_messages').insert([
      {
        conversation_id: conversation.id,
        session_id: sessionId,
        role: 'assistant',
        content: assistantMessage,
      },
    ])

    // Verificar si se recopilaron todos los datos
    if (assistantMessage.includes('DATOS_COMPLETOS:')) {
      try {
        const jsonMatch = assistantMessage.match(/DATOS_COMPLETOS:\s*({.*})/s)
        if (jsonMatch) {
          const userData = JSON.parse(jsonMatch[1])
          
          // Guardar solicitud de demo (sin fecha/hora, se elegirá en Calendly)
          // @ts-ignore
          await supabaseAdmin.from('demo_requests').insert([
            {
              conversation_id: conversation.id,
              name: userData.nombre,
              email: userData.email,
              phone: userData.telefono || null,
              company: userData.empresa,
              interest: userData.interes || null,
              preferred_date: null, // Se elegirá en Calendly
              preferred_time: null, // Se elegirá en Calendly
              message: `Demo solicitada vía chat. Interés: ${userData.interes || 'No especificado'}. Pendiente de agendar en Calendly.`,
              status: 'pending_calendly', // Esperando que el usuario elija fecha en Calendly
            },
          ])

          // Actualizar conversación como completada
          // @ts-ignore
          await supabaseAdmin
            .from('chat_conversations')
            .update({ 
              status: 'completed',
              completed_at: new Date().toISOString(),
              user_name: userData.nombre,
              user_email: userData.email,
              user_phone: userData.telefono || null,
              user_company: userData.empresa,
            })
            .eq('id', conversation.id)

          // Limpiar el mensaje para no mostrar el JSON al usuario
          const cleanMessage = assistantMessage.split('DATOS_COMPLETOS:')[0].trim()
          return NextResponse.json({
            message: cleanMessage || '¡Perfecto! 🎉 Ahora voy a abrir nuestro calendario para que elijas la fecha y hora que mejor te convenga.',
            dataCollected: true,
            userData,
          })
        }
      } catch (parseError) {
        console.error('Error parsing user data:', parseError)
      }
    }

    return NextResponse.json({
      message: assistantMessage,
      dataCollected: false,
    })
  } catch (error: any) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
