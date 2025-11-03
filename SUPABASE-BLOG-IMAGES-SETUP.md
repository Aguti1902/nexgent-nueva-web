# 📸 Configuración de Supabase Storage para Imágenes de Blog

## 🎯 Problema que Resuelve

Las imágenes de blog necesitan un lugar donde almacenarse. Este setup crea un bucket público en Supabase Storage para alojar todas las imágenes.

---

## 🚀 PASOS DE CONFIGURACIÓN

### 1️⃣ **Abrir Supabase Dashboard**

Ve a: [https://supabase.com/dashboard](https://supabase.com/dashboard)

### 2️⃣ **Ir a Storage**

En el menú lateral izquierdo:
- Click en **"Storage"**
- Click en **"Create a new bucket"**

### 3️⃣ **Crear el Bucket**

Configuración:
- **Name**: `blog-images`
- **Public bucket**: ✅ **Activar** (muy importante)
- Click en **"Create bucket"**

### 4️⃣ **Configurar Políticas (Si es Necesario)**

Si el bucket no es público por defecto, ve a:
- Storage → blog-images → Policies
- Click en **"New Policy"**
- Selecciona **"For full customization"**

Luego ejecuta este SQL en el **SQL Editor**:

```sql
-- Abrir SQL Editor en Supabase Dashboard
-- Pegar y ejecutar este código:

-- Política para permitir subida pública
CREATE POLICY "Anyone can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

-- Política para permitir lectura pública
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Política para permitir actualización pública
CREATE POLICY "Anyone can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images');

-- Política para permitir eliminación pública
CREATE POLICY "Anyone can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images');
```

---

## ✅ VERIFICAR QUE FUNCIONA

### Desde Supabase Dashboard:

1. Ve a **Storage** → **blog-images**
2. Click en **"Upload file"**
3. Sube una imagen de prueba
4. Si se sube correctamente → ✅ **Todo listo!**

### Desde tu App:

1. Ve al admin de tu web
2. Intenta editar un artículo
3. Arrastra una imagen
4. Si ves "Subiendo imagen..." y luego se muestra → ✅ **Funciona!**

---

## 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO

Asegúrate de tener estas variables en `.env.local` y en **Vercel**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

Para obtener las keys:
1. Supabase Dashboard
2. Settings → API
3. Copia las keys

---

## 📋 ESTRUCTURA DEL BUCKET

```
blog-images/
├── 1699123456789-mi-imagen.jpg
├── 1699123457890-otra-imagen.png
└── 1699123458991-foto-articulo.webp
```

- Cada imagen tiene un timestamp único
- Nombres de archivo sanitizados
- Acceso público a todas las URLs

---

## 🌐 URLs DE LAS IMÁGENES

Las imágenes subidas tendrán URLs como:

```
https://tuproyecto.supabase.co/storage/v1/object/public/blog-images/1699123456789-mi-imagen.jpg
```

Estas URLs se guardan en la base de datos en el campo `image_url` de los artículos.

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Bucket no encontrado"
- ✅ Verifica que el bucket se llame exactamente `blog-images`
- ✅ Verifica que el bucket sea público

### ❌ Error: "No tienes permiso"
- ✅ Verifica que las políticas RLS estén configuradas
- ✅ Ejecuta el SQL de políticas de arriba

### ❌ Error: "Archivo muy grande"
- ✅ El límite es 20MB
- ✅ Comprime la imagen antes de subirla

### ❌ Error: "SUPABASE_SERVICE_ROLE_KEY no definida"
- ✅ Añade la variable en `.env.local`
- ✅ Añade la variable en Vercel Environment Variables
- ✅ Redeploy en Vercel

---

## ✨ ¡LISTO!

Una vez configurado, las imágenes se subirán automáticamente a Supabase Storage y el admin funcionará perfectamente.

**Límite actual**: 20MB por imagen
**Tipos soportados**: JPG, PNG, GIF, WEBP

