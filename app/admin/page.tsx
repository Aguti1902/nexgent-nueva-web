'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaBook, FaQuestionCircle, FaChartLine, FaPlus, FaEdit, FaTrash, FaImage, FaCog, FaSignOutAlt } from 'react-icons/fa'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('overview')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Verificar autenticación
    const authenticated = localStorage.getItem('adminAuthenticated')
    const user = localStorage.getItem('adminUsername')
    
    if (authenticated === 'true' && user) {
      setIsAuthenticated(true)
      setUsername(user)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminUsername')
    router.push('/admin/login')
  }

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

  const stats = [
    { label: 'Artículos del Blog', value: '7', icon: FaBook, color: 'blue' },
    { label: 'Guías del Centro de Ayuda', value: '27', icon: FaQuestionCircle, color: 'purple' },
    { label: 'Visitas este mes', value: '12.4K', icon: FaChartLine, color: 'green' },
  ]

  const recentArticles = [
    { type: 'blog', title: 'El futuro de la automatización empresarial', date: '25 Oct 2024', views: '1.2K' },
    { type: 'guia', title: 'Cómo configurar WhatsApp Business', date: '24 Oct 2024', views: '3.4K' },
    { type: 'blog', title: 'IA vs Asistentes Humanos', date: '22 Oct 2024', views: '890' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-custom px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-monda text-2xl font-bold text-black">
                nex<span className="text-blue-500">gent</span>
              </Link>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Hola, <strong>{username}</strong>
              </span>
              <Link 
                href="/" 
                target="_blank"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Ver sitio web →
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <FaSignOutAlt />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaChartLine />
              <span className="font-medium">Vista General</span>
            </button>
            
            <button
              onClick={() => setActiveSection('blog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'blog'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaBook />
              <span className="font-medium">Artículos del Blog</span>
            </button>
            
            <button
              onClick={() => setActiveSection('guias')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'guias'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaQuestionCircle />
              <span className="font-medium">Guías & Tutoriales</span>
            </button>
            
            <button
              onClick={() => setActiveSection('media')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'media'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaImage />
              <span className="font-medium">Imágenes</span>
            </button>
            
            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'settings'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaCog />
              <span className="font-medium">Configuración</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'overview' && (
            <div>
              <h1 className="font-monda text-4xl font-bold text-black mb-8">Vista General</h1>
              
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center text-${stat.color}-600 text-2xl`}>
                        <stat.icon />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-black mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="font-bold text-xl text-black mb-6">Actividad Reciente</h2>
                <div className="space-y-4">
                  {recentArticles.map((article, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          article.type === 'blog' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {article.type === 'blog' ? 'Blog' : 'Guía'}
                        </span>
                        <h3 className="font-semibold text-black mt-2">{article.title}</h3>
                        <p className="text-sm text-gray-600">{article.date} • {article.views} vistas</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                          <FaEdit className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded transition-colors">
                          <FaTrash className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'blog' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-monda text-4xl font-bold text-black">Artículos del Blog</h1>
                <Link
                  href="/admin/blog/nuevo"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
                >
                  <FaPlus />
                  Nuevo artículo
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Título</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Categoría</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Fecha</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Vistas</th>
                      <th className="text-right p-4 font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: 'El futuro de la automatización empresarial', category: 'IA & Negocios', date: '25 Oct 2024', views: '1.2K' },
                      { title: 'Cómo la IA está transformando la atención al cliente', category: 'IA & Negocios', date: '22 Oct 2024', views: '890' },
                      { title: '5 razones para automatizar WhatsApp Business', category: 'IA & Negocios', date: '18 Oct 2024', views: '756' },
                    ].map((article, idx) => (
                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-4">
                          <p className="font-medium text-black">{article.title}</p>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {article.category}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{article.date}</td>
                        <td className="p-4 text-gray-600">{article.views}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                              <FaEdit className="text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-red-100 rounded transition-colors">
                              <FaTrash className="text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'guias' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-monda text-4xl font-bold text-black">Guías & Tutoriales</h1>
                <Link
                  href="/admin/guias/nuevo"
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all flex items-center gap-2"
                >
                  <FaPlus />
                  Nueva guía
                </Link>
              </div>
              
              <div className="grid gap-6">
                {[
                  { category: 'Primeros pasos', count: 6, color: 'blue' },
                  { category: 'Preguntas frecuentes', count: 6, color: 'purple' },
                  { category: 'Configuración avanzada', count: 6, color: 'green' },
                  { category: 'Resolución de problemas', count: 5, color: 'orange' },
                  { category: 'Mejores prácticas', count: 4, color: 'pink' },
                ].map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl text-black mb-2">{cat.category}</h3>
                        <p className="text-gray-600">{cat.count} artículos publicados</p>
                      </div>
                      <Link
                        href={`/admin/guias/categoria/${cat.category.toLowerCase().replace(/ /g, '-')}`}
                        className={`bg-${cat.color}-100 text-${cat.color}-700 px-4 py-2 rounded-lg font-semibold hover:bg-${cat.color}-200 transition-all`}
                      >
                        Ver artículos
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'media' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-monda text-4xl font-bold text-black">Biblioteca de Imágenes</h1>
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center gap-2">
                  <FaPlus />
                  Subir imagen
                </button>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
                  <div key={img} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <FaImage className="text-4xl text-gray-400" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-black mb-1">imagen-{img}.jpg</p>
                      <p className="text-xs text-gray-600">1.2 MB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h1 className="font-monda text-4xl font-bold text-black mb-8">Configuración</h1>
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h2 className="font-bold text-xl text-black mb-6">Configuración General</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del sitio
                    </label>
                    <input
                      type="text"
                      defaultValue="NexGent"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de contacto
                    </label>
                    <input
                      type="email"
                      defaultValue="info@nexgent.io"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all">
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

