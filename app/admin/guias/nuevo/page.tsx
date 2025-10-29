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
  const [generatedCode, setGeneratedCode] = useState('')
  const [showCode, setShowCode] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar campos requeridos
    if (!formData.titulo || !formData.contenido) {
      alert('Por favor, completa el título y el contenido de la guía')
      return
    }

    // Generar el código del artículo
    const relatedArticles = formData.articulosRelacionados 
      ? formData.articulosRelacionados.split(',').map(slug => `'${slug.trim()}'`).join(', ')
      : ''

    const articleCode = `{
  slug: '${formData.slug}',
  title: '${formData.titulo}',
  category: '${formData.categoria}',
  views: '1.2K',
  readTime: '${formData.tiempoLectura}',
  content: \`
# ${formData.titulo}

${formData.contenido}
\`,
  relatedArticles: [${relatedArticles}],
},`

    setGeneratedCode(articleCode)
    setShowCode(true)
    
    // Copiar automáticamente al portapapeles
    navigator.clipboard.writeText(articleCode).then(() => {
      alert('✅ Código generado y copiado al portapapeles!\n\nPega este código en el archivo:\napp/recursos/centro-ayuda/articulos/articles-data.ts')
    }).catch(() => {
      alert('✅ Código generado! Cópialo manualmente desde el cuadro que aparece abajo.')
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      alert('✅ Código copiado al portapapeles!')
    })
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
              className="flex items-center gap-2 bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all"
            >
              <FaSave />
              Generar código
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
            <div className="flex justify-end gap-4">
              <Link
                href="/admin"
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all flex items-center gap-2"
              >
                <FaSave />
                Generar código del artículo
              </button>
            </div>
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

        {/* Código Generado */}
        {showCode && (
          <div className="mt-8 bg-gray-900 text-white rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">📋 Código Generado</h3>
              <button
                onClick={copyToClipboard}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Copiar código
              </button>
            </div>
            <pre className="bg-black rounded-lg p-4 overflow-x-auto text-sm">
              <code>{generatedCode}</code>
            </pre>
            <div className="mt-4 p-4 bg-purple-900/50 rounded-lg border border-purple-700">
              <p className="text-sm text-purple-200">
                <strong>📁 Archivo:</strong> <code className="text-purple-100">app/recursos/centro-ayuda/articulos/articles-data.ts</code>
              </p>
              <p className="text-sm text-purple-200 mt-2">
                <strong>✏️ Instrucciones:</strong> Pega este código dentro del array <code className="text-purple-100">articles</code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

