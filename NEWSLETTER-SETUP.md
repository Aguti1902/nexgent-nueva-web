# 📧 Configuración del Sistema de Newsletter

Sistema completo de suscripción a newsletter con almacenamiento en Supabase.

## 🗄️ Paso 1: Crear la tabla en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a **SQL Editor** (panel izquierdo)
3. Copia y pega el contenido de `supabase/newsletter-schema.sql`
4. Click en **Run** (o presiona `Ctrl + Enter`)

### ✅ Verificar que funcionó:

- Ve a **Table Editor**
- Deberías ver la tabla `newsletter_subscribers`
- Debería tener estos campos:
  - `id` (UUID)
  - `email` (TEXT)
  - `subscribed_at` (TIMESTAMP)
  - `is_active` (BOOLEAN)
  - `source` (TEXT)
  - `unsubscribe_token` (TEXT)
  - `updated_at` (TIMESTAMP)

---

## 🎯 Funcionalidades Implementadas

### 📝 **Suscripción**
- Formulario en `/recursos/blog` (sección azul)
- Validación de email en cliente y servidor
- Previene emails duplicados
- Reactiva suscripciones inactivas automáticamente
- Feedback visual de éxito/error

### 📊 **Base de Datos**
- Almacena todos los suscriptores en Supabase
- Generación automática de token de desuscripción
- Timestamps automáticos
- Índices para búsquedas rápidas

### 🔐 **Seguridad**
- Row Level Security (RLS) habilitado
- Políticas para INSERT/SELECT/UPDATE públicas
- Emails en minúsculas para consistencia
- Validación de formato de email

---

## 🚀 API Endpoints

### **POST /api/newsletter**
Suscribir un nuevo email al newsletter.

**Body:**
```json
{
  "email": "usuario@example.com",
  "source": "blog"
}
```

**Respuestas:**
- `201`: Suscripción exitosa
- `400`: Email inválido o ya suscrito
- `500`: Error del servidor

---

### **GET /api/newsletter**
Obtener lista de suscriptores (para admin).

**Query params:**
- `?active=true` - Solo suscriptores activos

**Respuesta:**
```json
{
  "subscribers": [...],
  "count": 42
}
```

---

### **DELETE /api/newsletter?token=XXX**
Desuscribirse del newsletter.

**Query params:**
- `?token=XXX` - Token de desuscripción
- `?email=usuario@example.com` - O usar email directamente

**Respuesta:**
- `200`: Desuscripción exitosa
- `404`: Suscripción no encontrada
- `500`: Error del servidor

---

## 📧 Ver tus suscriptores

### Opción 1: Supabase Dashboard
1. Ve a **Table Editor** → `newsletter_subscribers`
2. Verás todos los emails suscritos
3. Puedes filtrar por `is_active = true`

### Opción 2: API
```bash
# Ver todos los suscriptores activos
curl https://tu-dominio.vercel.app/api/newsletter?active=true
```

---

## 🎨 Flujo de Usuario

1. **Usuario introduce su email** en el formulario del blog
2. Click en **"Suscribirme gratis"**
3. Sistema valida el email
4. Si es válido → Se guarda en Supabase
5. Mensaje de éxito: "¡Suscripción exitosa! Revisa tu email."
6. Campo de email se limpia automáticamente

### Si el email ya existe:
- Mensaje de error: "Este email ya está suscrito"

### Si el formato es inválido:
- Mensaje de error: "Por favor, introduce un email válido"

---

## 📊 Estadísticas

Para ver cuántos suscriptores tienes:

### SQL en Supabase:
```sql
-- Total de suscriptores activos
SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true;

-- Suscriptores por fuente
SELECT source, COUNT(*) 
FROM newsletter_subscribers 
WHERE is_active = true 
GROUP BY source;

-- Suscriptores de hoy
SELECT COUNT(*) 
FROM newsletter_subscribers 
WHERE DATE(subscribed_at) = CURRENT_DATE;
```

---

## 🔧 Próximos pasos (opcionales)

### 1. **Integración con Email Marketing**
- Mailchimp
- SendGrid
- ConvertKit
- Brevo (Sendinblue)

### 2. **Email de bienvenida automático**
- Trigger en Supabase
- Webhook a servicio de email
- Template personalizado

### 3. **Página de desuscripción**
- Crear `/newsletter/unsubscribe?token=XXX`
- Formulario amigable
- Opción de reactivar

### 4. **Panel de administración**
- Ver lista de suscriptores en `/admin`
- Exportar a CSV
- Estadísticas de crecimiento
- Gráficos de suscripciones por fecha

---

## ✅ Testing

### Probar suscripción:
1. Ve a `/recursos/blog`
2. Scroll hasta la sección azul "Recibe insights semanales"
3. Introduce un email
4. Click "Suscribirme gratis"
5. Verifica el mensaje de éxito
6. Revisa en Supabase que el email se guardó

### Probar email duplicado:
1. Introduce el mismo email dos veces
2. Deberías ver: "Este email ya está suscrito"

### Probar email inválido:
1. Introduce "test" o "test@"
2. Deberías ver: "Por favor, introduce un email válido"

---

## 🐛 Troubleshooting

### "Error de conexión. Inténtalo de nuevo"
- Verifica que las variables de entorno estén en Vercel
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### "Error interno del servidor"
- Revisa logs en Vercel
- Verifica que la tabla `newsletter_subscribers` existe
- Verifica que las políticas RLS están activas

### Los emails no se guardan
- Verifica la política de INSERT en RLS
- Ejecuta: `ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;`
- Verifica la política: `CREATE POLICY "Anyone can subscribe to newsletter." ON public.newsletter_subscribers FOR INSERT WITH CHECK (TRUE);`

---

## 📝 Notas

- Los emails se guardan en **minúsculas** para consistencia
- El `unsubscribe_token` se genera automáticamente
- Los timestamps se actualizan automáticamente
- El campo `source` permite rastrear de dónde vino cada suscriptor

---

¡Sistema de newsletter listo para usar! 🎉

