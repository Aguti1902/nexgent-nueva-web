'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FaCheck, FaRocket, FaBrain, FaPlug, FaCode, FaChartLine, FaShieldAlt } from 'react-icons/fa'

export default function NexibotInterface() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6])
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  
  // Interactive demo state
  const [userInput, setUserInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [agentData, setAgentData] = useState<any>(null)
  const [showMobileDemo, setShowMobileDemo] = useState(false)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [isBotTyping, setIsBotTyping] = useState(false)

  const examplePrompts = [
    "Quiero un agente para mi restaurante que gestione reservas por WhatsApp",
    "Necesito un asistente para mi clínica dental que agende citas",
    "Quiero un bot de atención al cliente para mi e-commerce",
    "Necesito un agente para calificar leads de mi inmobiliaria"
  ]

  const generateAgent = (prompt: string) => {
    setIsGenerating(true)
    setShowOutput(false)
    setShowMobileDemo(false)
    setUserInput(prompt)

    // Simular generación del agente
    setTimeout(() => {
      let data
      if (prompt.toLowerCase().includes('restaurante')) {
        data = {
          title: "RestauranteBot",
          features: [
            "Gestión de reservas 24/7",
            "Integración con WhatsApp Business",
            "Confirmaciones automáticas",
            "Base de datos de clientes",
            "Recordatorios personalizados"
          ],
          platforms: ["WhatsApp", "Web", "Telegram"],
          time: "4 minutos",
          chatExample: [
            { type: 'user', text: 'Hola, quiero hacer una reserva' },
            { type: 'bot', text: '¡Hola! Claro, con gusto te ayudo. ¿Para cuántas personas será la reserva?' },
            { type: 'user', text: '4 personas' },
            { type: 'bot', text: 'Perfecto, ¿para qué día y hora te gustaría reservar?' },
            { type: 'user', text: 'Mañana a las 20:00' },
            { type: 'bot', text: '✅ ¡Reserva confirmada!\n\n📅 Fecha: Mañana\n🕐 Hora: 20:00\n👥 Personas: 4\n\nTe enviaré un recordatorio 2 horas antes. ¡Nos vemos!' }
          ]
        }
      } else if (prompt.toLowerCase().includes('clínica') || prompt.toLowerCase().includes('dental')) {
        data = {
          title: "DentalAssistant",
          features: [
            "Agendamiento de citas",
            "Gestión de horarios",
            "Recordatorios automáticos",
            "FAQs sobre tratamientos",
            "Integración con calendario"
          ],
          platforms: ["WhatsApp", "Web", "SMS"],
          time: "5 minutos",
          chatExample: [
            { type: 'user', text: 'Buenos días, necesito agendar una cita' },
            { type: 'bot', text: '¡Buenos días! Estaré encantado de ayudarte. ¿Qué tipo de tratamiento necesitas?' },
            { type: 'user', text: 'Limpieza dental' },
            { type: 'bot', text: 'Perfecto. Tengo disponibilidad:\n\n📅 Lunes 28 - 10:00 AM\n📅 Miércoles 30 - 3:00 PM\n📅 Viernes 1 - 11:00 AM\n\n¿Cuál prefieres?' },
            { type: 'user', text: 'Miércoles a las 3' },
            { type: 'bot', text: '✅ ¡Cita agendada!\n\n🦷 Limpieza dental\n📅 Miércoles 30 Oct\n🕒 3:00 PM\n👨‍⚕️ Dr. García\n\nTe enviaré un recordatorio el día anterior.' }
          ]
        }
      } else if (prompt.toLowerCase().includes('ecommerce') || prompt.toLowerCase().includes('e-commerce')) {
        data = {
          title: "EcommerceBot",
          features: [
            "Atención al cliente 24/7",
            "Seguimiento de pedidos",
            "Recomendaciones de productos",
            "Gestión de devoluciones",
            "Soporte multilenguaje"
          ],
          platforms: ["WhatsApp", "Web", "Messenger"],
          time: "4 minutos",
          chatExample: [
            { type: 'user', text: 'Hola, ¿dónde está mi pedido?' },
            { type: 'bot', text: '¡Hola! Te ayudo a rastrearlo. ¿Cuál es tu número de pedido?' },
            { type: 'user', text: '#12345' },
            { type: 'bot', text: '📦 Estado de tu pedido:\n\n🚚 En tránsito\n📍 Llegará mañana antes de las 6 PM\n\nPuedes rastrearlo en: tracking.com/12345' }
          ]
        }
      } else {
        data = {
          title: "InmobiliariaBot",
          features: [
            "Calificación de leads",
            "Agendamiento de visitas",
            "Información de propiedades",
            "Filtrado automático",
            "CRM integrado"
          ],
          platforms: ["WhatsApp", "Web", "Telegram"],
          time: "5 minutos",
          chatExample: [
            { type: 'user', text: 'Hola, busco un piso en Madrid' },
            { type: 'bot', text: '¡Hola! Perfecto, te ayudo a encontrarlo. ¿Qué presupuesto máximo tienes?' },
            { type: 'user', text: 'Hasta 300.000€' },
            { type: 'bot', text: 'Genial, ¿cuántos dormitorios necesitas?' },
            { type: 'user', text: '2 o 3' },
            { type: 'bot', text: '✅ He encontrado 12 propiedades que coinciden:\n\n🏠 Piso en Chamberí - 280.000€\n🏠 Piso en Retiro - 295.000€\n🏠 Piso en Salamanca - 300.000€\n\n¿Te gustaría agendar una visita?' }
          ]
        }
      }
      
      setAgentData(data)
      setIsGenerating(false)
      setShowOutput(true)
    }, 2000)
  }

  const startMobileDemo = () => {
    setShowMobileDemo(true)
    setChatMessages([])
    
    // Simular conversación paso a paso
    if (agentData?.chatExample) {
      let index = 0
      const showNextMessage = () => {
        if (index < agentData.chatExample.length) {
          const message = agentData.chatExample[index]
          
          if (message.type === 'bot') {
            setIsBotTyping(true)
            setTimeout(() => {
              setChatMessages(prev => [...prev, message])
              setIsBotTyping(false)
              index++
              setTimeout(showNextMessage, 1500)
            }, 1500)
          } else {
            setChatMessages(prev => [...prev, message])
            index++
            setTimeout(showNextMessage, 1000)
          }
        }
      }
      
      setTimeout(showNextMessage, 500)
    }
  }

  const features = [
    { 
      icon: FaBrain,
      title: 'IA Conversacional Avanzada', 
      description: 'Agentes que comprenden contexto, mantienen el historial de conversaciones y aprenden de cada interacción para mejorar continuamente.' 
    },
    { 
      icon: FaCode,
      title: 'Sin código necesario', 
      description: 'Describe lo que necesitas en lenguaje natural. NEXIBOT se encarga de generar todo el código, arquitectura y configuraciones necesarias.' 
    },
    { 
      icon: FaPlug,
      title: 'Integraciones ilimitadas', 
      description: 'Conecta automáticamente con WhatsApp, Telegram, Web, Email, CRM, calendarios y más de 50 plataformas diferentes.' 
    },
    { 
      icon: FaRocket,
      title: 'Deploy instantáneo', 
      description: 'De la idea al agente funcionando en minutos. Sin servidores, sin configuración técnica, sin complicaciones.' 
    },
  ]

  const useCases = [
    { industry: 'Restaurantes', use: 'Gestión de reservas, pedidos y consultas' },
    { industry: 'Clínicas', use: 'Agendamiento de citas y recordatorios' },
    { industry: 'E-commerce', use: 'Atención al cliente y seguimiento de pedidos' },
    { industry: 'Inmobiliarias', use: 'Calificación de leads y visitas' },
    { industry: 'Educación', use: 'Inscripciones y soporte a estudiantes' },
    { industry: 'Gimnasios', use: 'Reservas de clases y planes personalizados' },
  ]

  const techFeatures = [
    { label: 'Procesamiento de lenguaje natural', value: 'GPT-4 & Claude' },
    { label: 'Base de conocimiento', value: 'Vector embeddings' },
    { label: 'Memoria conversacional', value: 'Contexto ilimitado' },
    { label: 'Multilenguaje', value: '95+ idiomas' },
    { label: 'Tiempo de respuesta', value: '<2 segundos' },
    { label: 'Disponibilidad', value: '99.9% uptime' },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid sutil */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,1)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(255,215,0,1)_0.5px,transparent_0.5px)] bg-[size:80px_80px]" />
      </div>

      {/* Gradient */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-yellow-400/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <motion.section 
        style={{ opacity, y }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <Image
                src="/images/LOGONEXIBOT.png"
                alt="NEXIBOT"
                fill
                className="object-contain opacity-90"
              />
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-monda text-7xl md:text-9xl font-bold leading-none mb-6 tracking-tight"
          >
            <span className="text-white">NEX</span>
            <span className="text-yellow-400">IBOT</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            El primer creador automático de agentes de IA del mercado
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            Describe tu necesidad y obtén un agente de IA completamente funcional en minutos. Sin programar, sin configuraciones complejas, sin límites.
          </motion.p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-yellow-400/30 rounded-full backdrop-blur-sm mb-16"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-sm tracking-wider uppercase">En desarrollo • Beta Q2 2025</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-12 max-w-4xl mx-auto"
          >
            {[
              { value: '<5min', label: 'Tiempo de creación' },
              { value: '0 líneas', label: 'De código necesario' },
              { value: '24/7', label: 'Operativo sin parar' },
            ].map((stat, index) => (
              <div key={index} className="border-l border-gray-800 pl-6 text-left">
                <div className="font-monda text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-gray-600 uppercase tracking-widest">Descubre más</div>
            <div className="w-px h-16 bg-gradient-to-b from-gray-600 to-transparent" />
          </div>
        </motion.div>
      </motion.section>

      {/* DEMO INTERACTIVO */}
      <section className="relative py-32 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              Pruébalo <span className="text-yellow-400">ahora</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Describe tu idea o selecciona un ejemplo y ve cómo NEXIBOT crea tu agente al instante
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Panel de generación */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-3xl p-8"
            >
              <label className="block text-sm text-gray-500 mb-4 uppercase tracking-wider">
                Describe tu agente de IA
              </label>
              
              {/* Input editable */}
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ej: Quiero un agente para mi tienda online que responda dudas y gestione pedidos..."
                className="w-full bg-black border border-gray-700 rounded-xl p-6 text-white text-lg leading-relaxed min-h-[140px] mb-6 resize-none focus:outline-none focus:border-yellow-400/50 transition-colors"
              />

              {/* Ejemplos predefinidos */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">O selecciona un ejemplo:</p>
                <div className="grid gap-3">
                  {examplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => generateAgent(prompt)}
                      className="text-left bg-black border border-gray-700 hover:border-yellow-400/50 rounded-lg p-4 text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
                    >
                      <span className="text-yellow-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón generar */}
              <button
                onClick={() => userInput && generateAgent(userInput)}
                disabled={!userInput || isGenerating}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Generando agente...
                  </>
                ) : (
                  <>
                    <FaRocket />
                    Generar mi agente
                  </>
                )}
              </button>

              {/* Output generado */}
              <AnimatePresence>
                {showOutput && agentData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-800 pt-8 mt-8"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <FaCheck className="text-green-400" />
                          <span className="text-sm text-gray-500 uppercase tracking-wider">Agente generado</span>
                        </div>
                        <h3 className="font-monda text-2xl font-bold text-yellow-400">
                          {agentData.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Tiempo</div>
                        <div className="font-monda text-xl text-yellow-400">{agentData.time}</div>
                      </div>
                    </div>

                    {/* Features del agente */}
                    <div className="space-y-3 mb-6">
                      {agentData.features.map((feature: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 bg-black border border-gray-800 rounded-lg p-3"
                        >
                          <FaCheck className="text-yellow-400 flex-shrink-0 text-sm" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Plataformas */}
                    <div className="flex items-center gap-3 flex-wrap mb-6">
                      <span className="text-sm text-gray-500">Disponible en:</span>
                      {agentData.platforms.map((platform: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>

                    {/* Botón ver demo */}
                    <button
                      onClick={startMobileDemo}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      📱 Ver agente en acción
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Simulación móvil */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                {/* Marco del móvil */}
                <div className="w-[340px] h-[680px] bg-gray-900 rounded-[3rem] p-4 border-8 border-gray-800 shadow-2xl relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl" />
                  
                  {/* Pantalla */}
                  <div className="w-full h-full bg-black rounded-[2.3rem] overflow-hidden flex flex-col">
                    {/* Header del chat */}
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <FaBrain className="text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-black">{agentData?.title || 'Tu Agente IA'}</h4>
                        <p className="text-xs text-black/70">
                          {showMobileDemo ? 'En línea' : 'Listo para conversar'}
                        </p>
                      </div>
                    </div>

                    {/* Área de mensajes */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
                      <AnimatePresence>
                        {!showMobileDemo && !agentData && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex items-center justify-center text-center"
                          >
                            <div>
                              <div className="text-6xl mb-4">💬</div>
                              <p className="text-gray-500">
                                Genera un agente para ver<br />cómo funciona en tiempo real
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {showMobileDemo && chatMessages.map((message, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-3 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                                message.type === 'user'
                                  ? 'bg-yellow-400 text-black rounded-br-sm'
                                  : 'bg-gray-800 text-white rounded-bl-sm'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line">{message.text}</p>
                            </div>
                          </motion.div>
                        ))}

                        {isBotTyping && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start mb-3"
                          >
                            <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                              <div className="flex gap-1">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                  className="w-2 h-2 bg-gray-500 rounded-full"
                                />
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                  className="w-2 h-2 bg-gray-500 rounded-full"
                                />
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                  className="w-2 h-2 bg-gray-500 rounded-full"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Input de mensaje */}
                    <div className="bg-gray-900 p-3 flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-500">
                        Escribe un mensaje...
                      </div>
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-black">➤</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-600 mt-8"
          >
            💡 Demo 100% interactivo • Escribe tu idea o selecciona un ejemplo para empezar
          </motion.p>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="relative py-32 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              Potencia <span className="text-yellow-400">sin límites</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Todo lo que necesitas para crear agentes de IA profesionales está integrado
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 hover:border-yellow-400/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <feature.icon className="text-2xl text-yellow-400" />
                </div>
                <h3 className="font-monda text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="relative py-32 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              Para cualquier <span className="text-yellow-400">industria</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              NEXIBOT se adapta a las necesidades específicas de tu negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-black border border-gray-800 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300"
              >
                <h3 className="font-monda text-xl font-bold mb-3 text-yellow-400">{useCase.industry}</h3>
                <p className="text-gray-400">{useCase.use}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      <section className="relative py-32 px-6 border-t border-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              Tecnología <span className="text-yellow-400">de vanguardia</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Construido sobre la infraestructura de IA más avanzada del mercado
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              {techFeatures.map((tech, index) => (
                <div key={index} className="flex items-start justify-between border-b border-gray-800 pb-6">
                  <div className="text-gray-400">{tech.label}</div>
                  <div className="font-monda text-yellow-400 font-bold">{tech.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="relative py-32 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              Cómo <span className="text-yellow-400">empezar</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              De la idea al agente funcionando en 3 simples pasos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                number: '01', 
                title: 'Describe tu necesidad',
                description: 'Explica en lenguaje natural qué quieres que haga tu agente. No necesitas conocimientos técnicos.'
              },
              { 
                number: '02', 
                title: 'NEXIBOT lo genera',
                description: 'Nuestra IA analiza tu caso, diseña la arquitectura y genera todo el código automáticamente.'
              },
              { 
                number: '03', 
                title: 'Conecta y despliega',
                description: 'Sigue las instrucciones simples para conectar tus plataformas y tu agente estará operativo.'
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="font-monda text-7xl font-bold text-yellow-400/20 mb-6">{step.number}</div>
                <h3 className="font-monda text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/30 rounded-3xl p-12 md:p-16">
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              Acceso <span className="text-yellow-400">anticipado</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Únete a la lista de espera y sé de los primeros en crear agentes de IA sin límites. Cupos limitados para beta testers.
            </p>

            <a
              href="/contacto"
              className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-5 rounded-full transition-all duration-300 text-lg group"
            >
              <FaRocket className="text-xl" />
              <span>Solicitar acceso beta</span>
              <div className="w-2 h-2 rounded-full bg-black group-hover:w-4 transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-600 tracking-wider">
            POWERED BY NEXGENT AI • CREANDO EL FUTURO DE LA AUTOMATIZACIÓN
          </p>
        </div>
      </footer>
    </div>
  )
}
