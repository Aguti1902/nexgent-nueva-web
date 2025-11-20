'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FaRobot, FaCheck, FaTimes, FaEdit, FaEye, FaClock, 
  FaChartLine, FaStar, FaFilter, FaSearch, FaCalendar,
  FaArrowUp, FaArrowDown
} from 'react-icons/fa'

interface AIArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featured_image_url: string
  featured_image_prompt: string
  status: 'draft' | 'review' | 'published' | 'scheduled' | 'rejected'
  trending_topic: string
  trending_source: string
  trending_score: number
  ai_confidence_score: number
  readability_score: number
  seo_score: number
  model_used: string
  generation_time_seconds: number
  created_at: string
  scheduled_for?: string
}

export default function AIReviewPage() {
  const [articles, setArticles] = useState<AIArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'review' | 'scheduled' | 'published'>('review')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'trending'>('date')

  useEffect(() => {
    loadArticles()
  }, [filter])

  const loadArticles = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/ai-articles?status=${filter === 'all' ? '' : filter}`)
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error cargando artículos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    if (!confirm('¿Publicar este artículo?')) return
    
    try {
      await fetch('/api/admin/ai-articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'published', published_at: new Date() })
      })
      loadArticles()
    } catch (error) {
      alert('Error publicando artículo')
    }
  }

  const handleReject = async (id: string) => {
    const reason = prompt('¿Por qué rechazas este artículo?')
    if (!reason) return
    
    try {
      await fetch('/api/admin/ai-articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'rejected', edit_notes: reason })
      })
      loadArticles()
    } catch (error) {
      alert('Error rechazando artículo')
    }
  }

  const handleSchedule = async (id: string) => {
    const date = prompt('Fecha de publicación (YYYY-MM-DD HH:mm):')
    if (!date) return
    
    try {
      await fetch('/api/admin/ai-articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          status: 'scheduled', 
          scheduled_for: new Date(date).toISOString() 
        })
      })
      loadArticles()
    } catch (error) {
      alert('Error programando artículo')
    }
  }

  const filteredArticles = articles
    .filter(a => searchTerm === '' || a.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sortBy === 'score') return b.seo_score - a.seo_score
      if (sortBy === 'trending') return b.trending_score - a.trending_score
      return 0
    })

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: 'bg-gray-100 text-gray-700',
      review: 'bg-yellow-100 text-yellow-700',
      published: 'bg-green-100 text-green-700',
      scheduled: 'bg-blue-100 text-blue-700',
      rejected: 'bg-red-100 text-red-700'
    }
    return badges[status as keyof typeof badges] || badges.draft
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-monda text-4xl font-bold text-black flex items-center gap-3">
                <FaRobot className="text-blue-500" />
                Artículos Generados por IA
              </h1>
              <p className="text-gray-600 mt-2">Revisa, edita y publica artículos creados automáticamente</p>
            </div>
            <Link
              href="/admin"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              Volver al Admin
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Pendientes</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {articles.filter(a => a.status === 'review').length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl">
                  <FaClock className="text-2xl text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Publicados</p>
                  <p className="text-3xl font-bold text-green-600">
                    {articles.filter(a => a.status === 'published').length}
                  </p>
                </div>
                <div className="bg-green-100 p-4 rounded-xl">
                  <FaCheck className="text-2xl text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Programados</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {articles.filter(a => a.status === 'scheduled').length}
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl">
                  <FaCalendar className="text-2xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Promedio SEO</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {articles.length > 0 
                      ? Math.round(articles.reduce((sum, a) => sum + a.seo_score, 0) / articles.length)
                      : 0}
                  </p>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl">
                  <FaChartLine className="text-2xl text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar artículos..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {(['all', 'review', 'scheduled', 'published'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                      filter === f
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f === 'all' ? 'Todos' : f}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500"
              >
                <option value="date">Por fecha</option>
                <option value="score">Por SEO</option>
                <option value="trending">Por trending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando artículos...</p>
            </div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <FaRobot className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No hay artículos en esta categoría</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-64 h-64 flex-shrink-0 relative">
                    {article.featured_image_url ? (
                      <img
                        src={article.featured_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <FaRobot className="text-6xl text-white opacity-50" />
                      </div>
                    )}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(article.status)}`}>
                      {article.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(article.created_at).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl text-black mb-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                        {/* Metrics */}
                        <div className="flex items-center gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            <FaChartLine className={getScoreColor(article.seo_score)} />
                            <span className="text-sm font-semibold">SEO: {article.seo_score}/100</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaStar className={getScoreColor(article.ai_confidence_score * 100)} />
                            <span className="text-sm font-semibold">
                              Confianza: {Math.round(article.ai_confidence_score * 100)}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {article.trending_score >= 70 ? (
                              <FaArrowUp className="text-green-600" />
                            ) : (
                              <FaArrowDown className="text-red-600" />
                            )}
                            <span className="text-sm font-semibold">Trending: {article.trending_score}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Trending Topic */}
                        <div className="text-xs text-gray-500 italic">
                          🔥 Basado en: "{article.trending_topic}" ({article.trending_source})
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/blog/ai-review/${article.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold"
                      >
                        <FaEye />
                        Ver
                      </Link>
                      <Link
                        href={`/admin/blog/ai-review/${article.id}/edit`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-semibold"
                      >
                        <FaEdit />
                        Editar
                      </Link>
                      <button
                        onClick={() => handleSchedule(article.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-semibold"
                      >
                        <FaCalendar />
                        Programar
                      </button>
                      <button
                        onClick={() => handleApprove(article.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-semibold"
                      >
                        <FaCheck />
                        Publicar
                      </button>
                      <button
                        onClick={() => handleReject(article.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

