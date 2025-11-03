-- EJECUTA ESTO PRIMERO para limpiar cualquier configuración anterior

-- Eliminar trigger si existe
DROP TRIGGER IF EXISTS update_demo_requests_updated_at ON demo_requests;

-- Eliminar función si existe
DROP FUNCTION IF EXISTS update_demo_requests_updated_at();

-- Eliminar políticas si existen
DROP POLICY IF EXISTS "Anyone can insert demo requests" ON demo_requests;
DROP POLICY IF EXISTS "Authenticated users can read demo requests" ON demo_requests;

-- Eliminar tabla si existe (CUIDADO: esto borra todos los datos)
DROP TABLE IF EXISTS demo_requests;

