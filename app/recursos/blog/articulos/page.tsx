'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaBook, FaClock, FaArrowRight, FaSearch, FaBrain, FaCheckCircle, FaRocket, FaChartLine } from 'react-icons/fa'

export default function AllArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const articles = [
    {
      slug: 'futuro-automatizacion-empresarial-ia',
      title: 'El futuro de la automatización empresarial: IA que realmente funciona',
      excerpt: 'Análisis profundo de cómo la inteligencia artificial está transformando la forma en que las empresas operan, con datos reales y casos de éxito verificados.',
      date: '25 Oct 2024',
      category: 'IA & Negocios',
      readTime: '12 min',
      author: 'Equipo NexGent',
    },
    {
      slug: 'ia-atencion-cliente-2024',
      title: 'Cómo la IA está transformando la atención al cliente en 2024',
      excerpt: 'Descubre las últimas tendencias en automatización con IA y cómo están revolucionando la forma en que las empresas interactúan con sus clientes. Datos actualizados de más de 1,000 empresas.',
      date: '22 Oct 2024',
      category: 'IA & Negocios',
      readTime: '8 min',
      author: 'Equipo NexGent',
    },
    {
      slug: '5-razones-automatizar-whatsapp-business',
      title: '5 razones para automatizar tu negocio con WhatsApp Business ahora',
      excerpt: 'WhatsApp se ha convertido en el canal preferido de comunicación con +2 mil millones de usuarios. Te contamos por qué deberías automatizarlo ya con datos concretos de ROI.',
      date: '18 Oct 2024',
      category: 'IA & Negocios',
      readTime: '6 min',
      author: 'Equipo NexGent',
    },
    {
      slug: 'caso-exito-hello-nails',
      title: 'Caso de éxito: Hello Nails aumentó sus ventas un 40% con IA',
      excerpt: 'Conoce cómo este salón de belleza transformó su negocio con agentes de IA. ROI en 3 semanas, +40% ventas, -60% no-shows. Historia completa con cifras reales.',
      date: '15 Oct 2024',
      category: 'Casos de Éxito',
      readTime: '10 min',
      author: 'Equipo NexGent',
    },
    {
      slug: 'guia-chatbot-que-venda',
      title: 'Guía completa: Cómo implementar un chatbot que realmente venda',
      excerpt: 'No todos los chatbots son iguales. Descubre qué hace que un chatbot convierta visitas en ventas con una guía paso a paso basada en datos de +500 implementaciones exitosas.',
      date: '12 Oct 2024',
      category: 'Guías Prácticas',
      readTime: '15 min',
      author: 'Equipo NexGent',
    },
    {
      slug: 'ia-vs-asistentes-humanos-datos',
      title: 'IA vs Asistentes Humanos: Datos reales de costes y eficiencia',
      excerpt: 'Análisis comparativo con datos concretos: costes operativos, tiempo de respuesta, satisfacción del cliente y escalabilidad. Los números hablan por sí mismos.',
      date: '10 Oct 2024',
      category: 'Análisis & Datos',
      readTime: '7 min',
      author: 'Equipo NexGent',
    },
    {
      slug: 'errores-fatales-implementar-ia',
      title: 'Errores fatales al implementar IA en tu negocio (y cómo evitarlos)',
      excerpt: 'Hemos analizado 200+ implementaciones fallidas para identificar los 7 errores más comunes que hacen que proyectos de IA fracasen. Aprende qué NO hacer.',
      date: '8 Oct 2024',
      category: 'IA & Negocios',
      readTime: '9 min',
      author: 'Equipo NexGent',
    },
  ]

  const categories = [
    { icon: FaBrain, name: 'IA & Negocios', count: 28 },
    { icon: FaCheckCircle, name: 'Casos de Éxito', count: 15 },
    { icon: FaRocket, name: 'Guías Prácticas', count: 22 },
    { icon: FaChartLine, name: 'Análisis & Datos', count: 12 },
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/recursos/blog" className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors">
              <span className="mr-2">←</span> Volver al blog
            </Link>

            <div className="text-center mb-12">
              <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
                Todos los artículos
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explora nuestra biblioteca completa de contenido sobre IA para negocios
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-14 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg">
                  <FaSearch className="text-xl" />
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  !selectedCategory
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                }`}
              >
                Todos
              </button>
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                  }`}
                >
                  <category.icon />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-600 mb-12">
              Mostrando {filteredArticles.length} artículo{filteredArticles.length !== 1 ? 's' : ''}
              {selectedCategory && ` en "${selectedCategory}"`}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Link
                  key={index}
                  href={`/recursos/blog/articulos/${article.slug}`}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <FaBook className="text-5xl text-blue-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-monda text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Leer más
                        <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="font-bold text-2xl text-black mb-2">No se encontraron artículos</h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos de búsqueda o categorías
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                  }}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

