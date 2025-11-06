'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { agentTemplates, AgentCategory } from '@/lib/nexibot/agent-templates'
import AgentCard from '@/components/nexibot/AgentCard'
import { FaFilter, FaSearch, FaStar } from 'react-icons/fa'

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories: { value: AgentCategory | 'all', label: string, emoji: string }[] = [
    { value: 'all', label: 'Todos', emoji: '🎯' },
    { value: 'customer-service', label: 'Atención al cliente', emoji: '💬' },
    { value: 'sales', label: 'Ventas', emoji: '💰' },
    { value: 'booking', label: 'Reservas', emoji: '📅' },
    { value: 'ecommerce', label: 'E-commerce', emoji: '🛒' },
    { value: 'marketing', label: 'Marketing', emoji: '📢' },
  ]

  const filteredAgents = agentTemplates.filter(agent => {
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-purple-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container-custom px-6 py-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-3 inline-flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium text-purple-100 text-sm">Catálogo de agentes IA</span>
            </div>
          </div>

          <h1 className="font-monda text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Agentes predefinidos
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              listos para usar
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Elige un agente del catálogo y personalízalo a tu negocio.
            <br />
            Activación en menos de 5 minutos.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Buscar agentes por nombre o función..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all text-lg"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl shadow-blue-500/30'
                  : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-gray-300">
            {filteredAgents.length} {filteredAgents.length === 1 ? 'agente encontrado' : 'agentes encontrados'}
          </p>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="font-monda text-2xl font-bold text-white mb-4">
              No se encontraron agentes
            </h3>
            <p className="text-gray-300 mb-8">
              Intenta con otros términos de búsqueda o categorías
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Custom Agent CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-2 border-blue-400/30 rounded-3xl p-12 text-center">
          <h3 className="font-monda text-3xl font-bold text-white mb-4">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Crea un agente personalizado desde cero. Describe lo que necesitas y nuestra IA lo construirá automáticamente.
          </p>
          <Link
            href="/nexibot/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Crear agente custom
          </Link>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  )
}

