'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaEye } from 'react-icons/fa'

export default function NuevaGuia() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    categoria: 'Primeros pasos',
    tiempoLectura: '5 min',
    contenido: '',
    articulosRelacionados: '',
  })
  const [preview, setPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const authenticated = localStorage.getItem('adminAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  const categorias = [
    'Primeros pasos',
    'Preguntas frecuentes',
    'Configuración avanzada',
    'Resolución de problemas',
    'Mejores prácticas'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generar slug del título
    if (name === 'titulo') {
      const slug = value
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar campos requeridos
    if (!formData.titulo || !formData.contenido) {
      alert('Por favor, completa el título y el contenido de la guía')
      return
    }

    setIsSaving(true)

    try {
      // Procesar artículos relacionados
      const relatedArticles = formData.articulosRelacionados 
        ? formData.articulosRelacionados.split(',').map(slug => slug.trim()).filter(Boolean)
        : []

      // Crear nueva guía
      const newGuide = {
        slug: formData.slug,
        title: formData.titulo,
        category: formData.categoria,
        content: formData.contenido,
        read_time: formData.tiempoLectura,
        views: '0',
        related_articles: relatedArticles,
        published: true,
      }

      // Guardar en Supabase
      const response = await fetch('/api/help-center', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuide)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al guardar la guía')
      }

      alert('✅ Guía guardada exitosamente!')
      router.push('/admin')
    } catch (error: any) {
      console.error('Error saving guide:', error)
      alert(`❌ Error al guardar la guía: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <Image 
                src="/images/LOGO.png" 
                alt="NexGent Logo" 
                width={140} 
                height={40}
                className="object-contain"
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
              disabled={isSaving}
              className={`flex items-center gap-2 text-white px-6 py-2 rounded-lg font-semibold transition-all ${
                isSaving 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              <FaSave />
              {isSaving ? 'Guardando...' : 'Guardar guía'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-8">
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h1 className="font-monda text-4xl font-bold text-black mb-2">Nueva Guía / Tutorial</h1>
              <p className="text-gray-600">Centro de Ayuda</p>
            </div>

            {/* Título */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título de la guía *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                placeholder="Ej: Cómo configurar WhatsApp Business en 5 minutos"
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL (slug)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">nexgent.io/centro-ayuda/articulos/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="url-de-la-guia"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Se genera automáticamente del título</p>
            </div>

            {/* Metadata */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Ej: 5 min"
                />
              </div>
            </div>

            {/* Artículos relacionados */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artículos relacionados (slugs separados por comas)
              </label>
              <input
                type="text"
                name="articulosRelacionados"
                value={formData.articulosRelacionados}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Ej: como-configurar-whatsapp-business, integracion-con-calendarios"
              />
              <p className="text-xs text-gray-500 mt-2">Slugs de otros artículos que quieras relacionar</p>
            </div>

            {/* Contenido */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido de la guía *
              </label>
              <textarea
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                rows={25}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm resize-none"
                placeholder="Escribe aquí el contenido de la guía usando Markdown...

# Cómo configurar WhatsApp Business

En esta guía te explicamos paso a paso...

## Requisitos previos

Antes de empezar, asegúrate de tener:
- Una cuenta de WhatsApp Business activa
- Acceso a tu cuenta de NexGent
- Tu número de teléfono verificado

## Paso 1: Acceder a la configuración

1. Inicia sesión en tu cuenta de NexGent
2. Ve a Configuración > Integraciones
3. Haz clic en 'Conectar WhatsApp Business'

## Paso 2: Autorizar la conexión

..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Soporta Markdown para formato. <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" className="text-purple-600 hover:underline">Ver guía de Markdown</a>
              </p>
            </div>

            {/* Botones */}
          </form>
        ) : (
          <div className="bg-white rounded-xl p-12 border border-gray-200">
            <div className="max-w-3xl mx-auto">
              <Link href="/recursos/centro-ayuda" className="text-purple-600 hover:underline mb-6 inline-block">
                ← Volver al Centro de Ayuda
              </Link>
              
              <div className="mb-6">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {formData.categoria}
                </span>
              </div>
              
              <h1 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                {formData.titulo || 'Título de la guía'}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <span>{formData.tiempoLectura} de lectura</span>
                <span>•</span>
                <span>Actualizado {new Date().toLocaleDateString('es-ES')}</span>
              </div>
              
              <div className="prose prose-lg max-w-none">
                {formData.contenido ? (
                  <pre className="whitespace-pre-wrap font-sans">{formData.contenido}</pre>
                ) : (
                  <p className="text-gray-400 italic">El contenido aparecerá aquí...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

