import { NextResponse } from 'next/server'

// Esta función se conectará a Google Calendar API
// Necesitarás configurar las credenciales de Google Cloud Platform

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, company, industry, employees, date, time } = data

    // Aquí irá la lógica para integrar con Google Calendar
    // Por ahora, lo registramos en console y devolvemos éxito
    
    console.log('📅 Nueva demo agendada:', {
      name,
      email,
      company,
      industry,
      employees,
      date,
      time,
    })

    // NOTA: Para integrar con Google Calendar, necesitarás:
    // 1. Instalar: npm install googleapis
    // 2. Configurar OAuth2 en Google Cloud Platform
    // 3. Obtener credenciales (client_id, client_secret, refresh_token)
    // 4. Usar la librería googleapis para crear el evento
    
    /* 
    Ejemplo de integración con Google Calendar:
    
    import { google } from 'googleapis'
    
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
    
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    
    const event = {
      summary: `Demo NexGent - ${name} (${company})`,
      description: `Demo con ${name} de ${company}\\n\\nEmail: ${email}\\nIndustria: ${industry}\\nEmpleados: ${employees}`,
      start: {
        dateTime: `${date}T${time}:00`,
        timeZone: 'Europe/Madrid',
      },
      end: {
        dateTime: `${date}T${time}:00`,
        timeZone: 'Europe/Madrid',
      },
      attendees: [
        { email: email },
        { email: 'tu-email@nexgent.com' }
      ],
      conferenceData: {
        createRequest: {
          requestId: `demo-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    }
    
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    })
    */

    // También podrías enviar un email de confirmación aquí
    // usando un servicio como SendGrid, Resend, etc.

    return NextResponse.json({ 
      success: true,
      message: 'Demo agendada correctamente',
      data: {
        name,
        email,
        date,
        time,
      }
    })

  } catch (error) {
    console.error('Error al agendar demo:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

