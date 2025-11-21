'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaCheck, FaTimes, FaRobot, FaWhatsapp, FaCalendarCheck, FaFilter, FaChartLine } from 'react-icons/fa'
import CalculadoraEmbed from '@/components/franquicias/CalculadoraEmbed'

export default function InmobiliariasPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRobot /> Solución especializada en inmobiliarias
              </div>
              <h1 className="font-monda text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Centraliza leads y visitas de{' '}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  todas tus oficinas inmobiliarias con IA
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                NexGent capta y cualifica leads automáticamente, agenda visitas en la oficina correcta y asegura que ningún cliente potencial quede sin atender en tu red de agencias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                  Solicitar demo para mi red
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
              <h2 className="font-monda text-3xl font-bold text-black mb-6">Desafíos de las redes inmobiliarias</h2>
              <div className="space-y-4">
                {[
                  'Leads que llegan y no se atienden con la rapidez necesaria',
                  'Clientes que contactan fuera del horario de oficina',
                  'Cada oficina gestiona los leads de forma diferente',
                  'Falta de cualificación previa antes de asignar a un comercial',
                  'Sin visibilidad de qué oficina está mejor para cada lead'
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
                  'Captación y respuesta instantánea 24/7',
                  'Cualifica leads: compra/venta, zona, presupuesto',
                  'Protocolo unificado en todas las oficinas',
                  'Agenda visitas automáticamente en la oficina correcta',
                  'Dashboard centralizado con todos los leads de la red'
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
            <h2 className="font-monda text-4xl font-bold text-black mb-6">Cómo funciona en tu red inmobiliaria</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaWhatsapp, title: 'Captación 24/7', desc: 'Responde leads al instante por WhatsApp, web y teléfono. Informa sobre inmuebles, zonas y servicios.' },
              { icon: FaFilter, title: 'Cualificación inteligente', desc: 'Pregunta por necesidades: compra/venta, zona deseada, presupuesto y urgencia.' },
              { icon: FaCalendarCheck, title: 'Agendamiento automático', desc: 'Agenda visitas en la oficina más cercana o apropiada. Se integra con Inmovilla y Optima-CRM.' },
              { icon: FaChartLine, title: 'Control centralizado', desc: 'Ve todos los leads, conversiones y visitas de toda la red desde un dashboard.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
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
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl p-12 text-white text-center">
            <h2 className="font-monda text-3xl lg:text-4xl font-bold mb-6">Integración con tu CRM inmobiliario</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              NexGent se conecta con Inmovilla, Optima-CRM y otros sistemas para que los leads y visitas queden registrados donde ya trabajáis.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Inmovilla', 'Optima-CRM', 'Otros CRMs inmobiliarios'].map((crm, i) => (
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
            <h2 className="font-monda text-4xl font-bold text-black mb-6">Despliegue en tu red</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Análisis CRM', desc: 'Revisamos tu CRM actual y definimos el flujo de captación y cualificación.' },
              { step: '2', title: 'Entrenamiento', desc: 'Configuramos el agente con tu cartera de inmuebles, zonas y protocolo comercial.' },
              { step: '3', title: 'Activación en red', desc: 'Desplegamos en todas las oficinas. Control total desde la central.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-indigo-300" />}
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
              ¿Cuánto costaría para tu red inmobiliaria?
            </h2>
            <p className="text-xl text-gray-600">
              Inversión para aumentar conversión un 55%
            </p>
          </div>
          <CalculadoraEmbed />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">¿Listo para captar más leads?</h2>
            <p className="text-xl text-white/90 mb-8">Redes inmobiliarias con NexGent aumentan conversión un 55% y reducen pérdida de leads un 89%</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2">
                Ver demo para inmobiliarias
                <FaArrowRight />
              </Link>
              <Link href="/franquicias" className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-center">
                Ver otros sectores
              </Link>
            </div>
            <p className="text-sm text-white/80 mt-6">✓ Integración con Inmovilla y Optima-CRM · ✓ Cualificación automática de leads</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

