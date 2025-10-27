import { FaBook, FaClock, FaArrowRight, FaCheckCircle, FaRocket, FaUsers, FaBrain, FaChartLine } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Blog de IA para Negocios | NexGent',
  description: 'Artículos, noticias, guías y casos de éxito sobre inteligencia artificial para negocios. Aprende cómo la IA está transformando empresas.',
}

export default function BlogPage() {
  const featuredArticle = {
    title: 'El futuro de la automatización empresarial: IA que realmente funciona',
    excerpt: 'Análisis profundo de cómo la inteligencia artificial está transformando la forma en que las empresas operan, con datos reales y casos de éxito verificados.',
    date: '25 Oct 2024',
    category: 'Tendencias IA',
    readTime: '12 min',
    author: 'Equipo NexGent',
  }

  const articles = [
    {
      title: 'Cómo la IA está transformando la atención al cliente en 2024',
      excerpt: 'Descubre las últimas tendencias en automatización con IA y cómo están revolucionando la forma en que las empresas interactúan con sus clientes. Datos actualizados de más de 1,000 empresas.',
      date: '22 Oct 2024',
      category: 'IA & Negocios',
      readTime: '8 min',
    },
    {
      title: '5 razones para automatizar tu negocio con WhatsApp Business ahora',
      excerpt: 'WhatsApp se ha convertido en el canal preferido de comunicación con +2 mil millones de usuarios. Te contamos por qué deberías automatizarlo ya con datos concretos de ROI.',
      date: '18 Oct 2024',
      category: 'WhatsApp Business',
      readTime: '6 min',
    },
    {
      title: 'Caso de éxito: Hello Nails aumentó sus ventas un 40% con IA',
      excerpt: 'Conoce cómo este salón de belleza transformó su negocio con agentes de IA. ROI en 3 semanas, +40% ventas, -60% no-shows. Historia completa con cifras reales.',
      date: '15 Oct 2024',
      category: 'Casos de Éxito',
      readTime: '10 min',
    },
    {
      title: 'Guía completa: Cómo implementar un chatbot que realmente venda',
      excerpt: 'No todos los chatbots son iguales. Descubre qué hace que un chatbot convierta visitas en ventas con una guía paso a paso basada en datos de +500 implementaciones exitosas.',
      date: '12 Oct 2024',
      category: 'Guías',
      readTime: '15 min',
    },
    {
      title: 'IA vs Asistentes Humanos: Datos reales de costes y eficiencia',
      excerpt: 'Análisis comparativo con datos concretos: costes operativos, tiempo de respuesta, satisfacción del cliente y escalabilidad. Los números hablan por sí mismos.',
      date: '10 Oct 2024',
      category: 'Análisis',
      readTime: '7 min',
    },
    {
      title: 'Errores fatales al implementar IA en tu negocio (y cómo evitarlos)',
      excerpt: 'Hemos analizado 200+ implementaciones fallidas para identificar los 7 errores más comunes que hacen que proyectos de IA fracasen. Aprende qué NO hacer.',
      date: '8 Oct 2024',
      category: 'Mejores Prácticas',
      readTime: '9 min',
    },
  ]

  const categories = [
    {icon: FaBrain, name: 'IA & Negocios', count: 28},
    {icon: FaCheckCircle, name: 'Casos de Éxito', count: 15},
    {icon: FaRocket, name: 'Guías Prácticas', count: 22},
    {icon: FaChartLine, name: 'Análisis & Datos', count: 12},
  ]

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 mb-6">
                <FaBook className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Blog de NexGent</span>
              </div>
              
              <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                IA para negocios que funciona
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Artículos, guías, casos de éxito y análisis con datos reales sobre cómo la inteligencia artificial está transformando empresas como la tuya.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
                {['+100 artículos', 'Casos reales verificados', 'Actualizado semanalmente'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            <div className="mb-16">
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all group">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="h-80 lg:h-auto bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                    <div className="text-center p-12">
                      <FaBrain className="text-7xl mb-6 mx-auto opacity-80" />
                      <p className="text-2xl font-bold">Artículo Destacado</p>
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">{featuredArticle.category}</span>
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {featuredArticle.readTime}
                      </span>
                      <span>{featuredArticle.date}</span>
                    </div>
                    
                    <h2 className="font-monda text-3xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Por {featuredArticle.author}</span>
                      <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                        Leer artículo completo
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <category.icon />
                  </div>
                  <h3 className="font-bold text-black mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} artículos</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-monda text-4xl font-bold text-black mb-4">Últimos artículos</h2>
              <p className="text-lg text-gray-600">Mantente actualizado con las últimas tendencias y mejores prácticas</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <article key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <FaBook className="text-5xl text-gray-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded">{article.category}</span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="font-monda text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <button className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Leer más
                        <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" href="/blog">
                Ver todos los artículos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Subscribe */}
      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-12 text-white text-center">
              <h2 className="font-monda text-4xl font-bold mb-6">Recibe insights semanales directamente en tu email</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Únete a +8,400 empresarios que reciben cada semana artículos, casos de éxito y mejores prácticas sobre IA para negocios.
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-6 py-4 rounded-lg text-black focus:outline-none"
                />
                <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all whitespace-nowrap">
                  Suscribirme gratis
                </button>
              </div>
              <p className="text-sm text-blue-100 mt-4">Sin spam. Cancela cuando quieras. 100% gratis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics We Cover */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Temas que cubrimos</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Contenido práctico y accionable sobre IA para negocios</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {title: 'Casos de éxito reales', description: 'Historias verificadas de empresas que transformaron su negocio con IA, con cifras concretas de ROI y resultados medibles.'},
                {title: 'Guías de implementación', description: 'Tutoriales paso a paso para implementar IA en tu negocio, desde la planificación hasta la medición de resultados.'},
                {title: 'Análisis de tendencias', description: 'Investigaciones y estudios sobre el estado actual y futuro de la IA aplicada a negocios, con datos de mercado actualizados.'},
                {title: 'Mejores prácticas', description: 'Consejos probados y estrategias que funcionan para maximizar el retorno de inversión en automatización con IA.'},
                {title: 'Comparativas y reviews', description: 'Análisis objetivos de herramientas, plataformas y soluciones de IA disponibles en el mercado.'},
                {title: 'Errores comunes', description: 'Aprende de los errores de otros: qué evitar al implementar IA para no perder tiempo ni dinero.'},
              ].map((topic, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 transition-all">
                  <h3 className="font-monda text-xl font-bold text-black mb-3">{topic.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para automatizar tu negocio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Deja de leer y empieza a actuar. Agenda una demo y descubre cómo la IA puede transformar tu negocio en semanas, no meses.
            </p>
            <Button variant="white" size="lg" href="/contacto">
              Solicita tu demo gratuita
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
