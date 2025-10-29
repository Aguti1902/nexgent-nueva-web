# 🤖 CONFIGURACIÓN DE OPENAI Y CHAT INTELIGENTE

## ✅ Sistema Implementado

Se ha creado un sistema completo de chat con IA que:

1. ✅ **Chat conversacional natural** con OpenAI GPT-4
2. ✅ **Recopilación inteligente** de datos del usuario
3. ✅ **Guardado automático** en Supabase
4. ✅ **Tracking de sesiones** única por usuario
5. ✅ **Interfaz mejorada** con indicadores visuales

---

## 🔐 PASO 1: Configurar Variables de Entorno

### **Archivo `.env.local`**

Crea o actualiza el archivo `.env.local` en la raíz del proyecto con:

```env
# OpenAI API Key
OPENAI_API_KEY=TU_API_KEY_AQUI

# Supabase (ya deberías tenerlas)
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

**⚠️ IMPORTANTE:** La API key de OpenAI te la proporcionaré por mensaje privado por seguridad.

### **En Vercel (Producción)**

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega la variable:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `[La API key que te proporcioné por privado]`
   - **Environments:** Production, Preview, Development
4. **Redeploy** el proyecto

---

## 📊 PASO 2: Crear Tablas en Supabase

Ve a **Supabase Dashboard** → **SQL Editor** → **New Query**

Copia y pega el contenido de: `supabase/chat-system-schema.sql`

O ejecuta este SQL:

```sql
-- Ver el archivo: supabase/chat-system-schema.sql
```

Click en **"Run"**

---

## 🎯 PASO 3: Cómo Funciona el Chat

### **Flujo de Conversación:**

```
Usuario abre chat
    ↓
Asistente saluda y pregunta nombre
    ↓
Recopila datos (nombre, email, empresa, teléfono)
    ↓
Pregunta qué solución le interesa
    ↓
Pregunta disponibilidad para demo
    ↓
Confirma todos los datos
    ↓
Guarda en Supabase → demo_requests
    ↓
Muestra confirmación al usuario
```

### **Datos Recopilados:**

- ✅ Nombre completo
- ✅ Email (validado)
- ✅ Teléfono (opcional)
- ✅ Empresa
- ✅ Interés (qué solución)
- ✅ Disponibilidad (fecha/hora preferida)

### **Almacenamiento:**

Todas las conversaciones y solicitudes se guardan en:
- `chat_conversations` - Información general de la sesión
- `chat_messages` - Historial completo de mensajes
- `demo_requests` - Solicitudes de demo con todos los datos

---

## 📋 PASO 4: Ver las Solicitudes de Demo

### **Opción 1: Directamente en Supabase**

1. Ve a **Supabase Dashboard**
2. **Table Editor** → `demo_requests`
3. Verás todas las solicitudes con:
   - Nombre
   - Email
   - Teléfono
   - Empresa
   - Interés
   - Fecha preferida
   - Estado (pending, confirmed, completed)

### **Opción 2: Panel de Admin (Próximamente)**

Se puede crear una sección en el admin dashboard para:
- Ver todas las solicitudes
- Marcar como confirmadas
- Agendar en Google Calendar
- Enviar confirmaciones por email

---

## 🔮 PRÓXIMOS PASOS: Google Calendar

Para integrar con Google Calendar automáticamente:

1. **Crear credenciales de Google Cloud**
2. **Activar Google Calendar API**
3. **Obtener tokens de acceso**
4. **Crear función de agendamiento**

¿Quieres que implemente esto ahora?

---

## 💡 PERSONALIZACIÓN

### **Cambiar el Prompt del Asistente:**

Edita el archivo: `app/api/chat/route.ts`

Busca la constante `SYSTEM_PROMPT` y modifica:
- Personalidad del asistente
- Preguntas que hace
- Tono de comunicación
- Información sobre servicios

### **Cambiar el Modelo de IA:**

Por defecto usa `gpt-4`. Puedes cambiar a:
- `gpt-4-turbo` - Más rápido y barato
- `gpt-3.5-turbo` - Mucho más barato pero menos inteligente

En `app/api/chat/route.ts` línea 86:
```typescript
model: 'gpt-4', // Cambia aquí
```

---

## 📊 MONITOREO

### **Revisar Conversaciones:**

```sql
-- Ver todas las conversaciones activas
SELECT * FROM chat_conversations 
WHERE status = 'active' 
ORDER BY created_at DESC;

-- Ver mensajes de una conversación
SELECT * FROM chat_messages 
WHERE session_id = 'tu-session-id' 
ORDER BY created_at ASC;

-- Ver solicitudes pendientes
SELECT * FROM demo_requests 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

---

## 🆘 TROUBLESHOOTING

### **El chat no responde:**

1. Verifica que `OPENAI_API_KEY` esté configurada
2. Revisa los logs de Vercel
3. Verifica que Supabase esté conectado

### **Error de API Key:**

- La key debe empezar con `sk-proj-`
- Verifica que no haya espacios
- Genera una nueva si es necesario: https://platform.openai.com/api-keys

### **Error de Supabase:**

- Verifica que las tablas estén creadas
- Revisa las políticas RLS
- Comprueba las variables de entorno

---

## 💰 COSTOS DE OPENAI

**Precios aproximados (GPT-4):**
- Input: $0.03 por 1K tokens
- Output: $0.06 por 1K tokens

**Estimación por conversación:**
- ~500-1000 tokens por conversación completa
- ~$0.03-0.06 por demo agendada

**Recomendación:**
- Configura límites de gasto en OpenAI
- Monitorea el uso en: https://platform.openai.com/usage

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] ✅ Variables de entorno configuradas en Vercel
- [ ] ✅ Tablas creadas en Supabase
- [ ] ✅ OpenAI API Key válida
- [ ] ✅ Chat widget actualizado
- [ ] ✅ Código desplegado en Vercel
- [ ] 🔲 Google Calendar integrado (opcional)
- [ ] 🔲 Notificaciones por email (opcional)
- [ ] 🔲 Panel de admin para ver demos (opcional)

---

**¿Necesitas ayuda con algo?** Contacta al desarrollador.

