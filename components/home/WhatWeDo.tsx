'use client'

import { motion } from 'framer-motion'
import { FaDatabase, FaWhatsapp, FaPhone } from 'react-icons/fa'

const services = [
  {
    number: '01',
    icon: FaDatabase,
    title: 'CRM a medida',
    subtitle: 'Desarrollamos tu software desde cero',
    description:
      'Panel para franquiciados, gestión de clientes, historial de citas, reportes, control de centros y todo lo que tu operativa necesite.',
    color: '#82cbd4',
  },
  {
    number: '02',
    icon: FaWhatsapp,
    title: 'IA por WhatsApp',
    subtitle: 'Tu asistente que nunca duerme',
    description:
      'Agenda citas, responde preguntas, confirma reservas y gestiona cancelaciones automáticamente. Cero intervención humana.',
    color: '#25D366',
  },
  {
    number: '03',
    icon: FaPhone,
    title: 'IA por llamadas',
    subtitle: 'Llamadas entrantes y salientes con IA',
    description:
      'Tu agente llama a clientes para confirmar, recordar y recuperar citas perdidas. Voz natural, disponible las 24 horas.',
    color: '#82cbd4',
  },
]

export default function WhatWeDo() {
  return (
    <section className="py-28 bg-white w-full">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Qué hacemos
          </p>
          <h2 className="font-monda font-bold text-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Tres soluciones.
            <br />
            Un sistema que funciona solo.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white border border-gray-200 rounded-3xl p-8 hover:border-gray-400 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
            >
              {/* Número decorativo */}
              <span className="absolute top-6 right-8 font-monda text-6xl font-bold text-gray-100 select-none leading-none">
                {service.number}
              </span>

              {/* Icono */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <service.icon style={{ color: service.color }} className="text-xl" />
              </div>

              <h3 className="font-monda font-bold text-xl text-black mb-2">{service.title}</h3>
              <p className="text-sm font-semibold text-gray-500 mb-4">{service.subtitle}</p>
              <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
