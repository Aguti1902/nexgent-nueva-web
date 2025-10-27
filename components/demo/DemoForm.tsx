'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaUser, FaBuilding, FaRobot, FaCalendar, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa'

interface FormData {
  // Paso 1: Información personal
  name: string
  email: string
  phone: string
  // Paso 2: Información de la empresa
  company: string
  industry: string
  employees: string
  // Paso 3: Necesidades
  agentType: string[]
  objectives: string
  // Paso 4: Disponibilidad
  preferredDate: string
  preferredTime: string
}

const agentTypes = [
  { id: 'whatsapp', label: 'WhatsApp Business', description: 'Atención 24/7 por WhatsApp' },
  { id: 'calls', label: 'Llamadas con IA', description: 'Agente telefónico inteligente' },
  { id: 'bookings', label: 'Gestión de Reservas', description: 'Automatiza tus citas' },
  { id: 'chatbot', label: 'Chatbot Web', description: 'Asistente en tu web' },
  { id: 'email', label: 'Email Automation', description: 'Automatiza emails' },
  { id: 'crm', label: 'CRM con IA', description: 'Gestión inteligente' },
]

export default function DemoForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    employees: '',
    agentType: [],
    objectives: '',
    preferredDate: '',
    preferredTime: '',
  })

  const totalSteps = 4

  // Cargar script de Calendly cuando llegamos al paso 4
  useEffect(() => {
    if (currentStep === 4) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí irá la lógica para enviar el formulario
    console.log('Form submitted:', formData)
    // Enviar a backend o API
  }

  const toggleAgentType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      agentType: prev.agentType.includes(type)
        ? prev.agentType.filter(t => t !== type)
        : [...prev.agentType, type]
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.company && formData.industry && formData.employees
      case 3:
        return formData.agentType.length > 0
      case 4:
        return true // Calendly maneja su propia validación
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Barra de progreso */}
      <div className="flex items-center mb-8 w-full">
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} className={`flex items-center ${index < 3 ? 'flex-1' : ''}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 flex-shrink-0 ${
                step < currentStep
                  ? 'bg-green-500 text-white'
                  : step === currentStep
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step < currentStep ? <FaCheck /> : step}
            </div>
            {step < 4 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Formulario por pasos */}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* PASO 1: Información Personal */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <FaUser className="text-black text-xl" />
                <h3 className="text-xl font-bold text-black">Información Personal</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email corporativo *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+34 600 000 000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* PASO 2: Información de la Empresa */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <FaBuilding className="text-black text-xl" />
                <h3 className="text-xl font-bold text-black">Información de tu Empresa</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la empresa *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nombre de tu empresa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector / Industria *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  required
                >
                  <option value="">Selecciona tu sector</option>
                  <option value="salones-belleza">Salones de Belleza</option>
                  <option value="clinicas">Clínicas Dentales / Salud</option>
                  <option value="restaurantes">Restaurantes / Hostelería</option>
                  <option value="ecommerce">Ecommerce / Retail</option>
                  <option value="inmobiliarias">Inmobiliarias</option>
                  <option value="gimnasios">Gimnasios / Fitness</option>
                  <option value="hoteles">Hoteles / Turismo</option>
                  <option value="consultoria">Consultoría / Servicios</option>
                  <option value="educacion">Educación</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de empleados *
                </label>
                <select
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="1-5">1-5 empleados</option>
                  <option value="6-10">6-10 empleados</option>
                  <option value="11-25">11-25 empleados</option>
                  <option value="26-50">26-50 empleados</option>
                  <option value="51-100">51-100 empleados</option>
                  <option value="100+">Más de 100 empleados</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* PASO 3: Necesidades */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <FaRobot className="text-black text-xl" />
                <h3 className="text-xl font-bold text-black">¿Qué te interesa automatizar?</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {agentTypes.map((agent) => (
                  <motion.button
                    key={agent.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleAgentType(agent.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      formData.agentType.includes(agent.id)
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-black hover:border-gray-400'
                    }`}
                  >
                    <div className="font-bold mb-1">{agent.label}</div>
                    <div className={`text-sm ${formData.agentType.includes(agent.id) ? 'text-gray-300' : 'text-gray-600'}`}>
                      {agent.description}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Qué objetivo principal tienes? (opcional)
                </label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  placeholder="Ej: Reducir ausencias, aumentar ventas, mejorar atención..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* PASO 4: Calendly */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <FaCalendar className="text-black text-xl" />
                <h3 className="text-xl font-bold text-black">Elige tu horario preferido</h3>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  📅 Selecciona el día y hora que mejor te convenga en nuestro calendario.
                </p>
              </div>

              {/* Calendly Widget */}
              <div 
                className="calendly-inline-widget rounded-lg overflow-hidden border border-gray-200" 
                data-url="https://calendly.com/tu-usuario-calendly/demo-nexgent?hide_gdpr_banner=1&primary_color=000000"
                style={{ minWidth: '320px', height: '700px' }}
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-700">
                  💡 Una vez reserves, recibirás un email de confirmación automático con toda la información.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones de navegación - Ocultos en paso 4 (Calendly) */}
        {currentStep < 4 && (
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaArrowLeft />
                Atrás
              </motion.button>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex-1 font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isStepValid()
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Siguiente
              <FaArrowRight />
            </motion.button>
          </div>
        )}
        
        {/* Botón "Atrás" solo en paso 4 */}
        {currentStep === 4 && (
          <div className="flex justify-start mt-8">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrevious}
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaArrowLeft />
              Atrás
            </motion.button>
          </div>
        )}
      </form>
    </div>
  )
}

