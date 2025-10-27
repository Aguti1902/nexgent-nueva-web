'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FaWhatsapp, FaPhoneAlt, FaClock, FaCalendarCheck, FaNetworkWired } from 'react-icons/fa'

const caseStudy = {
  company: 'Urban Fitness',
  industry: 'Cadena de Gimnasios',
  franchises: '8 centros deportivos',
  projectType: 'Transformación digital con IA para gestión completa de leads y atención 24/7',
  features: [
    { icon: FaWhatsapp, title: 'Agente de IA por WhatsApp', description: 'Respuesta inmediata a consultas' },
    { icon: FaPhoneAlt, title: 'Sistema de seguimiento', description: 'Automatización de leads' },
    { icon: FaClock, title: 'Disponibilidad 24/7', description: 'Sin límite de horario' },
    { icon: FaCalendarCheck, title: 'Gestión de clases', description: 'Reservas y recordatorios' },
    { icon: FaNetworkWired, title: 'Plataforma unificada', description: 'Para todos los centros' },
  ],
  results: [
    { value: '185%', label: 'Aumento en ventas' },
    { value: '100%', label: 'Respuestas en <2min' },
    { value: '92%', label: 'Satisfacción cliente' },
    { value: '€12K', label: 'Ahorro mensual' },
  ],
}

export default function CaseStudies() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredResult, setHoveredResult] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white overflow-x-hidden w-full max-w-full relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="inline-block bg-black text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              CASO DE ÉXITO
            </span>
          </motion.div>
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
            Transformación real
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo Urban Fitness transformó su negocio con IA
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Grid superior: Logo + Foto (izquierda) | Soluciones (derecha) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Izquierda: Logo e imagen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
                className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 transition-all duration-300 h-full"
              >
                <div className="mb-8">
                  <div className="mb-6">
                    <h3 className="font-monda text-4xl font-bold text-black">{caseStudy.company}</h3>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gray-600 text-lg">{caseStudy.industry}</span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full" />
                    <span className="text-black font-bold text-lg">{caseStudy.franchises}</span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {caseStudy.projectType}
                  </p>
                </div>

                {/* Imagen del gimnasio */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group bg-gradient-to-br from-gray-900 to-black"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <h4 className="font-monda text-3xl font-bold mb-4">Urban Fitness</h4>
                      <p className="text-gray-300 text-lg">Cadena de gimnasios líder</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Derecha: Soluciones implementadas */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 h-full">
                <h4 className="font-monda font-bold text-black mb-8 text-2xl">Soluciones implementadas</h4>
                <div className="grid grid-cols-1 gap-4">
                  {caseStudy.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      onHoverStart={() => setHoveredFeature(i)}
                      onHoverEnd={() => setHoveredFeature(null)}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className={`relative bg-gray-50 rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                        hoveredFeature === i
                          ? 'shadow-lg border-2 border-black bg-white'
                          : 'border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          hoveredFeature === i ? 'bg-black text-white scale-110' : 'bg-white text-black shadow-md'
                        }`}>
                          <feature.icon className="text-xl" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-black mb-1">{feature.title}</h5>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sección inferior: Resultados ocupando todo el ancho */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-12 lg:p-16 shadow-2xl border border-gray-800 overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <span className="inline-block text-gray-400 text-sm font-semibold tracking-wider uppercase mb-3">
                    IMPACTO MEDIBLE
                  </span>
                  <h4 className="font-monda text-5xl lg:text-6xl font-bold text-white mb-4">
                    Resultados
                  </h4>
                  <div className="w-20 h-1 bg-white mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {caseStudy.results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      onHoverStart={() => setHoveredResult(i)}
                      onHoverEnd={() => setHoveredResult(null)}
                      whileHover={{ y: -8 }}
                      className="group"
                    >
                      <div className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 h-full flex flex-col items-center justify-center ${
                        hoveredResult === i 
                          ? 'bg-white shadow-2xl' 
                          : 'bg-white/5 border border-white/10 hover:border-white/30'
                      }`}>
                        {/* Decorative corner */}
                        <div className={`absolute top-0 right-0 w-16 h-16 transition-opacity duration-300 ${
                          hoveredResult === i ? 'opacity-100' : 'opacity-0'
                        }`}>
                          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-black to-transparent" />
                          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-black to-transparent" />
                        </div>

                        <motion.div
                          animate={{ 
                            scale: hoveredResult === i ? 1.1 : 1,
                            color: hoveredResult === i ? '#000000' : '#ffffff'
                          }}
                          className="font-monda text-6xl lg:text-7xl font-bold mb-4 text-center transition-colors duration-300"
                        >
                          {result.value}
                        </motion.div>
                        <motion.p 
                          animate={{
                            color: hoveredResult === i ? '#000000' : '#9ca3af'
                          }}
                          className="text-sm font-medium leading-relaxed text-center transition-colors duration-300"
                        >
                          {result.label}
                        </motion.p>

                        {/* Bottom accent line */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                          hoveredResult === i ? 'bg-black' : 'bg-white/20'
                        }`} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button centrado */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.a
                    href="/contacto"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black font-bold py-5 px-14 rounded-full transition-all duration-300 text-lg hover:bg-gray-100 shadow-xl"
                  >
                    ¿Quieres resultados así?
                  </motion.a>
                  <p className="text-gray-400 text-sm">
                    Agenda una demo gratuita y descubre el potencial de tu negocio
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
