'use client'

import { AgentTemplate } from '@/lib/nexibot/agent-templates'
import { motion } from 'framer-motion'
import { FaClock, FaStar, FaArrowRight, FaCheck } from 'react-icons/fa'
import Link from 'next/link'

interface AgentCardProps {
  agent: AgentTemplate
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
    >
      {/* Header con icon y badge */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 relative">
        {agent.popular && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <FaStar /> Popular
          </div>
        )}
        <div className="text-6xl mb-4">{agent.icon}</div>
        <h3 className="font-monda text-2xl font-bold text-white mb-2">
          {agent.name}
        </h3>
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <FaClock className="text-sm" />
          <span>Setup en {agent.estimatedSetupTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-600 mb-6 leading-relaxed">
          {agent.description}
        </p>

        {/* Features principales (top 3) */}
        <div className="mb-6 space-y-2">
          <h4 className="font-semibold text-black text-sm mb-3">Características clave:</h4>
          {agent.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
          {agent.features.length > 3 && (
            <p className="text-xs text-gray-400 pl-6">
              +{agent.features.length - 3} características más
            </p>
          )}
        </div>

        {/* Integraciones */}
        <div className="mb-6">
          <h4 className="font-semibold text-black text-sm mb-3">Integraciones:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.integrations.slice(0, 3).map((integration, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {integration}
              </span>
            ))}
            {agent.integrations.length > 3 && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                +{agent.integrations.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Plan recomendado:</p>
              <p className="font-bold text-black capitalize">{agent.recommendedPlan}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Desde:</p>
              <p className="font-bold text-2xl text-black">
                €{agent.price[agent.recommendedPlan]}<span className="text-sm font-normal text-gray-500">/mes</span>
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={`/nexibot/catalog/${agent.id}`}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Ver detalles
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
