# 📅 Integración con Google Calendar - Página de Demo

## 🎯 Descripción

La página `/demo` cuenta con dos opciones para agendar una demostración:

1. **Agenda una demo** - Formulario tradicional con campos básicos
2. **Habla con IA** - Chat conversacional con agente de IA que reserva automáticamente en tu Google Calendar

## 🤖 Funcionamiento del Chat de IA

El agente de IA realiza las siguientes preguntas en orden:

1. ¿Cómo te llamas?
2. ¿Cuál es tu correo electrónico?
3. ¿Cuál es el nombre de tu empresa?
4. ¿A qué sector pertenece tu negocio?
5. ¿Cuántos empleados tiene tu empresa? (opciones rápidas)
6. ¿Qué día te vendría mejor para la demo?
7. ¿Qué horario prefieres?

Después de recopilar toda la información, el sistema:
- Crea un evento en tu Google Calendar
- Envía invitación al cliente por email
- Genera un enlace de Google Meet automáticamente

## 🔧 Configuración de Google Calendar API

### Paso 1: Crear Proyecto en Google Cloud Platform

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre sugerido: "NexGent Booking System"

### Paso 2: Habilitar Google Calendar API

1. En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
2. Busca "Google Calendar API"
3. Haz clic en "Habilitar"

### Paso 3: Crear Credenciales OAuth 2.0

1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "ID de cliente de OAuth 2.0"
3. Configura la pantalla de consentimiento:
   - Tipo de usuario: Externo
   - Nombre de la aplicación: NexGent
   - Email de asistencia: tu-email@nexgent.com
4. Ámbitos (Scopes):
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
5. Tipo de aplicación: Aplicación web
6. URIs de redireccionamiento autorizados:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://tu-dominio.com/api/auth/callback/google`

### Paso 4: Obtener Refresh Token

Ejecuta este script de Node.js una vez para obtener el refresh token:

```javascript
const { google } = require('googleapis');
const readline = require('readline');

const oauth2Client = new google.auth.OAuth2(
  'TU_CLIENT_ID',
  'TU_CLIENT_SECRET',
  'http://localhost:3000'
);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Autoriza esta app visitando esta URL:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Ingresa el código de la URL: ', (code) => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error al obtener token', err);
    console.log('Tu Refresh Token es:', token.refresh_token);
  });
});
```

### Paso 5: Configurar Variables de Entorno

Crea/actualiza tu archivo `.env.local`:

```env
# Google Calendar API
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_REFRESH_TOKEN=tu_refresh_token_aqui

# Email del calendario (normalmente tu email principal de Google)
GOOGLE_CALENDAR_EMAIL=tu-email@gmail.com
```

### Paso 6: Instalar Dependencias

```bash
npm install googleapis
```

### Paso 7: Actualizar el API Route

Descomenta el código en `/app/api/schedule-demo/route.ts` que está marcado como ejemplo.

El código ya está preparado para:
- Crear el evento en Google Calendar
- Enviar invitaciones automáticas
- Generar enlace de Google Meet
- Notificar a ambas partes (tú y el cliente)

## 📧 Integración con Email (Opcional)

Para enviar emails de confirmación personalizados, puedes usar:

### Opción 1: Resend (Recomendado)

```bash
npm install resend
```

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'NexGent <demo@nexgent.com>',
  to: [email],
  subject: '✅ Demo confirmada - NexGent',
  html: `
    <h1>¡Hola ${name}!</h1>
    <p>Tu demo ha sido confirmada para el ${date} a las ${time}.</p>
    <p>Link de la reunión: [Se enviará 1 hora antes]</p>
  `
});
```

### Opción 2: SendGrid

```bash
npm install @sendgrid/mail
```

## 🔒 Seguridad

- ✅ Las credenciales están en variables de entorno (nunca en el código)
- ✅ El refresh token permite acceso continuo sin re-autenticación
- ✅ Los scopes están limitados solo a Calendar
- ✅ El OAuth2 está configurado con HTTPS en producción

## 🧪 Testing

Para probar la integración:

1. Ve a `http://localhost:3000/demo`
2. Selecciona "Habla con IA"
3. Completa la conversación con el bot
4. Verifica que el evento aparezca en tu Google Calendar
5. Revisa que el cliente reciba el email de invitación

## 📱 Funcionalidades Adicionales

### Recordatorios Automáticos

El evento de Calendar ya incluye:
- Notificación por email 1 día antes
- Notificación pop-up 10 minutos antes

### Zona Horaria

Actualmente configurado para `Europe/Madrid`. Puedes cambiarlo en el código a:
- `America/Mexico_City`
- `America/New_York`
- etc.

### Duración de la Demo

Por defecto, las demos duran 1 hora. Puedes ajustarlo modificando el campo `end` en el evento.

## 🐛 Troubleshooting

### Error: "Invalid grant"
- El refresh token ha expirado
- Solución: Genera un nuevo refresh token

### Error: "Insufficient permissions"
- Verifica que los scopes incluyan `calendar.events`
- Re-autoriza la aplicación

### Error: "Calendar not found"
- Verifica que el email del calendario sea correcto
- Usa 'primary' para el calendario principal

## 📚 Recursos Útiles

- [Google Calendar API Docs](https://developers.google.com/calendar/api/guides/overview)
- [OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
- [googleapis npm package](https://www.npmjs.com/package/googleapis)

---

## 🚀 Estado Actual

- ✅ Página de demo creada (`/demo`)
- ✅ Formulario tradicional funcionando
- ✅ Chat de IA conversacional implementado
- ✅ API route preparado (`/api/schedule-demo`)
- ⏳ **Pendiente: Configurar credenciales de Google Calendar**
- ⏳ **Pendiente: Instalar googleapis**
- ⏳ **Pendiente: Configurar variables de entorno**

Una vez configurado Google Calendar, el sistema estará 100% operativo y automatizado.

