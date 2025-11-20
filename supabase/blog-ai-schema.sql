-- Tabla para artículos generados por IA
CREATE TABLE IF NOT EXISTS ai_generated_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Metadata del artículo
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Categorización
  category VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  
  -- Información de autor
  author VARCHAR(255) DEFAULT 'IA NexGent',
  
  -- SEO
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Imágenes
  featured_image_url TEXT,
  featured_image_prompt TEXT, -- Prompt usado para generar la imagen
  additional_images JSONB DEFAULT '[]',
  
  -- Estado de publicación
  status VARCHAR(20) DEFAULT 'draft', -- draft, review, published, scheduled, rejected
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  
  -- Trending topic source
  trending_topic TEXT,
  trending_source VARCHAR(100), -- twitter, google-trends, reddit, etc
  trending_score INTEGER,
  
  -- Métricas de calidad
  ai_confidence_score DECIMAL(3,2), -- 0.00 - 1.00
  readability_score INTEGER, -- 0-100
  seo_score INTEGER, -- 0-100
  
  -- Engagement
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  
  -- Información de generación
  model_used VARCHAR(50), -- gpt-4o, claude-3, etc
  generation_time_seconds INTEGER,
  generation_cost_usd DECIMAL(10,4),
  
  -- Review/Edit tracking
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMPTZ,
  edited_manually BOOLEAN DEFAULT false,
  edit_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_ai_articles_status ON ai_generated_articles(status);
CREATE INDEX IF NOT EXISTS idx_ai_articles_category ON ai_generated_articles(category);
CREATE INDEX IF NOT EXISTS idx_ai_articles_published_at ON ai_generated_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_articles_created_at ON ai_generated_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_articles_slug ON ai_generated_articles(slug);
CREATE INDEX IF NOT EXISTS idx_ai_articles_trending_score ON ai_generated_articles(trending_score DESC);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_articles_updated_at BEFORE UPDATE ON ai_generated_articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tabla para tracking de trending topics monitoreados
CREATE TABLE IF NOT EXISTS trending_topics_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  source VARCHAR(100) NOT NULL,
  score INTEGER,
  keywords TEXT[],
  related_topics TEXT[],
  article_generated BOOLEAN DEFAULT false,
  article_id UUID REFERENCES ai_generated_articles(id),
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trending_history_detected ON trending_topics_history(detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_trending_history_article_generated ON trending_topics_history(article_generated);

-- Tabla para categorías del blog
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- HEX color
  icon VARCHAR(50),
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar categorías predefinidas
INSERT INTO blog_categories (name, slug, description, color, icon) VALUES
('IA & Negocios', 'ia-negocios', 'Artículos sobre inteligencia artificial aplicada a empresas', '#3B82F6', '🤖'),
('Automatización', 'automatizacion', 'Guías y casos de éxito en automatización empresarial', '#10B981', '⚡'),
('WhatsApp Business', 'whatsapp-business', 'Todo sobre WhatsApp Business y chatbots', '#25D366', '💬'),
('Marketing Digital', 'marketing-digital', 'Estrategias de marketing con IA', '#F59E0B', '📊'),
('Atención al Cliente', 'atencion-cliente', 'Mejora la experiencia del cliente con IA', '#8B5CF6', '🎯'),
('Casos de Éxito', 'casos-exito', 'Historias reales de empresas que transformaron su negocio', '#EC4899', '🏆'),
('Tendencias Tech', 'tendencias-tech', 'Últimas tendencias en tecnología empresarial', '#6366F1', '🚀'),
('Productividad', 'productividad', 'Herramientas y técnicas para ser más productivo', '#14B8A6', '⏱️')
ON CONFLICT (slug) DO NOTHING;

-- Comentarios en tablas
COMMENT ON TABLE ai_generated_articles IS 'Artículos de blog generados automáticamente por IA';
COMMENT ON TABLE trending_topics_history IS 'Historial de trending topics monitoreados';
COMMENT ON TABLE blog_categories IS 'Categorías del blog';

COMMENT ON COLUMN ai_generated_articles.ai_confidence_score IS 'Confianza de la IA en la calidad del artículo (0-1)';
COMMENT ON COLUMN ai_generated_articles.readability_score IS 'Puntuación de legibilidad (Flesch Reading Ease)';
COMMENT ON COLUMN ai_generated_articles.seo_score IS 'Puntuación SEO basada en keywords, estructura, etc';

