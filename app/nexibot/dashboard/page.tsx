'use client'

import { motion } from 'framer-motion'
import { FaRobot, FaCheck, FaChartLine, FaCog, FaPlay, FaPause } from 'react-icons/fa'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data de agentes
  const agents = [
    {
      id: '1',
      name: 'Asistente WhatsApp',
      status: 'active',
      conversations: 1247,
      successRate: 94,
      lastActive: 'Hace 2 minutos'
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container-custom px-6 py-24">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FaCheck className="text-2xl text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-monda text-2xl font-bold text-black mb-2">
                ¡Tu agente está activo! 🎉
              </h2>
              <p className="text-gray-700 mb-4">
                Tu agente de IA se ha creado exitosamente y ya está procesando solicitudes en tiempo real.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-lg px-4 py-2 border border-green-200">
                  <p className="text-xs text-gray-600">Setup completado en</p>
                  <p className="font-bold text-black">47 segundos</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-green-200">
                  <p className="text-xs text-gray-600">Integraciones configuradas</p>
                  <p className="font-bold text-black">4 servicios</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-green-200">
                  <p className="text-xs text-gray-600">Estado actual</p>
                  <p className="font-bold text-green-600">● Activo</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-monda text-4xl font-bold text-black mb-2">
              Mis Agentes
            </h1>
            <p className="text-gray-600">
              Gestiona y monitorea tus agentes de IA en tiempo real
            </p>
          </div>
          <Link
            href="/nexibot/create"
            className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <FaRobot />
            Crear nuevo agente
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaRobot className="text-2xl text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+100%</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Agentes activos</p>
            <p className="font-monda text-3xl font-bold text-black">1</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-2xl text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+247%</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Conversaciones hoy</p>
            <p className="font-monda text-3xl font-bold text-black">1,247</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheck className="text-2xl text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+5%</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Tasa de éxito</p>
            <p className="font-monda text-3xl font-bold text-black">94%</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaCog className="text-2xl text-orange-600" />
              </div>
              <span className="text-blue-600 text-sm font-semibold">En vivo</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Tiempo respuesta</p>
            <p className="font-monda text-3xl font-bold text-black">0.8s</p>
          </div>
        </div>

        {/* Agents List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-monda text-xl font-bold text-black">
              Agentes activos
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {agents.map((agent) => (
              <div key={agent.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <FaRobot className="text-3xl text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-black">
                          {agent.name}
                        </h3>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          ● Activo
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                        <span>{agent.conversations.toLocaleString()} conversaciones</span>
                        <span>{agent.successRate}% éxito</span>
                        <span>{agent.lastActive}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-3 rounded-lg border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all">
                      <FaPause />
                    </button>
                    <button className="p-3 rounded-lg border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all">
                      <FaCog />
                    </button>
                    <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all">
                      Ver métricas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA para crear más */}
        <div className="mt-12 bg-gradient-to-br from-blue-950 via-purple-950 to-black rounded-2xl p-12 text-center">
          <h3 className="font-monda text-3xl font-bold text-white mb-4">
            ¿Listo para crear más agentes?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Escala tu automatización creando agentes especializados para diferentes tareas
          </p>
          <Link
            href="/nexibot/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <FaRobot />
            Crear otro agente
          </Link>
        </div>
      </div>
    </main>
  )
}

