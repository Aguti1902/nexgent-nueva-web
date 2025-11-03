'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HiTrash, HiDownload, HiRefresh } from 'react-icons/hi'

interface DemoRequest {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  employees: string
  agent_types: string[]
  objectives: string | null
  created_at: string
}

const agentTypeLabels: Record<string, string> = {
  whatsapp: 'WhatsApp Business',
  calls: 'Llamadas con IA',
  bookings: 'Gestión de Reservas',
  chatbot: 'Chatbot Web',
  email: 'Email Automation',
  crm: 'CRM con IA',
}

const industryLabels: Record<string, string> = {
  'salones-belleza': 'Salones de Belleza',
  'clinicas': 'Clínicas Dentales / Salud',
  'restaurantes': 'Restaurantes / Hostelería',
  'ecommerce': 'Ecommerce / Retail',
  'inmobiliarias': 'Inmobiliarias',
  'gimnasios': 'Gimnasios / Fitness',
  'hoteles': 'Hoteles / Turismo',
  'consultoria': 'Consultoría / Servicios',
  'educacion': 'Educación',
  'otro': 'Otro',
}

export default function SolicitudesDemoPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<DemoRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth !== 'true') {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    loadRequests()
  }, [router])

  const loadRequests = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/demo-requests')
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests || [])
      }
    } catch (error) {
      console.error('Error loading requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta solicitud?')) return

    try {
      const response = await fetch(`/api/demo-requests?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setRequests(requests.filter((req) => req.id !== id))
      } else {
        alert('Error al eliminar la solicitud')
      }
    } catch (error) {
      console.error('Error deleting request:', error)
      alert('Error al eliminar la solicitud')
    }
  }

  const exportToCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Sector', 'Empleados', 'Interesado en', 'Objetivos']
    const rows = requests.map((req) => [
      new Date(req.created_at).toLocaleString('es-ES'),
      req.name,
      req.email,
      req.phone,
      req.company,
      industryLabels[req.industry] || req.industry,
      req.employees,
      req.agent_types.map((type) => agentTypeLabels[type] || type).join(', '),
      req.objectives || 'N/A',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `solicitudes-demo-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Solicitudes de Demo</h1>
            <p className="text-gray-600 mt-2">Gestiona las solicitudes del formulario de demo</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadRequests}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <HiRefresh />
              Actualizar
            </button>
            <button
              onClick={exportToCSV}
              disabled={requests.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300"
            >
              <HiDownload />
              Exportar CSV
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No hay solicitudes de demo todavía</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Empresa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interés
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(request.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.email}</div>
                        <div className="text-sm text-gray-500">{request.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{request.company}</div>
                        <div className="text-sm text-gray-500">
                          {industryLabels[request.industry] || request.industry}
                        </div>
                        <div className="text-sm text-gray-500">{request.employees} empleados</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {request.agent_types.map((type) => (
                            <span
                              key={type}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {agentTypeLabels[type] || type}
                            </span>
                          ))}
                        </div>
                        {request.objectives && (
                          <div className="text-sm text-gray-500 mt-2">{request.objectives}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <HiTrash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          Total: <span className="font-bold">{requests.length}</span> solicitudes
        </div>
      </div>
    </div>
  )
}

