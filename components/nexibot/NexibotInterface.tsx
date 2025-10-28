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
  const [demoStep, setDemoStep] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showOutput, setShowOutput] = useState(false)

  const demoSteps = [
    {
      prompt: "Quiero un agente para mi restaurante que gestione reservas por WhatsApp",
      output: {
        title: "Agente generado: RestauranteBot",
        features: [
          "Gestión de reservas 24/7",
          "Integración con WhatsApp Business",
          "Confirmaciones automáticas",
          "Base de datos de clientes",
          "Recordatorios personalizados"
        ],
        platforms: ["WhatsApp", "Web", "Telegram"],
        time: "4 minutos"
      }
    },
    {
      prompt: "Necesito un asistente para mi clínica dental que agende citas y responda preguntas",
      output: {
        title: "Agente generado: DentalAssistant",
        features: [
          "Agendamiento de citas",
          "Gestión de horarios",
          "Recordatorios automáticos",
          "FAQs sobre tratamientos",
          "Integración con calendario"
        ],
        platforms: ["WhatsApp", "Web", "SMS"],
        time: "5 minutos"
      }
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % demoSteps.length)
      setShowOutput(false)
      setTimeout(() => setShowOutput(true), 1000)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              Ve cómo <span className="text-yellow-400">funciona</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Escribe lo que necesitas y NEXIBOT genera tu agente de IA personalizado al instante
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-3xl p-8 md:p-12"
          >
            {/* Input del usuario */}
            <div className="mb-8">
              <label className="block text-sm text-gray-500 mb-3 uppercase tracking-wider">
                Describe tu agente de IA
              </label>
              <div className="bg-black border border-gray-700 rounded-xl p-6 min-h-[120px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={demoStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white text-lg leading-relaxed"
                  >
                    {demoSteps[demoStep].prompt}
                  </motion.p>
                </AnimatePresence>
                
                {/* Cursor parpadeante */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 bg-yellow-400 ml-1"
                />
              </div>
            </div>

            {/* Output generado */}
            <AnimatePresence mode="wait">
              {showOutput && (
                <motion.div
                  key={demoStep}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-800 pt-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <FaCheck className="text-green-400" />
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Agente generado</span>
                      </div>
                      <h3 className="font-monda text-2xl font-bold text-yellow-400">
                        {demoSteps[demoStep].output.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Tiempo de generación</div>
                      <div className="font-monda text-xl text-yellow-400">{demoSteps[demoStep].output.time}</div>
                    </div>
                  </div>

                  {/* Features del agente */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {demoSteps[demoStep].output.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-black border border-gray-800 rounded-lg p-4"
                      >
                        <FaCheck className="text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Plataformas */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm text-gray-500">Disponible en:</span>
                    {demoSteps[demoStep].output.platforms.map((platform, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-600 mt-8"
          >
            Demo interactivo • Los ejemplos se actualizan automáticamente
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
