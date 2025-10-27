'use client'

import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa'

const contactMethods = [
  {
    icon: FaEnvelope,
    title: 'Email',
    description: 'Respuesta en menos de 24h',
    contact: 'hola@nexgent.com',
    href: 'mailto:hola@nexgent.com',
  },
  {
    icon: FaPhone,
    title: 'Teléfono',
    description: 'Lunes a Viernes, 9:00-18:00',
    contact: '+34 900 000 000',
    href: 'tel:+34900000000',
  },
  {
    icon: FaCalendarAlt,
    title: 'Agendar Demo',
    description: 'Elige el mejor horario para ti',
    contact: 'Calendly',
    href: '#',
  },
]

export default function ContactInfo() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-monda text-5xl font-bold text-black mb-6">
            O contáctanos directamente
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el canal que prefieras
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="inline-flex w-16 h-16 bg-black text-white items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <method.icon size={28} />
              </div>
              <h3 className="font-monda text-2xl font-bold text-black mb-2">
                {method.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {method.description}
              </p>
              <p className="text-lg font-semibold text-black">
                {method.contact}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
