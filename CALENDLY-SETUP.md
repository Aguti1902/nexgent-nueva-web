# 📅 CALENDLY + CHAT IA - CONFIGURACIÓN

## ✅ Sistema Implementado

El chat con IA ahora está integrado con Calendly:

```
Usuario → Chat IA → Recopila datos → Abre Calendly → Usuario agenda → ¡Listo!
```

---

## 🔧 CONFIGURACIÓN NECESARIA

### **PASO 1: Obtén tu URL de Calendly**

1. Ve a tu cuenta de Calendly: https://calendly.com
2. Busca tu evento de "Demo" (o créalo si no existe)
3. Haz clic en el evento → **"View Booking Page"**
4. Copia la URL completa (ej: `https://calendly.com/tu-usuario/demo`)

### **PASO 2: Configurar la URL en el código**

Abre el archivo: `components/ChatWidget.tsx`

**Línea 33:**
```typescript
const CALENDLY_URL = 'https://calendly.com/nexgent-demo/30min' // ← CAMBIA ESTO
```

Reemplaza con tu URL de Calendly.

---

## 🎯 CÓMO FUNCIONA

### **Flujo Completo:**

1. **Usuario abre el chat** → Asistente saluda
2. **Conversación natural** → IA pregunta:
   - Nombre
   - Empresa
   - Email
   - Teléfono
   - Interés (qué solución)
   - Disponibilidad aproximada
3. **Datos recopilados** → Se guardan en Supabase
4. **Modal de Calendly** → Se abre automáticamente
5. **Datos prellenados** → Nombre, email, teléfono, empresa
6. **Usuario elige fecha** → Agenda directamente en Calendly
7. **Confirmación** → Calendly envía email automáticamente

---

## ✨ VENTAJAS DE ESTA INTEGRACIÓN

### ✅ **Para ti:**
- Datos CRM completos antes del agendamiento
- Sabes qué le interesa al prospecto
- Calendly gestiona recordatorios y confirmaciones
- Métricas en Supabase + Calendly
- No necesitas gestionar disponibilidad manualmente

### ✅ **Para el usuario:**
- Conversación natural (no formulario frío)
- Calendly muestra solo tus horas disponibles
- Confirmación instantánea
- Link de Google Meet automático
- Recordatorios por email/SMS

---

## 🔔 WEBHOOKS DE CALENDLY (Opcional pero Recomendado)

Para recibir notificaciones cuando alguien agenda:

### **Paso 1: Crear Webhook en Calendly**

1. Ve a: https://calendly.com/integrations/webhooks
2. Click en **"Create Webhook"**
3. **Webhook URL:** `https://tu-dominio.vercel.app/api/calendly-webhook`
4. **Events:** Selecciona:
   - `invitee.created` - Cuando se agenda
   - `invitee.canceled` - Cuando se cancela
5. **Save**

### **Paso 2: Implementar el Webhook (Próximamente)**

Te puedo crear un endpoint que:
- Actualice el estado en Supabase cuando se agenda
- Envíe notificación a Slack/Discord/Email
- Actualice tu CRM automáticamente

---

## 📊 VER SOLICITUDES

### **En Supabase:**

Tabla `demo_requests`:
- Todos los datos recopilados por el chat
- Estado: pending, confirmed, completed

### **En Calendly:**

Dashboard de Calendly:
- Eventos agendados
- Cancelaciones
- Reprogramaciones

---

## 🎨 PERSONALIZAR CALENDLY

### **Colores y Branding:**

1. Ve a tu cuenta de Calendly
2. **Settings** → **Branding**
3. Configura:
   - Logo
   - Colores (negro para NexGent)
   - Custom message

### **Preguntas Personalizadas:**

1. Edita tu evento
2. **Event settings** → **Invitee Questions**
3. Agrega campos personalizados (ya prellenamos nombre, email, teléfono, empresa)

---

## 🔄 FLUJO VISUAL

```
┌─────────────────────────┐
│   Usuario abre chat     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  IA recopila datos      │
│  - Nombre               │
│  - Email                │
│  - Empresa              │
│  - Teléfono             │
│  - Interés              │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Guarda en Supabase     │
│  (demo_requests)        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Abre modal Calendly    │
│  (datos prellenados)    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Usuario elige fecha    │
│  y hora                 │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Calendly confirma      │
│  - Email confirmación   │
│  - Link Google Meet     │
│  - Recordatorios        │
└─────────────────────────┘
```

---

## 💡 PRÓXIMAS MEJORAS

### **Que podemos agregar:**

1. **Webhook de Calendly** → Notificaciones automáticas
2. **Actualización de estado** → Cuando se agenda, marcar en Supabase
3. **Integración con CRM** → Enviar leads a HubSpot/Salesforce
4. **Analytics** → Dashboard de conversión
5. **Follow-up automático** → Email 1 día antes de la demo

---

## ⚠️ CHECKLIST

- [ ] ✅ Chat IA implementado
- [ ] ✅ Calendly instalado
- [ ] ✅ Modal funcional
- [ ] 🔲 URL de Calendly configurada en el código
- [ ] 🔲 OpenAI API Key en Vercel
- [ ] 🔲 Tablas de Supabase creadas
- [ ] 🔲 Webhooks de Calendly (opcional)

---

## 🆘 TROUBLESHOOTING

### **Calendly no se abre:**
- Verifica que la URL de Calendly esté correcta
- Asegúrate de que el evento esté activo

### **Datos no se prellena:**
- Verifica que los campos coincidan con los de Calendly
- Revisa la consola del navegador

### **Chat no recopila datos:**
- Verifica OpenAI API Key en Vercel
- Revisa logs en Vercel

---

## 📞 SOPORTE

¿Necesitas ayuda?
- Email: info@nexgent.io
- WhatsApp: +34 684 48 66 47

---

**¡Tu sistema de agendamiento inteligente está listo!** 🎉
