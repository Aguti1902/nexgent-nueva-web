'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaCheck, FaTimes, FaRobot, FaWhatsapp, FaCalendarCheck, FaBell, FaChartLine } from 'react-icons/fa'
import CalculadoraCTA from '@/components/franquicias/CalculadoraCTA'

export default function ClinicasDentalesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Específico */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRobot />
                Solución especializada en clínicas dentales
              </div>

              <h1 className="font-monda text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Automatiza las citas y recordatorios de{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  todas tus clínicas dentales con IA
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                NexGent gestiona automáticamente las citas, confirmaciones y atención al paciente en todas tus clínicas dentales. Tu equipo médico se centra en lo importante: la salud de los pacientes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Solicitar demo para mi cadena dental
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
                Desafíos de las cadenas dentales
              </h2>
              <div className="space-y-4">
                {[
                  'Pacientes que no acuden sin avisar (absentismo del 30-40%)',
                  'Recepcionistas saturadas entre llamadas y atención presencial',
                  'Cada clínica gestiona las citas de forma diferente',
                  'Pérdida de pacientes potenciales por no responder a tiempo',
                  'Falta de visibilidad global de la ocupación de las clínicas'
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
                  'Reduce absentismo un 78% con confirmaciones automáticas',
                  'Agenda y modifica citas 24/7 por WhatsApp y teléfono',
                  'Mismo protocolo de atención en todas las clínicas',
                  'Responde al instante a nuevos pacientes potenciales',
                  'Dashboard unificado con métricas de todas las clínicas'
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
              Cómo funciona en tus clínicas dentales
            </h2>
            <p className="text-xl text-gray-600">
              Integración perfecta con tu software dental
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaWhatsapp,
                title: 'Atención al paciente',
                desc: 'Responde consultas sobre tratamientos, precios, horarios y ubicación de clínicas por WhatsApp y teléfono.'
              },
              {
                icon: FaCalendarCheck,
                title: 'Gestión de citas',
                desc: 'Agenda primeras visitas y seguimientos. Se sincroniza con Gesden G5, Gesden One u otros sistemas.'
              },
              {
                icon: FaBell,
                title: 'Confirmaciones automáticas',
                desc: 'Confirma citas 24-48h antes por WhatsApp y SMS, reduciendo absentismo hasta un 78%.'
              },
              {
                icon: FaChartLine,
                title: 'Control centralizado',
                desc: 'Ve ocupación, citas pendientes y métricas de todas las clínicas desde un solo dashboard.'
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
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
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
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-12 text-white text-center">
            <h2 className="font-monda text-3xl lg:text-4xl font-bold mb-6">
              Integración con software dental
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              NexGent se conecta con Gesden G5 y Gesden One para que las citas y datos de pacientes queden registrados en vuestro sistema habitual.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {['Gesden G5', 'Gesden One', 'Otros software dentales'].map((crm, i) => (
                <div key={i} className="bg-white/20 backdrop-blur border border-white/30 rounded-xl px-6 py-3">
                  <p className="font-bold text-lg">{crm}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/80 mt-6">
              ¿Usas otro sistema? Consúltanos sobre integración personalizada
            </p>
          </div>
        </div>
      </section>

      {/* Cómo se despliega */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">
              Cómo se desplegaría en tu cadena dental
            </h2>
            <p className="text-xl text-gray-600">
              Rápido, seguro y cumpliendo con protección de datos sanitarios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Análisis y conexión',
                desc: 'Revisamos tu software dental actual (Gesden u otro) y definimos el flujo de citas y comunicación.'
              },
              {
                step: '2',
                title: 'Entrenamiento del agente',
                desc: 'Configuramos la IA con tus protocolos, tratamientos, precios y políticas de cada clínica.'
              },
              {
                step: '3',
                title: 'Activación progresiva',
                desc: 'Desplegamos en cada clínica de forma gradual. Tú supervisas todo desde la central.'
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-cyan-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora CTA */}
      <CalculadoraCTA sector="clinicas-dentales" />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">
              ¿Listo para reducir el absentismo en tus clínicas?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Clínicas dentales con NexGent reducen no-shows un 78% y aumentan ocupación un 45%
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
              >
                Ver demo para clínicas dentales
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
              ✓ Integración con Gesden · ✓ Cumple RGPD y LOPD · ✓ Soporte especializado
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

