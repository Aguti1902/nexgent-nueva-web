'use client'

import { use } from 'react'
import { agentTemplates } from '@/lib/nexibot/agent-templates'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaCheck, FaClock, FaStar, FaArrowLeft, FaRocket } from 'react-icons/fa'
import Link from 'next/link'

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const agent = agentTemplates.find(a => a.id === id)

  if (!agent) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-purple-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container-custom px-6 py-24 relative z-10">
        {/* Back button */}
        <Link
          href="/nexibot/catalog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <FaArrowLeft />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="text-7xl">{agent.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h1 className="font-monda text-4xl font-bold text-black">
                      {agent.name}
                    </h1>
                    {agent.popular && (
                      <span className="bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                        <FaStar /> Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg mb-4">
                    {agent.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
                      <FaClock />
                      Setup en {agent.estimatedSetupTime}
                    </div>
                    <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium capitalize">
                      {agent.complexity === 'simple' ? 'Fácil' :
                       agent.complexity === 'medium' ? 'Medio' : 'Avanzado'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Características completas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="font-monda text-2xl font-bold text-black mb-6">
                Características completas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Integraciones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="font-monda text-2xl font-bold text-black mb-6">
                Integraciones incluidas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {agent.integrations.map((integration, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 text-center font-semibold text-gray-800"
                  >
                    {integration}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Casos de uso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="font-monda text-2xl font-bold text-black mb-6">
                Ideal para
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl border-l-4 border-blue-500"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700 font-medium">{useCase}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sticky Pricing Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl sticky top-24"
            >
              <h3 className="font-monda text-2xl font-bold text-black mb-6">
                Planes disponibles
              </h3>

              {/* Pricing tiers */}
              <div className="space-y-4 mb-8">
                {(['starter', 'professional', 'business'] as const).map((plan) => {
                  const isRecommended = plan === agent.recommendedPlan
                  return (
                    <div
                      key={plan}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        isRecommended
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg capitalize text-black">
                          {plan}
                        </h4>
                        {isRecommended && (
                          <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Recomendado
                          </span>
                        )}
                      </div>
                      <p className="text-3xl font-bold text-black mb-2">
                        €{agent.price[plan]}
                        <span className="text-sm font-normal text-gray-500">/mes</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        {plan === 'starter' && 'Perfecto para empezar'}
                        {plan === 'professional' && 'Más popular y completo'}
                        {plan === 'business' && 'Máximo rendimiento'}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  // Aquí iría la lógica para activar el agente
                  alert(`Activando agente: ${agent.name} (plan ${agent.recommendedPlan})`)
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 mb-4"
              >
                <FaRocket />
                Activar agente ahora
              </button>

              <p className="text-center text-xs text-gray-500 mb-4">
                Sin permanencia · Cancela cuando quieras
              </p>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-3">¿Prefieres personalizarlo?</p>
                <Link
                  href="/nexibot/create"
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-black py-3 rounded-xl font-semibold transition-all"
                >
                  Crear versión custom
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  )
}

