'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaEye, FaImage } from 'react-icons/fa'

export default function NuevoArticuloBlog() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Guardando artículo:', formData)
    // Aquí iría la lógica para guardar en la base de datos o archivo
    alert('Artículo guardado correctamente!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-custom px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-all cursor-pointer">
                <FaImage className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Arrastra una imagen o haz clic para seleccionar</p>
                <p className="text-xs text-gray-500">PNG, JPG o WebP (máx. 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      console.log('Imagen seleccionada:', e.target.files[0].name)
                    }
                  }}
                />
              </div>
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

