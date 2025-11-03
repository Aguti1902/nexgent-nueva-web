'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import DemoForm from './DemoForm'
import AIBookingChat from './AIBookingChat'

const stats = [
  {
    number: '500+',
    label: 'Clientes satisfechos',
  },
  {
    number: '10.000h',
    label: 'Automatizadas al mes',
  },
  {
    number: '95%',
    label: 'Tasa de satisfacción',
  },
]

const trustedLogos = [
  { name: 'Nova Dental', logo: '/images/logos/NOVA DENTAL.png' },
  { name: 'Hello Nails', logo: '/images/logos/HELLO NAILS.png' },
  { name: 'Teresa Messia', logo: '/images/logos/TERESA.png' },
  { name: 'IQ Mind', logo: '/images/logos/IQMIND.svg' },
  { name: 'Spa Deluxe', logo: '/images/logos/SPADELUXE.png' },
  { name: 'NMY', logo: '/images/logos/NMY.png' },
]

export default function DemoHero() {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form')

  return (
    <section className="w-full text-white flex items-center justify-center">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Lado izquierdo - Estadísticas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
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
            <div className="space-y-5">
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
              className="pt-3"
            >
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4 text-left">
                YA CONFÍAN EN NEXGENT
              </p>
              <div className="grid grid-cols-3 gap-5">
                {trustedLogos.map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    className="relative h-8 flex items-center justify-start opacity-60 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      filter: 'brightness(0) invert(1)',
                    }}
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain object-left"
                      sizes="(max-width: 768px) 70px, 90px"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Lado derecho - Formulario o Chat */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 lg:p-8">
              <h2 className="font-monda text-2xl lg:text-3xl font-bold text-black mb-3">
                A un paso de optimizar tu gestión
              </h2>
              <p className="text-gray-600 text-sm lg:text-base mb-6">
                Déjanos tu información y agenda una demo personalizada con nuestro equipo.
              </p>

              {/* Tabs para cambiar entre formulario y chat */}
              <div className="grid grid-cols-1 gap-4 mb-6">
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

                {/* BOTÓN "HABLA CON IA" - OCULTO TEMPORALMENTE */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('chat')}
                  className="hidden flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 border-gray-300 hover:border-gray-400"
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

