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
  // Más artículos de Primeros pasos
  {
    slug: 'creacion-cuenta-nexgent',
    title: 'Crear tu cuenta en NexGent paso a paso',
    category: 'Primeros pasos',
    views: '15.2K',
    readTime: '3 min',
    content: `# Crear tu cuenta en NexGent paso a paso

Empezar con NexGent es muy sencillo. Te guiamos en el proceso de registro.

## Paso 1: Registro

1. Ve a [dashboard.nexgent.io](https://dashboard.nexgent.io)
2. Haz clic en "Crear cuenta"
3. Ingresa tu email y contraseña
4. Verifica tu email

## Paso 2: Información del negocio

- Nombre de tu empresa
- Industria
- Tamaño del equipo
- Objetivo principal

## Paso 3: Elige tu plan

- **Starter**: Para negocios pequeños
- **Pro**: Más funcionalidades
- **Enterprise**: Solución completa

## ¿Qué sigue?

Una vez creada tu cuenta, te recomendamos configurar WhatsApp Business como primer paso.`,
    relatedArticles: ['como-configurar-whatsapp-business', 'configuracion-inicial-plataforma'],
  },
  {
    slug: 'configuracion-inicial-plataforma',
    title: 'Configuración inicial de la plataforma',
    category: 'Primeros pasos',
    views: '11.8K',
    readTime: '10 min',
    content: `# Configuración inicial de la plataforma

Optimiza tu plataforma desde el primer día con esta guía completa.

## 1. Perfil de empresa

Completa tu perfil con:
- Logo de empresa
- Información de contacto
- Horario de atención
- Enlaces a redes sociales

## 2. Usuarios y permisos

Invita a tu equipo y asigna roles:
- **Admin**: Control total
- **Manager**: Gestión operativa
- **Agent**: Atención al cliente
- **Viewer**: Solo lectura

## 3. Configuración de notificaciones

Decide qué notificaciones quieres recibir:
- Nuevos mensajes
- Reservas creadas
- Leads importantes
- Errores del sistema

## 4. Integra tu calendario

Conecta Google Calendar o Outlook para sincronizar automáticamente las reservas.

## 5. Personaliza tu marca

- Colores corporativos
- Tono de voz del bot
- Mensajes de bienvenida
- Firmas automáticas

## Siguiente paso

Crea tu primera automatización siguiendo nuestra guía.`,
    relatedArticles: ['primera-automatizacion-guia', 'creacion-cuenta-nexgent'],
  },
  {
    slug: 'primera-automatizacion-guia',
    title: 'Tu primera automatización: Guía práctica',
    category: 'Primeros pasos',
    views: '13.5K',
    readTime: '12 min',
    content: `# Tu primera automatización: Guía práctica

Aprende a crear tu primera automatización en menos de 15 minutos.

## ¿Qué vas a automatizar?

Vamos a crear un bot que:
1. Saluda al cliente
2. Le pregunta qué necesita
3. Agenda citas automáticamente

## Paso 1: Crear el flujo

1. Ve a "Automatizaciones"
2. Clic en "Nuevo flujo"
3. Selecciona "Gestión de citas"

## Paso 2: Personalizar mensajes

\`\`\`
¡Hola! 👋 Soy el asistente virtual de [TU EMPRESA]

¿En qué puedo ayudarte?
A) Agendar cita
B) Consultar precios
C) Otra consulta
\`\`\`

## Paso 3: Configurar acciones

Para cada opción, define:
- Respuesta del bot
- Siguiente pregunta
- Acción a ejecutar

## Paso 4: Prueba tu bot

Usa el simulador integrado para probar todos los escenarios antes de activarlo.

## Paso 5: Activar

Una vez probado, activa el bot y empieza a recibir clientes automáticamente.

## Métricas a seguir

- Conversaciones completadas
- Tasa de abandono
- Tiempo promedio de conversación
- Satisfacción del cliente`,
    relatedArticles: ['crear-flujos-conversacion', 'como-configurar-whatsapp-business'],
  },
  // Preguntas frecuentes
  {
    slug: 'precios-planes-nexgent',
    title: 'Precios y planes: ¿Cuál elegir?',
    category: 'Preguntas frecuentes',
    views: '18.3K',
    readTime: '5 min',
    content: `# Precios y planes: ¿Cuál elegir?

Descubre qué plan de NexGent se adapta mejor a tu negocio.

## Plan Starter - €99/mes

Perfecto para negocios pequeños:
- Hasta 1,000 conversaciones/mes
- 1 número de WhatsApp
- Soporte por email
- Dashboard básico

## Plan Pro - €299/mes

Para negocios en crecimiento:
- Hasta 5,000 conversaciones/mes
- 3 números de WhatsApp
- Integraciones con CRM
- Soporte 24/7 por chat
- Analytics avanzados

## Plan Enterprise - Personalizado

Solución completa:
- Conversaciones ilimitadas
- Números ilimitados
- Gestor de cuenta dedicado
- API completa
- SLA garantizado
- Soporte telefónico prioritario

## ¿Puedo cambiar de plan?

Sí, en cualquier momento desde tu dashboard. El cambio es inmediato.

## ¿Hay permanencia?

No, cancela cuando quieras sin penalización.`,
    relatedArticles: ['facturacion-metodos-pago', 'cancelar-suscripcion'],
  },
  {
    slug: 'facturacion-metodos-pago',
    title: 'Facturación y métodos de pago',
    category: 'Preguntas frecuentes',
    views: '9.2K',
    readTime: '4 min',
    content: `# Facturación y métodos de pago

Todo lo que necesitas saber sobre pagos y facturas.

## Métodos de pago aceptados

- **Tarjeta de crédito/débito**: Visa, Mastercard, American Express
- **Transferencia bancaria**: Para planes Enterprise
- **PayPal**: Disponible en algunos países

## Ciclo de facturación

- Mensual: Cargo el mismo día cada mes
- Anual: 2 meses gratis (20% descuento)

## Facturas

Las facturas se envían automáticamente por email y están disponibles en tu dashboard en "Configuración" → "Facturación".

## Actualizaciones

Para actualizar tu método de pago:
1. Dashboard → Configuración
2. Facturación
3. Actualizar tarjeta

## IVA y impuestos

Los precios no incluyen IVA (se añade según tu ubicación).`,
    relatedArticles: ['precios-planes-nexgent', 'cambiar-plan'],
  },
  {
    slug: 'integraciones-disponibles',
    title: 'Integraciones disponibles',
    category: 'Preguntas frecuentes',
    views: '14.7K',
    readTime: '6 min',
    content: `# Integraciones disponibles

NexGent se integra con las herramientas que ya usas.

## CRMs

- Salesforce
- HubSpot
- Pipedrive
- Zoho CRM
- Monday.com
- Notion

## Calendarios

- Google Calendar
- Outlook Calendar
- Apple Calendar
- Calendly

## E-commerce

- Shopify
- WooCommerce
- PrestaShop
- Magento

## Email Marketing

- Mailchimp
- SendGrid
- ActiveCampaign

## Comunicación

- Slack
- Microsoft Teams
- Telegram

## Pagos

- Stripe
- PayPal
- Redsys

## ¿No está tu herramienta?

Usa nuestra API REST o solicita una integración personalizada.`,
    relatedArticles: ['integracion-crm-guia-completa', 'webhooks-avanzado'],
  },
  {
    slug: 'seguridad-datos-rgpd',
    title: 'Seguridad de datos y cumplimiento RGPD',
    category: 'Preguntas frecuentes',
    views: '11.4K',
    readTime: '7 min',
    content: `# Seguridad de datos y cumplimiento RGPD

Tu privacidad y la de tus clientes es nuestra prioridad.

## Cumplimiento RGPD

NexGent cumple al 100% con el Reglamento General de Protección de Datos:
- ✅ Servidores en Europa
- ✅ Encriptación end-to-end
- ✅ Derecho al olvido
- ✅ Portabilidad de datos
- ✅ DPO certificado

## Seguridad técnica

- **Encriptación**: TLS 1.3 en tránsito, AES-256 en reposo
- **Autenticación**: 2FA disponible
- **Backups**: Diarios automáticos
- **Auditorías**: Trimestrales por terceros

## Control de datos

Tú decides:
- Qué datos se almacenan
- Cuánto tiempo se conservan
- Quién tiene acceso
- Exportación en cualquier momento

## Certificaciones

- ISO 27001
- SOC 2 Type II
- RGPD

## ¿Compartís datos con terceros?

Nunca. Tus datos son tuyos y solo tuyos.`,
    relatedArticles: ['exportar-datos', 'eliminar-cuenta'],
  },
  {
    slug: 'cancelar-suscripcion',
    title: 'Cómo cancelar tu suscripción',
    category: 'Preguntas frecuentes',
    views: '6.8K',
    readTime: '3 min',
    content: `# Cómo cancelar tu suscripción

Esperamos que no sea el caso, pero cancelar es muy sencillo.

## Proceso de cancelación

1. Dashboard → Configuración
2. Suscripción
3. "Cancelar suscripción"
4. Confirma la cancelación

## ¿Qué pasa después?

- Mantienes acceso hasta el final del período pagado
- Puedes exportar todos tus datos
- Los datos se conservan 30 días por si vuelves
- Después de 30 días, se eliminan permanentemente

## ¿Perdería mis datos?

No inmediatamente. Tienes 30 días para exportarlos o reactivar tu cuenta.

## Reactivación

Puedes reactivar en cualquier momento dentro de los 30 días sin perder nada.

## ¿Necesitas ayuda?

Antes de cancelar, habla con nosotros. Quizá podamos ayudarte: info@nexgent.io`,
    relatedArticles: ['exportar-datos', 'pausar-servicio'],
  },
  {
    slug: 'limites-conversaciones',
    title: 'Límites de conversaciones por plan',
    category: 'Preguntas frecuentes',
    views: '8.9K',
    readTime: '4 min',
    content: `# Límites de conversaciones por plan

Entiende cómo funcionan los límites y qué pasa si los superas.

## ¿Qué cuenta como conversación?

Una conversación = Una interacción completa con un cliente, sin importar cuántos mensajes se envíen.

## Límites por plan

- **Starter**: 1,000 conversaciones/mes
- **Pro**: 5,000 conversaciones/mes
- **Enterprise**: Ilimitadas

## ¿Qué pasa si supero el límite?

1. Recibes una notificación al 80%
2. Al llegar al 100%, puedes:
   - Actualizar tu plan automáticamente
   - Comprar conversaciones adicionales (€0.15/conversación)
   - El servicio continúa (no se detiene)

## Conversaciones adicionales

€0.15 por conversación extra. Se facturan al final del mes.

## Monitoreo

Ve tu uso actual en Dashboard → Estadísticas`,
    relatedArticles: ['precios-planes-nexgent', 'cambiar-plan'],
  },
  // Más Resolución de problemas
  {
    slug: 'errores-comunes-soluciones',
    title: 'Errores comunes y sus soluciones',
    category: 'Resolución de problemas',
    views: '8.1K',
    readTime: '8 min',
    content: `# Errores comunes y sus soluciones

Resuelve los problemas más frecuentes de forma rápida.

## Error: "No se puede conectar con WhatsApp"

**Causa**: Sesión expirada o código QR no escaneado correctamente.

**Solución**:
1. Ve a Integraciones → WhatsApp
2. Desconecta la sesión actual
3. Reconecta escaneando el QR de nuevo
4. Asegúrate de tener WhatsApp Business activo en el móvil

## Error: "Límite de mensajes alcanzado"

**Causa**: Has superado el límite de tu plan o el límite de WhatsApp.

**Solución**:
1. Revisa tu uso en Dashboard → Estadísticas
2. Actualiza tu plan si es necesario
3. Si es límite de WhatsApp, espera 24 horas

## Error: "Integración fallida"

**Causa**: Token expirado o permisos incorrectos.

**Solución**:
1. Reautoriza la integración
2. Verifica que has dado todos los permisos
3. Regenera el token si es necesario

## Error: "Bot no responde"

**Causa**: Flujo desactivado o error en la configuración.

**Solución**:
1. Verifica que el flujo esté activo
2. Prueba en el simulador
3. Revisa los logs para ver dónde falla

## ¿Sigue sin funcionar?

Contacta con soporte: info@nexgent.io o WhatsApp +34 684 48 66 47`,
    relatedArticles: ['troubleshooting-problemas-comunes', 'logs-debugging'],
  },
  {
    slug: 'logs-debugging',
    title: 'Cómo usar los logs para debugging',
    category: 'Resolución de problemas',
    views: '5.3K',
    readTime: '6 min',
    content: `# Cómo usar los logs para debugging

Aprende a interpretar los logs y solucionar problemas tú mismo.

## Acceder a los logs

1. Dashboard → Configuración
2. Desarrollo → Logs
3. Filtra por fecha, tipo o severidad

## Tipos de logs

- **Info**: Información normal
- **Warning**: Advertencias (no crítico)
- **Error**: Errores que requieren atención
- **Critical**: Errores críticos

## Interpretar un log de error

\`\`\`json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "level": "error",
  "message": "Failed to send message",
  "details": {
    "error_code": "WHATSAPP_QUOTA_EXCEEDED",
    "conversation_id": "conv_123"
  }
}
\`\`\`

**Error_code** te dice exactamente qué pasó.

## Códigos de error comunes

- **WHATSAPP_QUOTA_EXCEEDED**: Límite de WhatsApp alcanzado
- **INVALID_PHONE**: Número de teléfono inválido
- **AUTH_FAILED**: Autenticación fallida
- **RATE_LIMIT**: Demasiadas peticiones

## Exportar logs

Puedes exportar logs para enviarlos a soporte si necesitas ayuda.`,
    relatedArticles: ['errores-comunes-soluciones', 'monitoreo-performance'],
  },
  {
    slug: 'monitoreo-performance',
    title: 'Monitoreo y optimización de performance',
    category: 'Resolución de problemas',
    views: '4.7K',
    readTime: '7 min',
    content: `# Monitoreo y optimización de performance

Mantén tu sistema funcionando al máximo rendimiento.

## Métricas clave

### Tiempo de respuesta
- **Óptimo**: <2 segundos
- **Aceptable**: 2-5 segundos
- **Lento**: >5 segundos

### Tasa de éxito
- **Óptimo**: >98%
- **Aceptable**: 95-98%
- **Problema**: <95%

### Disponibilidad
- **SLA**: 99.9% uptime garantizado

## Dashboard de performance

En Dashboard → Analytics → Performance verás:
- Tiempo de respuesta promedio
- Tasa de errores
- Latencia por endpoint
- Uso de recursos

## Optimizaciones

### 1. Reduce el tamaño de respuestas
Mensajes más cortos = respuestas más rápidas

### 2. Usa caché inteligente
Activa el caché para respuestas frecuentes

### 3. Limpia datos antiguos
Archiva conversaciones de más de 90 días

### 4. Optimiza integraciones
Sincroniza solo datos necesarios con CRM

## Alertas automáticas

Configura alertas para ser notificado si:
- Tiempo de respuesta >5 seg
- Tasa de error >5%
- Uso >90%`,
    relatedArticles: ['logs-debugging', 'troubleshooting-problemas-comunes'],
  },
  // Más Configuración avanzada
  {
    slug: 'flujos-personalizados-avanzados',
    title: 'Crear flujos personalizados avanzados',
    category: 'Configuración avanzada',
    views: '6.9K',
    readTime: '15 min',
    content: `# Crear flujos personalizados avanzados

Lleva tus automatizaciones al siguiente nivel con flujos complejos.

## Condicionales avanzados

Usa lógica IF-THEN-ELSE:

\`\`\`
IF cliente_es_vip THEN
  mensaje_personalizado + descuento_20%
ELSE IF cliente_nuevo THEN
  mensaje_bienvenida + codigo_descuento
ELSE
  mensaje_estandar
END
\`\`\`

## Variables dinámicas

Usa variables en tus mensajes:

\`\`\`
Hola {{nombre}}, tu cita es el {{fecha}} a las {{hora}}.
Confirma respondiendo SÍ.
\`\`\`

## Loops y repeticiones

Envía recordatorios automáticos:

\`\`\`
LOOP 3 veces cada 24h:
  IF no_confirmado THEN
    enviar_recordatorio
  ELSE
    break
  END
END
\`\`\`

## Integraciones en flujos

Ejecuta acciones en otros sistemas:

1. Cliente reserva → Crear evento en Google Calendar
2. Lead nuevo → Añadir a HubSpot
3. Pago recibido → Enviar factura por email

## Webhooks en flujos

Llama a tu API cuando ocurra algo:

\`\`\`javascript
ON evento_reserva_completada:
  POST https://tu-api.com/webhook
  BODY: {
    cliente: {{cliente}},
    servicio: {{servicio}},
    fecha: {{fecha}}
  }
\`\`\`

## Testing avanzado

Usa el simulador con diferentes escenarios y datos de prueba.`,
    relatedArticles: ['webhooks-avanzado', 'api-rest-documentacion'],
  },
  {
    slug: 'gestion-equipos-permisos',
    title: 'Gestión de equipos y permisos',
    category: 'Configuración avanzada',
    views: '5.8K',
    readTime: '8 min',
    content: `# Gestión de equipos y permisos

Organiza tu equipo y asigna permisos correctamente.

## Roles disponibles

### Admin
- Acceso total
- Puede añadir/eliminar usuarios
- Puede cambiar plan
- Ve toda la información

### Manager
- Gestiona operaciones
- Configura flujos
- Ve reportes
- No puede cambiar plan

### Agent
- Responde conversaciones
- Ve solo conversaciones asignadas
- No puede configurar

### Viewer
- Solo lectura
- Ve dashboards
- No puede editar nada

## Invitar usuarios

1. Dashboard → Equipo
2. "Invitar usuario"
3. Email + Rol
4. Enviar invitación

## Permisos personalizados

En plan Enterprise puedes crear roles custom con permisos específicos.

## Organización por departamentos

- **Ventas**: Acceso a leads y conversaciones
- **Soporte**: Solo a tickets y consultas
- **Marketing**: Solo a campañas

## Auditoría

Ve quién hizo qué en Dashboard → Auditoría`,
    relatedArticles: ['configuracion-inicial-plataforma', 'seguridad-datos-rgpd'],
  },
  {
    slug: 'automatizacion-upselling',
    title: 'Automatización de upselling inteligente',
    category: 'Configuración avanzada',
    views: '7.2K',
    readTime: '10 min',
    content: `# Automatización de upselling inteligente

Aumenta tus ingresos con upselling automático pero natural.

## ¿Qué es upselling inteligente?

El bot sugiere productos/servicios complementarios en el momento perfecto, sin ser invasivo.

## Estrategias efectivas

### 1. Basado en historial
"Veo que la última vez pediste manicura. ¿Te gustaría añadir pedicura hoy?"

### 2. Bundle offers
"Si añades tratamiento facial, te hacemos 15% descuento en el pack completo"

### 3. Temporada
"Este mes tenemos promoción 2x1 en depilación láser"

## Configuración

1. Dashboard → Automatizaciones
2. "Nuevo flujo" → "Upselling"
3. Define reglas:
   - Cuándo ofrecer
   - Qué ofrecer
   - Descuento si aplica

## Ejemplo práctico

\`\`\`
Cliente reserva manicura (€25)

Bot: "¡Perfecto! Tu cita está confirmada. 
Por cierto, ¿sabías que puedes añadir pedicura 
por solo €15 adicionales (normalmente €20)?"

IF cliente_acepta:
  total = €40
  ingreso_extra = €15
\`\`\`

## Métricas

- Tasa de aceptación de upsell
- Ingreso promedio por cliente
- ROI de ofertas

## Mejores prácticas

✅ Ofrece solo si tiene sentido
✅ Personaliza según historial
✅ No insistas si dice no
❌ No hagas spam`,
    relatedArticles: ['crear-flujos-conversacion', 'medir-roi-automatizacion'],
  },
  // Más Mejores prácticas
  {
    slug: 'optimizacion-tasa-conversion',
    title: 'Optimización de tasa de conversión',
    category: 'Mejores prácticas',
    views: '9.4K',
    readTime: '12 min',
    content: `# Optimización de tasa de conversión

Convierte más visitantes en clientes con estas técnicas probadas.

## 1. Reduce la fricción

**Malo**: "Para agendar necesito tu nombre, apellidos, email, teléfono, dirección..."

**Bueno**: "¿Tu nombre? Perfecto, ¿qué día prefieres?"

Pide solo lo esencial al principio.

## 2. Respuesta inmediata

**Estadística**: Responder en <5 minutos aumenta conversión en 400%

Usa el bot para respuesta instantánea 24/7.

## 3. Opciones claras

**Malo**: "¿Qué quieres hacer?"

**Bueno**: "¿Qué te interesa?
A) Agendar cita
B) Ver precios
C) Hablar con alguien"

Máximo 3 opciones por pregunta.

## 4. Urgencia (sin presión)

"Tenemos disponibilidad mañana a las 10:00 y 15:00. ¿Te gustaría reservar una?"

## 5. Social proof

"Únete a +500 clientes satisfechos 🌟"

## 6. Garantías

"Cambio de fecha gratis hasta 24h antes"

## 7. Seguimiento automático

Si el cliente no termina la reserva:
- Recordatorio a las 2 horas
- Otro a las 24 horas
- Oferta especial a los 3 días

## A/B Testing

Prueba variaciones de mensajes y mide qué funciona mejor.

## Métricas clave

- Lead → Conversación iniciada: >70%
- Conversación → Reserva: >40%
- Reserva → Completada: >90%`,
    relatedArticles: ['crear-flujos-conversacion', 'medir-roi-automatizacion'],
  },
  {
    slug: 'casos-uso-industria',
    title: 'Casos de uso por industria',
    category: 'Mejores prácticas',
    views: '11.2K',
    readTime: '14 min',
    content: `# Casos de uso por industria

Implementaciones específicas según tu sector.

## 🎨 Salones de belleza

**Automatizaciones clave**:
- Reservas automáticas
- Recordatorios 24h antes
- Confirmación de asistencia
- Upselling de servicios
- Encuesta post-servicio

**Resultado promedio**: +40% reservas, -65% no-shows

## 💪 Gimnasios y fitness

**Automatizaciones clave**:
- Gestión de leads (pruebas gratis)
- Reserva de clases
- Recordatorios de renovación
- Programa de referidos
- Recuperación de abandonos

**Resultado promedio**: +185% conversión leads

## 🦷 Clínicas dentales

**Automatizaciones clave**:
- Recordatorios de citas
- Seguimiento post-tratamiento
- Recordatorios de revisiones anuales
- Gestión de urgencias
- Confirmación de seguros

**Resultado promedio**: -78% no-shows, +65% ocupación

## 🍽️ Restaurantes

**Automatizaciones clave**:
- Reservas de mesas
- Pedidos delivery
- Programas de fidelización
- Feedback instantáneo
- Promociones especiales

**Resultado promedio**: +55% reservas online

## 🏨 Hoteles y turismo

**Automatizaciones clave**:
- Gestión de reservas
- Check-in/out digital
- Servicios de conserjería
- Upselling de experiencias
- Reviews automatizados

**Resultado promedio**: +30% revenue per guest

## 🏪 Retail y e-commerce

**Automatizaciones clave**:
- Recuperación de carritos abandonados
- Notificaciones de envío
- Atención al cliente 24/7
- Recomendaciones personalizadas
- Programa de lealtad

**Resultado promedio**: +25% recuperación carritos

## 📚 Educación

**Automatizaciones clave**:
- Información de cursos
- Inscripciones
- Recordatorios de clases
- Envío de materiales
- Encuestas de satisfacción

**Resultado promedio**: +40% inscripciones`,
    relatedArticles: ['optimizacion-tasa-conversion', 'crear-flujos-conversacion'],
  },
  {
    slug: 'estrategias-retencion-clientes',
    title: 'Estrategias de retención de clientes',
    category: 'Mejores prácticas',
    views: '8.6K',
    readTime: '11 min',
    content: `# Estrategias de retención de clientes

Mantén a tus clientes felices y volviendo por más.

## 1. Onboarding perfecto

Primeros 7 días son críticos:
- Mensaje de bienvenida personalizado
- Tutorial de uso
- Oferta especial de bienvenida
- Check-in al día 3 y 7

## 2. Comunicación proactiva

**No esperes a que pregunten**:
- Avisos de mantenimiento
- Nuevos servicios disponibles
- Contenido educativo
- Tips relacionados con su interés

## 3. Programa de fidelización

"Por cada 5 visitas, la 6ta tiene 20% descuento"

Automatiza el tracking y los recordatorios.

## 4. Fechas importantes

Automatiza mensajes en:
- Cumpleaños del cliente
- Aniversario de primera compra
- Festivos especiales

"¡Feliz cumpleaños María! 🎂 Te regalamos 15% en tu próxima visita"

## 5. Recuperación de inactivos

Si un cliente no vuelve en X días:
- Día 30: "Te echamos de menos"
- Día 60: Oferta especial
- Día 90: Encuesta "¿Por qué no vuelves?"

## 6. Pide feedback

Después de cada servicio:
"¿Cómo fue tu experiencia? (1-5 ⭐)"

Si <4 estrellas → escalado a manager
Si 5 estrellas → pide review pública

## 7. Crea comunidad

- Grupo exclusivo de WhatsApp
- Early access a promociones
- Eventos VIP

## Métricas de retención

- **Retention rate**: % clientes que vuelven
- **Churn rate**: % clientes que se van
- **LTV**: Lifetime value promedio
- **Frecuencia de compra**: Veces por año

**Objetivo**: Retention >80%, Churn <20%`,
    relatedArticles: ['casos-uso-industria', 'automatizacion-upselling'],
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

