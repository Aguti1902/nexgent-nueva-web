'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaArrowLeft, FaEdit, FaCheck, FaTimes, FaCalendar,
  FaChartLine, FaStar, FaClock, FaRobot, FaImage,
  FaHashtag, FaGlobe
} from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

export default function AIArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticle()
  }, [params.id])

  const loadArticle = async () => {
    try {
      const response = await fetch(`/api/admin/ai-articles/${params.id}`)
      const data = await response.json()
      setArticle(data.article)
    } catch (error) {
      console.error('Error cargando artículo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!confirm('¿Publicar este artículo?')) return
    
    try {
      await fetch('/api/admin/ai-articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: params.id, 
          status: 'published', 
          published_at: new Date() 
        })
      })
      router.push('/admin/blog/ai-review')
    } catch (error) {
      alert('Error publicando artículo')
    }
  }

  const handleReject = async () => {
    const reason = prompt('¿Por qué rechazas este artículo?')
    if (!reason) return
    
    try {
      await fetch('/api/admin/ai-articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: params.id, 
          status: 'rejected', 
          edit_notes: reason 
        })
      })
      router.push('/admin/blog/ai-review')
    } catch (error) {
      alert('Error rechazando artículo')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaRobot className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Artículo no encontrado</p>
          <Link 
            href="/admin/blog/ai-review"
            className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Volver
          </Link>
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/blog/ai-review"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-all"
            >
              <FaArrowLeft />
              <span className="font-semibold">Volver</span>
            </Link>

            <div className="flex gap-3">
              <Link
                href={`/admin/blog/ai-review/${params.id}/edit`}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-semibold"
              >
                <FaEdit />
                Editar
              </Link>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-semibold"
              >
                <FaCheck />
                Publicar
              </button>
              <button
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Imagen destacada */}
            {article.featured_image_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={article.featured_image_url}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            {/* Contenido del artículo */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-12 shadow-lg"
            >
              {/* Meta */}
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                  {article.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(article.created_at).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Título */}
              <h1 className="font-monda text-4xl font-bold text-black mb-6">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
                {article.excerpt}
              </p>

              {/* Contenido Markdown */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags && article.tags.map((tag: string, i: number) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>

          {/* Sidebar con métricas */}
          <div className="space-y-6">
            {/* Métricas de calidad */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FaChartLine className="text-blue-500" />
                Métricas de Calidad
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">SEO Score</span>
                    <span className={`text-2xl font-bold ${getScoreColor(article.seo_score)}`}>
                      {article.seo_score}/100
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${article.seo_score}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Legibilidad</span>
                    <span className={`text-2xl font-bold ${getScoreColor(article.readability_score)}`}>
                      {article.readability_score}/100
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${article.readability_score}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Confianza IA</span>
                    <span className={`text-2xl font-bold ${getScoreColor(article.ai_confidence_score * 100)}`}>
                      {Math.round(article.ai_confidence_score * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 transition-all"
                      style={{ width: `${article.ai_confidence_score * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Información técnica */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FaRobot className="text-purple-500" />
                Información Técnica
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <FaClock className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Tiempo de generación</p>
                    <p className="text-gray-600">{article.generation_time_seconds}s</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FaRobot className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Modelo usado</p>
                    <p className="text-gray-600">{article.model_used}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FaGlobe className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Slug</p>
                    <p className="text-gray-600 font-mono text-xs">{article.slug}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trending info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg text-white"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                🔥 Trending Topic
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-80">Tema detectado</p>
                  <p className="font-semibold">{article.trending_topic}</p>
                </div>

                <div>
                  <p className="text-sm opacity-80">Fuente</p>
                  <p className="font-semibold capitalize">{article.trending_source}</p>
                </div>

                <div>
                  <p className="text-sm opacity-80">Trending Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all"
                        style={{ width: `${article.trending_score}%` }}
                      />
                    </div>
                    <span className="font-bold">{article.trending_score}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Prompt de imagen */}
            {article.featured_image_prompt && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FaImage className="text-green-500" />
                  Prompt de Imagen
                </h3>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "{article.featured_image_prompt}"
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

