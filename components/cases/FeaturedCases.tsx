'use client'

import { motion } from 'framer-motion'
import { FaSpa, FaCut, FaDumbbell } from 'react-icons/fa'
import Button from '@/components/ui/Button'

const cases = [
  {
    company: 'Hello Nails',
    industry: 'Salón de Belleza y Uñas - Más de 200 centros',
    icon: FaSpa,
    description: 'Cadena de más de 200 salones de belleza que necesitaba optimizar la gestión de reservas y reducir las ausencias de clientes.',
    solution: 'Transformación digital completa con IA para gestión automática de reservas, recordatorios personalizados y atención al cliente 24/7 por WhatsApp.',
    results: [
      { metric: '+42%', label: 'Aumento en reservas' },
      { metric: '-68%', label: 'Reducción no-shows' },
      { metric: '€2.1K', label: 'Ingresos extra mensuales' },
      { metric: '95%', label: 'Ocupación promedio' },
    ],
    testimonial: 'Antes perdíamos el 30% de citas por no-shows y teníamos huecos sin llenar. Ahora el sistema gestiona todo automáticamente: reservas, confirmaciones, recordatorios. Pasamos de 68% a 95% de ocupación. €2,100 más por mes solo optimizando la agenda. Increíble.',
    author: 'Teresa Messía',
    position: 'Propietaria',
  },
  {
    company: 'Style Studio',
    industry: 'Peluquería',
    icon: FaCut,
    description: 'Peluquería de alta gama con servicios personalizados que buscaba mejorar la experiencia del cliente.',
    solution: 'Agente de IA con capacidades de upselling inteligente y gestión de reseñas automática.',
    results: [
      { metric: '45%', label: 'Aumento en ticket medio' },
      { metric: '200+', label: 'Reseñas positivas nuevas' },
      { metric: '85%', label: 'Tasa de retención' },
      { metric: '24/7', label: 'Atención disponible' },
    ],
    testimonial: 'El agente sugiere servicios adicionales de forma natural y ha aumentado significativamente nuestros ingresos sin presionar a los clientes.',
    author: 'Carlos Ruiz',
    position: 'Propietario',
  },
  {
    company: 'FitZone',
    industry: 'Gimnasio',
    icon: FaDumbbell,
    description: 'Centro deportivo que necesitaba automatizar la atención al cliente y gestión de clases.',
    solution: 'Sistema completo de reservas de clases, confirmaciones automáticas y seguimiento de asistencia.',
    results: [
      { metric: '70%', label: 'Más reservas de clases' },
      { metric: '50%', label: 'Menos ausencias' },
      { metric: '300+', label: 'Consultas mensuales resueltas' },
      { metric: '95%', label: 'Precisión en respuestas' },
    ],
    testimonial: 'Nuestros clientes pueden reservar clases a cualquier hora y reciben recordatorios automáticos. La experiencia ha mejorado notablemente.',
    author: 'Ana Torres',
    position: 'Gerente',
  },
]

export default function FeaturedCases() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="space-y-32">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Info */}
                  <div className="p-12">
                    <div className="inline-flex w-16 h-16 bg-black text-white items-center justify-center rounded-2xl mb-6">
                      <caseItem.icon size={32} />
                    </div>
                    <h3 className="font-monda text-4xl font-bold text-black mb-2">
                      {caseItem.company}
                    </h3>
                    <p className="text-gray-600 mb-6">{caseItem.industry}</p>

                    <div className="space-y-6 mb-8">
                      <div>
                        <h4 className="font-bold text-black mb-2">Desafío:</h4>
                        <p className="text-gray-600">{caseItem.description}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-2">Solución:</h4>
                        <p className="text-gray-600">{caseItem.solution}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <p className="text-gray-700 italic mb-4">
                        "{caseItem.testimonial}"
                      </p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold text-black">{caseItem.author}</p>
                        <p className="text-sm text-gray-600">{caseItem.position}</p>
                      </div>
                    </div>
                  </div>

                  {/* Resultados */}
                  <div className="bg-black text-white p-12 flex flex-col justify-center">
                    <h4 className="font-monda text-2xl font-bold mb-8">Resultados:</h4>
                    <div className="grid grid-cols-2 gap-6">
                      {caseItem.results.map((result, i) => (
                        <div key={i} className="text-center">
                          <div className="text-4xl md:text-5xl font-bold mb-2">
                            {result.metric}
                          </div>
                          <div className="text-sm text-gray-400">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button variant="primary" size="lg" href="/contacto">
            Solicita tu caso de éxito
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
