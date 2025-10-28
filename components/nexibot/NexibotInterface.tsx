'use client'

import { motion } from 'framer-motion'
import { FaRobot, FaRocket, FaCog, FaBell, FaLightbulb, FaCode, FaCheckCircle, FaCalendarAlt, FaUsers, FaStar, FaQuestionCircle, FaBrain, FaDatabase, FaPlug } from 'react-icons/fa'
import { useState } from 'react'

export default function NexibotInterface() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    {
      icon: FaBrain,
      title: 'IA Conversacional Avanzada',
      description: 'Agentes que entienden contexto, intenciones y mantienen conversaciones naturales como un humano.'
    },
    {
      icon: FaPlug,
      title: 'Integraciones Automáticas',
      description: 'Conecta con WhatsApp, Telegram, Web, Email, CRM y más. Todo configurado automáticamente.'
    },
    {
      icon: FaDatabase,
      title: 'Base de Conocimiento',
      description: 'Entrena tu agente con tu información específica. Aprende constantemente de cada interacción.'
    },
    {
      icon: FaCode,
      title: 'Sin Código',
      description: 'No necesitas programar. Describe lo que quieres y NEXIBOT genera todo el código por ti.'
    },
    {
      icon: FaCog,
      title: 'Personalización Total',
      description: 'Tono, personalidad, flujos de conversación. Cada agente es único y se adapta a tu marca.'
    },
    {
      icon: FaRocket,
      title: 'Deploy Instantáneo',
      description: 'De la idea al agente funcionando en minutos. Sin configuraciones complejas.'
    },
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Describe tu necesidad',
      description: 'Cuéntale a NEXIBOT qué quieres automatizar: reservas, atención al cliente, ventas, soporte técnico...'
    },
    {
      step: '02',
      title: 'IA analiza y genera',
      description: 'NEXIBOT analiza tu caso, diseña la arquitectura del agente y genera todo el código necesario.'
    },
    {
      step: '03',
      title: 'Configura credenciales',
      description: 'Sigue las instrucciones simples para conectar tus plataformas (WhatsApp, email, web...).'
    },
    {
      step: '04',
      title: '¡Agente funcionando!',
      description: 'Tu agente de IA está listo, operativo 24/7 y aprendiendo continuamente de cada conversación.'
    },
  ]

  const useCases = [
    { title: 'Reservas de Restaurantes', description: 'Gestión automática de mesas, horarios y confirmaciones' },
    { title: 'Atención Médica', description: 'Agendamiento de citas, recordatorios y consultas básicas' },
    { title: 'E-commerce', description: 'Recomendaciones de productos, seguimiento de pedidos y soporte' },
    { title: 'Inmobiliarias', description: 'Filtrado de leads, agendamiento de visitas y consultas' },
    { title: 'Gimnasios', description: 'Reservas de clases, planes de entrenamiento y recordatorios' },
    { title: 'Consultoría', description: 'Calificación de leads, agendamiento y seguimiento' },
  ]

  const faqs = [
    {
      question: '¿Cuánto tiempo tarda en crear un agente?',
      answer: 'NEXIBOT puede generar un agente completamente funcional en 5-10 minutos. Solo necesitas describir lo que quieres y seguir las instrucciones de conexión.'
    },
    {
      question: '¿Necesito conocimientos técnicos?',
      answer: 'No. NEXIBOT está diseñado para que cualquier persona pueda crear agentes de IA sin programar. Solo describes lo que necesitas en lenguaje natural.'
    },
    {
      question: '¿En qué plataformas funciona?',
      answer: 'Los agentes pueden funcionar en WhatsApp, Telegram, web, email, SMS y más. NEXIBOT genera el código para todas las integraciones que necesites.'
    },
    {
      question: '¿Puedo personalizar la personalidad del agente?',
      answer: 'Completamente. Puedes definir el tono, el estilo de comunicación, la personalidad y los flujos de conversación específicos que quieres.'
    },
    {
      question: '¿Cuándo estará disponible?',
      answer: 'Estamos en fase final de desarrollo. Los primeros beta testers podrán probarlo en las próximas semanas. Regístrate para ser el primero en saberlo.'
    },
  ]

  const timeline = [
    { month: 'Actual', status: 'active', title: 'Desarrollo Beta', description: 'Pruebas internas y optimización' },
    { month: 'Próximo', status: 'next', title: 'Beta Privada', description: 'Acceso para primeros usuarios' },
    { month: 'T2 2025', status: 'future', title: 'Lanzamiento Público', description: 'Disponible para todos' },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-24">
      {/* Background decorativo mejorado */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.15)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Círculos decorativos animados */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-3xl" 
      />

      <div className="relative z-10 container-custom px-6 py-20">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <FaRobot className="text-9xl text-yellow-400" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-monda text-8xl md:text-9xl font-bold mb-8 leading-none"
          >
            <span className="text-white">NEX</span>
            <span className="text-yellow-400">IBOT</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            El primer creador <span className="text-yellow-400 font-bold">automático</span> de agentes de IA
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Describe lo que necesitas y NEXIBOT genera el agente de IA perfecto para tu negocio. 
            Sin código. Sin complicaciones. En minutos.
          </motion.p>

          {/* Badge de "En Desarrollo" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border-2 border-yellow-400/50 rounded-full px-10 py-5 mb-12 shadow-lg shadow-yellow-400/20"
          >
            <FaCog className="text-yellow-400 text-3xl animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-yellow-400 font-bold text-2xl uppercase tracking-wider">
              En Desarrollo
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16"
          >
            {[
              { number: '<5 min', label: 'Crear un agente' },
              { number: '0', label: 'Líneas de código' },
              { number: '24/7', label: 'Operativo' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* FEATURES SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Potencia</span>
              <span className="text-yellow-400"> sin límites</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Todo lo que necesitas para crear agentes de IA profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-3xl p-8 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/10 group"
              >
                <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <feature.icon className="text-3xl text-yellow-400" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* HOW IT WORKS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Cómo</span>
              <span className="text-yellow-400"> funciona</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              De la idea al agente funcionando en 4 pasos simples
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.15 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center font-monda text-3xl font-bold text-black shadow-lg shadow-yellow-400/30">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-3xl mb-3 text-white">{item.title}</h3>
                    <p className="text-xl text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="absolute left-12 top-24 w-0.5 h-12 bg-gradient-to-b from-yellow-400/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* USE CASES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Casos de</span>
              <span className="text-yellow-400"> uso</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              NEXIBOT se adapta a cualquier industria y necesidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.05 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300"
              >
                <h3 className="font-bold text-xl mb-2 text-white flex items-center gap-2">
                  <FaCheckCircle className="text-yellow-400" />
                  {useCase.title}
                </h3>
                <p className="text-gray-400">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Roadmap de</span>
              <span className="text-yellow-400"> lanzamiento</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {timeline.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + index * 0.1 }}
                  className={`text-center p-8 rounded-3xl border-2 ${
                    phase.status === 'active' 
                      ? 'bg-yellow-400/10 border-yellow-400 shadow-lg shadow-yellow-400/20' 
                      : 'bg-gray-900 border-gray-700'
                  }`}
                >
                  <FaCalendarAlt className={`text-4xl mx-auto mb-4 ${
                    phase.status === 'active' ? 'text-yellow-400' : 'text-gray-500'
                  }`} />
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">{phase.month}</div>
                  <h3 className="font-bold text-2xl mb-2 text-white">{phase.title}</h3>
                  <p className="text-gray-400">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="font-monda text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Preguntas</span>
              <span className="text-yellow-400"> frecuentes</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 + index * 0.05 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-xl text-white pr-4">{faq.question}</span>
                  <FaQuestionCircle className={`text-2xl flex-shrink-0 transition-colors ${
                    openFaq === index ? 'text-yellow-400' : 'text-gray-600'
                  }`} />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA FINAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-yellow-400/10 via-yellow-500/10 to-yellow-400/10 border-2 border-yellow-400/50 rounded-3xl p-16 shadow-2xl shadow-yellow-400/20">
            <FaUsers className="text-7xl text-yellow-400 mx-auto mb-8" />
            <h2 className="font-monda text-5xl font-bold mb-6 text-white">
              Únete a la <span className="text-yellow-400">beta privada</span>
            </h2>
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Sé de los primeros en probar NEXIBOT y crear agentes de IA sin límites. 
              Cupos limitados para early adopters.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-12 py-6 rounded-full text-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-2xl shadow-yellow-400/30 hover:scale-105"
            >
              <FaBell className="text-2xl" />
              Solicitar acceso beta
              <FaStar className="text-2xl" />
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center mt-20 text-gray-500"
        >
          <p className="text-lg">Powered by NexGent AI • Creando el futuro de la automatización</p>
        </motion.div>
      </div>
    </div>
  )
}

