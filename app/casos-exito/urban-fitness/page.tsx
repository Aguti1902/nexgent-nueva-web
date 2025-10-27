'use client'

import { motion } from 'framer-motion'
import { FaCheckCircle, FaArrowRight, FaCalendarAlt } from 'react-icons/fa'
import Link from 'next/link'

export default function UrbanFitnessCaseStudy() {
  const timeline = [
    { phase: 'Semana 1', title: 'Análisis de Leads', description: 'Estudio profundo del flujo de consultas, identificación de puntos de fuga y mapeo de procesos actuales.' },
    { phase: 'Semana 2-3', title: 'Configuración IA', description: 'Desarrollo del agente personalizado, entrenamiento con casos reales y integración con WhatsApp Business.' },
    { phase: 'Semana 4', title: 'Despliegue', description: 'Lanzamiento en los 8 centros, capacitación del equipo y monitoreo intensivo inicial.' },
    { phase: 'Mes 2+', title: 'Escalado', description: 'Optimización continua, expansión de capacidades y crecimiento exponencial de ventas.' },
  ]

  const beforeAfter = [
    { metric: 'Respuestas', before: '60%', after: '100%', improvement: '+40 puntos' },
    { metric: 'Tiempo de respuesta', before: '45min', after: '<2min', improvement: '96% más rápido' },
    { metric: 'Ventas mensuales', before: '€42K', after: '€119.7K', improvement: '+185%' },
    { metric: 'Satisfacción cliente', before: '74%', after: '92%', improvement: '+18 puntos' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-gray-50">
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
                <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
                  Caso de éxito: Urban Fitness
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Cadena de Gimnasios • 8 centros deportivos
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Cómo Urban Fitness pasó de perder el 40% de consultas a responder el 100% en menos de 2 minutos, 
                  aumentando las ventas un 185% y ahorrando €12K mensuales.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center"
              >
                <div className="text-center text-white p-8">
                  <h2 className="font-monda text-4xl font-bold mb-4">Urban Fitness</h2>
                  <p className="text-gray-300 text-xl">Cadena líder de gimnasios</p>
                </div>
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
                  Urban Fitness, con 8 gimnasios en operación, <strong>perdía el 40% de las consultas</strong> por 
                  WhatsApp debido a tiempos de respuesta lentos y gestión manual deficiente.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cada centro recibía entre 50-80 consultas diarias, pero solo el 60% recibía respuesta. 
                  El tiempo promedio de respuesta de 45 minutos significaba leads fríos y ventas perdidas.
                </p>
              </div>
              <div>
                <h2 className="font-monda text-3xl font-bold text-black mb-6">La Solución</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementamos un <strong>agente de IA en WhatsApp</strong> que gestiona:
                </p>
                <ul className="space-y-3">
                  {[
                    'Respuestas instantáneas 24/7 a consultas',
                    'Gestión automática de leads y seguimiento',
                    'Reservas de clases y tours guiados',
                    'Upselling inteligente de membresías',
                    'Integración con CRM y sistemas de pago'
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
              <p className="text-gray-400 text-lg">Transformación medible en todos los KPIs</p>
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
              <p className="text-gray-600 text-lg">4 semanas para transformar el negocio</p>
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
              ¿Quieres duplicar tus ventas?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Agenda una demo y descubre cómo automatizar tu gimnasio como Urban Fitness
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

