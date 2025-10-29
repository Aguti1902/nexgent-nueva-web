'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'
import CalendlyModal from '../CalendlyModal'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

const conversationFlow = [
  {
    step: 0,
    botMessage: '¡Hola! 👋 Soy el asistente de NexGent. Me encantaría ayudarte a agendar una demo. ¿Cómo te llamas?',
    field: 'name',
  },
  {
    step: 1,
    botMessage: (name: string) => `Encantado de conocerte, ${name}! 😊 ¿Cuál es tu correo electrónico?`,
    field: 'email',
    validate: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    },
    errorMessage: 'Por favor, introduce un correo electrónico válido (debe contener @ y un dominio)',
  },
  {
    step: 2,
    botMessage: '¿Cuál es el nombre de tu empresa?',
    field: 'company',
  },
  {
    step: 3,
    botMessage: '¿Qué solución de IA te interesa más? Por ejemplo: automatización de WhatsApp, llamadas con IA, chatbot para web, CRM inteligente, gestión de reservas, etc.',
    field: 'interest',
  },
  {
    step: 4,
    botMessage: '¿Me das un teléfono de contacto? (Es opcional, escribe "no" si prefieres no darlo)',
    field: 'phone',
  },
]

export default function AIBookingChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: conversationFlow[0].botMessage as string,
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: messages.length,
      text,
      sender,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userInput = inputValue
    const currentFlow = conversationFlow[currentStep]
    
    // Validar email si es el paso de email
    if (currentFlow.validate && !currentFlow.validate(userInput)) {
      addMessage(userInput, 'user')
      setInputValue('')
      setIsTyping(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsTyping(false)
      addMessage(currentFlow.errorMessage || 'Por favor, verifica tu respuesta.', 'bot')
      return
    }

    // Add user message
    addMessage(userInput, 'user')
    setInputValue('')

    // Save user data
    const currentField = currentFlow.field
    const newUserData = { ...userData, [currentField]: userInput }
    setUserData(newUserData)

    // Show typing indicator
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsTyping(false)

    // Move to next step
    const nextStep = currentStep + 1
    if (nextStep < conversationFlow.length) {
      const nextFlow = conversationFlow[nextStep]
      const botMessageText = typeof nextFlow.botMessage === 'function'
        ? nextFlow.botMessage(userInput)
        : nextFlow.botMessage

      addMessage(botMessageText, 'bot')
      setCurrentStep(nextStep)
    } else {
      // Guardar en Supabase
      await scheduleDemo(newUserData)
      
      // Confirmación final
      const confirmationMessage = `¡Perfecto! 🎉 Tengo todos tus datos.

📋 Resumen:
• Nombre: ${newUserData.name}
• Email: ${newUserData.email}
• Empresa: ${newUserData.company}
• Interés: ${newUserData.interest}
${newUserData.phone && newUserData.phone.toLowerCase() !== 'no' ? `• Teléfono: ${newUserData.phone}` : ''}

Ahora voy a abrir nuestro calendario para que elijas la fecha y hora que mejor te convenga. 📅`.trim()
      
      addMessage(confirmationMessage, 'bot')
      
      // Abrir Calendly después de 2 segundos
      setTimeout(() => {
        setShowCalendly(true)
      }, 2000)
    }
  }

  const handleQuickReply = (option: string) => {
    setInputValue(option)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const scheduleDemo = async (data: Record<string, string>) => {
    try {
      // Guardar en Supabase (sin fecha/hora, se elegirá en Calendly)
      const response = await fetch('/api/schedule-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          interest: data.interest,
          phone: data.phone && data.phone.toLowerCase() !== 'no' ? data.phone : null,
          status: 'pending_calendly', // Esperando que elija en Calendly
        }),
      })
      
      if (response.ok) {
        console.log('Demo request saved successfully')
      }
    } catch (error) {
      console.error('Error saving demo request:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Chat container */}
      <div className="bg-gray-50 rounded-xl p-4 h-96 overflow-y-auto space-y-4 border border-gray-200">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-gray-200'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex items-center gap-2 mb-2">
                    <FaRobot className="text-gray-600" />
                    <span className="text-xs font-semibold text-gray-600">Asistente NexGent</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white text-black border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick reply options */}
      {conversationFlow[currentStep]?.options && (
        <div className="flex flex-wrap gap-2">
          {conversationFlow[currentStep].options?.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickReply(option)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-black hover:border-black hover:bg-gray-50 transition-all duration-200"
            >
              {option}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Escribe tu respuesta..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
          disabled={currentStep >= conversationFlow.length}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || currentStep >= conversationFlow.length}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPaperPlane />
        </motion.button>
      </div>

      {/* Modal de Calendly */}
      <CalendlyModal
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        userData={{
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          company: userData.company,
        }}
        calendlyUrl="https://calendly.com/nexgent-demo"
      />
    </motion.div>
  )
}

