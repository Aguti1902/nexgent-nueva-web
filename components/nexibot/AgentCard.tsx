'use client'

import { motion } from 'framer-motion'
import { AgentTemplate } from '@/lib/nexibot/agent-templates'
import { FaClock, FaRocket, FaCheckCircle } from 'react-icons/fa'
import Link from 'next/link'

interface AgentCardProps {
  agent: AgentTemplate
  index: number
}

const categoryColors = {
  'customer-service': 'bg-blue-100 text-blue-800',
  'sales': 'bg-green-100 text-green-800',
  'operations': 'bg-purple-100 text-purple-800',
  'marketing': 'bg-pink-100 text-pink-800'
}

const categoryLabels = {
  'customer-service': 'Atención Cliente',
  'sales': 'Ventas',
  'operations': 'Operaciones',
  'marketing': 'Marketing'
}

export default function AgentCard({ agent, index }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl group"
    >
      {/* Icon y Category */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{agent.icon}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[agent.category]}`}>
          {categoryLabels[agent.category]}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-monda text-xl lg:text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">
        {agent.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {agent.description}
      </p>

      {/* Features */}
      <div className="space-y-2 mb-6">
        {agent.features.slice(0, 3).map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-400" />
          <span className="text-sm text-gray-600">{agent.estimatedSetupTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRocket className="text-gray-400" />
          <span className="text-sm text-gray-600">{agent.monthlyConversations.toLocaleString()} msg/mes</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/nexibot/agent/${agent.id}`}
          className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 text-center"
        >
          Ver detalles
        </Link>
        <button
          className="flex-1 border-2 border-black text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300"
        >
          Activar ahora
        </button>
      </div>

      {/* Pricing Badge */}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          Desde <span className="font-bold text-black">
            {agent.pricing === 'starter' ? '€99' : agent.pricing === 'professional' ? '€299' : '€699'}
          </span>/mes
        </span>
      </div>
    </motion.div>
  )
}

