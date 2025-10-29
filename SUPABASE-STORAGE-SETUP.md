# 📸 Configuración de Supabase Storage para Imágenes

## 🎯 Objetivo
Configurar Supabase Storage para que el admin pueda subir, ver y eliminar imágenes.

---

## 📋 Pasos de Configuración

### 1️⃣ Crear el Bucket en Supabase

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard/project/[TU_PROJECT_ID]
2. En el menú lateral, haz clic en **Storage**
3. Haz clic en **New Bucket**
4. Configura así:
   ```
   Bucket name: blog-images
   Public bucket: ✅ YES (activado)
   File size limit: 5242880 (5MB en bytes)
   Allowed MIME types: image/jpeg,image/jpg,image/png,image/gif,image/webp
   ```
5. Haz clic en **Create bucket**

---

### 2️⃣ Configurar Políticas de Acceso (RLS)

1. En **Storage**, haz clic en tu bucket `blog-images`
2. Ve a la pestaña **Policies**
3. Haz clic en **New Policy**

#### Política 1: Lectura Pública
```sql
Name: Public Read Access
Operation: SELECT
Target roles: public
USING expression: bucket_id = 'blog-images'
```

#### Política 2: Permitir Subida
```sql
Name: Allow Upload
Operation: INSERT
Target roles: public
WITH CHECK expression: bucket_id = 'blog-images'
```

#### Política 3: Permitir Eliminación
```sql  
Name: Allow Delete
Operation: DELETE
Target roles: public
USING expression: bucket_id = 'blog-images'
```

**O ejecuta el archivo SQL:**
- Ve a **SQL Editor** en Supabase
- Abre el archivo `supabase/storage-setup.sql`
- Ejecuta las políticas

---

### 3️⃣ Verificar Variables de Entorno

Asegúrate de tener estas variables en `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[TU_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Importante:** `SUPABASE_SERVICE_ROLE_KEY` es necesaria para subir archivos desde la API.

Para obtener las keys:
1. Ve a **Settings** > **API**
2. Copia `URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. Copia `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
4. Copia `service_role` (secret) → `SUPABASE_SERVICE_ROLE_KEY`

---

### 4️⃣ Configurar Variables en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** > **Environment Variables**
3. Añade las 3 variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Selecciona: Production, Preview y Development
5. **Save**
6. **Redeploy** el proyecto

---

## ✅ Verificar que Funciona

1. Ve al admin: `https://tu-sitio.vercel.app/admin`
2. Haz login
3. Ve a la sección **Imágenes**
4. Haz clic en **Subir imagen**
5. Selecciona una imagen
6. Deberías ver:
   - ✅ Mensaje: "Imagen subida correctamente"
   - 📎 URL de la imagen
   - 🖼️ La imagen aparece en la galería

---

## 📁 Estructura de URLs

Las imágenes subidas tendrán URLs como:

```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/blog-images/[TIMESTAMP]-[FILENAME]
```

Ejemplo:
```
https://abcdefgh.supabase.co/storage/v1/object/public/blog-images/1735567890123-logo.png
```

---

## 🎨 Funcionalidades Implementadas

✅ **Subir imágenes** (JPG, PNG, GIF, WEBP)  
✅ **Ver galería** de imágenes subidas  
✅ **Copiar URL** al portapapeles (para usar en artículos)  
✅ **Eliminar imágenes** (con confirmación)  
✅ **Validación** de tipo y tamaño (max 5MB)  
✅ **Nombres únicos** (timestamp + sanitización)  
✅ **Vista previa** con hover zoom  

---

## 🔒 Seguridad

### Configuración Actual (Desarrollo):
- ✅ Lectura pública (necesaria para mostrar imágenes)
- ⚠️ Subida/eliminación pública (temporal para desarrollo)

### Recomendaciones para Producción:
1. **Autenticación JWT** en las políticas
2. Cambiar políticas a `TO authenticated`
3. Implementar autenticación real en el admin (no solo localStorage)
4. Rate limiting en la API
5. Validación de imágenes en servidor (anti-malware)

---

## 📊 Límites del Plan Free

- 💾 **1GB** de almacenamiento
- 📤 **2GB** de transferencia/mes
- 📏 **50MB** tamaño máximo de archivo (limitado a 5MB en código)
- 🚀 **Upgrade** a Pro para más: https://supabase.com/pricing

---

## 🐛 Troubleshooting

### Error: "Failed to fetch"
- ✅ Verifica que el bucket `blog-images` existe
- ✅ Verifica que las políticas están activadas
- ✅ Verifica las variables de entorno

### Error: "Invalid bucket"
- ✅ Asegúrate de que el bucket se llama exactamente `blog-images`
- ✅ Verifica que es público

### Error: "Unauthorized"
- ✅ Verifica `SUPABASE_SERVICE_ROLE_KEY` en `.env.local`
- ✅ Verifica que la key es la correcta (service_role, no anon)

### Las imágenes no se ven
- ✅ Verifica que el bucket es público
- ✅ Verifica la política de lectura pública
- ✅ Abre la URL de la imagen directamente en el navegador

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel: **Deployments** > **Functions**
2. Revisa los logs en Supabase: **Logs** > **API**
3. Abre la consola del navegador (F12) para ver errores

---

## 🎉 ¡Listo!

Ahora puedes:
- 📤 Subir imágenes desde el admin
- 🖼️ Ver todas tus imágenes
- 📋 Copiar URLs para usar en artículos
- 🗑️ Eliminar imágenes que no necesites

