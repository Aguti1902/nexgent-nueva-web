-- ========================================
-- CONFIGURACIÓN DE SUPABASE STORAGE
-- Para Biblioteca de Imágenes del Admin
-- ========================================

-- NOTA: Los buckets se crean desde el Dashboard de Supabase
-- Ve a Storage > New Bucket y crea 'blog-images' con estas configuraciones:
-- 
-- Bucket name: blog-images
-- Public bucket: YES (para que las URLs sean públicas)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/jpg, image/png, image/gif, image/webp

-- ========================================
-- POLÍTICAS DE ACCESO (RLS)
-- ========================================

-- 1. Permitir a cualquiera VER las imágenes (lectura pública)
CREATE POLICY "Public Access for Images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- 2. Permitir SUBIR imágenes (autenticados o usando service role key)
-- En producción, considera autenticación más robusta
CREATE POLICY "Allow Upload for Images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'blog-images');

-- 3. Permitir ACTUALIZAR imágenes
CREATE POLICY "Allow Update for Images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'blog-images');

-- 4. Permitir ELIMINAR imágenes
CREATE POLICY "Allow Delete for Images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'blog-images');

-- ========================================
-- NOTAS IMPORTANTES
-- ========================================

-- 1. Para mayor seguridad en producción, deberías:
--    - Cambiar "TO public" por "TO authenticated"
--    - Implementar autenticación en el admin
--    - Usar Row Level Security (RLS) más estricto

-- 2. Las URLs públicas tendrán el formato:
--    https://[PROJECT_ID].supabase.co/storage/v1/object/public/blog-images/[FILENAME]

-- 3. Límites de Supabase (Plan Free):
--    - 1GB de almacenamiento
--    - 2GB de transferencia/mes
--    - 50MB tamaño máximo de archivo (pero limitamos a 5MB en el código)

-- 4. Para ejecutar estas políticas:
--    - Ve a Supabase Dashboard > Storage > Policies
--    - O ejecuta estos comandos en SQL Editor

