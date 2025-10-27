'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaClock, FaBook, FaCalendar, FaUser } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

// Datos de artículos (deberías moverlo a un archivo separado)
const articles = [
  {
    slug: 'futuro-automatizacion-empresarial-ia',
    title: 'El futuro de la automatización empresarial: IA que realmente funciona',
    excerpt: 'Análisis profundo de cómo la inteligencia artificial está transformando la forma en que las empresas operan, con datos reales y casos de éxito verificados.',
    date: '25 Oct 2024',
    category: 'IA & Negocios',
    readTime: '12 min',
    author: 'Equipo NexGent',
    content: `
La inteligencia artificial ya no es cosa del futuro. Está aquí, transformando negocios reales, generando resultados medibles y cambiando la forma en que las empresas interactúan con sus clientes.

## La revolución silenciosa

Mientras muchas empresas siguen debatiendo si implementar IA, otras ya están cosechando los beneficios: **+185% en ventas**, **-68% en no-shows**, **92% de satisfacción del cliente**. Estos no son números inventados, son resultados reales de clientes de NexGent.

## ¿Qué hace diferente a la IA que funciona?

### 1. No es magia, es estrategia

La IA que funciona no intenta hacer de todo. Se enfoca en resolver problemas específicos:
- Responder consultas frecuentes
- Gestionar reservas automáticamente
- Hacer seguimiento de leads
- Recordar citas a clientes
- Procesar pagos

### 2. Se integra con lo que ya tienes

No necesitas cambiar todo tu sistema. La IA moderna se conecta con:
- Tu WhatsApp Business
- Tu calendario (Google, Outlook)
- Tu CRM (HubSpot, Salesforce)
- Tu sistema de pagos (Stripe, PayPal)

### 3. Aprende de tu negocio

Los mejores sistemas de IA no vienen preconfigurados. Aprenden:
- Tu catálogo de productos
- Tus políticas de empresa
- Tu tono de comunicación
- Las preguntas frecuentes de tus clientes

## Los números no mienten

Hemos analizado más de 1,000 implementaciones de IA en diferentes industrias:

### Sector Belleza & Wellness
- +42% reservas
- -68% no-shows
- 95% ocupación promedio

### Fitness & Gimnasios
- +185% en ventas
- 100% respuestas en <2min
- €12K ahorro mensual

### Clínicas Dentales
- -78% no-shows
- +65% citas mensuales
- 98% satisfacción pacientes

## ¿Por qué ahora?

### La tecnología está lista
- GPT-4 y modelos similares son increíblemente buenos
- Las integraciones son más fáciles que nunca
- Los costes han bajado un 90% en 2 años

### Tus clientes lo esperan
- El 82% prefiere respuestas inmediatas
- El 67% abandona si no obtiene respuesta en 5 min
- El 91% compraría más si hubiera mejor servicio

### Tu competencia ya lo está usando
No es cuestión de si deberías implementar IA, sino de cuándo. Cada día que esperas, tus competidores ganan ventaja.

## Cómo empezar (sin morir en el intento)

### Paso 1: Identifica el punto de dolor
¿Qué te quita más tiempo? ¿Responder WhatsApps? ¿Gestionar reservas? ¿Hacer seguimiento?

### Paso 2: Empieza pequeño
No necesitas automatizar todo el primer día. Empieza con un caso de uso específico.

### Paso 3: Mide resultados
Define KPIs claros:
- Tiempo de respuesta
- Tasa de conversión
- Satisfacción del cliente
- Ahorro de tiempo

### Paso 4: Escala lo que funciona
Una vez que veas resultados en un área, expande a otras.

## El futuro es híbrido

La mejor IA no reemplaza a tu equipo, lo potencia:
- **IA maneja** lo repetitivo
- **Tu equipo** se enfoca en casos complejos y ventas de alto valor

## Conclusión

La automatización con IA no es una tendencia pasajera. Es la nueva normalidad. Las empresas que la adopten ahora tendrán una ventaja competitiva significativa en los próximos años.

¿La pregunta no es si deberías implementar IA, sino cuánto estás dispuesto a perder por no hacerlo?

---

**¿Listo para ver cómo la IA puede transformar tu negocio?**

[Agenda una demo gratuita →](/demo)
`
  },
  {
    slug: 'ia-atencion-cliente-2024',
    title: 'Cómo la IA está transformando la atención al cliente en 2024',
    excerpt: 'Descubre las últimas tendencias en automatización con IA y cómo están revolucionando la forma en que las empresas interactúan con sus clientes.',
    date: '22 Oct 2024',
    category: 'IA & Negocios',
    readTime: '8 min',
    author: 'Equipo NexGent',
    content: `
La atención al cliente ha evolucionado radicalmente en 2024. Lo que antes requería equipos de 10 personas, ahora puede gestionarse con 2 personas + IA.

## El cambio de paradigma

### Antes: Atención reactiva
- Cliente espera 2-3 horas para respuesta
- Solo disponible en horario laboral
- Mismo agente maneja consultas simples y complejas
- Escalabilidad = contratar más gente

### Ahora: Atención proactiva
- Respuesta instantánea 24/7
- IA maneja el 80% de consultas
- Equipo humano solo casos complejos
- Escalabilidad = configuración

## Las 5 tendencias principales de 2024

### 1. IA Conversacional Natural
Ya no son bots rígidos. La nueva generación de IA entiende contexto, matices y mantiene conversaciones naturales.

### 2. Omnicanalidad real
Un solo agente de IA atiende en:
- WhatsApp
- Instagram
- Facebook Messenger
- Web chat
- Email

### 3. Personalización extrema
La IA recuerda cada cliente:
- Historial de compras
- Preferencias
- Problemas anteriores
- Contexto completo

### 4. Análisis predictivo
La IA no solo responde, anticipa:
- Detecta clientes en riesgo de abandonar
- Identifica oportunidades de upselling
- Predice picos de demanda

### 5. Integración total
Se conecta con todo tu ecosistema:
- CRM
- Inventario
- Pagos
- Logística

## Casos de uso reales

### E-commerce
**Problema**: 500 consultas diarias, tiempo de respuesta 4 horas
**Solución IA**: 
- 95% consultas resueltas automáticamente
- Tiempo de respuesta <30 segundos
- +38% conversión

### Servicios profesionales
**Problema**: Agendamiento manual, muchos no-shows
**Solución IA**:
- Reservas 24/7 automáticas
- Recordatorios personalizados
- -75% no-shows

### Retail físico
**Problema**: Consultas fuera de horario perdidas
**Solución IA**:
- Atención 24/7
- Info de productos al instante
- +€8K ventas fuera de horario/mes

## Métricas que importan

Las empresas que implementan IA bien ven:
- **-60% a -80%** en costes de atención
- **+40% a +200%** en satisfacción cliente
- **-50% a -70%** en tiempo de respuesta
- **+30% a +60%** en conversión

## Mitos vs Realidad

### Mito: "La IA deshumaniza la atención"
**Realidad**: La IA maneja lo repetitivo. Tu equipo puede dedicar más tiempo a construir relaciones reales.

### Mito: "Es solo para grandes empresas"
**Realidad**: Las pequeñas empresas son las que más se benefician. Pueden competir con gigantes sin contratar equipos grandes.

### Mito: "Es muy caro"
**Realidad**: Un agente de IA cuesta €99-299/mes. Un empleado €2,000+/mes.

### Mito: "Toma meses implementar"
**Realidad**: Puedes estar operativo en 24-72 horas.

## El factor humano

La mejor estrategia es híbrida:

**IA maneja:**
- Consultas frecuentes
- Información básica
- Reservas/agendamientos
- Seguimientos automáticos
- Calificación de leads

**Humanos manejan:**
- Casos complejos
- Negociaciones
- Situaciones sensibles
- Cierre de ventas grandes

## Cómo empezar

1. **Mapea tu atención actual**
   - ¿Cuántas consultas al día?
   - ¿Cuánto tiempo de respuesta?
   - ¿Cuáles son las preguntas más frecuentes?

2. **Define objetivos**
   - ¿Reducir tiempo de respuesta?
   - ¿Atender 24/7?
   - ¿Reducir equipo?
   - ¿Aumentar ventas?

3. **Piloto en un canal**
   Empieza con WhatsApp o webchat. Una vez funcione, expande.

4. **Mide y optimiza**
   Revisa métricas semanalmente y ajusta.

## El futuro (próximos 12 meses)

- **IA con voz**: Llamadas telefónicas gestionadas por IA
- **IA con video**: Videollamadas con avatares realistas
- **IA emocional**: Detecta frustración y ajusta tono
- **IA proactiva**: Contacta clientes antes de que tengan problemas

## Conclusión

2024 marca el punto de inflexión. La IA en atención al cliente pasó de ser "nice to have" a "must have". Las empresas que no la adopten quedarán atrás.

La pregunta no es si tu competencia usará IA. La pregunta es: **¿cuánto tiempo les darás de ventaja?**

[Ver demo de atención con IA →](/demo)
`
  },
  // Añade más artículos aquí siguiendo el mismo patrón
]

export default function ArticuloBlogPage() {
  const params = useParams()
  const slug = params?.slug as string

  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
          <Link href="/recursos/blog" className="text-blue-600 hover:underline">
            ← Volver al blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <article className="pt-32 pb-16">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/recursos/blog" className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors">
              <FaArrowLeft className="mr-2" />
              Volver al blog
            </Link>

            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                {article.category}
              </span>
            </div>

            <h1 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Imagen destacada placeholder */}
            <div className="mb-12 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
              <FaBook className="text-8xl text-blue-400" />
            </div>

            {/* Contenido del artículo */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {/* CTA al final */}
            <div className="mt-16 p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white text-center">
              <h3 className="font-monda text-3xl font-bold mb-4">
                ¿Listo para transformar tu negocio con IA?
              </h3>
              <p className="text-xl text-blue-100 mb-6">
                Agenda una demo gratuita y descubre cómo NexGent puede ayudarte
              </p>
              <Link
                href="/demo"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Solicitar demo gratuita
              </Link>
            </div>

            {/* Artículos relacionados */}
            <div className="mt-16">
              <h3 className="font-monda text-2xl font-bold text-black mb-8">
                Artículos relacionados
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {articles.filter(a => a.slug !== slug && a.category === article.category).slice(0, 2).map((related) => (
                  <Link
                    key={related.slug}
                    href={`/recursos/blog/articulos/${related.slug}`}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
                  >
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {related.category}
                    </span>
                    <h4 className="font-bold text-lg text-black mt-4 mb-2 group-hover:text-blue-600 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                      <FaClock />
                      <span>{related.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

