'use client'

import { motion } from 'framer-motion'
import { FaCheck, FaStar, FaShieldAlt } from 'react-icons/fa'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const plans = [
  {
    name: 'Starter',
    description: 'Perfecto para comenzar a automatizar',
    price: 'Consultar',
    features: [
      'Agente de WhatsApp 24/7',
      'Hasta 500 conversaciones/mes',
      'Sistema de reservas básico',
      'Recordatorios automáticos',
      'Dashboard de métricas',
      'Soporte por email',
    ],
    cta: 'Empezar ahora',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Para empresas en crecimiento',
    price: 'Consultar',
    features: [
      'Todo lo del plan Starter',
      'Conversaciones ilimitadas',
      'Llamadas automatizadas con IA',
      'Upselling y cross-selling',
      'Generación de reseñas',
      'Integraciones personalizadas',
      'Multi-idioma',
      'Soporte prioritario 24/7',
      'Gestor de cuenta dedicado',
    ],
    cta: 'Solicitar demo',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Soluciones a medida para grandes empresas',
    price: 'Personalizado',
    features: [
      'Todo lo del plan Professional',
      'Agentes personalizados',
      'Múltiples ubicaciones',
      'API completa',
      'Análisis avanzado con IA',
      'Formación del equipo',
      'SLA garantizado',
      'Desarrollo de funciones a medida',
    ],
    cta: 'Contactar ventas',
    popular: false,
  },
]

export default function PricingPlans() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-monda text-4xl md:text-5xl font-bold text-secondary mb-6">
            Planes adaptados a tu <span className="gradient-text">negocio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Elige el plan que mejor se ajuste a tus necesidades. Todos incluyen garantía de satisfacción.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full shadow-lg flex items-center space-x-2">
                    <FaStar />
                    <span className="font-bold text-sm">Más popular</span>
                  </div>
                </div>
              )}
              
              <Card 
                className={`h-full flex flex-col ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-2xl scale-105' 
                    : ''
                }`}
              >
                <div className="flex-1">
                  <div className="mb-8">
                    <h3 className="font-monda text-2xl font-bold text-secondary mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-end space-x-2">
                      <span className="font-monda text-4xl font-bold gradient-text">
                        {plan.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <FaCheck className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  className="w-full"
                  href="/contacto"
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Garantía y confianza */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-3xl mx-auto border border-primary/20">
            <h3 className="font-monda text-2xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
              <FaShieldAlt className="text-primary" />
              Garantía de satisfacción
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Si en los primeros 30 días no estás satisfecho con nuestro servicio, 
              te devolvemos el 100% de tu inversión. Sin preguntas, sin complicaciones.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

