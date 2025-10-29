'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaClock, FaBook, FaCalendar, FaUser, FaShareAlt, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { getAllBlogArticles, getBlogArticleBySlug, getBlogArticleBySlugAsync, getAllBlogArticlesAsync, type BlogArticle } from '@/data/blog-articles'

export default function ArticuloBlogPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [article, setArticle] = useState<BlogArticle | undefined>(undefined)
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar artículo de inmediato desde datos predefinidos
    const predefinedArticle = getBlogArticleBySlug(slug)
    const predefinedArticles = getAllBlogArticles()
    
    setArticle(predefinedArticle)
    setAllArticles(predefinedArticles)
    setLoading(false)
    
    // Luego intentar cargar de Supabase
    async function loadFromSupabase() {
      try {
        const supabaseArticle = await getBlogArticleBySlugAsync(slug)
        const supabaseArticles = await getAllBlogArticlesAsync()
        
        if (supabaseArticle) {
          setArticle(supabaseArticle)
        }
        setAllArticles(supabaseArticles)
      } catch (error) {
        console.error('Error loading article from Supabase:', error)
      }
    }
    
    loadFromSupabase()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaBook className="text-6xl text-blue-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    )
  }

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

  const relatedArticles = allArticles
    .filter(a => a.slug !== slug && a.category === article.category)
    .slice(0, 2)

  return (
    <>
      {/* Hero */}
      <article className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/recursos/blog" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors font-medium">
              <FaArrowLeft className="mr-2" />
              Volver al blog
            </Link>

            {/* Badge de categoría */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30">
                <FaBook />
                {article.category}
              </span>
            </div>

            {/* Título */}
            <h1 className="font-monda text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Metadata con mejor diseño */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
                <FaUser className="text-blue-600" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
                <FaCalendar className="text-blue-600" />
                <span className="font-medium">{article.date}</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
                <FaClock className="text-blue-600" />
                <span className="font-medium">{article.readTime}</span>
              </div>
            </div>

            {/* Imagen destacada con mejor diseño */}
            {article.image ? (
              <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="mb-16 h-96 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <FaBook className="text-9xl text-white opacity-30" />
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Contenido del artículo con DISEÑO PREMIUM */}
      <section className="py-8 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto">
            {/* Estilos personalizados de markdown */}
            <div className="article-content">
              <style jsx global>{`
                .article-content {
                  color: #2d3748;
                  line-height: 1.8;
                }

                /* Títulos hermosos */
                .article-content h1 {
                  font-family: 'Monda', sans-serif;
                  font-size: 2.5rem;
                  font-weight: 800;
                  color: #000;
                  margin-top: 3rem;
                  margin-bottom: 1.5rem;
                  line-height: 1.2;
                  letter-spacing: -0.02em;
                }

                .article-content h2 {
                  font-family: 'Monda', sans-serif;
                  font-size: 2rem;
                  font-weight: 700;
                  color: #000;
                  margin-top: 3rem;
                  margin-bottom: 1.25rem;
                  padding-bottom: 0.5rem;
                  border-bottom: 3px solid #3b82f6;
                  line-height: 1.3;
                  letter-spacing: -0.01em;
                }

                .article-content h3 {
                  font-family: 'Monda', sans-serif;
                  font-size: 1.5rem;
                  font-weight: 700;
                  color: #1a202c;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                  line-height: 1.4;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }

                .article-content h3:before {
                  content: '▸';
                  color: #3b82f6;
                  font-weight: bold;
                }

                .article-content h4 {
                  font-family: 'Monda', sans-serif;
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: #2d3748;
                  margin-top: 2rem;
                  margin-bottom: 0.75rem;
                }

                /* Párrafos con mejor legibilidad */
                .article-content p {
                  font-size: 1.125rem;
                  line-height: 1.9;
                  margin-bottom: 1.5rem;
                  color: #2d3748;
                }

                .article-content p:first-of-type {
                  font-size: 1.25rem;
                  font-weight: 500;
                  color: #1a202c;
                  line-height: 2;
                }

                /* Listas hermosas */
                .article-content ul {
                  margin: 1.5rem 0;
                  padding-left: 0;
                  list-style: none;
                }

                .article-content ul li {
                  position: relative;
                  padding-left: 2rem;
                  margin-bottom: 1rem;
                  font-size: 1.125rem;
                  line-height: 1.8;
                  color: #2d3748;
                }

                .article-content ul li:before {
                  content: '✓';
                  position: absolute;
                  left: 0;
                  color: #10b981;
                  font-weight: bold;
                  font-size: 1.25rem;
                  background: #d1fae5;
                  width: 1.5rem;
                  height: 1.5rem;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.875rem;
                }

                .article-content ol {
                  margin: 1.5rem 0;
                  padding-left: 2rem;
                  counter-reset: item;
                  list-style: none;
                }

                .article-content ol li {
                  counter-increment: item;
                  position: relative;
                  padding-left: 2rem;
                  margin-bottom: 1rem;
                  font-size: 1.125rem;
                  line-height: 1.8;
                  color: #2d3748;
                }

                .article-content ol li:before {
                  content: counter(item);
                  position: absolute;
                  left: 0;
                  color: #fff;
                  font-weight: bold;
                  background: linear-gradient(135deg, #3b82f6, #2563eb);
                  width: 1.75rem;
                  height: 1.75rem;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.875rem;
                  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                }

                /* Énfasis y negritas */
                .article-content strong {
                  font-weight: 700;
                  color: #000;
                  background: linear-gradient(180deg, transparent 60%, #fef3c7 60%);
                  padding: 0 0.15em;
                }

                .article-content em {
                  font-style: italic;
                  color: #3b82f6;
                }

                /* Enlaces bonitos */
                .article-content a {
                  color: #3b82f6;
                  text-decoration: none;
                  font-weight: 600;
                  border-bottom: 2px solid #93c5fd;
                  transition: all 0.2s;
                }

                .article-content a:hover {
                  color: #2563eb;
                  border-bottom-color: #2563eb;
                  background: #eff6ff;
                }

                /* Blockquotes elegantes */
                .article-content blockquote {
                  margin: 2rem 0;
                  padding: 1.5rem 2rem;
                  background: linear-gradient(135deg, #eff6ff, #dbeafe);
                  border-left: 5px solid #3b82f6;
                  border-radius: 0.5rem;
                  font-style: italic;
                  color: #1e40af;
                  font-size: 1.25rem;
                  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
                }

                .article-content blockquote p {
                  margin: 0;
                  color: #1e40af;
                }

                /* Código */
                .article-content code {
                  background: #1e293b;
                  color: #22d3ee;
                  padding: 0.2em 0.5em;
                  border-radius: 0.375rem;
                  font-size: 0.9em;
                  font-family: 'Monaco', 'Courier New', monospace;
                  font-weight: 500;
                }

                .article-content pre {
                  background: #1e293b;
                  color: #e2e8f0;
                  padding: 1.5rem;
                  border-radius: 0.75rem;
                  overflow-x: auto;
                  margin: 2rem 0;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }

                .article-content pre code {
                  background: transparent;
                  color: inherit;
                  padding: 0;
                  font-size: 0.95rem;
                }

                /* Separadores */
                .article-content hr {
                  border: none;
                  height: 3px;
                  background: linear-gradient(to right, transparent, #3b82f6, transparent);
                  margin: 3rem 0;
                }

                /* Tablas bonitas */
                .article-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 2rem 0;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  border-radius: 0.75rem;
                  overflow: hidden;
                }

                .article-content thead {
                  background: linear-gradient(135deg, #3b82f6, #2563eb);
                  color: white;
                }

                .article-content th {
                  padding: 1rem;
                  text-align: left;
                  font-weight: 700;
                  font-size: 0.95rem;
                }

                .article-content td {
                  padding: 1rem;
                  border-bottom: 1px solid #e5e7eb;
                }

                .article-content tbody tr:hover {
                  background: #f9fafb;
                }

                /* Imágenes dentro del contenido */
                .article-content img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 1rem;
                  margin: 2rem 0;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                }
              `}</style>

              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {/* Compartir en redes sociales */}
            <div className="mt-16 pt-8 border-t-2 border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="font-monda text-xl font-bold text-black flex items-center gap-2">
                  <FaShareAlt className="text-blue-600" />
                  Comparte este artículo
                </h3>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110"
                  >
                    <FaFacebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* CTA premium al final */}
            <div className="mt-16 p-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
              <div className="relative z-10">
                <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6">
                  <FaBook className="text-5xl" />
                </div>
                <h3 className="font-monda text-3xl md:text-4xl font-bold mb-4">
                  ¿Listo para transformar tu negocio con IA?
                </h3>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Deja de leer y empieza a actuar. Agenda una demo gratuita y descubre cómo NexGent puede ayudarte a conseguir resultados reales en semanas, no meses.
                </p>
                <Link
                  href="/demo"
                  className="inline-block bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  Solicitar demo gratuita →
                </Link>
                <p className="text-sm text-blue-200 mt-4">
                  ⚡ Sin compromiso · ✓ 100% gratis · 💬 Respuesta en 24h
                </p>
              </div>
            </div>

            {/* Artículos relacionados mejorados */}
            {relatedArticles.length > 0 && (
              <div className="mt-20">
                <h3 className="font-monda text-3xl font-bold text-black mb-8 pb-4 border-b-2 border-gray-200">
                  📚 Continúa leyendo
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/recursos/blog/articulos/${related.slug}`}
                      className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                          {related.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <FaClock />
                          <span>{related.readTime}</span>
                        </div>
                      </div>
                      <h4 className="font-monda font-bold text-xl text-black mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {related.title}
                      </h4>
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                        Leer artículo <FaArrowLeft className="rotate-180" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
