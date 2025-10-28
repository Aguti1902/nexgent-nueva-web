'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa'
import { articles } from '@/app/recursos/centro-ayuda/articulos/articles-data'

export default function CategoriaGuiasPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

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

  // Convertir slug a nombre de categoría
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Filtrar artículos por categoría
  const categoryArticles = articles.filter(
    article => article.category.toLowerCase() === categoryName.toLowerCase()
  )

  const handleDeleteArticle = (articleSlug: string) => {
    if (deleteConfirm === articleSlug) {
      // Aquí iría la lógica para eliminar del sistema
      alert('Para eliminar guías, edita el archivo articles-data.ts')
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(articleSlug)
      setTimeout(() => setDeleteConfirm(null), 3000)
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-monda text-4xl font-bold text-black mb-2">{categoryName}</h1>
            <p className="text-gray-600">{categoryArticles.length} artículos en esta categoría</p>
          </div>
          <Link
            href="/admin/guias/nuevo"
            className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all flex items-center gap-2"
          >
            <FaPlus />
            Nueva guía
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Título</th>
                <th className="text-left p-4 font-semibold text-gray-700">Vistas</th>
                <th className="text-left p-4 font-semibold text-gray-700">Lectura</th>
                <th className="text-right p-4 font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoryArticles.length > 0 ? (
                categoryArticles.map((article) => (
                  <tr key={article.slug} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-black">{article.title}</p>
                    </td>
                    <td className="p-4 text-gray-600">{article.views}</td>
                    <td className="p-4 text-gray-600">{article.readTime}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/recursos/centro-ayuda/articulos/${article.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-green-100 rounded transition-colors"
                          title="Ver en la web"
                        >
                          <FaEye className="text-green-600" />
                        </Link>
                        <button
                          onClick={() => alert('Para editar guías, modifica el archivo articles-data.ts')}
                          className="p-2 hover:bg-blue-100 rounded transition-colors"
                          title="Editar"
                        >
                          <FaEdit className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.slug)}
                          className={`p-2 rounded transition-colors ${
                            deleteConfirm === article.slug
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'hover:bg-red-100'
                          }`}
                          title={deleteConfirm === article.slug ? "Confirmar eliminación" : "Eliminar"}
                        >
                          <FaTrash className={deleteConfirm === article.slug ? "text-white" : "text-red-600"} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No hay artículos en esta categoría
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-lg text-blue-900 mb-2">💡 Nota sobre edición de guías</h3>
          <p className="text-blue-800 mb-3">
            Las guías del centro de ayuda están almacenadas en el archivo <code className="bg-blue-100 px-2 py-1 rounded">articles-data.ts</code>. 
          </p>
          <p className="text-blue-800">
            Para editar o eliminar guías existentes, modifica ese archivo directamente. Para crear nuevas guías, usa el botón "Nueva guía" que generará el código que debes copiar en el archivo.
          </p>
        </div>
      </div>
    </div>
  )
}

