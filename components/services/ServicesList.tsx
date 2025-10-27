'use client'

import { motion } from 'framer-motion'
import { 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaCalendarCheck, 
  FaBell, 
  FaStar, 
  FaChartLine,
  FaRobot,
  FaDatabase,
  FaLanguage,
  FaClock
} from 'react-icons/fa'
import Button from '@/components/ui/Button'

const services = [
  {
    id: 'whatsapp',
    icon: FaWhatsapp,
    title: 'Atención por WhatsApp 24/7',
    shortDesc: 'Tu asistente virtual que nunca duerme',
    description: 'Implementamos un agente de IA conversacional en WhatsApp que atiende a tus clientes las 24 horas del día, los 365 días del año. Capaz de responder preguntas frecuentes, gestionar reservas, proporcionar información de productos y servicios.',
    features: [
      'Respuestas instantáneas y personalizadas',
      'Comprensión de lenguaje natural',
      'Gestión de múltiples conversaciones simultáneas',
      'Integración con tu base de datos',
      'Escalado inteligente a agentes humanos',
    ],
    benefits: [
      'Reducción del 70% en tiempo de respuesta',
      'Aumento del 40% en satisfacción del cliente',
      'Disponibilidad completa sin coste adicional',
    ],
  },
  {
    id: 'llamadas',
    icon: FaPhoneAlt,
    title: 'Llamadas Automatizadas con IA',
    shortDesc: 'Agentes de voz 100% naturales',
    description: 'Nuestros agentes de voz con IA realizan y reciben llamadas telefónicas con una calidad y naturalidad sorprendente. Perfectos para confirmar citas, realizar encuestas, o gestionar atención al cliente.',
    features: [
      'Voz natural y expresiva',
      'Comprensión de contexto y emociones',
      'Llamadas entrantes y salientes',
      'Grabación y transcripción automática',
      'Soporte multi-idioma',
    ],
    benefits: [
      'Ahorro de 15 horas semanales por empleado',
      'Cobertura del 100% sin tiempos de espera',
      'Coste por llamada reducido en 80%',
    ],
  },
  {
    id: 'reservas',
    icon: FaCalendarCheck,
    title: 'Sistema de Reservas Inteligente',
    shortDesc: 'Gestión automática de tu agenda',
    description: 'Un sistema completo de gestión de citas que se integra con tu calendario existente. Los clientes pueden reservar, modificar o cancelar citas de forma autónoma, mientras el sistema optimiza tu agenda.',
    features: [
      'Integración con Google Calendar, Outlook, etc.',
      'Gestión automática de disponibilidad',
      'Reservas desde WhatsApp, web o teléfono',
      'Lista de espera inteligente',
      'Optimización de horarios',
    ],
    benefits: [
      '50% más de reservas completadas',
      'Eliminación de errores de doble reserva',
      'Aumento de ocupación del 25%',
    ],
  },
  {
    id: 'recordatorios',
    icon: FaBell,
    title: 'Recordatorios Automáticos',
    shortDesc: 'Reduce ausencias hasta un 60%',
    description: 'Sistema automatizado de recordatorios multi-canal que envía notificaciones personalizadas a tus clientes antes de sus citas. Con confirmación automática y gestión de cancelaciones.',
    features: [
      'Recordatorios por WhatsApp, SMS y email',
      'Múltiples recordatorios programables',
      'Confirmación con un solo clic',
      'Gestión automática de cancelaciones',
      'Estadísticas de asistencia',
    ],
    benefits: [
      'Reducción del 60% en ausencias',
      'Mayor predictibilidad en la agenda',
      'Mejor experiencia del cliente',
    ],
  },
  {
    id: 'reseñas',
    icon: FaStar,
    title: 'Generación de Reseñas',
    shortDesc: 'Construye tu reputación online',
    description: 'Solicita automáticamente reseñas a tus clientes satisfechos en el momento perfecto. Aumenta tu presencia en Google, Facebook y otras plataformas mientras gestionas el feedback de forma inteligente.',
    features: [
      'Solicitud automática post-servicio',
      'Timing optimizado con IA',
      'Enlaces directos a plataformas',
      'Gestión de feedback negativo',
      'Dashboard de reputación',
    ],
    benefits: [
      'Aumento del 300% en reseñas positivas',
      'Mejora en posicionamiento local SEO',
      'Mayor confianza de nuevos clientes',
    ],
  },
  {
    id: 'upselling',
    icon: FaChartLine,
    title: 'Upselling y Cross-selling',
    shortDesc: 'Aumenta el valor de cada cliente',
    description: 'Recomendaciones inteligentes y personalizadas que aumentan el ticket medio. El agente analiza el historial del cliente y sugiere productos o servicios complementarios en el momento adecuado.',
    features: [
      'Análisis de comportamiento del cliente',
      'Recomendaciones personalizadas',
      'Ofertas basadas en timing perfecto',
      'Paquetes y promociones automáticas',
      'Análisis de conversión',
    ],
    benefits: [
      'Aumento del 35% en ticket medio',
      'Mayor lifetime value del cliente',
      'Ventas sin presión comercial',
    ],
  },
]

const additionalServices = [
  {
    icon: FaRobot,
    title: 'Agentes Personalizados',
    description: 'Desarrollamos agentes específicos para tu industria',
  },
  {
    icon: FaDatabase,
    title: 'Integración CRM',
    description: 'Conectamos con tu CRM existente',
  },
  {
    icon: FaLanguage,
    title: 'Multi-idioma',
    description: 'Agentes que hablan el idioma de tus clientes',
  },
  {
    icon: FaClock,
    title: 'Análisis en Tiempo Real',
    description: 'Dashboard con métricas actualizadas',
  },
]

export default function ServicesList() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        {/* Servicios principales */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="scroll-mt-24"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Contenido */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex w-16 h-16 bg-black text-white items-center justify-center rounded-2xl mb-6">
                    <service.icon size={32} />
                  </div>
                  
                  <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-4">
                    {service.title}
                  </h2>
                  
                  <p className="text-xl text-gray-600 mb-6">
                    {service.shortDesc}
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    {service.description}
                  </p>

                  <Button variant="primary" href="/contacto">
                    Solicitar información
                  </Button>
                </div>

                {/* Features y Benefits */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-bold text-lg text-black mb-4">
                          Características:
                        </h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start space-x-3">
                              <span className="text-black mt-1 font-bold">•</span>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-gray-200 pt-8">
                        <h3 className="font-bold text-lg text-black mb-4">
                          Resultados:
                        </h3>
                        <div className="space-y-3">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <p className="text-gray-700">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Servicios adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-4">
              Y mucho más
            </h2>
            <p className="text-xl text-gray-600">
              Servicios complementarios para potenciar tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="inline-flex w-14 h-14 bg-gray-100 rounded-lg items-center justify-center text-black text-3xl mb-4 hover:bg-black hover:text-white transition-all duration-300">
                  <service.icon />
                </div>
                <h3 className="font-bold text-black mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
