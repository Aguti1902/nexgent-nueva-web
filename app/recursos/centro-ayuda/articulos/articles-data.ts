export interface Article {
  slug: string
  title: string
  category: string
  views: string
  readTime: string
  content: string
  relatedArticles?: string[]
}

export const articles: Article[] = [
  // Primeros pasos
  {
    slug: 'como-configurar-whatsapp-business',
    title: 'Cómo configurar WhatsApp Business en 5 minutos',
    category: 'Primeros pasos',
    views: '12.4K',
    readTime: '5 min',
    content: `
# Cómo configurar WhatsApp Business en 5 minutos

Conectar tu cuenta de WhatsApp Business con NexGent es más sencillo de lo que piensas. En esta guía paso a paso te mostramos cómo hacerlo.

## Requisitos previos

Antes de empezar, asegúrate de tener:
- Una cuenta de WhatsApp Business activa
- Acceso a tu cuenta de NexGent
- Tu número de teléfono verificado

## Paso 1: Accede a tu dashboard

1. Inicia sesión en [dashboard.nexgent.io](https://dashboard.nexgent.io)
2. Ve a la sección "Integraciones"
3. Selecciona "WhatsApp Business"

## Paso 2: Conecta tu cuenta

1. Haz clic en "Conectar WhatsApp Business"
2. Escanea el código QR con tu teléfono
3. Acepta los permisos necesarios
4. Espera la confirmación (tarda unos segundos)

## Paso 3: Configura tu primer mensaje

1. Ve a "Configuración de mensajes"
2. Personaliza tu mensaje de bienvenida
3. Configura respuestas automáticas
4. Activa las notificaciones

## Paso 4: Prueba la conexión

Envía un mensaje de prueba para verificar que todo funciona correctamente.

## Siguiente paso

Una vez configurado WhatsApp, te recomendamos configurar tu primer flujo de conversación automático.
    `,
    relatedArticles: ['integracion-crm-guia-completa', 'crear-flujos-conversacion'],
  },
  {
    slug: 'integracion-crm-guia-completa',
    title: 'Integración con CRM: Guía completa',
    category: 'Primeros pasos',
    views: '8.9K',
    readTime: '8 min',
    content: `
# Integración con CRM: Guía completa

Conecta NexGent con tu CRM para automatizar completamente tu gestión de clientes.

## CRMs compatibles

NexGent se integra con los principales CRMs del mercado:
- Salesforce
- HubSpot
- Pipedrive
- Zoho CRM
- Monday.com
- Y muchos más

## Beneficios de la integración

- **Sincronización automática** de contactos y conversaciones
- **Actualización en tiempo real** de estados y oportunidades
- **Seguimiento completo** del customer journey
- **Reportes unificados** en un solo dashboard

## Cómo conectar tu CRM

### Opción 1: Conexión directa

1. Ve a "Integraciones" en tu dashboard
2. Selecciona tu CRM
3. Autoriza la conexión
4. Mapea los campos personalizados
5. Activa la sincronización

### Opción 2: Vía API

Si tu CRM no está en la lista, puedes usar nuestra API REST para crear una integración personalizada.

\`\`\`javascript
// Ejemplo de conexión via API
const nexgent = require('nexgent-sdk');

nexgent.connect({
  apiKey: 'tu-api-key',
  crm: 'custom',
  webhookUrl: 'https://tu-crm.com/webhook'
});
\`\`\`

## Mejores prácticas

1. Sincroniza solo los campos necesarios
2. Configura reglas de duplicados
3. Establece triggers automáticos
4. Revisa los logs regularmente

## Soporte

¿Problemas con la integración? Contacta con nuestro equipo en [info@nexgent.io](mailto:info@nexgent.io)
    `,
    relatedArticles: ['como-configurar-whatsapp-business', 'webhooks-avanzado'],
  },
  {
    slug: 'crear-flujos-conversacion',
    title: 'Crear flujos de conversación efectivos',
    category: 'Mejores prácticas',
    views: '7.2K',
    readTime: '10 min',
    content: `
# Crear flujos de conversación efectivos

Aprende a diseñar flujos de conversación que realmente conviertan y satisfagan a tus clientes.

## Principios fundamentales

### 1. Empieza con el usuario en mente
- ¿Qué problema quiere resolver?
- ¿Qué información necesita?
- ¿Cuál es el siguiente paso lógico?

### 2. Mantén la simplicidad
- Mensajes cortos y claros
- Máximo 3 opciones por pregunta
- Evita jerga técnica

### 3. Personaliza la experiencia
- Usa el nombre del cliente
- Adapta el tono a tu marca
- Recuerda conversaciones previas

## Estructura de un buen flujo

1. **Saludo personalizado**
   - "¡Hola [nombre]! 👋"
   - "Encantado de ayudarte"

2. **Identificación de necesidad**
   - "¿En qué puedo ayudarte hoy?"
   - Opciones claras (A, B, C)

3. **Solución o escalado**
   - Respuesta automática si es simple
   - Derivación a humano si es complejo

4. **Cierre y seguimiento**
   - "¿Te ha sido útil?"
   - "¿Necesitas algo más?"

## Ejemplo práctico: Salón de belleza

\`\`\`
Cliente: Hola
Bot: ¡Hola María! 👋 ¿En qué puedo ayudarte?
     A) Agendar cita
     B) Consultar precios
     C) Hablar con alguien

Cliente: A
Bot: Perfecto, ¿qué servicio te interesa?
     1) Manicura
     2) Pedicura
     3) Tratamiento facial

Cliente: 1
Bot: ¿Qué día prefieres?
     - Esta semana
     - Próxima semana
     - Ver calendario completo
\`\`\`

## Errores comunes a evitar

❌ Conversaciones muy largas
❌ Demasiadas opciones
❌ Respuestas genéricas
❌ No ofrecer salida a humano

## Optimización continua

1. Analiza las métricas
2. Prueba variaciones (A/B testing)
3. Escucha feedback de clientes
4. Actualiza según temporada

## Plantillas listas para usar

En NexGent tenemos +50 plantillas de flujos probadas por industria. Encuentra la tuya en el dashboard.
    `,
    relatedArticles: ['troubleshooting-problemas-comunes', 'medir-roi-automatizacion'],
  },
  {
    slug: 'troubleshooting-problemas-comunes',
    title: 'Troubleshooting: Problemas comunes',
    category: 'Resolución de problemas',
    views: '6.8K',
    readTime: '6 min',
    content: `
# Troubleshooting: Problemas comunes

Soluciones rápidas a los problemas más frecuentes que puedes encontrar.

## Problema 1: No recibo mensajes de WhatsApp

### Causas posibles:
- Conexión de WhatsApp desconectada
- Número bloqueado temporalmente
- Límite de mensajes alcanzado

### Solución:
1. Verifica el estado de conexión en el dashboard
2. Reconecta WhatsApp Business si es necesario
3. Revisa que no hayas excedido el límite de tu plan
4. Contacta con soporte si persiste

## Problema 2: El bot no responde correctamente

### Causas posibles:
- Flujo mal configurado
- Palabras clave no reconocidas
- Falta de entrenamiento

### Solución:
1. Ve a "Flujos" y revisa la configuración
2. Prueba con diferentes variaciones de texto
3. Añade sinónimos a las palabras clave
4. Reentrena el bot con más ejemplos

## Problema 3: Integración con CRM no sincroniza

### Causas posibles:
- Token de API expirado
- Campos mal mapeados
- Límite de rate de API

### Solución:
1. Regenera el token de conexión
2. Revisa el mapeo de campos
3. Verifica los logs de sincronización
4. Contacta con soporte técnico

## Problema 4: Mensajes en cola o retrasados

### Causas posibles:
- Alto volumen de mensajes
- Problema temporal del servidor
- Límite de WhatsApp

### Solución:
1. Espera 5-10 minutos (puede ser temporal)
2. Verifica el estado del servicio en status.nexgent.io
3. Reduce el envío masivo si es el caso
4. Contacta con soporte si supera los 30 minutos

## Problema 5: No puedo acceder al dashboard

### Causas posibles:
- Contraseña incorrecta
- Sesión expirada
- Navegador incompatible

### Solución:
1. Intenta "Olvidé mi contraseña"
2. Borra caché y cookies del navegador
3. Prueba en modo incógnito
4. Usa Chrome o Firefox actualizados

## ¿Ninguna solución funcionó?

Contacta con soporte 24/7:
- WhatsApp: +34 684 48 66 47
- Email: info@nexgent.io
- Chat en vivo: dashboard.nexgent.io

**Tiempo de respuesta promedio: 8 minutos**
    `,
    relatedArticles: ['crear-flujos-conversacion', 'integracion-crm-guia-completa'],
  },
  {
    slug: 'medir-roi-automatizacion',
    title: 'Cómo medir el ROI de tu automatización',
    category: 'Mejores prácticas',
    views: '5.4K',
    readTime: '7 min',
    content: `
# Cómo medir el ROI de tu automatización

Aprende a calcular el retorno de inversión real de implementar IA en tu negocio.

## ¿Por qué medir el ROI?

- Justificar la inversión
- Identificar áreas de mejora
- Optimizar procesos
- Escalar lo que funciona

## Métricas clave a seguir

### 1. Ahorro de tiempo
**Antes:** Horas dedicadas a atención manual
**Después:** Horas liberadas gracias a la automatización

Cálculo:
\`\`\`
Ahorro mensual = (Horas ahorradas × Coste hora) - Coste NexGent
\`\`\`

### 2. Aumento en conversiones
- Leads capturados vs antes
- Tasa de conversión lead → cliente
- Valor medio por cliente

### 3. Reducción de no-shows
- % de ausencias antes vs después
- Valor de citas perdidas recuperadas
- Mejora en ocupación

### 4. Satisfacción del cliente
- CSAT score antes vs después
- Reviews positivas
- Tasa de repetición

## Ejemplo real: Hello Nails

**Inversión mensual:** €199/mes

**Resultados en 3 meses:**
- ✅ +42% reservas: +1,008 citas/mes
- ✅ -68% no-shows: €2.1K recuperados
- ✅ 15h/semana ahorradas: €1,200 en coste personal

**ROI:** 1,507% en el primer trimestre

## Cómo calcularlo en 3 pasos

### Paso 1: Define tu línea base
Anota tus números actuales:
- Reservas mensuales
- % no-shows
- Horas dedicadas a atención
- Ingresos mensuales

### Paso 2: Implementa y mide
Después de 30 días, anota:
- Nuevas reservas mensuales
- Nuevo % no-shows
- Nuevas horas dedicadas
- Nuevos ingresos

### Paso 3: Calcula el ROI

\`\`\`
ROI = ((Ganancias - Inversión) / Inversión) × 100

Ejemplo:
Ganancias: €3,300/mes
Inversión: €199/mes
ROI = ((3,300 - 199) / 199) × 100 = 1,558%
\`\`\`

## Dashboard de ROI en NexGent

Tu dashboard incluye un calculador automático de ROI que muestra:
- Ingresos adicionales generados
- Tiempo ahorrado en horas
- Coste por conversación
- Comparativa mes a mes

## Tips para maximizar tu ROI

1. **Optimiza flujos continuamente**
2. **Expande a más canales** (WhatsApp, Instagram, etc.)
3. **Automatiza upselling** inteligente
4. **Integra con tu CRM** para seguimiento completo
5. **Analiza y ajusta** cada mes

## Comparte tus resultados

¿Has logrado un ROI impresionante? ¡Nos encantaría conocer tu caso! Contacta en info@nexgent.io
    `,
    relatedArticles: ['crear-flujos-conversacion', 'como-configurar-whatsapp-business'],
  },
  // Configuración avanzada
  {
    slug: 'webhooks-avanzado',
    title: 'Configuración de Webhooks avanzada',
    category: 'Configuración avanzada',
    views: '4.2K',
    readTime: '12 min',
    content: `
# Configuración de Webhooks avanzada

Conecta NexGent con cualquier sistema mediante webhooks personalizados.

## ¿Qué son los webhooks?

Los webhooks son notificaciones HTTP que NexGent envía a tu sistema cuando ocurre un evento específico.

## Eventos disponibles

- \`message.received\` - Nuevo mensaje recibido
- \`message.sent\` - Mensaje enviado
- \`lead.created\` - Nuevo lead capturado
- \`booking.created\` - Nueva reserva
- \`booking.cancelled\` - Reserva cancelada
- \`conversation.ended\` - Conversación finalizada

## Configuración básica

1. Ve a "Configuración" → "Webhooks"
2. Haz clic en "Nuevo webhook"
3. Ingresa tu URL endpoint
4. Selecciona los eventos
5. Guarda y prueba

## Formato de payload

\`\`\`json
{
  "event": "message.received",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "message_id": "msg_123",
    "from": "+34600000000",
    "text": "Quiero agendar cita",
    "context": {
      "customer_name": "María García",
      "customer_id": "cust_456"
    }
  }
}
\`\`\`

## Seguridad

### Verificación de firma

Cada webhook incluye un header \`X-NexGent-Signature\` que debes verificar:

\`\`\`javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return hash === signature;
}
\`\`\`

## Retry policy

Si tu endpoint falla, reintentamos:
- 1er intento: inmediato
- 2do intento: 1 minuto después
- 3er intento: 5 minutos después
- 4to intento: 30 minutos después

## Ejemplo completo: Node.js

\`\`\`javascript
const express = require('express');
const app = express();

app.post('/webhook/nexgent', (req, res) => {
  // Verificar firma
  const signature = req.headers['x-nexgent-signature'];
  const isValid = verifyWebhook(
    JSON.stringify(req.body),
    signature,
    process.env.NEXGENT_SECRET
  );

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Procesar evento
  const { event, data } = req.body;

  switch(event) {
    case 'lead.created':
      // Añadir a tu CRM
      addToCRM(data);
      break;
    case 'booking.created':
      // Enviar confirmación
      sendConfirmation(data);
      break;
  }

  res.status(200).send('OK');
});
\`\`\`

## Testing

Usa nuestra herramienta de testing en el dashboard para:
- Enviar webhooks de prueba
- Ver logs en tiempo real
- Debug de errores

## Mejores prácticas

1. ✅ Responde con 200 rápidamente
2. ✅ Procesa en background jobs
3. ✅ Implementa idempotencia
4. ✅ Loguea todos los eventos
5. ✅ Monitorea tasas de error

## Soporte

¿Problemas con webhooks? Contacta en info@nexgent.io
    `,
    relatedArticles: ['integracion-crm-guia-completa', 'api-rest-documentacion'],
  },
  {
    slug: 'api-rest-documentacion',
    title: 'API REST: Documentación completa',
    category: 'Configuración avanzada',
    views: '3.8K',
    readTime: '15 min',
    content: `
# API REST: Documentación completa

Integra NexGent programáticamente con nuestra API REST completa.

## Autenticación

Todas las peticiones requieren un API key en el header:

\`\`\`bash
Authorization: Bearer tu_api_key_aqui
\`\`\`

Obtén tu API key en: dashboard.nexgent.io/settings/api

## Base URL

\`\`\`
https://api.nexgent.io/v1
\`\`\`

## Endpoints principales

### Enviar mensaje

\`\`\`bash
POST /messages/send
\`\`\`

Body:
\`\`\`json
{
  "to": "+34600000000",
  "text": "Hola, tu cita está confirmada",
  "template": "appointment_confirmation",
  "variables": {
    "customer_name": "María",
    "date": "15/01/2025",
    "time": "10:30"
  }
}
\`\`\`

### Crear lead

\`\`\`bash
POST /leads
\`\`\`

Body:
\`\`\`json
{
  "name": "Juan Pérez",
  "phone": "+34600000001",
  "email": "juan@example.com",
  "source": "website",
  "tags": ["interested", "premium"]
}
\`\`\`

### Crear reserva

\`\`\`bash
POST /bookings
\`\`\`

Body:
\`\`\`json
{
  "customer_id": "cust_123",
  "service": "Manicura",
  "date": "2025-01-15",
  "time": "10:30",
  "duration": 60,
  "notes": "Primera vez"
}
\`\`\`

### Obtener conversaciones

\`\`\`bash
GET /conversations?limit=50&offset=0
\`\`\`

Response:
\`\`\`json
{
  "data": [
    {
      "id": "conv_123",
      "customer": {
        "name": "María García",
        "phone": "+34600000000"
      },
      "last_message": "Gracias por tu ayuda",
      "status": "closed",
      "created_at": "2025-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 250,
    "limit": 50,
    "offset": 0
  }
}
\`\`\`

## Rate limits

- **Free:** 100 requests/hora
- **Pro:** 1,000 requests/hora
- **Enterprise:** 10,000 requests/hora

## Códigos de error

- \`400\` Bad Request - Parámetros inválidos
- \`401\` Unauthorized - API key inválida
- \`403\` Forbidden - Sin permisos
- \`404\` Not Found - Recurso no existe
- \`429\` Too Many Requests - Límite excedido
- \`500\` Internal Server Error - Error del servidor

## SDKs oficiales

### JavaScript/Node.js

\`\`\`bash
npm install @nexgent/sdk
\`\`\`

\`\`\`javascript
const NexGent = require('@nexgent/sdk');

const client = new NexGent({
  apiKey: 'tu_api_key'
});

// Enviar mensaje
await client.messages.send({
  to: '+34600000000',
  text: 'Hola!'
});
\`\`\`

### Python

\`\`\`bash
pip install nexgent
\`\`\`

\`\`\`python
from nexgent import NexGent

client = NexGent(api_key='tu_api_key')

# Crear lead
client.leads.create(
    name='Juan Pérez',
    phone='+34600000000'
)
\`\`\`

## Webhooks

Para recibir eventos en tiempo real, configura webhooks en lugar de hacer polling.

Ver: [Configuración de Webhooks avanzada](/recursos/centro-ayuda/articulos/webhooks-avanzado)

## Soporte técnico

Documentación completa: [docs.nexgent.io](https://docs.nexgent.io)
Email: info@nexgent.io
    `,
    relatedArticles: ['webhooks-avanzado', 'integracion-crm-guia-completa'],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category)
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase()
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
    article.category.toLowerCase().includes(lowerQuery)
  )
}

