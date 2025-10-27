'use client'

import { motion } from 'framer-motion'
import { 
  FaSpa, 
  FaCut, 
  FaDumbbell, 
  FaUtensils, 
  FaStethoscope, 
  FaHome,
  FaGraduationCap,
  FaCar 
} from 'react-icons/fa'

const industries = [
  {
    icon: FaSpa,
    name: 'Salones de Belleza',
    description: 'Gestión de citas, recordatorios y upselling automático',
  },
  {
    icon: FaCut,
    name: 'Peluquerías',
    description: 'Reservas 24/7 y confirmaciones automáticas',
  },
  {
    icon: FaDumbbell,
    name: 'Gimnasios',
    description: 'Reserva de clases y seguimiento de asistencia',
  },
  {
    icon: FaUtensils,
    name: 'Restaurantes',
    description: 'Reservas de mesa y gestión de pedidos',
  },
  {
    icon: FaStethoscope,
    name: 'Clínicas',
    description: 'Agendamiento médico y recordatorios de citas',
  },
  {
    icon: FaHome,
    name: 'Inmobiliarias',
    description: 'Calificación de leads y visitas automáticas',
  },
  {
    icon: FaGraduationCap,
    name: 'Centros Educativos',
    description: 'Atención a estudiantes y gestión de matrículas',
  },
  {
    icon: FaCar,
    name: 'Talleres',
    description: 'Citas de mantenimiento y seguimiento',
  },
]

export default function Industries() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
            Industrias que automatizamos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones especializadas para cada sector
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="inline-flex w-16 h-16 bg-gray-100 rounded-xl items-center justify-center text-black text-3xl mb-4 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <industry.icon />
              </div>
              <h3 className="font-bold text-black mb-2 text-lg">{industry.name}</h3>
              <p className="text-sm text-gray-600">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
