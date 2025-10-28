# 🚀 Configuración de Supabase para NexGent

Este documento explica cómo completar la configuración de Supabase para tu proyecto.

## ✅ Lo que ya está hecho:

1. ✅ Supabase JS instalado (`@supabase/supabase-js`)
2. ✅ Cliente de Supabase configurado (`lib/supabase.ts`)
3. ✅ API Routes creadas para CRUD de artículos
4. ✅ API Route para subir imágenes
5. ✅ Hooks personalizados para usar en el frontend

## 📋 Pasos que DEBES completar:

### **Paso 1: Crear el archivo `.env.local`**

Crea un archivo llamado `.env.local` en la raíz del proyecto con este contenido:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nvfouagvncxbcgytgtfy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Zm91YWd2bmN4YmNneXRndGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTM5NDMsImV4cCI6MjA3NzE2OTk0M30.puVgiVdARJNjZrecp-jsMMTu1Q_jGKBzeamDEPSgtG0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Zm91YWd2bmN4YmNneXRndGZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTU5Mzk0MywiZXhwIjoyMDc3MTY5OTQzfQ.lNeH2aj0zjNQfUMnm7gFKGTlg9lcRoJ4hT-F97KgQUA
```

⚠️ **IMPORTANTE**: No subas este archivo a GitHub. Ya está en `.gitignore`.

---

### **Paso 2: Ejecutar el SQL en Supabase**

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. En el menú lateral, haz clic en **SQL Editor**
3. Crea una nueva query
4. Copia y pega TODO el contenido del archivo `supabase/schema.sql`
5. Haz clic en **RUN** (Ejecutar)

Esto creará:
- ✅ Tabla `blog_articles`
- ✅ Bucket `blog-images` en Storage
- ✅ Políticas de seguridad (RLS)
- ✅ Índices para mejor rendimiento

---

### **Paso 3: Verificar que todo funciona**

En Supabase, ve a **Table Editor** y verifica que existe la tabla `blog_articles`.

---

### **Paso 4: Añadir las variables de entorno en Vercel**

1. Ve a tu proyecto en Vercel: https://vercel.com
2. Settings → Environment Variables
3. Añade estas 3 variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. Redeploy tu proyecto en Vercel

---

## 🎯 Próximos pasos (que haré yo):

Una vez que completes los pasos anteriores, actualizaré:

1. **Admin Dashboard** (`app/admin/page.tsx`)
   - Leerá artículos desde Supabase
   - Borrará artículos de Supabase
   - Actualizará estado publish/unpublish

2. **Formulario de nuevo artículo** (`app/admin/blog/nuevo/page.tsx`)
   - Subirá imágenes a Supabase Storage
   - Guardará artículos en Supabase
   - Redireccionará al dashboard

3. **Blog público** (`app/recursos/blog/...`)
   - Mostrará artículos desde Supabase
   - Los artículos predefinidos se quedarán en el código
   - Todo funcionará junto

---

## 📊 Estructura de la Base de Datos:

### Tabla: `blog_articles`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único (auto-generado) |
| title | TEXT | Título del artículo |
| slug | TEXT | URL amigable (único) |
| excerpt | TEXT | Extracto/resumen |
| content | TEXT | Contenido completo |
| category | TEXT | Categoría del artículo |
| author | TEXT | Autor |
| date | TEXT | Fecha de publicación |
| read_time | TEXT | Tiempo de lectura |
| image_url | TEXT | URL de la imagen |
| published | BOOLEAN | Publicado/borrador |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

---

## 🔐 Seguridad:

- ✅ **Row Level Security (RLS)** activado
- ✅ Solo usuarios autenticados pueden crear/editar/eliminar
- ✅ Cualquiera puede leer artículos publicados
- ✅ Imágenes públicas pero solo los autenticados pueden subir

---

## ❓ ¿Necesitas ayuda?

Si tienes algún problema con algún paso, avísame y te ayudaré.

---

## 🎉 Una vez completado:

Tendrás:
- ✅ Base de datos PostgreSQL real
- ✅ Almacenamiento ilimitado para imágenes
- ✅ API REST completa
- ✅ Admin dashboard funcional
- ✅ Blog profesional y escalable
- ✅ 100% gratis con Supabase Free Tier

