'use client'

import { motion } from 'framer-motion'
import { FaCalendarCheck, FaWhatsapp, FaPhone, FaChartBar, FaBell, FaBuilding } from 'react-icons/fa'

const features = [
  {
    icon: FaCalendarCheck,
    title: 'Gestión de citas y reservas',
    description: 'Sistema centralizado para todos los centros de tu franquicia.',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp automatizado',
    description: 'Tu asistente responde, agenda y gestiona sin intervención humana.',
  },
  {
    icon: FaPhone,
    title: 'Llamadas con IA',
    description: 'Voz natural que llama y recibe para confirmar y recuperar citas.',
  },
  {
    icon: FaChartBar,
    title: 'Analytics en tiempo real',
    description: 'Dashboards con métricas de ocupación, reservas y rendimiento.',
  },
  {
    icon: FaBell,
    title: 'Recordatorios automáticos',
    description: 'Secuencias inteligentes para reducir los no-shows al mínimo.',
  },
  {
    icon: FaBuilding,
    title: 'Panel multi-franquicia',
    description: 'Gestiona todos tus centros desde un único panel de control.',
  },
]

export default function Features() {
  return (
    <section className="py-28 bg-[#f9fafb] w-full">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            El CRM incluye
          </p>
          <h2 className="font-monda font-bold text-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Todo lo que tu franquicia necesita,
            <br />
            integrado en un solo sistema.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="text-white text-sm" />
              </div>
              <h3 className="font-monda font-bold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
