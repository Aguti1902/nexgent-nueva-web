'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaClock, FaEye, FaBook } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

interface HelpArticle {
  id: number
  slug: string
  title: string
  category: string
  views: string
  read_time: string
  content: string
  published: boolean
  related_articles?: string[]
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<HelpArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<HelpArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticle()
  }, [slug])

  const loadArticle = async () => {
    try {
      const response = await fetch('/api/help-center?published=true')
      if (response.ok) {
        const data = await response.json()
        const articles = data.articles || []
        const foundArticle = articles.find((a: HelpArticle) => a.slug === slug)
        setArticle(foundArticle || null)
        
        // Cargar artículos relacionados
        if (foundArticle && foundArticle.related_articles) {
          const related = articles.filter((a: HelpArticle) => 
            foundArticle.related_articles?.includes(a.slug)
          )
          setRelatedArticles(related)
        } else if (foundArticle) {
          // Si no tiene relacionados, mostrar de la misma categoría
          const related = articles
            .filter((a: HelpArticle) => a.category === foundArticle.category && a.slug !== slug)
            .slice(0, 3)
          setRelatedArticles(related)
        }
      }
    } catch (error) {
      console.error('Error loading article:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-monda text-4xl font-bold text-black mb-4">
              Artículo no encontrado
            </h1>
            <p className="text-gray-600 mb-8">
              Lo sentimos, el artículo que buscas no existe.
            </p>
            <Link 
              href="/recursos/centro-ayuda"
              className="inline-flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all"
            >
              <FaArrowLeft />
              Volver al centro de ayuda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container-custom px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/recursos/centro-ayuda" className="hover:text-purple-600 transition-colors">
              Centro de Ayuda
            </Link>
            <span>/</span>
            <span className="text-gray-900">{article.category}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {article.category}
            </div>
            <h1 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{article.read_time} lectura</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEye />
                <span>{article.views} vistas</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h2 className="font-monda text-3xl font-bold text-black mt-12 mb-6" {...props} />,
                h2: ({node, ...props}) => <h3 className="font-monda text-2xl font-bold text-black mt-10 mb-4" {...props} />,
                h3: ({node, ...props}) => <h4 className="font-semibold text-xl text-black mt-8 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700" {...props} />,
                code: ({node, inline, ...props}: any) => 
                  inline ? (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-purple-600" {...props} />
                  ) : (
                    <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-6" {...props} />
                  ),
                pre: ({node, ...props}) => <pre className="mb-6" {...props} />,
                a: ({node, ...props}) => <a className="text-purple-600 hover:text-purple-700 underline" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600 my-6" {...props} />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h2 className="font-monda text-2xl font-bold text-black mb-6">
                Artículos relacionados
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related: any) => (
                  <Link
                    key={related.slug}
                    href={`/recursos/centro-ayuda/articulos/${related.slug}`}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-all flex-shrink-0">
                        <FaBook />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black group-hover:text-purple-600 transition-all mb-2">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{related.read_time}</span>
                          <span>•</span>
                          <span>{related.views} vistas</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200">
            <h3 className="font-monda text-2xl font-bold text-black mb-4">
              ¿Te ha sido útil este artículo?
            </h3>
            <p className="text-gray-600 mb-6">
              Si tienes más dudas, nuestro equipo está disponible 24/7
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all"
            >
              Contactar soporte
            </Link>
          </div>

          {/* Back button */}
          <div className="mt-12">
            <Link 
              href="/recursos/centro-ayuda"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <FaArrowLeft />
              Volver al centro de ayuda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

