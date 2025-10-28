'use client'

import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    rating: 5,
    title: 'Soporte excepcional',
    content: 'El equipo de NexGent estuvo con nosotros en cada paso. La integración fue perfecta y los resultados inmediatos.',
    author: 'Carlos Ruiz',
    position: 'Director, Clínica Dental Sonrisa',
    date: '22/03/2025'
  },
  {
    id: 2,
    rating: 5,
    title: 'Incremento en ventas excepcional',
    content: 'Pasamos de perder el 40% de consultas a responder el 100% en menos de 2 minutos. Las ventas subieron un 185%.',
    author: 'Carlos Mendoza',
    position: 'CEO, Urban Fitness',
    date: '28/03/2025'
  },
  {
    id: 3,
    rating: 5,
    title: 'ROI impresionante',
    content: 'En solo 2 meses recuperamos la inversión. Los recordatorios automáticos redujeron las ausencias un 85%.',
    author: 'David Torres',
    position: 'CEO, FitZone Gym',
    date: '05/04/2025'
  },
  {
    id: 4,
    rating: 5,
    title: 'Tecnología que funciona',
    content: 'Probamos otras soluciones antes, pero NexGent es diferente. Su IA realmente entiende a nuestros clientes.',
    author: 'Ana Fernández',
    position: 'Directora, Hotel Costa Blanca',
    date: '12/04/2025'
  },
  {
    id: 5,
    rating: 5,
    title: 'Equipo profesional y cercano',
    content: 'No solo nos vendieron un producto, nos acompañaron en toda la transformación digital de nuestro negocio.',
    author: 'Roberto Sánchez',
    position: 'Gerente, Concesionario AutoMax',
    date: '18/04/2025'
  },
  {
    id: 6,
    rating: 5,
    title: 'Resultados desde el día uno',
    content: 'La implementación fue rápida y sin complicaciones. Nuestros clientes están más satisfechos que nunca.',
    author: 'Patricia Vega',
    position: 'Fundadora, Studio de Yoga Zen',
    date: '25/04/2025'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3))
  }

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3))
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  return (
    <section className="py-24 bg-gray-50 overflow-x-hidden w-full max-w-full">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-monda">
            Lo que dicen de nosotros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 100 empresas ya confían en NexGent para automatizar su negocio
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={prevTestimonials}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-black"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextTestimonials}
              disabled={currentIndex + 3 >= testimonials.length}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-black"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Testimonials Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-4 font-monda">
                  {testimonial.title}
                </h3>

                {/* Content */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>

                {/* Author Info */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-black">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-gray-400">
                    {testimonial.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index
                    ? 'w-8 bg-black'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿Quieres ser el próximo caso de éxito?
          </p>
          <a
            href="/demo"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-xl"
          >
            Solicita tu demo gratuita
          </a>
        </motion.div>
      </div>
    </section>
  )
}

