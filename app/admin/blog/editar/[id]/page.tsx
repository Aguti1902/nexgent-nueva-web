'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaEye, FaImage, FaTrash } from 'react-icons/fa'
import { getBlogArticleBySlug, getAllBlogArticles, BlogArticle } from '@/data/blog-articles'

export default function EditarArticuloBlog() {
  const router = useRouter()
  const params = useParams()
  const articleId = params?.id as string

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    categoria: 'IA & Negocios',
    extracto: '',
    contenido: '',
    autor: 'Equipo NexGent',
    tiempoLectura: '5 min',
    imagenDestacada: '',
    published: true,
  })

  useEffect(() => {
    const authenticated = localStorage.getItem('adminAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
      
      // Cargar artículo
      const articles = getAllBlogArticles()
      const article = articles.find(a => a.id === articleId)
      
      if (article) {
        setFormData({
          titulo: article.title,
          slug: article.slug,
          categoria: article.category,
          extracto: article.excerpt,
          contenido: article.content,
          autor: article.author,
          tiempoLectura: article.readTime,
          imagenDestacada: article.image || '',
          published: article.published,
        })
      }
      setLoading(false)
    } else {
      router.push('/admin/login')
    }
  }, [router, articleId])

  const categorias = ['IA & Negocios', 'Casos de Éxito', 'Guías Prácticas', 'Análisis & Datos']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generar slug del título
    if (name === 'titulo') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const processImageFile = (file: File) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido')
      return
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor de 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, imagenDestacada: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      // Actualizar artículo en Supabase
      const response = await fetch(`/api/blog?id=${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.titulo,
          slug: formData.slug,
          excerpt: formData.extracto,
          content: formData.contenido,
          category: formData.categoria,
          author: formData.autor,
          read_time: formData.tiempoLectura,
          image_url: formData.imagenDestacada,
          published: formData.published,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el artículo')
      }

      alert('Artículo actualizado correctamente!')
      router.push('/admin')
    } catch (error) {
      console.error('Error al guardar:', error)
      alert('Error al guardar el artículo. Por favor, inténtalo de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/images/ISOTIPO.png"
                alt="NexGent"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/admin" 
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <FaArrowLeft />
              Volver al dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              <FaEye />
              {preview ? 'Editar' : 'Vista previa'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <FaSave />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-8">
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h1 className="font-monda text-4xl font-bold text-black mb-2">Editar Artículo</h1>
              <p className="text-gray-600">ID: {articleId}</p>
            </div>

            {/* Estado de publicación */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="font-medium text-gray-700">
                  Artículo publicado (visible en la web)
                </span>
              </label>
            </div>

            {/* Título */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del artículo *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL (slug)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">nexgent.io/blog/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de lectura
                </label>
                <input
                  type="text"
                  name="tiempoLectura"
                  value={formData.tiempoLectura}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 5 min"
                />
              </div>
            </div>

            {/* Extracto */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extracto / Descripción corta *
              </label>
              <textarea
                name="extracto"
                value={formData.extracto}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.extracto.length} caracteres
              </p>
            </div>

            {/* Imagen destacada */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen destacada
              </label>
              
              {formData.imagenDestacada ? (
                <div className="relative mb-4">
                  <img 
                    src={formData.imagenDestacada} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imagenDestacada: '' }))}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  <label className="cursor-pointer block">
                    <FaImage className={`text-4xl mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                    <p className={`mb-2 ${isDragging ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                      {isDragging ? '¡Suelta la imagen aquí!' : 'Arrastra una imagen o haz clic para seleccionar'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG o WebP (máx. 5MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido del artículo * (Markdown)
              </label>
              <textarea
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                rows={25}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4">
              <Link
                href="/admin"
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-xl p-12 border border-gray-200">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {formData.categoria}
                </span>
              </div>
              <h1 className="font-monda text-5xl font-bold text-black mb-6">
                {formData.titulo || 'Título del artículo'}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <span>Por {formData.autor}</span>
                <span>•</span>
                <span>{formData.tiempoLectura}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('es-ES')}</span>
              </div>
              {formData.extracto && (
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {formData.extracto}
                </p>
              )}
              {formData.imagenDestacada && (
                <img 
                  src={formData.imagenDestacada} 
                  alt={formData.titulo}
                  className="w-full h-96 object-cover rounded-2xl mb-8"
                />
              )}
              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{formData.contenido}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

