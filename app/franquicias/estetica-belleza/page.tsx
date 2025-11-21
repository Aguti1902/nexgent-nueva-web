'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaCheck, FaTimes, FaRobot, FaWhatsapp, FaCalendarCheck, FaBell, FaChartLine } from 'react-icons/fa'
import CalculadoraCTA from '@/components/franquicias/CalculadoraCTA'

export default function EsteticaBellezaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Específico */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRobot />
                Solución especializada en estética y belleza
              </div>

              <h1 className="font-monda text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                La IA que llena la agenda de tus centros de estética{' '}
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  sin saturar a tu equipo
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                NexGent automatiza la gestión de citas, recordatorios y atención al cliente en todos tus salones de belleza y centros de estética. Tu equipo se centra en lo que mejor hace: dar el mejor servicio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="group bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Solicitar demo para mi franquicia
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contacto"
                  className="bg-white text-black border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-black transition-all text-center"
                >
                  Hablar con nosotros
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problemas del Sector */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Problemas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-monda text-3xl font-bold text-black mb-6">
                ¿Te suena familiar?
              </h2>
              <div className="space-y-4">
                {[
                  'Llamadas perdidas porque tu equipo está atendiendo a clientes',
                  'Clientes que no se presentan sin avisar (no-shows)',
                  'Equipos de recepción saturados gestionando WhatsApp y llamadas',
                  'Cada centro responde de forma diferente a las mismas preguntas',
                  'Pérdida de oportunidades comerciales por falta de seguimiento'
                ].map((problema, i) => (
                  <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <FaTimes className="text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{problema}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Soluciones */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-monda text-3xl font-bold text-black mb-6">
                Cómo te ayuda NexGent
              </h2>
              <div className="space-y-4">
                {[
                  'Responde y agenda 24/7 en WhatsApp, web y llamadas',
                  'Recordatorios automáticos que reducen no-shows un 68%',
                  'Libera a tu equipo de tareas repetitivas',
                  'Mismo estándar de atención en todos los centros',
                  'Captura y clasifica leads automáticamente'
                ].map((solucion, i) => (
                  <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{solucion}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">
              Cómo funciona en tus centros de estética
            </h2>
            <p className="text-xl text-gray-600">
              El agente de IA aprende de tu marca y se adapta a tus procesos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaWhatsapp,
                title: 'Atención multicanal',
                desc: 'Responde consultas por WhatsApp, web y teléfono. Informa sobre servicios, precios y disponibilidad.'
              },
              {
                icon: FaCalendarCheck,
                title: 'Gestión de citas',
                desc: 'Agenda, modifica y cancela citas en tiempo real. Se integra con Flowww o Style Franquicias.'
              },
              {
                icon: FaBell,
                title: 'Recordatorios inteligentes',
                desc: 'Confirma citas automáticamente 24h antes por WhatsApp, reduciendo no-shows dramáticamente.'
              },
              {
                icon: FaChartLine,
                title: 'Dashboard central',
                desc: 'Métricas unificadas de todos los centros: citas, ocupación, leads y rendimiento.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-12 text-white text-center">
            <h2 className="font-monda text-3xl lg:text-4xl font-bold mb-6">
              Integración con tu CRM de estética
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              NexGent se conecta con Flowww y Style Franquicias (DunaSoft) para que las citas, reservas y datos de clientes queden registrados donde ya trabajáis cada día.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {['Flowww', 'Style Franquicias', 'DunaSoft'].map((crm, i) => (
                <div key={i} className="bg-white/20 backdrop-blur border border-white/30 rounded-xl px-6 py-3">
                  <p className="font-bold text-lg">{crm}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/80 mt-6">
              ¿Usas otro sistema? Consúltanos, podemos integrarnos
            </p>
          </div>
        </div>
      </section>

      {/* Cómo se despliega */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">
              Cómo se desplegaría en tu franquicia
            </h2>
            <p className="text-xl text-gray-600">
              Simple, rápido y sin interrumpir tu operativa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Analizamos tu situación',
                desc: 'Revisamos tu CRM actual, procesos de reserva y necesidades específicas de tus centros.'
              },
              {
                step: '2',
                title: 'Configuramos el agente',
                desc: 'Entrenamos la IA con tu catálogo de servicios, precios, políticas y tono de marca.'
              },
              {
                step: '3',
                title: 'Despliegue en todos los centros',
                desc: 'Activamos el agente en cada centro de forma progresiva. Tú controlas todo desde la central.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-pink-300 to-rose-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora CTA */}
      <CalculadoraCTA sector="estetica-belleza" />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-pink-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">
              ¿Listo para automatizar tus centros de estética?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Más de 200 centros de belleza ya confían en NexGent para gestionar sus reservas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
              >
                Ver demo personalizada
                <FaArrowRight />
              </Link>
              <Link
                href="/franquicias"
                className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-center"
              >
                Ver otros sectores
              </Link>
            </div>

            <p className="text-sm text-white/80 mt-6">
              ✓ Integración con Flowww y Style Franquicias · ✓ Setup en menos de 2 semanas
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

