'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FaWhatsapp, FaPhoneAlt, FaClock, FaCalendarCheck, FaNetworkWired } from 'react-icons/fa'

const cases = [
  {
    company: 'Hello Nails',
    industry: 'Salón de Belleza y Uñas',
    franchises: 'Más de 200 centros',
    logo: '/images/logos/HELLO NAILS.png',
    image: '/images/FOTO HELLO NAILS.webp',
    projectType: 'Transformación digital completa con IA para gestión automática de reservas, recordatorios y atención al cliente 24/7',
    features: [
      { icon: FaWhatsapp, title: 'Agente de IA por WhatsApp', description: 'Respuesta inmediata a consultas' },
      { icon: FaPhoneAlt, title: 'Sistema de seguimiento', description: 'Automatización de leads' },
      { icon: FaClock, title: 'Disponibilidad 24/7', description: 'Sin límite de horario' },
      { icon: FaCalendarCheck, title: 'Gestión de reservas', description: 'Reservas y recordatorios' },
      { icon: FaNetworkWired, title: 'Plataforma unificada', description: 'Para todos los centros' },
    ],
    results: [
      { value: '+42%', label: 'Aumento en reservas' },
      { value: '-68%', label: 'Reducción no-shows' },
      { value: '€2.1K', label: 'Ingresos extra mensuales' },
      { value: '95%', label: 'Ocupación promedio' },
    ],
  },
  {
    company: 'Urban Fitness',
    industry: 'Cadena de Gimnasios',
    franchises: '8 centros deportivos',
    logo: '/images/logos/URBAN FITNESS.png',
    image: '/images/FOTO URBAN FITNESS.jpg',
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
      { value: '€12K', label: 'Ahorro mensual' },
      { value: '92%', label: 'Satisfacción cliente' },
    ],
  },
  {
    company: 'Clínica Dental Sonrisa',
    industry: 'Clínica Dental',
    franchises: '3 clínicas',
    logo: null,
    image: null,
    projectType: 'Sistema completo de gestión de citas, recordatorios automáticos y seguimiento de pacientes',
    features: [
      { icon: FaWhatsapp, title: 'Recordatorios automáticos', description: 'WhatsApp y SMS personalizados' },
      { icon: FaPhoneAlt, title: 'Llamadas de seguimiento', description: 'IA que llama a pacientes' },
      { icon: FaClock, title: 'Gestión de urgencias', description: 'Priorización inteligente' },
      { icon: FaCalendarCheck, title: 'Sistema de citas', description: 'Reserva online 24/7' },
      { icon: FaNetworkWired, title: 'Historia clínica digital', description: 'Integrada con IA' },
    ],
    results: [
      { value: '-78%', label: 'Reducción no-shows' },
      { value: '+65%', label: 'Más citas mensuales' },
      { value: '€8.5K', label: 'Ingresos extra/mes' },
      { value: '98%', label: 'Satisfacción pacientes' },
    ],
  },
]

export default function FeaturedCases() {
  const [hoveredFeature, setHoveredFeature] = useState<{ caseIndex: number; featureIndex: number } | null>(null)
  const [hoveredResult, setHoveredResult] = useState<{ caseIndex: number; resultIndex: number } | null>(null)

  return (
    <section className="py-24 bg-white overflow-x-hidden w-full max-w-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
      
      <div className="container-custom relative z-10">
        {cases.map((caseStudy, caseIndex) => (
          <div key={caseIndex} className={`max-w-7xl mx-auto ${caseIndex > 0 ? 'mt-32' : ''}`}>
            <div className="space-y-8">
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
                        {caseStudy.logo && (
                          <div className="relative w-40 h-20 mb-4">
                            <Image
                              src={caseStudy.logo}
                              alt={`${caseStudy.company} Logo`}
                              fill
                              className="object-contain"
                              sizes="160px"
                            />
                          </div>
                        )}
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

                    {/* Imagen */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                    >
                      {caseStudy.image ? (
                        <>
                          <Image
                            src={caseStudy.image}
                            alt={`${caseStudy.company} - ${caseStudy.industry}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-end justify-center p-8">
                            <div className="text-center text-white">
                              <h4 className="font-monda text-3xl font-bold mb-2">{caseStudy.company}</h4>
                              <p className="text-gray-200 text-lg">{caseStudy.industry}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                          <div className="text-center text-white p-8">
                            <h4 className="font-monda text-3xl font-bold mb-4">{caseStudy.company}</h4>
                            <p className="text-gray-300 text-lg">{caseStudy.industry}</p>
                          </div>
                        </div>
                      )}
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
                          onHoverStart={() => setHoveredFeature({ caseIndex, featureIndex: i })}
                          onHoverEnd={() => setHoveredFeature(null)}
                          whileHover={{ scale: 1.03, x: 5 }}
                          className={`relative bg-gray-50 rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                            hoveredFeature?.caseIndex === caseIndex && hoveredFeature?.featureIndex === i
                              ? 'shadow-lg border-2 border-black bg-white'
                              : 'border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              hoveredFeature?.caseIndex === caseIndex && hoveredFeature?.featureIndex === i ? 'bg-black text-white scale-110' : 'bg-white text-black shadow-md'
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
                          onHoverStart={() => setHoveredResult({ caseIndex, resultIndex: i })}
                          onHoverEnd={() => setHoveredResult(null)}
                          whileHover={{ y: -8 }}
                          className="group"
                        >
                          <div className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 h-full flex flex-col items-center justify-center ${
                            hoveredResult?.caseIndex === caseIndex && hoveredResult?.resultIndex === i
                              ? 'bg-white shadow-2xl' 
                              : 'bg-white/5 border border-white/10 hover:border-white/30'
                          }`}>
                            <div className={`absolute top-0 right-0 w-16 h-16 transition-opacity duration-300 ${
                              hoveredResult?.caseIndex === caseIndex && hoveredResult?.resultIndex === i ? 'opacity-100' : 'opacity-0'
                            }`}>
                              <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-black to-transparent" />
                              <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-black to-transparent" />
                            </div>

                            <motion.div
                              animate={{ 
                                scale: hoveredResult?.caseIndex === caseIndex && hoveredResult?.resultIndex === i ? 1.1 : 1,
                                color: hoveredResult?.caseIndex === caseIndex && hoveredResult?.resultIndex === i ? '#000000' : '#ffffff'
                              }}
                              className="font-monda text-6xl lg:text-7xl font-bold mb-4 text-center transition-colors duration-300"
                            >
                              {result.value}
                            </motion.div>
                            <motion.p 
                              animate={{
                                color: hoveredResult?.caseIndex === caseIndex && hoveredResult?.resultIndex === i ? '#000000' : '#9ca3af'
                              }}
                              className="text-sm font-medium leading-relaxed text-center transition-colors duration-300"
                            >
                              {result.label}
                            </motion.p>

                            <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                              hoveredResult?.caseIndex === caseIndex && hoveredResult?.resultIndex === i ? 'bg-black' : 'bg-white/20'
                            }`} />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="flex justify-center"
                    >
                      <motion.a
                        href={`/casos-exito/${caseStudy.company.toLowerCase().replace(/ /g, '-')}`}
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black font-bold py-5 px-14 rounded-full transition-all duration-300 text-lg hover:bg-gray-100 shadow-xl"
                      >
                        Ver caso de éxito completo
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
