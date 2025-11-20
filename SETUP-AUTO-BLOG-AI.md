# 🤖 Setup Completo: Sistema de Auto-Generación de Blog con IA

## 📋 Resumen del Sistema

Este sistema genera automáticamente **2 artículos diarios** sobre IA y automatización empresarial:
- ✅ Detecta trending topics de Google Trends
- ✅ Genera artículos con GPT-4o
- ✅ Crea imágenes con DALL-E 3
- ✅ Los guarda en Supabase para revisión
- ✅ Panel de admin para aprobar/editar/publicar

---

## 🚀 Paso 1: Configurar Base de Datos en Supabase

### 1.1 Ejecutar SQL Schema

Ve a: https://supabase.com/dashboard/project/nvfouagvncxbcgytgtfy/sql/new

Copia y ejecuta el contenido de: `supabase/blog-ai-schema.sql`

Esto creará:
- ✅ Tabla `ai_generated_articles` (artículos generados por IA)
- ✅ Tabla `trending_topics_history` (historial de trending topics)
- ✅ Tabla `blog_categories` (categorías con 8 pre-definidas)
- ✅ Índices para rendimiento
- ✅ Triggers para actualizar timestamps

### 1.2 Crear Storage Bucket para Imágenes

1. Ve a: **Storage** → **Create a new bucket**
2. Nombre: `blog-images`
3. **Public bucket**: ✅ SÍ (para que las imágenes sean accesibles públicamente)
4. Configuración de acceso:

```sql
-- Ejecuta esto en el SQL Editor para permitir acceso público
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
```

---

## 🔧 Paso 2: Configurar n8n Workflow

### 2.1 Importar Workflow a n8n

1. Ve a tu n8n: https://app.nexgent.io
2. Click en **"Import from File"**
3. Sube el archivo: `n8n-workflows/auto-blog-generator.json`

### 2.2 Configurar Credenciales en n8n

El workflow necesita 4 credenciales:

#### A) **OpenAI API** (para GPT-4o y DALL-E 3)
- Ve a: https://platform.openai.com/api-keys
- Crea una API Key nueva
- En n8n: **Credentials** → **Add** → **OpenAI**
- Pega tu API Key

#### B) **Supabase API** (para guardar artículos)
- URL: `https://nvfouagvncxbcgytgtfy.supabase.co`
- Service Role Key: Ve a **Settings** → **API** → `service_role` (secret)
- En n8n: **Credentials** → **Add** → **Supabase**
- Pega URL y Service Key

#### C) **SerpAPI** (para Google Trends) - **OPCIONAL**
- Ve a: https://serpapi.com/users/sign_up (tiene plan gratis 100 búsquedas/mes)
- Copia tu API Key
- En n8n: **Credentials** → **Add** → **HTTP Request Query Auth**
- Nombre: `apiKey`
- Valor: Tu API Key de SerpAPI

**Nota:** Si no quieres usar SerpAPI, el workflow tiene topics por defecto y funcionará igual.

#### D) **Slack** (notificaciones) - **OPCIONAL**
- Solo si quieres recibir notificaciones en Slack cuando se genere un artículo
- Puedes desconectar este nodo sin problema

### 2.3 Activar Workflow

1. Asigna todas las credenciales a los nodos correspondientes
2. Click en **"Activate"** (toggle arriba a la derecha)
3. El workflow se ejecutará automáticamente a las **9:00 AM** y **4:00 PM** cada día

### 2.4 Probar Manualmente

1. Click en **"Execute Workflow"** (botón de play)
2. Espera 2-3 minutos (genera artículo + imagen)
3. Ve a tu Supabase → Tabla `ai_generated_articles` → Deberías ver un artículo nuevo

---

## 💻 Paso 3: Configurar Panel de Admin

### 3.1 Instalar Dependencias Faltantes

```bash
cd /Users/guti/Desktop/CURSOR\ WEBS/NEXGENT
npm install react-markdown
```

### 3.2 Variables de Entorno

Verifica que tu `.env.local` tenga:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://nvfouagvncxbcgytgtfy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# OpenAI (para el frontend si lo necesitas)
OPENAI_API_KEY=tu_openai_key
```

### 3.3 Acceder al Panel de Admin

1. Inicia el servidor: `npm run dev`
2. Ve a: http://localhost:3000/admin/blog/ai-review

**Funcionalidades del panel:**
- ✅ Ver todos los artículos generados por IA
- ✅ Filtrar por estado (draft, review, published, scheduled)
- ✅ Buscar artículos
- ✅ Ver métricas de calidad (SEO, legibilidad, confianza IA)
- ✅ Vista previa completa de artículos
- ✅ Editar artículos
- ✅ Aprobar/Rechazar artículos
- ✅ Programar publicación

---

## 📊 Paso 4: Entender el Flujo Completo

### 4.1 Proceso Automático Diario

```mermaid
9:00 AM y 4:00 PM
    ↓
[Get Trending Topics] → Google Trends API
    ↓
[Select Top 2 Topics] → Priorizar por score
    ↓
[Assign Category] → IA & Negocios, Automatización, etc.
    ↓
[Generate Article] → GPT-4o crea artículo completo
    ↓
[Generate Image] → DALL-E 3 crea imagen HD
    ↓
[Upload to Supabase Storage] → Guarda imagen
    ↓
[Save to DB] → Status: "review"
    ↓
[Notify Admin] → (opcional) Slack notification
```

### 4.2 Proceso de Revisión Manual

1. **Admin recibe notificación** (o revisa el panel diariamente)
2. **Ve el artículo** en `/admin/blog/ai-review`
3. **Revisa calidad:**
   - SEO Score (target: >80)
   - Legibilidad (target: >75)
   - Confianza IA (target: >85%)
4. **Decide:**
   - ✅ **Publicar:** Se publica inmediatamente en el blog
   - 📝 **Editar:** Modifica el contenido antes de publicar
   - 📅 **Programar:** Selecciona fecha/hora de publicación
   - ❌ **Rechazar:** Descarta el artículo (con motivo)

---

## 🎨 Paso 5: Personalizar el Sistema

### 5.1 Cambiar Horarios de Generación

Edita el nodo **"Schedule"** en n8n:

```json
"interval": [
  { "triggerAtHour": 9 },  // Cambia esto
  { "triggerAtHour": 16 }  // Y esto
]
```

### 5.2 Cambiar Temas de Búsqueda

Edita el nodo **"Get Trending Topics"** en n8n:

```json
"q": "inteligencia artificial empresas,automatización negocios,chatbots empresariales,IA atención cliente"
// Añade más términos separados por comas
```

### 5.3 Modificar Prompt del Artículo

Edita el nodo **"Generate Article (GPT-4o)"** en n8n:

```javascript
// Cambia el system message para ajustar:
- Tono del artículo
- Longitud
- Estructura
- Estilo de escritura
```

### 5.4 Cambiar Estilo de Imágenes

Edita el prompt que genera la IA en el system message:

```javascript
"image_prompt": "Prompt detallado para generar imagen con DALL-E"
// El GPT ya genera buenos prompts, pero puedes ajustar el system message
// para especificar estilos: "fotorealista", "minimalista", "futurista", etc.
```

### 5.5 Añadir Nuevas Categorías

Ejecuta en Supabase SQL:

```sql
INSERT INTO blog_categories (name, slug, description, color, icon) VALUES
('Nueva Categoría', 'nueva-categoria', 'Descripción', '#FF5733', '🎯');
```

Luego actualiza el nodo **"Assign Category"** en n8n para incluir la nueva categoría.

---

## 📈 Paso 6: Métricas y Monitoreo

### 6.1 Revisar Ejecuciones en n8n

1. Ve a: **Executions** en n8n
2. Verás el historial de todas las ejecuciones
3. Si alguna falla, verás el error exacto

### 6.2 Consultas SQL Útiles

**Ver artículos generados hoy:**
```sql
SELECT * FROM ai_generated_articles 
WHERE created_at >= CURRENT_DATE 
ORDER BY created_at DESC;
```

**Ver trending topics más usados:**
```sql
SELECT topic, COUNT(*) as times_used 
FROM trending_topics_history 
WHERE article_generated = true 
GROUP BY topic 
ORDER BY times_used DESC 
LIMIT 10;
```

**Promedio de métricas:**
```sql
SELECT 
  AVG(seo_score) as avg_seo,
  AVG(readability_score) as avg_readability,
  AVG(ai_confidence_score) as avg_confidence
FROM ai_generated_articles
WHERE status = 'published';
```

---

## 💰 Costos Estimados

### OpenAI API:
- **GPT-4o:** ~$0.15 por artículo (2000 palabras)
- **DALL-E 3 HD:** ~$0.08 por imagen
- **Total por artículo:** ~$0.23
- **2 artículos/día × 30 días:** ~$13.80/mes

### SerpAPI (opcional):
- **Plan Gratis:** 100 búsquedas/mes (suficiente para 50 días)
- **Plan Paid:** $50/mes (5000 búsquedas)

### Supabase:
- **Plan Free:** Suficiente para empezar
- **Storage:** Imágenes ~2MB cada una = 60MB/mes (plan free: 1GB)

### n8n:
- **Self-hosted:** Gratis ✅ (ya lo tienes)

**Costo total mensual:** ~$13.80 (solo OpenAI)

---

## 🐛 Troubleshooting

### Problema: "El workflow no genera artículos"

**Solución:**
1. Ve a n8n → Executions → Revisa el último error
2. Común: Credenciales mal configuradas
3. Verifica que todas las API keys sean válidas

### Problema: "Las imágenes no se suben a Supabase"

**Solución:**
1. Verifica que el bucket `blog-images` sea público
2. Ejecuta las policies de acceso (Paso 1.2)
3. Verifica la URL del storage en el nodo

### Problema: "Los artículos no aparecen en el admin"

**Solución:**
1. Verifica que la tabla `ai_generated_articles` exista
2. Revisa las variables de entorno (SUPABASE_SERVICE_ROLE_KEY)
3. Mira la consola del navegador para errores

### Problema: "Errores de OpenAI"

**Solución:**
1. Verifica tu API key: https://platform.openai.com/api-keys
2. Verifica que tengas créditos disponibles
3. Si es error 429: Estás excediendo el rate limit (espera 1 minuto)

---

## ✅ Checklist Final

Antes de poner en producción:

- [ ] Schema SQL ejecutado en Supabase
- [ ] Bucket `blog-images` creado y público
- [ ] Workflow importado en n8n
- [ ] 4 credenciales configuradas en n8n
- [ ] Workflow activado (toggle ON)
- [ ] Test manual ejecutado exitosamente
- [ ] Panel de admin accesible
- [ ] Dependencia `react-markdown` instalada
- [ ] Variables de entorno configuradas
- [ ] Probado aprobar/rechazar artículos

---

## 🎯 Próximos Pasos Sugeridos

1. **Integrar con el blog público:**
   - Crear endpoint `/api/blog/articles` que mezcle artículos manuales + AI
   - Actualizar la página `/recursos/blog` para mostrar ambos

2. **Automatizar publicación:**
   - Workflow adicional que publique artículos `scheduled` cuando llegue la fecha

3. **Sistema de revisión colaborativa:**
   - Tabla de comentarios para que el equipo revise artículos antes de publicar

4. **Analytics:**
   - Trackear views, likes, shares de artículos AI vs manuales
   - Comparar engagement

5. **Versiones A/B:**
   - Generar 2 versiones del mismo artículo
   - Publicar la que tenga mejor SEO score

---

## 📞 Soporte

Si algo no funciona:
1. Revisa los logs de n8n (Executions)
2. Revisa la consola del navegador
3. Verifica variables de entorno
4. Mensaje al equipo con el error exacto

---

**¡Todo listo!** 🚀 El sistema generará automáticamente 2 artículos diarios. Solo debes revisarlos y aprobarlos en el panel de admin.

