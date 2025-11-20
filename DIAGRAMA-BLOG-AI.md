# 📊 Diagrama del Sistema de Auto-Generación de Blog

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SISTEMA DE AUTO-BLOG AI                            │
└─────────────────────────────────────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                           FASE 1: AUTO-GENERACIÓN                          ┃
┃                         (n8n Workflow - Automático)                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    ⏰ TRIGGER: Cada día a las 9:00 AM y 4:00 PM
    │
    ├─➤ [1. Get Trending Topics]
    │   ├─ API: SerpAPI (Google Trends)
    │   ├─ Keywords: "IA empresas", "automatización", "chatbots"
    │   └─ Output: Lista de trending topics con scores
    │
    ├─➤ [2. Select Top 2 Topics]
    │   ├─ Prioriza por score (0-100)
    │   └─ Output: 2 temas más relevantes
    │
    ├─➤ [3. Assign Category]
    │   ├─ Categorías: IA & Negocios, Automatización, WhatsApp Business, etc.
    │   └─ Output: Tema + Categoría asignada
    │
    ├─➤ [4. Generate Article (GPT-4o)]
    │   ├─ Model: gpt-4o
    │   ├─ Input: Trending topic + Categoría
    │   ├─ Prompt: Sistema profesional con estructura SEO
    │   ├─ Output JSON:
    │   │   ├─ title
    │   │   ├─ slug
    │   │   ├─ excerpt
    │   │   ├─ content (Markdown, 1500-2000 palabras)
    │   │   ├─ meta_description
    │   │   ├─ meta_keywords[]
    │   │   ├─ tags[]
    │   │   ├─ image_prompt
    │   │   └─ readTime
    │   └─ Cost: ~$0.15 por artículo
    │
    ├─➤ [5. Generate Image (DALL-E 3)]
    │   ├─ Model: dall-e-3
    │   ├─ Size: 1792x1024 (HD)
    │   ├─ Style: Natural
    │   ├─ Input: image_prompt del artículo
    │   └─ Cost: ~$0.08 por imagen
    │
    ├─➤ [6. Download Image]
    │   └─ Descarga la imagen generada
    │
    ├─➤ [7. Upload to Supabase Storage]
    │   ├─ Bucket: blog-images
    │   ├─ Filename: {slug}.png
    │   └─ Public URL generada
    │
    ├─➤ [8. Save to Supabase DB]
    │   ├─ Table: ai_generated_articles
    │   ├─ Status: "review" (pendiente de aprobación)
    │   └─ Datos guardados:
    │       ├─ Contenido del artículo
    │       ├─ URL de imagen
    │       ├─ Métricas (SEO score, legibilidad, confianza IA)
    │       ├─ Trending info (topic, source, score)
    │       └─ Metadata técnica
    │
    ├─➤ [9. Log Trending Topic]
    │   ├─ Table: trending_topics_history
    │   └─ Registra el tema usado
    │
    └─➤ [10. Notify (opcional)]
        ├─ Slack notification
        └─ Email notification


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                          FASE 2: REVISIÓN MANUAL                           ┃
┃                         (Panel Admin - nexgent.io)                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    🖥️  ADMIN: /admin/blog/ai-review
    │
    ├─➤ [Dashboard]
    │   ├─ 📊 Stats:
    │   │   ├─ Pendientes: X
    │   │   ├─ Publicados: Y
    │   │   ├─ Programados: Z
    │   │   └─ Promedio SEO: 85
    │   │
    │   ├─ 🔍 Filtros:
    │   │   ├─ Por estado (all, review, scheduled, published)
    │   │   ├─ Búsqueda por título
    │   │   └─ Ordenar (fecha, SEO score, trending score)
    │   │
    │   └─ 📝 Lista de artículos:
    │       ├─ Imagen destacada
    │       ├─ Título + Excerpt
    │       ├─ Categoría
    │       ├─ Métricas (SEO: 85, Confianza: 90%, Trending: 75)
    │       ├─ Tags
    │       └─ Acciones: Ver | Editar | Programar | Publicar | Rechazar
    │
    ├─➤ [Vista Previa] (/admin/blog/ai-review/[id])
    │   ├─ Contenido completo (Markdown renderizado)
    │   ├─ Imagen featured
    │   ├─ Sidebar con métricas:
    │   │   ├─ SEO Score + barra de progreso
    │   │   ├─ Legibilidad + barra de progreso
    │   │   ├─ Confianza IA + barra de progreso
    │   │   ├─ Info técnica (modelo, tiempo generación, slug)
    │   │   ├─ Trending info (tema, fuente, score)
    │   │   └─ Prompt de imagen usado
    │   └─ Acciones: Editar | Publicar | Rechazar
    │
    └─➤ [Decisión del Admin]
        │
        ├─ ✅ PUBLICAR
        │   ├─ Status: review → published
        │   ├─ published_at: NOW()
        │   └─ Artículo visible en blog público
        │
        ├─ 📝 EDITAR
        │   ├─ Página de edición completa
        │   ├─ edited_manually: true
        │   └─ Guardar cambios
        │
        ├─ 📅 PROGRAMAR
        │   ├─ Status: review → scheduled
        │   ├─ scheduled_for: FECHA seleccionada
        │   └─ Auto-publica en la fecha
        │
        └─ ❌ RECHAZAR
            ├─ Status: review → rejected
            ├─ edit_notes: Motivo del rechazo
            └─ No se publica


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                           FASE 3: PUBLICACIÓN                              ┃
┃                        (Blog Público - nexgent.io)                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    🌐 Blog Público: /recursos/blog
    │
    ├─➤ Lista de artículos
    │   ├─ Mezcla: Artículos manuales + AI (status: published)
    │   ├─ Ordenados por fecha
    │   └─ Filtros por categoría
    │
    ├─➤ Artículo individual: /recursos/blog/articulos/[slug]
    │   ├─ Título
    │   ├─ Imagen featured (desde Supabase Storage)
    │   ├─ Meta tags SEO
    │   ├─ Contenido Markdown
    │   ├─ Tags
    │   └─ Call-to-action
    │
    └─➤ Analytics
        ├─ Views
        ├─ Time on page
        ├─ Engagement
        └─ Conversiones


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                          COMPONENTES TÉCNICOS                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌─────────────────────┐
│     SUPABASE        │
├─────────────────────┤
│ ai_generated_       │
│ articles            │ ──➤ Artículos generados
│                     │
│ trending_topics_    │
│ history             │ ──➤ Historial de topics
│                     │
│ blog_categories     │ ──➤ Categorías (8)
│                     │
│ Storage:            │
│ └─ blog-images/     │ ──➤ Imágenes DALL-E
└─────────────────────┘

┌─────────────────────┐
│     OPENAI API      │
├─────────────────────┤
│ GPT-4o              │ ──➤ Generación de texto
│ DALL-E 3            │ ──➤ Generación de imágenes
└─────────────────────┘

┌─────────────────────┐
│     SERPAPI         │
├─────────────────────┤
│ Google Trends       │ ──➤ Trending topics
└─────────────────────┘

┌─────────────────────┐
│        N8N          │
├─────────────────────┤
│ Workflow ejecutado  │
│ 2 veces al día      │ ──➤ Orquestación
│ (9 AM y 4 PM)       │
└─────────────────────┘

┌─────────────────────┐
│    NEXT.JS APP      │
├─────────────────────┤
│ /admin/blog/        │
│ ai-review           │ ──➤ Panel de revisión
│                     │
│ /api/admin/         │
│ ai-articles         │ ──➤ API endpoints
└─────────────────────┘


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                              FLUJO DE DATOS                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    Google Trends ──➤ SerpAPI ──➤ n8n ──➤ GPT-4o ──➤ DALL-E 3
                                      │
                                      ↓
                                  Supabase
                                      │
                                      ↓
                              Admin Panel (Review)
                                      │
                                      ↓
                            ✅ Aprobar / ❌ Rechazar
                                      │
                                      ↓
                                 Blog Público


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                          COSTOS Y RENDIMIENTO                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    📊 Producción Diaria:
    ├─ 2 artículos/día
    ├─ 60 artículos/mes
    └─ 730 artículos/año

    💰 Costos Mensuales:
    ├─ GPT-4o: $9.00 (60 artículos × $0.15)
    ├─ DALL-E 3: $4.80 (60 imágenes × $0.08)
    ├─ SerpAPI: $0 (plan gratis)
    ├─ Supabase: $0 (plan free)
    ├─ n8n: $0 (self-hosted)
    └─ TOTAL: $13.80/mes

    ⚡ Rendimiento:
    ├─ Tiempo por artículo: 2-3 minutos
    ├─ SEO Score promedio: 80-90/100
    ├─ Legibilidad promedio: 75-90/100
    ├─ Confianza IA promedio: 85-95%
    └─ Palabras por artículo: 1500-2000


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                              MÉTRICAS CLAVE                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    📈 Contenido:
    ├─ Artículos generados: Ilimitados
    ├─ Categorías: 8 predefinidas
    ├─ Tags por artículo: 3-5
    └─ Imágenes: HD (1792x1024)

    🎯 Calidad:
    ├─ SEO optimizado: ✅
    ├─ Trending topics: ✅
    ├─ Imágenes profesionales: ✅
    └─ Review manual: ✅

    🔧 Mantenimiento:
    ├─ Configuración inicial: 20 min
    ├─ Review diaria: 10 min
    └─ Ajustes mensuales: 30 min
```

---

## 🎯 Resumen Visual

```
[Google Trends] → [n8n] → [GPT-4o] → [DALL-E 3] → [Supabase]
                                                         ↓
                                                   [Admin Panel]
                                                         ↓
                                                 ✅ Aprobar / ❌ Rechazar
                                                         ↓
                                                   [Blog Público]
```

---

**💡 Todo automatizado. Solo revisas y apruebas. 2 artículos diarios por $13.80/mes.**

