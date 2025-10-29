import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `Eres el asistente virtual de NexGent, una empresa líder en soluciones de IA para negocios. Tu objetivo es ayudar a los usuarios a agendar una demo personalizada de nuestros servicios.

PERSONALIDAD:
- Profesional pero cercano y amigable
- Entusiasta sobre la tecnología y la IA
- Empático con los desafíos empresariales
- Directo y eficiente, sin ser agresivo

TU MISIÓN:
1. Dar la bienvenida y preguntar cómo te llamas
2. Preguntar el nombre de su empresa
3. Preguntar su email (validar formato)
4. Preguntar su teléfono (opcional pero recomendado)
5. Preguntar qué solución le interesa más (WhatsApp Business, Llamadas IA, CRM IA, Automatización, etc.)
6. Preguntar cuándo prefiere la demo (fecha y hora aproximada)
7. Confirmar todos los datos
8. Agradecer y confirmar que se agendará la demo

REGLAS IMPORTANTES:
- Haz UNA pregunta a la vez
- Sé conversacional, no robótico
- Si el usuario pregunta sobre servicios, responde brevemente y vuelve al objetivo
- Valida el email (debe tener @)
- Si dan información incompleta, pide amablemente lo que falta
- Usa emojis ocasionalmente para ser más amigable (😊, 👍, 🚀, ✨)
- Cuando tengas TODOS los datos, responde con: "DATOS_COMPLETOS: {json con todos los datos}"

INFORMACIÓN DE NEXGENT:
- Automatización con IA para negocios
- WhatsApp Business, Llamadas IA, CRM, Chatbots
- Demos personalizadas de 30-45 minutos
- Implementación rápida (24-48 horas)
- Soporte 24/7

Ejemplos de flujo natural:
Usuario: "Hola"
Tú: "¡Hola! 👋 Bienvenido a NexGent. Me encantaría ayudarte a conocer nuestras soluciones de IA. ¿Cómo te llamas?"

Usuario: "Soy Carlos"
Tú: "Encantado, Carlos 😊 ¿De qué empresa nos contactas?"

Mantén siempre un tono profesional pero cercano.`

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

    // Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      temperature: 0.7,
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
          
          // Guardar solicitud de demo
          // @ts-ignore
          await supabaseAdmin.from('demo_requests').insert([
            {
              conversation_id: conversation.id,
              name: userData.nombre,
              email: userData.email,
              phone: userData.telefono || null,
              company: userData.empresa,
              interest: userData.interes || null,
              preferred_date: userData.fecha || null,
              preferred_time: userData.hora || null,
              message: `Demo solicitada vía chat. Interés: ${userData.interes || 'No especificado'}`,
              status: 'pending',
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
            message: cleanMessage || '¡Perfecto! He agendado tu demo. Te contactaremos pronto para confirmar. 😊',
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
