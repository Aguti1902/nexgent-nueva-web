# 📧 CREAR TABLA DE NEWSLETTER EN SUPABASE

## ⚠️ IMPORTANTE: Ejecuta esto AHORA para que funcione el formulario

### 📋 Pasos (2 minutos):

---

## **PASO 1: Abrir Supabase**

1. Ve a: **https://app.supabase.com**
2. Selecciona tu proyecto **NexGent**
3. En el menú izquierdo, click en **"SQL Editor"**

---

## **PASO 2: Copiar y pegar este código SQL**

```sql
-- Crear tabla de suscriptores
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'blog',
  unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar seguridad
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Permitir que cualquiera se suscriba
CREATE POLICY "Anyone can subscribe to newsletter." 
ON public.newsletter_subscribers
FOR INSERT WITH CHECK (TRUE);

-- Permitir lectura pública (para desuscribirse)
CREATE POLICY "Public can read for unsubscribe." 
ON public.newsletter_subscribers
FOR SELECT USING (TRUE);

-- Permitir desuscribirse
CREATE POLICY "Anyone can unsubscribe." 
ON public.newsletter_subscribers
FOR UPDATE USING (TRUE);

-- Crear índices para búsquedas rápidas
CREATE INDEX newsletter_subscribers_email_idx 
ON public.newsletter_subscribers(email);

CREATE INDEX newsletter_subscribers_active_idx 
ON public.newsletter_subscribers(is_active);

-- Función para actualizar fecha de modificación
CREATE OR REPLACE FUNCTION public.update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger automático
CREATE TRIGGER update_newsletter_subscribers_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW 
EXECUTE FUNCTION public.update_newsletter_updated_at();
```

---

## **PASO 3: Ejecutar**

1. Pega todo el código en el editor SQL
2. Click en el botón **"Run"** (esquina inferior derecha)
3. O presiona: **Ctrl + Enter** (Windows) o **Cmd + Enter** (Mac)

---

## **PASO 4: Verificar**

1. Ve a **"Table Editor"** (menú izquierdo)
2. Deberías ver la tabla **"newsletter_subscribers"**
3. Click en ella para ver los campos:
   - ✅ `id`
   - ✅ `email`
   - ✅ `subscribed_at`
   - ✅ `is_active`
   - ✅ `source`
   - ✅ `unsubscribe_token`
   - ✅ `updated_at`

---

## ✅ **¡LISTO!**

Ahora el formulario de newsletter en tu web funcionará correctamente.

---

## 🧪 **PROBAR EL FORMULARIO:**

1. Ve a tu web: **nexgent-nueva-web.vercel.app/recursos/blog**
2. Scroll hasta la sección azul "Recibe insights semanales"
3. Introduce un email de prueba: `test@example.com`
4. Click en **"Suscribirme gratis"**
5. Deberías ver: ✅ **"¡Suscripción exitosa!"**
6. Ve a Supabase → **Table Editor** → **newsletter_subscribers**
7. Deberías ver tu email guardado

---

## 📊 **VER SUSCRIPTORES:**

### Opción 1: Tabla en Supabase
- Ve a **Table Editor**
- Click en `newsletter_subscribers`
- Verás todos los emails

### Opción 2: SQL Query
```sql
-- Ver todos los suscriptores activos
SELECT email, subscribed_at 
FROM newsletter_subscribers 
WHERE is_active = true 
ORDER BY subscribed_at DESC;

-- Contar suscriptores
SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true;

-- Suscriptores de hoy
SELECT * FROM newsletter_subscribers 
WHERE DATE(subscribed_at) = CURRENT_DATE;
```

---

## 🐛 **SI ALGO SALE MAL:**

### Error: "relation already exists"
- La tabla ya existe
- Ve a **Table Editor** y verifica que esté ahí
- Si está vacía o corrupta:
  1. Elimínala: `DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;`
  2. Vuelve a ejecutar el código completo

### Error: "permission denied"
- Verifica que estás usando el proyecto correcto
- Intenta ejecutar solo la primera parte (CREATE TABLE)

### No se guardan los emails
- Verifica las políticas RLS:
  ```sql
  SELECT * FROM pg_policies 
  WHERE tablename = 'newsletter_subscribers';
  ```
- Deberías ver 3 políticas

---

## 🎯 **RESULTADO FINAL:**

✅ Formulario funcional en `/recursos/blog`  
✅ Emails guardados en Supabase  
✅ Validación automática de duplicados  
✅ Mensajes de éxito/error visuales  
✅ Sistema listo para escalar  

---

**¡Ejecuta el SQL ahora y en 2 minutos estará funcionando!** 🚀

