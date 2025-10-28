-- Tabla para artículos del blog
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Equipo NexGent',
  date TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '5 min',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(published);
CREATE INDEX IF NOT EXISTS idx_blog_articles_created_at ON blog_articles(created_at DESC);

-- Función para actualizar el timestamp automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_blog_articles_updated_at
    BEFORE UPDATE ON blog_articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Crear bucket para imágenes del blog
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política de almacenamiento: Cualquiera puede leer
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Política de almacenamiento: Solo autenticados pueden subir
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Política de almacenamiento: Solo autenticados pueden eliminar sus imágenes
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Row Level Security (RLS) para blog_articles
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer artículos publicados
CREATE POLICY "Anyone can read published blog articles"
ON blog_articles FOR SELECT
USING (published = true);

-- Política: Usuarios autenticados pueden leer todos los artículos
CREATE POLICY "Authenticated users can read all blog articles"
ON blog_articles FOR SELECT
USING (auth.role() = 'authenticated');

-- Política: Usuarios autenticados pueden insertar artículos
CREATE POLICY "Authenticated users can create blog articles"
ON blog_articles FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Política: Usuarios autenticados pueden actualizar artículos
CREATE POLICY "Authenticated users can update blog articles"
ON blog_articles FOR UPDATE
USING (auth.role() = 'authenticated');

-- Política: Usuarios autenticados pueden eliminar artículos
CREATE POLICY "Authenticated users can delete blog articles"
ON blog_articles FOR DELETE
USING (auth.role() = 'authenticated');

-- Crear un usuario admin inicial (Opcional)
-- Descomenta y modifica si quieres crear un usuario admin directamente
-- INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES (
--   'admin@nexgent.io',
--   crypt('tu_contraseña_aqui', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW()
-- );

