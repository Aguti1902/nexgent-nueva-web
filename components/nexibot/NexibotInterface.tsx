'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaPaperPlane, FaLightbulb, FaCog, FaCode } from 'react-icons/fa'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function NexibotInterface() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy NEXIBOT, tu asistente para crear agentes de IA personalizados. Cuéntame qué necesitas automatizar en tu negocio y yo me encargo de crear el agente perfecto para ti.'
    }
  ])
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsCreating(true)

    // Simulación de respuesta
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '¡Perfecto! Estoy analizando tus necesidades... 🤖\n\nVoy a crear un agente de IA personalizado que incluirá:\n\n✅ Conversación natural en español\n✅ Integración con WhatsApp\n✅ Sistema de reservas automático\n✅ Recordatorios personalizados\n\n¿Te gustaría que añada alguna característica específica?'
      }])
      setIsCreating(false)
    }, 2000)
  }

  const examplePrompts = [
    'Necesito un agente para gestionar reservas de mi restaurante',
    'Quiero automatizar las consultas de mi clínica dental',
    'Busco un asistente virtual para mi tienda online',
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 container-custom px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <FaRobot className="text-6xl text-yellow-400" />
            </motion.div>
            <h1 className="font-monda text-6xl md:text-7xl font-bold">
              <span className="text-white">NEX</span>
              <span className="text-yellow-400">IBOT</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Creador automático de agentes de IA. Describe lo que necesitas y yo lo construyo por ti.
          </p>
        </motion.div>

        {/* Features Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: FaLightbulb, title: 'Describe tu idea', description: 'Solo cuéntame qué quieres automatizar' },
            { icon: FaCog, title: 'Yo lo creo', description: 'Genero el agente de IA perfecto para ti' },
            { icon: FaCode, title: 'Listo para usar', description: 'Te doy las instrucciones para conectarlo' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20"
            >
              <feature.icon className="text-4xl text-yellow-400 mb-4" />
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <FaRobot className="text-yellow-400 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-black">NEXIBOT</h3>
              <p className="text-xs text-black/70 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Creando agentes de IA
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-yellow-400 text-black rounded-tr-sm font-medium'
                      : 'bg-gray-800 text-white rounded-tl-sm border border-yellow-400/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isCreating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-5 py-3 border border-yellow-400/20">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick prompts */}
          {messages.length === 1 && (
            <div className="px-6 pb-4 space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Ejemplos de uso:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    className="text-xs px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-yellow-400/20 hover:text-yellow-400 transition-all duration-300 border border-gray-700 hover:border-yellow-400/50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-6 border-t border-gray-800">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe qué agente de IA necesitas..."
                className="flex-1 px-5 py-4 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:border-yellow-400 transition-colors text-white placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isCreating}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full px-6 py-4 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center gap-2"
              >
                <FaPaperPlane />
                <span className="hidden sm:inline">Crear Agente</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          <p>Powered by NexGent AI • Creando el futuro de la automatización</p>
        </motion.div>
      </div>
    </div>
  )
}

