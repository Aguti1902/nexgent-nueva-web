'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import DemoForm from './DemoForm'
import AIBookingChat from './AIBookingChat'

const stats = [
  {
    number: '90.000+',
    label: 'Clientes satisfechos',
  },
  {
    number: '40h',
    label: 'Automatizadas al mes',
  },
  {
    number: '80%',
    label: 'Más de rapidez en los cobros',
  },
]

const trustedLogos = [
  'mesura',
  'bravia fabrics',
  'Cloudworks',
  'Two Jeys',
  'Putos Modernos',
  'mambo',
]

export default function DemoHero() {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form')

  return (
    <section className="min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lado izquierdo - Estadísticas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-monda text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                Números que hablan por sí solos.
              </motion.h1>
            </div>

            {/* Estadísticas */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="font-monda text-5xl lg:text-6xl font-bold">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-base lg:text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Logos de clientes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-4"
            >
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-5">
                YA CONFÍAN EN NEXGENT
              </p>
              <div className="grid grid-cols-3 gap-5">
                {trustedLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="text-gray-500 font-medium text-sm hover:text-white transition-colors duration-300"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Lado derecho - Formulario o Chat */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 lg:p-12">
              <h2 className="font-monda text-3xl font-bold text-black mb-4">
                A un paso de optimizar tu gestión
              </h2>
              <p className="text-gray-600 mb-8">
                Déjanos tu información y elige la opción que más se ajusta a tu disponibilidad.
              </p>

              {/* Tabs para cambiar entre formulario y chat */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('form')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeTab === 'form'
                      ? 'border-black bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <svg className="w-8 h-8 mb-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-bold text-black text-sm">Agenda una demo</span>
                  <span className="text-xs text-gray-600 text-center mt-1">
                    Explora NexGent paso a paso con nuestro equipo.
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('chat')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeTab === 'chat'
                      ? 'border-black bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <svg className="w-8 h-8 mb-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-bold text-black text-sm">Habla con IA</span>
                  <span className="text-xs text-gray-600 text-center mt-1">
                    Reserva con nuestro agente de IA al instante.
                  </span>
                </motion.button>
              </div>

              {/* Contenido según el tab activo */}
              {activeTab === 'form' ? <DemoForm /> : <AIBookingChat />}

              <p className="text-xs text-gray-500 text-center mt-6">
                Al continuar confirmas que aceptas nuestros{' '}
                <a href="/aviso-legal" className="text-blue-600 hover:underline">
                  términos y condiciones
                </a>
                ,{' '}
                <a href="/politica-privacidad" className="text-blue-600 hover:underline">
                  política de privacidad
                </a>{' '}
                y{' '}
                <a href="/cookies" className="text-blue-600 hover:underline">
                  cookies
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

