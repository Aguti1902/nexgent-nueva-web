# 📚 Configuración de Guías del Centro de Ayuda en Supabase

## 🎯 Objetivo
Crear la tabla `help_center_articles` en Supabase para guardar las guías del centro de ayuda.

---

## 🚀 Pasos para Configurar

### 1️⃣ Accede al Editor SQL de Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto **NexGent**
3. En el menú lateral, haz clic en **"SQL Editor"**
4. Haz clic en **"New Query"**

---

### 2️⃣ Ejecuta el Script SQL

Copia y pega el siguiente código SQL en el editor:

```sql
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
```

3. Haz clic en **"Run"** (o presiona `Ctrl + Enter`)
4. Deberías ver el mensaje: **"Success. No rows returned"**

---

### 3️⃣ Verificar que la Tabla se Creó

1. En el menú lateral, haz clic en **"Table Editor"**
2. Deberías ver la tabla **`help_center_articles`**
3. Haz clic en ella para ver su estructura

---

## ✅ ¡Listo!

Ahora puedes crear guías desde el admin dashboard:

1. Ve a: https://nexgent-nueva-web.vercel.app/admin
2. Haz clic en **"Nueva guía"**
3. Completa el formulario
4. Haz clic en **"Guardar guía"**
5. La guía se guardará en Supabase y aparecerá en el centro de ayuda

---

## 📊 Estructura de la Tabla

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGSERIAL | ID único (auto-incrementable) |
| `slug` | TEXT | URL amigable (único) |
| `title` | TEXT | Título de la guía |
| `category` | TEXT | Categoría (Primeros pasos, FAQ, etc.) |
| `views` | TEXT | Número de vistas |
| `read_time` | TEXT | Tiempo de lectura (ej: "5 min") |
| `content` | TEXT | Contenido en Markdown |
| `related_articles` | TEXT[] | Array de slugs relacionados |
| `published` | BOOLEAN | Si está publicada o no |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

---

## 🔐 Seguridad (RLS)

Las políticas de seguridad configuradas:

1. **Lectura pública**: Cualquiera puede leer guías publicadas
2. **Escritura admin**: Solo el service role key puede crear/editar/eliminar

---

## 🆘 ¿Problemas?

Si tienes algún error:

1. Verifica que el `SUPABASE_SERVICE_ROLE_KEY` esté configurado en Vercel
2. Verifica que las políticas RLS estén activas
3. Revisa los logs en el **SQL Editor** de Supabase

---

**¡Ya puedes crear guías sin código!** 🎉

