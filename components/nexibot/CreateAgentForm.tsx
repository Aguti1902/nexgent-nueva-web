'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMagic, FaRobot, FaCheck, FaSpinner, FaLightbulb } from 'react-icons/fa'

interface AgentPreview {
  name: string
  description: string
  suggestedIntegrations: string[]
  estimatedComplexity: 'simple' | 'medium' | 'complex'
  recommendedPlan: 'starter' | 'professional' | 'business'
}

export default function CreateAgentForm() {
  const [prompt, setPrompt] = useState('')
  const [step, setStep] = useState<'input' | 'analyzing' | 'preview' | 'creating'>('input')
  const [agentPreview, setAgentPreview] = useState<AgentPreview | null>(null)
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])

  const examplePrompts = [
    "Quiero un bot que responda mensajes de WhatsApp, agende citas en Google Calendar y envíe recordatorios automáticos",
    "Necesito un agente que califique leads de mi web, les envíe emails personalizados y agende demos con los más interesados",
    "Quiero automatizar la atención al cliente de mi e-commerce: responder FAQs, dar seguimiento de pedidos y gestionar devoluciones",
    "Necesito un asistente que gestione reservas de mi restaurante, confirme por WhatsApp y actualice mi sistema de mesas"
  ]

  const handleAnalyze = async () => {
    if (!prompt.trim()) return

    setStep('analyzing')
    
    // Simular análisis con IA (aquí iría la llamada real a n8n/OpenAI)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock de análisis
    setAgentPreview({
      name: 'Asistente Personalizado',
      description: 'Agente de IA que automatiza tu flujo de trabajo descrito',
      suggestedIntegrations: ['WhatsApp Business', 'Google Calendar', 'OpenAI GPT-4', 'Email'],
      estimatedComplexity: 'medium',
      recommendedPlan: 'professional'
    })
    
    setStep('preview')
  }

  const handleCreateAgent = async () => {
    setStep('creating')
    
    // Aquí iría la llamada real a n8n para crear el workflow
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Redirigir al dashboard
    window.location.href = '/nexibot/dashboard'
  }

  const toggleIntegration = (integration: string) => {
    setSelectedIntegrations(prev =>
      prev.includes(integration)
        ? prev.filter(i => i !== integration)
        : [...prev, integration]
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* STEP 1: Input del prompt */}
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="font-monda text-3xl lg:text-4xl font-bold text-white mb-4">
                Describe tu agente ideal
              </h2>
              <p className="text-gray-300 text-lg">
                Escribe en lenguaje natural lo que necesitas. Nuestra IA lo entenderá.
              </p>
            </div>

            {/* Textarea grande */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ejemplo: Quiero un agente que responda mensajes de WhatsApp de mi negocio, califique si son clientes potenciales, agende citas automáticamente y me notifique por email..."
                className="w-full h-48 p-6 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all resize-none text-lg"
                maxLength={1000}
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                {prompt.length}/1000
              </div>
            </div>

            {/* Ejemplos rápidos */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-400">
                <FaLightbulb />
                <span className="font-semibold">Ejemplos para inspirarte:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examplePrompts.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(example)}
                    className="text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 transition-all duration-300 text-sm text-gray-300 hover:text-white"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de análisis */}
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!prompt.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
              >
                <FaMagic />
                Analizar y crear agente
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Analizando */}
        {step === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-20"
          >
            <div className="mb-8">
              <FaSpinner className="text-6xl text-blue-400 mx-auto animate-spin" />
            </div>
            <h3 className="font-monda text-2xl font-bold text-white mb-4">
              Analizando tu solicitud...
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Nuestra IA está procesando tu descripción y diseñando el agente perfecto
            </p>
            <div className="max-w-md mx-auto space-y-3">
              {[
                'Analizando requerimientos',
                'Identificando integraciones necesarias',
                'Diseñando flujo de trabajo',
                'Calculando complejidad'
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.3 }}
                  className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                >
                  <FaCheck className="text-green-400" />
                  <span className="text-gray-300">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3: Preview del agente */}
        {step === 'preview' && agentPreview && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaRobot className="text-4xl text-white" />
                </div>
              </div>
              <h2 className="font-monda text-3xl lg:text-4xl font-bold text-white mb-4">
                Tu agente está listo
              </h2>
              <p className="text-gray-300 text-lg">
                Hemos analizado tu solicitud y diseñado el agente perfecto
              </p>
            </div>

            {/* Preview Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="font-monda text-2xl font-bold text-black mb-4">
                {agentPreview.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {agentPreview.description}
              </p>

              {/* Complejidad */}
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-700 block mb-2">
                  Complejidad estimada:
                </span>
                <div className="flex gap-2">
                  {['simple', 'medium', 'complex'].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 h-2 rounded-full ${
                        level === agentPreview.estimatedComplexity
                          ? 'bg-blue-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Integraciones sugeridas */}
              <div className="mb-6">
                <h4 className="font-semibold text-black mb-3">
                  Integraciones necesarias:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {agentPreview.suggestedIntegrations.map((integration) => (
                    <label
                      key={integration}
                      className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIntegrations.includes(integration)}
                        onChange={() => toggleIntegration(integration)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {integration}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Plan recomendado */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Plan recomendado:</p>
                    <p className="font-bold text-2xl text-black capitalize">
                      {agentPreview.recommendedPlan}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Desde:</p>
                    <p className="font-bold text-2xl text-black">
                      {agentPreview.recommendedPlan === 'starter' ? '€99' :
                       agentPreview.recommendedPlan === 'professional' ? '€299' : '€699'}/mes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tu prompt original */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Tu solicitud original:</h4>
              <p className="text-gray-300 text-sm italic">"{prompt}"</p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setStep('input')}
                className="flex-1 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300"
              >
                Modificar descripción
              </button>
              <button
                onClick={handleCreateAgent}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaRobot />
                Crear mi agente ahora
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Creando el agente */}
        {step === 'creating' && (
          <motion.div
            key="creating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="mb-8">
              <div className="relative inline-block">
                <FaRobot className="text-6xl text-blue-400 animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <FaSpinner className="text-2xl text-purple-400 animate-spin" />
                </div>
              </div>
            </div>
            <h3 className="font-monda text-2xl font-bold text-white mb-4">
              Construyendo tu agente...
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Estamos configurando todas las integraciones y activando tu agente
            </p>
            <div className="max-w-md mx-auto">
              <div className="bg-white/5 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Esto solo tomará unos segundos...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

