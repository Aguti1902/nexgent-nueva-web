'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaClock, FaBook, FaCalendar, FaUser } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { getAllBlogArticles, getBlogArticleBySlug } from '@/data/blog-articles'

export default function ArticuloBlogPage() {
  const params = useParams()
  const slug = params?.slug as string

  const article = getBlogArticleBySlug(slug)
  const allArticles = getAllBlogArticles()

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

            {/* Imagen destacada */}
            {article.image ? (
              <div className="mb-12">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="mb-12 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <FaBook className="text-8xl text-blue-400" />
              </div>
            )}

            {/* Contenido del artículo */}
            <div className="prose prose-lg max-w-none prose-headings:font-monda prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-6 prose-li:mb-2 prose-strong:text-black prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
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
            {relatedArticles.length > 0 && (
              <div className="mt-16">
                <h3 className="font-monda text-2xl font-bold text-black mb-8">
                  Artículos relacionados
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedArticles.map((related) => (
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
            )}
          </div>
        </div>
      </article>
    </>
  )
}
