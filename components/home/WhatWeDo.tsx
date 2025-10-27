'use client'

import { motion } from 'framer-motion'
import { 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaCalendarCheck, 
  FaBell, 
  FaStar, 
  FaChartLine,
  FaRobot
} from 'react-icons/fa'
import { BiMessageDetail } from 'react-icons/bi'

const services = [
  {
    icon: FaWhatsapp,
    title: 'WhatsApp 24/7',
    description: 'Respuestas automáticas a cualquier hora del día.',
  },
  {
    icon: FaPhoneAlt,
    title: 'Llamadas con IA',
    description: 'Agentes de voz que gestionan llamadas naturalmente.',
  },
  {
    icon: FaCalendarCheck,
    title: 'Gestión de reservas',
    description: 'Sistema automatizado integrado con tu agenda.',
  },
  {
    icon: BiMessageDetail,
    title: 'Confirmaciones',
    description: 'Envío automático de confirmaciones de cita.',
  },
  {
    icon: FaBell,
    title: 'Recordatorios',
    description: 'Reduce ausencias con mensajes personalizados.',
  },
  {
    icon: FaStar,
    title: 'Reseñas',
    description: 'Solicita valoraciones automáticamente.',
  },
  {
    icon: FaChartLine,
    title: 'Upselling',
    description: 'Incrementa ventas con recomendaciones inteligentes.',
  },
  {
    icon: FaRobot,
    title: 'Asistente personalizado',
    description: 'Agente adaptado a tu negocio y tu forma de trabajar.',
  },
]

export default function WhatWeDo() {
  return (
    <section className="py-24 bg-white overflow-x-hidden w-full max-w-full">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
            Todo en un solo lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Agentes de IA que se encargan de todo mientras tú haces crecer tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 h-full">
                <div className="mb-4">
                  <div className="inline-flex w-12 h-12 rounded-lg bg-gray-100 items-center justify-center text-black text-2xl group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <service.icon />
                  </div>
                </div>
                <h3 className="font-monda text-lg font-bold text-black mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
