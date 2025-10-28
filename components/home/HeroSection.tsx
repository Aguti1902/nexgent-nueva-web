'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { FaCheckCircle } from 'react-icons/fa'

export default function HeroSection() {

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-white overflow-hidden w-full max-w-full">
      {/* Grid sutil de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="container-custom px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Contenido centrado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge sutil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-5 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm font-medium text-gray-700">Automatización inteligente para empresas</span>
            </motion.div>

            {/* Título principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-monda text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.15] tracking-tight mb-6"
            >
              Automatiza tu negocio con agentes de IA
            </motion.h1>

            {/* Subtítulo */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Atención al cliente, reservas, recordatorios y ventas. Todo automatizado 24/7 mientras tú haces crecer tu negocio.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Button 
                variant="primary" 
                size="md" 
                href="/demo" 
                className="bg-black hover:bg-gray-800 text-white border-0"
              >
                Solicita una demo
              </Button>
              <Button 
                variant="outline" 
                size="md" 
                href="/servicios"
              >
                Ver más
              </Button>
            </motion.div>

            {/* Trust badges minimalistas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-black text-xs" />
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-black text-xs" />
                <span>Listo en 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-black text-xs" />
                <span>Soporte 24/7</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Mockup mejorado - Más grande y destacado */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative max-w-6xl mx-auto mt-8"
          >
            {/* Sombra de fondo sutil */}
            <div className="absolute inset-0 bg-black/5 blur-3xl rounded-3xl transform scale-95 -z-10" />
            
            <div className="relative bg-white rounded-3xl shadow-[0_25px_100px_-20px_rgba(0,0,0,0.25)] border border-gray-200 overflow-hidden">
              {/* Header del chat */}
              <div className="bg-black px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Image src="/images/ISOTIPO.png" alt="Bot" width={32} height={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Nexibot</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      En línea
                    </p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                  <p className="text-sm text-white font-medium">24/7 Disponible</p>
                </div>
              </div>

              {/* Conversación sin auto-scroll */}
              <div 
                className="relative h-[580px] overflow-y-auto bg-gradient-to-b from-gray-50 to-white scroll-smooth"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb #f9fafb' }}
              >
                <div className="p-10 space-y-5 pb-20">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm border border-gray-200 max-w-lg">
                      <p className="text-gray-800 text-base">¡Hola! 👋 Soy Nexibot, tu asistente virtual. ¿En qué puedo ayudarte hoy?</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex justify-end"
                  >
                    <div className="bg-black text-white rounded-3xl rounded-tr-sm px-6 py-4 shadow-md max-w-lg">
                      <p className="text-base">Hola, necesito información sobre vuestros servicios</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm border border-gray-200 max-w-lg">
                      <p className="text-gray-800 text-base">¡Encantado de ayudarte! 😊 Ofrecemos automatización con IA para:</p>
                      <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        <li>• Atención al cliente 24/7</li>
                        <li>• Gestión de reservas</li>
                        <li>• Llamadas automatizadas</li>
                        <li>• Y mucho más...</li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="flex justify-end"
                  >
                    <div className="bg-black text-white rounded-3xl rounded-tr-sm px-6 py-4 shadow-md max-w-lg">
                      <p className="text-base">Me interesa! ¿Puedo agendar una demo?</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm border border-gray-200 max-w-lg">
                      <p className="text-gray-800 text-base">¡Por supuesto! 🎯 Sería un placer mostrarte cómo funciona. ¿Qué día y hora te viene bien?</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                    className="flex justify-end"
                  >
                    <div className="bg-black text-white rounded-3xl rounded-tr-sm px-6 py-4 shadow-md max-w-lg">
                      <p className="text-base">Mañana a las 17:00 estaría perfecto</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.5 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm border border-gray-200 max-w-lg">
                      <p className="text-gray-800 mb-4 text-base">¡Genial! 📅 Déjame confirmar los detalles de tu demo:</p>
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2">
                        <p className="text-sm text-gray-800 font-medium">📅 Mañana a las 17:00</p>
                        <p className="text-sm text-gray-600">⏱️ Duración: 30 minutos</p>
                        <p className="text-sm text-gray-600">💻 Online (Zoom/Meet)</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.7 }}
                    className="flex justify-end"
                  >
                    <div className="bg-black text-white rounded-3xl rounded-tr-sm px-6 py-4 shadow-md max-w-lg">
                      <p className="text-base">¡Perfecto! Confirmo la reserva 👍</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.9 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm border border-green-200 max-w-lg">
                      <p className="text-gray-800 text-base flex items-center gap-2 mb-3">
                        <span className="text-green-600 font-bold text-xl">✓</span>
                        <span className="font-semibold">¡Demo confirmada!</span>
                      </p>
                      <p className="text-sm text-gray-600">Te he enviado un email de confirmación con el enlace de la videollamada. También recibirás un recordatorio 1 hora antes. ¡Nos vemos mañana! 🚀</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
