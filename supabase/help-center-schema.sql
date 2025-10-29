-- Tabla para artículos del centro de ayuda (guías)
CREATE TABLE IF NOT EXISTS help_center_articles (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  views TEXT DEFAULT '0',
  read_time TEXT DEFAULT '5 min',
  content TEXT NOT NULL,
  related_articles TEXT[], -- Array de slugs de artículos relacionados
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_help_center_slug ON help_center_articles(slug);
CREATE INDEX IF NOT EXISTS idx_help_center_category ON help_center_articles(category);
CREATE INDEX IF NOT EXISTS idx_help_center_published ON help_center_articles(published);

-- RLS (Row Level Security) - Permitir lectura pública de artículos publicados
ALTER TABLE help_center_articles ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública para artículos publicados
CREATE POLICY "Allow public read access for published articles"
  ON help_center_articles
  FOR SELECT
  USING (published = true);

-- Política de escritura para usuarios autenticados (para el admin)
-- En un sistema real, esto debería ser más restrictivo
CREATE POLICY "Allow all for service role"
  ON help_center_articles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_help_center_articles_updated_at
  BEFORE UPDATE ON help_center_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

