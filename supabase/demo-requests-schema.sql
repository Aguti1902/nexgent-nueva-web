-- Tabla para solicitudes de demo
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Información personal (Paso 1)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Información de la empresa (Paso 2)
  company TEXT NOT NULL,
  industry TEXT NOT NULL,
  employees TEXT NOT NULL,
  
  -- Necesidades (Paso 3)
  agent_types TEXT[] NOT NULL, -- Array de tipos de agentes seleccionados
  objectives TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_company ON demo_requests(company);

-- RLS (Row Level Security) - Acceso público para insertar
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede insertar
CREATE POLICY "Anyone can insert demo requests" ON demo_requests
  FOR INSERT
  WITH CHECK (true);

-- Política: Solo lectura para usuarios autenticados (opcional, para el admin)
CREATE POLICY "Authenticated users can read demo requests" ON demo_requests
  FOR SELECT
  USING (true);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_demo_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_demo_requests_updated_at
  BEFORE UPDATE ON demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_demo_requests_updated_at();
