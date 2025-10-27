# 📅 Configuración de Calendly en la Página de Demo

## 🎯 Descripción

El paso 4 del formulario de demo muestra tu calendario de Calendly embebido directamente en la página. Los usuarios pueden ver tu disponibilidad en tiempo real y reservar una demo sin salir de tu web.

## 🔧 Pasos para Configurar

### 1. Crea una cuenta en Calendly (si no tienes)

- Ve a [https://calendly.com](https://calendly.com)
- Crea una cuenta gratuita o de pago
- Conecta tu calendario (Google Calendar, Outlook, etc.)

### 2. Crea un Evento para "Demo NexGent"

1. En tu dashboard de Calendly, haz clic en **"+ Create"**
2. Selecciona **"Event Type"**
3. Configura tu evento:
   - **Event name:** Demo NexGent
   - **Duration:** 30 minutos (o lo que prefieras)
   - **Location:** Google Meet / Zoom / Teams
   - **Availability:** Define tus horarios disponibles

### 3. Personaliza tu evento

**Configuración recomendada:**

#### **Event Details:**
- **Event name:** Demo NexGent - Agentes de IA
- **Location:** Google Meet (se genera automáticamente)
- **Description:**
  ```
  ¡Hola! 👋
  
  En esta demo de 30 minutos te mostraré:
  ✅ Cómo funcionan nuestros agentes de IA
  ✅ Casos de éxito reales
  ✅ Demo en vivo personalizada para tu negocio
  ✅ Responderé todas tus preguntas
  
  Nos vemos pronto,
  Equipo NexGent
  ```

#### **Questions:**
Añade preguntas personalizadas (opcional):
- ¿Cuál es tu principal reto en atención al cliente?
- ¿Cuántas consultas recibes al día aproximadamente?

#### **Notifications & Cancellation:**
- **Email reminders:** Activados (1 día antes + 1 hora antes)
- **SMS reminders:** Opcional
- **Cancellation policy:** Mínimo 24h de anticipación

#### **Branding:**
- **Color principal:** #000000 (negro, como en tu web)
- **Logo:** Sube el logo de NexGent

### 4. Obtén tu enlace de Calendly

1. En tu evento de Calendly, haz clic en **"Copy Link"**
2. El enlace tendrá este formato:
   ```
   https://calendly.com/tu-usuario/demo-nexgent
   ```

### 5. Actualiza el código

Abre el archivo:
```
/components/demo/DemoForm.tsx
```

Busca la línea 348 y reemplaza `tu-usuario-calendly` con tu usuario real:

```tsx
// ANTES:
data-url="https://calendly.com/tu-usuario-calendly/demo-nexgent?hide_gdpr_banner=1&primary_color=000000"

// DESPUÉS (ejemplo):
data-url="https://calendly.com/nexgent-team/demo-nexgent?hide_gdpr_banner=1&primary_color=000000"
```

### 6. Parámetros de URL opcionales

Puedes personalizar aún más el widget con estos parámetros:

```
?hide_gdpr_banner=1         // Oculta el banner de GDPR
&primary_color=000000       // Color principal (negro)
&text_color=ffffff          // Color del texto
&hide_event_type_details=1  // Oculta detalles del evento
&hide_landing_page_details=1 // Oculta detalles de la landing page
```

**Ejemplo completo:**
```
https://calendly.com/nexgent-team/demo-nexgent?hide_gdpr_banner=1&primary_color=000000&hide_event_type_details=1
```

## 📧 Automatizaciones Recomendadas

### Workflow de Calendly:

1. **Email inmediato al cliente:**
   - Confirmación de reserva
   - Enlace de Google Meet
   - Instrucciones previas

2. **Email 1 día antes:**
   - Recordatorio amigable
   - Enlace de Meet
   - "¿Alguna pregunta antes de la demo?"

3. **Email 1 hora antes:**
   - Recordatorio final
   - Link directo a Meet

### Integraciones Útiles:

- **Zapier:** Para enviar datos a tu CRM
- **HubSpot:** Crear contactos automáticamente
- **Slack:** Notificaciones de nuevas reservas
- **Google Sheets:** Registro de todas las demos

## 🎨 Personalización del Widget

El widget ya está configurado con:

- ✅ **Altura:** 700px (ajustable)
- ✅ **Bordes redondeados:** rounded-lg
- ✅ **Borde:** border-gray-200
- ✅ **Color principal:** Negro (#000000)
- ✅ **Banner GDPR:** Oculto

Si quieres cambiar el tamaño:

```tsx
style={{ minWidth: '320px', height: '700px' }} // Cambia el 700px
```

## 📱 Responsive

El widget es 100% responsive:
- **Desktop:** Muestra calendario completo
- **Mobile:** Vista optimizada para móvil
- **Tablet:** Layout adaptable

## 🔒 Privacidad

Calendly cumple con:
- ✅ GDPR
- ✅ CCPA
- ✅ SOC 2 Type II
- ✅ HIPAA (en planes premium)

## 💡 Tips Pro

### 1. Buffer Time
Añade 15 minutos entre demos para prepararte.

### 2. Smart Invites
Envía enlaces personalizados con prefill:
```
https://calendly.com/tu-usuario/demo?name=Juan&email=juan@empresa.com
```

### 3. Round Robin
Si sois varios en el equipo, usa Round Robin para distribuir demos.

### 4. Routing Forms
Crea un formulario de cualificación antes de mostrar el calendario.

## 🧪 Testing

Para probar:

1. Ve a `http://localhost:3000/demo`
2. Completa los primeros 3 pasos
3. En el paso 4 verás tu calendario de Calendly
4. Haz una reserva de prueba
5. Verifica que recibes el email

## 🐛 Troubleshooting

### El widget no se muestra:
- Verifica que el enlace de Calendly sea correcto
- Revisa la consola del navegador para errores
- Asegúrate de que tu evento esté activo en Calendly

### El widget se ve cortado:
- Aumenta el `height` en el style
- Verifica que no haya `overflow: hidden` en elementos padres

### No se carga el script:
- Verifica tu conexión a internet
- Revisa que no haya bloqueadores de scripts

## 📞 Soporte

Si tienes problemas:
- [Documentación de Calendly](https://help.calendly.com)
- [Centro de ayuda](https://help.calendly.com/hc/en-us)
- [Soporte técnico](https://calendly.com/contact)

---

## ✅ Checklist Final

- [ ] Cuenta de Calendly creada
- [ ] Evento "Demo NexGent" configurado
- [ ] Disponibilidad definida
- [ ] Notificaciones activadas
- [ ] Enlace actualizado en el código
- [ ] Probado en local
- [ ] Emails de confirmación verificados

**¡Listo! Tu sistema de reserva de demos está completamente automatizado.** 🚀

