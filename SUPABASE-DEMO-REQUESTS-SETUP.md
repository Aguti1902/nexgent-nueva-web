# 📋 SISTEMA DE SOLICITUDES DE DEMO - SETUP

## 🎯 ¿QUÉ HACE ESTE SISTEMA?

Guarda **TODA** la información del formulario de demo en Supabase antes de mostrar Calendly.

**Datos que se guardan:**
- ✅ Nombre, Email, Teléfono
- ✅ Empresa, Sector, Número de empleados
- ✅ Qué soluciones le interesan (WhatsApp, Llamadas, CRM, etc.)
- ✅ Objetivos específicos
- ✅ Fecha y hora de la solicitud

---

## 🚀 CONFIGURACIÓN EN SUPABASE

### **Paso 1: Crear la tabla en Supabase**

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard
2. En el menú lateral: **SQL Editor**
3. Click en **+ New query**
4. Copia y pega el contenido del archivo: `supabase/demo-requests-schema.sql`
5. Click en **Run** (o presiona Cmd/Ctrl + Enter)
6. Verás: ✅ "Success. No rows returned"

### **Paso 2: Verificar que la tabla se creó**

1. En el menú lateral: **Table Editor**
2. Busca la tabla: `demo_requests`
3. Deberías ver las columnas:
   - `id` (UUID)
   - `name`, `email`, `phone`
   - `company`, `industry`, `employees`
   - `agent_types` (array)
   - `objectives`
   - `created_at`, `updated_at`

---

## 📊 ¿DÓNDE VER LAS SOLICITUDES?

### **Opción 1: Directamente en Supabase**

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. **Table Editor** → `demo_requests`
4. Verás todas las solicitudes con:
   - Nombre del cliente
   - Email y teléfono
   - Empresa y sector
   - Qué le interesa
   - Cuándo solicitó la demo

### **Opción 2: Panel de Admin (próximamente)**

Puedo crear una página en `/admin/solicitudes-demo` donde puedas:
- Ver todas las solicitudes en una tabla bonita
- Filtrar por fecha, empresa, sector
- Buscar por nombre o email
- Exportar a Excel/CSV
- Ver estadísticas (solicitudes por día, sector más popular, etc.)

---

## 🔄 ¿CÓMO FUNCIONA?

### **Flujo del usuario:**

```
1. Usuario completa Paso 1 (Nombre, Email, Teléfono)
   ↓
2. Usuario completa Paso 2 (Empresa, Sector, Empleados)
   ↓
3. Usuario completa Paso 3 (Qué le interesa, Objetivos)
   ↓
4. Click en "Siguiente"
   ↓
5. 🔥 AQUÍ SE GUARDA TODO EN SUPABASE 🔥
   ↓
6. Aparece Calendly (Paso 4)
   ↓
7. Usuario agenda la demo
```

### **Resultado:**

**Tienes 2 fuentes de información:**

1. **Supabase** → Info completa del formulario
2. **Calendly** → Fecha y hora de la reunión + Google Meet link

---

## 📋 EJEMPLO DE DATOS GUARDADOS

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Carlos Pérez",
  "email": "carlos@miempresa.com",
  "phone": "+34 600 123 456",
  "company": "Mi Empresa SL",
  "industry": "salones-belleza",
  "employees": "6-10",
  "agent_types": ["whatsapp", "calls", "bookings"],
  "objectives": "Reducir ausencias y aumentar ventas",
  "created_at": "2025-11-03T10:30:00Z",
  "updated_at": "2025-11-03T10:30:00Z"
}
```

---

## 🛠️ API ENDPOINT

### **POST /api/demo-requests**

Guarda una nueva solicitud de demo.

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "industry": "string",
  "employees": "string",
  "agentType": ["string"],
  "objectives": "string" // opcional
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

### **GET /api/demo-requests**

Obtiene todas las solicitudes de demo.

**Response:**
```json
{
  "requests": [
    { ... },
    { ... }
  ]
}
```

---

## 📈 PRÓXIMOS PASOS (OPCIONALES)

### **1. Panel de Admin**
- Ver todas las solicitudes en una tabla
- Filtros y búsqueda
- Exportar datos

### **2. Notificaciones**
- Email automático cuando hay una nueva solicitud
- Integración con Slack/Discord

### **3. Integración con CRM**
- Enviar automáticamente a tu CRM
- Sincronizar con Calendly

### **4. Analytics**
- Dashboard de estadísticas
- Conversión del formulario
- Sectores más populares

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Ejecutar SQL en Supabase (`demo-requests-schema.sql`)
- [ ] Verificar que la tabla `demo_requests` existe
- [ ] Probar el formulario de demo
- [ ] Verificar que los datos se guardan en Supabase
- [ ] (Opcional) Crear panel de admin
- [ ] (Opcional) Configurar notificaciones

---

## 🆘 TROUBLESHOOTING

### **"No se guardan los datos"**
1. Verifica que ejecutaste el SQL en Supabase
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que las variables de entorno están configuradas

### **"Error 500 en API"**
1. Verifica que `SUPABASE_SERVICE_KEY` está en `.env.local`
2. Verifica que está también en Vercel (Environment Variables)

### **"No veo la tabla"**
1. Asegúrate de estar en el proyecto correcto de Supabase
2. Refresca el navegador
3. Ve a SQL Editor y ejecuta: `SELECT * FROM demo_requests;`

---

## 📞 SOPORTE

Si tienes problemas o quieres agregar funcionalidades:
- Revisa los logs en la consola del navegador
- Revisa los logs en Vercel
- Revisa los logs en Supabase (Logs & Analytics)

---

**¡Ya está todo configurado! Solo falta ejecutar el SQL en Supabase.** 🚀

