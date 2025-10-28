'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBook, FaClock, FaArrowRight, FaCheckCircle, FaRocket, FaBrain, FaChartLine } from 'react-icons/fa'
import Button from '@/components/ui/Button'
import { getAllBlogArticlesAsync, type BlogArticle } from '@/data/blog-articles'

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    async function loadArticles() {
      const allArticles = await getAllBlogArticlesAsync()
      setArticles(allArticles)
    }
    loadArticles()
  }, [])

  const featuredArticle = articles.length > 0 ? articles[0] : null

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles

  const displayArticles = filteredArticles.slice(1, 7) // Mostramos 6 artículos (saltamos el destacado)

  const categories = [
    {icon: FaBrain, name: 'IA & Negocios', count: articles.filter(a => a.category === 'IA & Negocios').length},
    {icon: FaCheckCircle, name: 'Casos de Éxito', count: articles.filter(a => a.category === 'Casos de Éxito').length},
    {icon: FaRocket, name: 'Guías Prácticas', count: articles.filter(a => a.category === 'Guías Prácticas').length},
    {icon: FaChartLine, name: 'Análisis & Datos', count: articles.filter(a => a.category === 'Análisis & Datos').length},
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
            {featuredArticle && (
              <Link href={`/recursos/blog/articulos/${featuredArticle.slug}`} className="block mb-16">
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
                        <span className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                          Leer artículo completo
                          <FaArrowRight />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  className={`bg-gray-50 rounded-xl p-6 border-2 transition-all cursor-pointer group ${
                    selectedCategory === category.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-500 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 transition-all ${
                    selectedCategory === category.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white'
                  }`}>
                    <category.icon />
                  </div>
                  <h3 className="font-bold text-black mb-1 text-left">{category.name}</h3>
                  <p className="text-sm text-gray-600 text-left">{category.count} artículos</p>
                </button>
              ))}
            </div>
            {selectedCategory && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-gray-600 hover:text-black transition-all"
                >
                  ← Ver todas las categorías
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-monda text-4xl font-bold text-black mb-4">
                {selectedCategory ? `Artículos de ${selectedCategory}` : 'Últimos artículos'}
              </h2>
              <p className="text-lg text-gray-600">Mantente actualizado con las últimas tendencias y mejores prácticas</p>
            </div>

            {displayArticles.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {displayArticles.map((article, index) => (
                    <Link
                      key={article.id}
                      href={`/recursos/blog/articulos/${article.slug}`}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <FaBook className="text-5xl text-gray-400" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">{article.category}</span>
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

                <div className="text-center">
                  <Button variant="outline" size="lg" href="/recursos/blog/articulos">
                    Ver todos los artículos
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  {selectedCategory
                    ? `No hay artículos en la categoría "${selectedCategory}" todavía.`
                    : 'Cargando artículos...'}
                </p>
              </div>
            )}
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
