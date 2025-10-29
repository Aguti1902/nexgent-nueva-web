'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCommentDots, FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import Image from 'next/image'
import CalendlyModal from './CalendlyModal'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface UserData {
  nombre?: string
  email?: string
  telefono?: string
  empresa?: string
}

// Generar o recuperar sessionId
const getSessionId = () => {
  if (typeof window === 'undefined') return null
  let sessionId = localStorage.getItem('chatSessionId')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('chatSessionId', sessionId)
  }
  return sessionId
}

// URL de Calendly - CAMBIA ESTO POR TU URL
const CALENDLY_URL = 'https://calendly.com/nexgent-demo/30min' // ← Pon tu URL aquí

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy el Asistente Virtual de NexGent. Me encantaría ayudarte a agendar una demo personalizada. ¿Cómo te llamas?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const [userData, setUserData] = useState<UserData>({})
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSessionId(getSessionId())
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !sessionId) return

    const userMessage = input.trim()
    setInput('')
    
    // Agregar mensaje del usuario
    const updatedMessages = [...messages, { role: 'user' as const, content: userMessage }]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          conversationHistory: messages,
        }),
      })

      if (!response.ok) throw new Error('Error en la respuesta')

      const data = await response.json()
      
      // Agregar respuesta del asistente
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      
      // Si se completó la recopilación de datos
      if (data.dataCollected && data.userData) {
        setDemoCompleted(true)
        setUserData({
          nombre: data.userData.nombre,
          email: data.userData.email,
          telefono: data.userData.telefono,
          empresa: data.userData.empresa,
        })
        
        // Mostrar mensaje y abrir Calendly
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '¡Perfecto! 🎉 Ahora voy a abrir el calendario para que elijas la fecha y hora que mejor te convenga. Un momento...'
          }])
        }, 500)
        
        // Abrir modal de Calendly después de 1.5 segundos
        setTimeout(() => {
          setShowCalendly(true)
        }, 1500)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo o contacta con nosotros directamente en info@nexgent.io o al +34 684 48 66 47.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-4 md:right-6 z-50 bg-black text-white rounded-full p-4 shadow-2xl hover:bg-gray-800 transition-colors duration-300 flex items-center gap-3 group border border-white"
            style={{ maxWidth: '90vw' }}
          >
            <div className="relative">
              <FaCommentDots className="text-2xl" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap">
              ¿Necesitas ayuda?
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[calc(100vw-3rem)] max-w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{ maxWidth: 'min(380px, 90vw)' }}
          >
            {/* Header del chat */}
            <div className="bg-black px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative">
                  <Image src="/images/ISOTIPO.png" alt="NexGent" width={24} height={24} />
                  {demoCompleted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Asistente Virtual de NexGent</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {demoCompleted ? 'Demo agendada ✓' : 'En línea'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-black text-white rounded-tr-sm'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-black transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="text-lg" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Calendly */}
      <CalendlyModal
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        userData={{
          name: userData.nombre,
          email: userData.email,
          phone: userData.telefono,
          company: userData.empresa,
        }}
        calendlyUrl={CALENDLY_URL}
      />
    </>
  )
}

