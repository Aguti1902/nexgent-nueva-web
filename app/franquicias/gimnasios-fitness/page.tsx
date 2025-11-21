'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaCheck, FaTimes, FaRobot, FaWhatsapp, FaCalendarCheck, FaUsers, FaChartLine } from 'react-icons/fa'
import CalculadoraEmbed from '@/components/franquicias/CalculadoraEmbed'

export default function GimnasiosFitnessPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRobot /> Solución especializada en gimnasios
              </div>
              <h1 className="font-monda text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Digitaliza la atención al cliente de{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  todos tus gimnasios con IA
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                NexGent automatiza las reservas de clases, responde dudas sobre horarios y tarifas, y capta nuevos socios en todos tus centros deportivos 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2">
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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-monda text-3xl font-bold text-black mb-6">Desafíos de las cadenas de gimnasios</h2>
              <div className="space-y-4">
                {[
                  'Recepción saturada gestionando reservas de clases y atención',
                  'Leads de nuevos socios que no se atienden a tiempo',
                  'Cada gimnasio gestiona las reservas de forma diferente',
                  'Falta de seguimiento automatizado de pruebas gratuitas',
                  'Sin visibilidad global de ocupación de clases'
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
                  'Reservas de clases 24/7 por WhatsApp y web',
                  'Captación y cualificación automática de nuevos socios',
                  'Mismo protocolo de atención en todos los centros',
                  'Seguimiento automatizado de pruebas gratuitas',
                  'Dashboard con métricas de todos los gimnasios'
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">Cómo funciona en tus gimnasios</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaWhatsapp, title: 'Atención al socio', desc: 'Responde dudas sobre horarios, clases, tarifas y servicios por WhatsApp y teléfono.' },
              { icon: FaCalendarCheck, title: 'Reserva de clases', desc: 'Gestiona reservas de clases colectivas. Se integra con Xplor Resamania y Trainingym.' },
              { icon: FaUsers, title: 'Captación de socios', desc: 'Cualifica leads de nuevos socios y agenda visitas para pruebas gratuitas.' },
              { icon: FaChartLine, title: 'Control centralizado', desc: 'Ve ocupación de clases, captación y métricas de todos los centros.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-12 text-white text-center">
            <h2 className="font-monda text-3xl lg:text-4xl font-bold mb-6">Integración con tu software de gestión</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              NexGent se conecta con Xplor Resamania, Trainingym y otros sistemas para que las reservas y datos queden registrados donde ya trabajáis.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Xplor Resamania', 'Trainingym', 'Otros software fitness'].map((crm, i) => (
                <div key={i} className="bg-white/20 backdrop-blur border border-white/30 rounded-xl px-6 py-3">
                  <p className="font-bold text-lg">{crm}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">Despliegue en tu cadena</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Análisis', desc: 'Revisamos tu software actual y definimos el flujo de reservas y captación.' },
              { step: '2', title: 'Configuración', desc: 'Entrenamos el agente con tus servicios, tarifas y protocolo comercial.' },
              { step: '3', title: 'Activación', desc: 'Desplegamos en cada centro. Control total desde la central.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-300 to-emerald-300" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">
              ¿Cuánto costaría para tu cadena de gimnasios?
            </h2>
            <p className="text-xl text-gray-600">
              Inversión para captar un 62% más de socios
            </p>
          </div>
          <CalculadoraEmbed />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">¿Listo para captar más socios?</h2>
            <p className="text-xl text-white/90 mb-8">Gimnasios con NexGent aumentan captación un 62% y reducen carga de recepción un 70%</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2">
                Ver demo para gimnasios
                <FaArrowRight />
              </Link>
              <Link href="/franquicias" className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-center">
                Ver otros sectores
              </Link>
            </div>
            <p className="text-sm text-white/80 mt-6">✓ Integración con Resamania y Trainingym · ✓ Setup rápido</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

