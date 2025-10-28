'use client'

import { motion } from 'framer-motion'
import { FaRobot, FaRocket, FaCog, FaBell } from 'react-icons/fa'

export default function NexibotInterface() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-24">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Círculos decorativos de fondo */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 container-custom px-6 py-20">
        {/* Logo y título principal */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-8"
          >
            <FaRobot className="text-8xl text-yellow-400" />
          </motion.div>
          
          <h1 className="font-monda text-7xl md:text-8xl font-bold mb-6">
            <span className="text-white">NEX</span>
            <span className="text-yellow-400">IBOT</span>
          </h1>
          
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Creador Automático de Agentes de IA
          </p>

          {/* Badge de "En Desarrollo" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border-2 border-yellow-400/50 rounded-full px-8 py-4 mb-12"
          >
            <FaCog className="text-yellow-400 text-2xl animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-yellow-400 font-bold text-xl uppercase tracking-wider">
              En Desarrollo
            </span>
          </motion.div>
        </motion.div>

        {/* Contenido principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {/* Card principal */}
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-3xl p-12 shadow-2xl shadow-yellow-400/10 mb-12">
            <h2 className="font-monda text-4xl font-bold text-center mb-6">
              <span className="text-white">Próximamente</span>
              <span className="text-yellow-400"> Disponible</span>
            </h2>
            
            <p className="text-xl text-gray-300 text-center leading-relaxed mb-8 max-w-3xl mx-auto">
              Estamos construyendo la herramienta más avanzada para crear agentes de IA personalizados. 
              <span className="text-yellow-400 font-semibold"> Solo describe lo que necesitas</span> y NEXIBOT 
              creará el agente perfecto para tu negocio.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: FaRocket,
                  title: 'Describe tu idea',
                  description: 'Cuéntanos qué quieres automatizar en tu negocio'
                },
                {
                  icon: FaCog,
                  title: 'NEXIBOT lo crea',
                  description: 'Generamos el agente de IA personalizado automáticamente'
                },
                {
                  icon: FaBell,
                  title: 'Listo para usar',
                  description: 'Instrucciones completas para conectar y empezar'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-6 bg-black/50 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <feature.icon className="text-5xl text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA de notificación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30 rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Quieres ser de los primeros en probarlo?
              </h3>
              <p className="text-gray-400 mb-6">
                Contacta con nosotros y te avisaremos cuando esté listo
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-8 py-4 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-yellow-400/20"
              >
                <FaBell />
                Notificarme cuando esté listo
              </a>
            </div>
          </motion.div>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-16 text-gray-500 text-sm"
          >
            <p>Powered by NexGent AI • Innovando en automatización con IA</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

