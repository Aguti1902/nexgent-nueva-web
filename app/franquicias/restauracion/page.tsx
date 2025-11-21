'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaCheck, FaTimes, FaRobot, FaWhatsapp, FaCalendarCheck, FaPhone, FaChartLine } from 'react-icons/fa'
import CalculadoraCTA from '@/components/franquicias/CalculadoraCTA'

export default function RestauracionPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRobot /> Solución especializada en restauración
              </div>
              <h1 className="font-monda text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Más reservas y menos llamadas en{' '}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  todos los restaurantes de tu cadena
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                NexGent automatiza las reservas, gestiona las dudas sobre la carta y libera a tu equipo de sala para que se centren en ofrecer una experiencia gastronómica excepcional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="group bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2">
                  Solicitar demo para mi cadena
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contacto" className="bg-white text-black border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-black transition-all text-center">
                  Hablar con nosotros
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problemas vs Soluciones */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-monda text-3xl font-bold text-black mb-6">Desafíos de las cadenas de restauración</h2>
              <div className="space-y-4">
                {[
                  'Teléfono saturado en horas punta y reservas perdidas',
                  'Personal de sala interrumpido constantemente por llamadas',
                  'Cada local gestiona las reservas de forma distinta',
                  'Clientes que preguntan por WhatsApp y no obtienen respuesta',
                  'Falta de visibilidad global de la ocupación de todos los locales'
                ].map((problema, i) => (
                  <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <FaTimes className="text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{problema}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-monda text-3xl font-bold text-black mb-6">Cómo te ayuda NexGent</h2>
              <div className="space-y-4">
                {[
                  'Gestiona reservas 24/7 por WhatsApp, web y teléfono',
                  'Tu equipo se centra en atender a los clientes presentes',
                  'Mismo protocolo de atención en todos los restaurantes',
                  'Responde dudas sobre la carta, horarios y ubicación',
                  'Dashboard centralizado con reservas de toda la cadena'
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
            <h2 className="font-monda text-4xl font-bold text-black mb-6">Cómo funciona en tu cadena</h2>
            <p className="text-xl text-gray-600">Integración perfecta con tu sistema de reservas</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaWhatsapp, title: 'Atención multicanal', desc: 'Responde consultas sobre la carta, alergias, menús y horarios por WhatsApp, web y teléfono.' },
              { icon: FaCalendarCheck, title: 'Gestión de reservas', desc: 'Agenda y modifica reservas. Se integra con CoverManager u otros sistemas de gestión.' },
              { icon: FaPhone, title: 'Recordatorios automáticos', desc: 'Confirma reservas el día anterior, reduciendo no-shows y optimizando ocupación.' },
              { icon: FaChartLine, title: 'Control centralizado', desc: 'Ve ocupación, reservas y tendencias de todos los locales desde un dashboard unificado.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
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
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-12 text-white text-center">
            <h2 className="font-monda text-3xl lg:text-4xl font-bold mb-6">Integración con tu sistema de reservas</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              NexGent se conecta con CoverManager y otros TPVs de hostelería para que las reservas queden registradas donde ya trabajáis.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['CoverManager', 'ElTenedor', 'Otros TPVs hostelería'].map((crm, i) => (
                <div key={i} className="bg-white/20 backdrop-blur border border-white/30 rounded-xl px-6 py-3">
                  <p className="font-bold text-lg">{crm}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/80 mt-6">¿Usas otro sistema? Consúltanos sobre integración</p>
          </div>
        </div>
      </section>

      {/* Despliegue */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">Cómo se desplegaría en tu franquicia</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Análisis y setup', desc: 'Revisamos tu sistema de reservas actual y definimos el flujo ideal de atención.' },
              { step: '2', title: 'Entrenamiento', desc: 'Configuramos el agente con tu carta, políticas de reserva y tono de marca.' },
              { step: '3', title: 'Activación en todos los locales', desc: 'Desplegamos progresivamente. Control total desde la central.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-300 to-red-300" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora CTA */}
      <CalculadoraCTA sector="restauracion" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">¿Listo para llenar tus restaurantes?</h2>
            <p className="text-xl text-white/90 mb-8">Cadenas con NexGent aumentan reservas un 35% y reducen llamadas perdidas un 82%</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2">
                Ver demo para restauración
                <FaArrowRight />
              </Link>
              <Link href="/franquicias" className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-center">
                Ver otros sectores
              </Link>
            </div>
            <p className="text-sm text-white/80 mt-6">✓ Integración con CoverManager · ✓ Setup en 2 semanas</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

