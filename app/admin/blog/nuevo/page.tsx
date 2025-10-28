'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaEye, FaImage, FaTrash } from 'react-icons/fa'

export default function NuevoArticuloBlog() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    categoria: 'IA & Negocios',
    extracto: '',
    contenido: '',
    autor: 'Equipo NexGent',
    tiempoLectura: '5 min',
    imagenDestacada: '',
  })

  const [preview, setPreview] = useState(false)

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
      // Validar tamaño (max 2MB para base64)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es muy grande. Por favor, selecciona una imagen menor a 2MB.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagenDestacada: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imagenDestacada: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que los campos requeridos estén completos
    if (!formData.titulo || !formData.extracto || !formData.contenido) {
      alert('Por favor, completa todos los campos obligatorios (título, extracto y contenido)')
      return
    }

    // Crear nuevo artículo
    const newArticle = {
      id: Date.now().toString(), // ID único basado en timestamp
      slug: formData.slug,
      title: formData.titulo,
      category: formData.categoria,
      excerpt: formData.extracto,
      content: formData.contenido,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: formData.tiempoLectura,
      author: formData.autor,
      image: formData.imagenDestacada,
      published: true,
    }

    // Guardar en localStorage
    const existingArticles = JSON.parse(localStorage.getItem('blogArticles') || '[]')
    const updatedArticles = [newArticle, ...existingArticles]
    localStorage.setItem('blogArticles', JSON.stringify(updatedArticles))

    alert('✅ Artículo publicado correctamente!')
    
    // Redirigir al dashboard
    router.push('/admin')
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
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
              <FaSave />
              Guardar artículo
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-8">
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h1 className="font-monda text-4xl font-bold text-black mb-8">Nuevo Artículo del Blog</h1>
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
                placeholder="Ej: Cómo la IA está transformando la atención al cliente"
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
                  placeholder="url-del-articulo"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Se genera automáticamente del título</p>
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
                placeholder="Un resumen breve del artículo que aparecerá en las tarjetas..."
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.extracto.length} / 200 caracteres recomendados
              </p>
            </div>

            {/* Imagen destacada */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen destacada
              </label>
              {formData.imagenDestacada ? (
                <div className="relative">
                  <img 
                    src={formData.imagenDestacada} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-all">
                    <FaImage className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Arrastra una imagen o haz clic para seleccionar</p>
                    <p className="text-xs text-gray-500">PNG, JPG o WebP (máx. 2MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
              <p className="text-xs text-gray-500 mt-2">
                ⚠️ Nota: Las imágenes se guardan en formato base64. Para producción, usa un servicio como Cloudinary.
              </p>
            </div>

            {/* Contenido */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido del artículo *
              </label>
              <textarea
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
                placeholder="Escribe aquí el contenido del artículo usando Markdown...

# Título principal

## Subtítulo

Párrafo de texto...

- Lista de elementos
- Otro elemento

**Texto en negrita**
*Texto en cursiva*"
              />
              <p className="text-xs text-gray-500 mt-2">
                Soporta Markdown para formato. <a href="#" className="text-blue-600 hover:underline">Ver guía de Markdown</a>
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
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <FaSave />
                Publicar artículo
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-xl p-12 border border-gray-200">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
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

