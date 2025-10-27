'use client'

import { motion } from 'framer-motion'
import { FaClock, FaChartLine, FaCalendarTimes, FaSmile, FaMoon, FaRocket } from 'react-icons/fa'

const benefits = [
  {
    icon: FaClock,
    title: 'Ahorra tiempo',
    description: 'Libera a tu equipo de tareas repetitivas. Gestiona cientos de conversaciones simultáneas automáticamente.',
    stat: '80%',
    statLabel: 'menos tiempo en gestión',
  },
  {
    icon: FaChartLine,
    title: 'Aumenta ingresos',
    description: 'Incrementa ventas con upselling automático y disponibilidad 24/7 para captar cada oportunidad.',
    stat: '+35%',
    statLabel: 'crecimiento en ventas',
  },
  {
    icon: FaCalendarTimes,
    title: 'Reduce ausencias',
    description: 'Recordatorios automáticos personalizados reducen drásticamente las cancelaciones.',
    stat: '-60%',
    statLabel: 'menos ausencias',
  },
  {
    icon: FaSmile,
    title: 'Mejora satisfacción',
    description: 'Respuestas instantáneas y atención personalizada mejoran la experiencia del cliente.',
    stat: '95%',
    statLabel: 'satisfacción cliente',
  },
  {
    icon: FaMoon,
    title: 'Opera 24/7',
    description: 'Tus clientes pueden reservar y consultar a cualquier hora, incluso mientras duermes.',
    stat: '24/7',
    statLabel: 'disponibilidad total',
  },
  {
    icon: FaRocket,
    title: 'Escala sin límites',
    description: 'Crece sin necesidad de contratar más personal. Gestiona 10x más clientes con el mismo equipo.',
    stat: '10x',
    statLabel: 'capacidad de gestión',
  },
]

export default function Benefits() {
  return (
    <section className="py-24 bg-gray-50 overflow-x-hidden w-full max-w-full">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
            ¿Por qué automatizar?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beneficios reales que transforman tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="inline-flex w-14 h-14 rounded-xl bg-gray-100 items-center justify-center text-black text-3xl group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <benefit.icon />
                </div>
              </div>
              <h3 className="font-monda text-2xl font-bold text-black mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {benefit.description}
              </p>
              <div className="pt-6 border-t border-gray-200">
                <p className="text-4xl font-bold text-black mb-1">{benefit.stat}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wide">{benefit.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
