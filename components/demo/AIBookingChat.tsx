'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'

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
  },
  {
    step: 2,
    botMessage: '¿Cuál es el nombre de tu empresa?',
    field: 'company',
  },
  {
    step: 3,
    botMessage: '¿A qué sector pertenece tu negocio? (ej: salones de belleza, restaurantes, ecommerce...)',
    field: 'industry',
  },
  {
    step: 4,
    botMessage: '¿Cuántos empleados tiene tu empresa aproximadamente?',
    field: 'employees',
    options: ['1-5', '6-10', '11-25', '26-50', '51-100', '100+'],
  },
  {
    step: 5,
    botMessage: '¿Qué día te vendría mejor para la demo? Indícame una fecha (ej: 28 de octubre, próximo lunes...)',
    field: 'date',
  },
  {
    step: 6,
    botMessage: '¿Qué horario prefieres? (ej: 10:00, 15:30...)',
    field: 'time',
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

    // Add user message
    addMessage(inputValue, 'user')
    const userInput = inputValue
    setInputValue('')

    // Save user data
    const currentField = conversationFlow[currentStep].field
    setUserData((prev) => ({ ...prev, [currentField]: userInput }))

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
      // Final confirmation
      const confirmationMessage = `
¡Perfecto! ✅ He agendado tu demo para el ${userData.date} a las ${userData.time}.

📧 Te enviaré un correo de confirmación a ${userData.email} con el enlace de la videollamada.

¿Hay algo más en lo que pueda ayudarte?
      `.trim()
      
      addMessage(confirmationMessage, 'bot')
      
      // Here you would integrate with Google Calendar API
      console.log('Booking data:', { ...userData, date: userData.date, time: userData.time })
      
      // Send data to backend/Google Calendar
      await scheduleDemo({ ...userData, date: userData.date, time: userData.time })
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
      // Aquí irá la integración con Google Calendar API
      const response = await fetch('/api/schedule-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        console.log('Demo scheduled successfully')
      }
    } catch (error) {
      console.error('Error scheduling demo:', error)
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
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPaperPlane />
        </motion.button>
      </div>
    </motion.div>
  )
}

