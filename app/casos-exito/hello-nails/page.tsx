'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCheckCircle, FaArrowRight, FaCalendarAlt } from 'react-icons/fa'
import Link from 'next/link'

export default function HelloNailsCaseStudy() {
  const timeline = [
    { phase: 'Semana 1-2', title: 'Análisis y Setup', description: 'Análisis profundo del negocio, configuración inicial del sistema y personalización del agente de IA.' },
    { phase: 'Semana 3-4', title: 'Implementación', description: 'Despliegue del sistema en los 200 centros, integración con sistemas existentes y capacitación del equipo.' },
    { phase: 'Mes 2', title: 'Optimización', description: 'Ajustes basados en datos reales, optimización de respuestas y automatización de procesos adicionales.' },
    { phase: 'Mes 3+', title: 'Crecimiento', description: 'Expansión de funcionalidades, escalado a nuevos centros y mejora continua basada en feedback.' },
  ]

  const beforeAfter = [
    { metric: 'Ocupación', before: '68%', after: '95%', improvement: '+27 puntos' },
    { metric: 'No-shows', before: '30%', after: '9.6%', improvement: '-68%' },
    { metric: 'Reservas mensuales', before: '2,400', after: '3,408', improvement: '+42%' },
    { metric: 'Tiempo de gestión/día', before: '4h', after: '25min', improvement: '-89%' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/casos-exito" className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors">
              <span className="mr-2">←</span> Volver a casos de éxito
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-48 h-24 mb-6">
                  <Image
                    src="/images/logos/HELLO NAILS.png"
                    alt="Hello Nails Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
                  Caso de éxito: Hello Nails
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Salón de Belleza y Uñas • Más de 200 centros
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Descubre cómo Hello Nails transformó su gestión de reservas en 200+ centros, 
                  aumentando un 42% las reservas y reduciendo los no-shows en un 68% con IA.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/FOTO HELLO NAILS.webp"
                  alt="Hello Nails - Salón de belleza"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Resumen del desafío */}
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-monda text-3xl font-bold text-black mb-6">El Desafío</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Con más de 200 centros operando simultáneamente, Hello Nails enfrentaba un problema crítico: 
                  <strong> el 30% de las citas no se completaban</strong> debido a ausencias de clientes.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  La gestión manual de reservas, confirmaciones y recordatorios consumía más de 4 horas diarias 
                  por centro, mientras que la ocupación promedio se mantenía en un bajo 68%, dejando huecos 
                  significativos en la agenda.
                </p>
              </div>
              <div>
                <h2 className="font-monda text-3xl font-bold text-black mb-6">La Solución</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementamos un <strong>sistema completo de IA</strong> que automatiza:
                </p>
                <ul className="space-y-3">
                  {[
                    'Gestión automática de reservas 24/7',
                    'Recordatorios personalizados por WhatsApp y SMS',
                    'Confirmaciones automáticas de citas',
                    'Reprogramación inteligente de huecos',
                    'Atención al cliente con IA'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Antes vs Después */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-monda text-4xl md:text-5xl font-bold mb-4">Antes vs Después</h2>
              <p className="text-gray-400 text-lg">Impacto medible en métricas clave</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {beforeAfter.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="font-bold text-xl mb-6">{item.metric}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Antes</p>
                      <p className="text-3xl font-bold text-red-400">{item.before}</p>
                    </div>
                    <FaArrowRight className="text-2xl text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Después</p>
                      <p className="text-3xl font-bold text-green-400">{item.after}</p>
                    </div>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                    <p className="text-green-400 font-bold">{item.improvement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cronología */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-4">
                Cronología del Proyecto
              </h2>
              <p className="text-gray-600 text-lg">De la implementación al éxito</p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-0 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-bold">
                      <FaCalendarAlt className="text-2xl" />
                    </div>
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                          {item.phase}
                        </span>
                      </div>
                      <h3 className="font-monda text-2xl font-bold text-black mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Agenda una demo y descubre cómo podemos ayudarte a conseguir resultados similares
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white text-black font-bold px-12 py-5 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Solicita tu demo gratuita
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

