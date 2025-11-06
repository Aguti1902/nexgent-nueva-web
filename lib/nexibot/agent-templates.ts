export type AgentCategory = 'customer-service' | 'sales' | 'booking' | 'ecommerce' | 'marketing'

export interface AgentTemplate {
  id: string
  name: string
  description: string
  category: AgentCategory
  icon: string
  features: string[]
  integrations: string[]
  useCases: string[]
  complexity: 'simple' | 'medium' | 'complex'
  recommendedPlan: 'starter' | 'professional' | 'business'
  estimatedSetupTime: string
  price: {
    starter: number
    professional: number
    business: number
  }
  popular?: boolean
}

export const agentTemplates: AgentTemplate[] = [
  {
    id: 'whatsapp-customer-service',
    name: 'Asistente WhatsApp 24/7',
    description: 'Atiende consultas de clientes por WhatsApp automáticamente con IA. Responde preguntas frecuentes, deriva casos complejos y mantiene el contexto de la conversación.',
    category: 'customer-service',
    icon: '💬',
    features: [
      'Respuestas automáticas con GPT-4',
      'Base de conocimiento personalizada',
      'Detección de intención del cliente',
      'Escalado a humano cuando es necesario',
      'Historial de conversaciones',
      'Soporte multiidioma'
    ],
    integrations: ['WhatsApp Business API', 'OpenAI GPT-4', 'Supabase'],
    useCases: [
      'Atención al cliente 24/7',
      'Responder FAQs automáticamente',
      'Calificación de leads',
      'Soporte post-venta'
    ],
    complexity: 'medium',
    recommendedPlan: 'professional',
    estimatedSetupTime: '3 minutos',
    price: {
      starter: 149,
      professional: 299,
      business: 699
    },
    popular: true
  },
  {
    id: 'booking-assistant',
    name: 'Agente de Reservas Inteligente',
    description: 'Gestiona reservas automáticamente. Consulta disponibilidad, confirma citas, envía recordatorios y sincroniza con tu calendario.',
    category: 'booking',
    icon: '📅',
    features: [
      'Consulta de disponibilidad en tiempo real',
      'Confirmación automática de citas',
      'Recordatorios por WhatsApp y email',
      'Reprogramación inteligente',
      'Gestión de cancelaciones',
      'Sincronización con Google Calendar'
    ],
    integrations: ['Google Calendar', 'WhatsApp', 'Email', 'Calendly'],
    useCases: [
      'Clínicas dentales',
      'Salones de belleza',
      'Restaurantes',
      'Gimnasios',
      'Consultorías'
    ],
    complexity: 'medium',
    recommendedPlan: 'professional',
    estimatedSetupTime: '4 minutos',
    price: {
      starter: 149,
      professional: 299,
      business: 699
    },
    popular: true
  },
  {
    id: 'lead-qualifier',
    name: 'Calificador de Leads con IA',
    description: 'Califica leads automáticamente, hace preguntas clave, asigna puntuación y agenda demos solo con los más calificados.',
    category: 'sales',
    icon: '🎯',
    features: [
      'Scoring automático de leads',
      'Preguntas de calificación inteligentes',
      'Segmentación por interés',
      'Agendado automático de demos',
      'Notificaciones a equipo de ventas',
      'CRM integration'
    ],
    integrations: ['WhatsApp', 'Email', 'Google Calendar', 'CRM', 'Slack'],
    useCases: [
      'SaaS y software',
      'Inmobiliarias',
      'Consultorías',
      'Servicios B2B'
    ],
    complexity: 'complex',
    recommendedPlan: 'business',
    estimatedSetupTime: '5 minutos',
    price: {
      starter: 199,
      professional: 399,
      business: 799
    }
  },
  {
    id: 'ecommerce-support',
    name: 'Soporte E-commerce',
    description: 'Asistente especializado en e-commerce. Seguimiento de pedidos, gestión de devoluciones, recomendaciones de productos.',
    category: 'ecommerce',
    icon: '🛒',
    features: [
      'Seguimiento de pedidos en tiempo real',
      'Gestión de devoluciones',
      'Recomendaciones de productos con IA',
      'Recuperación de carritos abandonados',
      'Notificaciones de stock',
      'Respuestas sobre envíos'
    ],
    integrations: ['WooCommerce', 'Shopify', 'WhatsApp', 'Email'],
    useCases: [
      'Tiendas online',
      'Marketplaces',
      'Dropshipping',
      'Retail digital'
    ],
    complexity: 'complex',
    recommendedPlan: 'business',
    estimatedSetupTime: '6 minutos',
    price: {
      starter: 199,
      professional: 399,
      business: 799
    },
    popular: true
  },
  {
    id: 'appointment-reminder',
    name: 'Sistema de Recordatorios',
    description: 'Envía recordatorios automáticos de citas por WhatsApp, email y SMS. Reduce no-shows hasta un 80%.',
    category: 'booking',
    icon: '⏰',
    features: [
      'Recordatorios automáticos 24h antes',
      'Confirmación de asistencia',
      'Recordatorio final 2h antes',
      'Multicanal (WhatsApp, Email, SMS)',
      'Personalización de mensajes',
      'Estadísticas de asistencia'
    ],
    integrations: ['Google Calendar', 'WhatsApp', 'Email', 'Twilio SMS'],
    useCases: [
      'Clínicas médicas',
      'Dentistas',
      'Terapeutas',
      'Salones de belleza'
    ],
    complexity: 'simple',
    recommendedPlan: 'starter',
    estimatedSetupTime: '2 minutos',
    price: {
      starter: 99,
      professional: 199,
      business: 399
    }
  },
  {
    id: 'feedback-collector',
    name: 'Recolector de Feedback',
    description: 'Solicita y recopila feedback de clientes automáticamente después de cada interacción. Analiza sentimiento con IA.',
    category: 'customer-service',
    icon: '⭐',
    features: [
      'Encuestas automáticas post-servicio',
      'Análisis de sentimiento con IA',
      'Alertas de feedback negativo',
      'Dashboard de métricas',
      'Seguimiento de NPS',
      'Integración con Google Reviews'
    ],
    integrations: ['WhatsApp', 'Email', 'Google Reviews', 'Trustpilot'],
    useCases: [
      'Restaurantes',
      'Hoteles',
      'E-commerce',
      'Servicios profesionales'
    ],
    complexity: 'medium',
    recommendedPlan: 'professional',
    estimatedSetupTime: '3 minutos',
    price: {
      starter: 129,
      professional: 249,
      business: 499
    }
  },
  {
    id: 'social-media-responder',
    name: 'Respuestas Redes Sociales',
    description: 'Responde automáticamente DMs y comentarios en Instagram, Facebook y TikTok con IA contextual.',
    category: 'marketing',
    icon: '📱',
    features: [
      'Respuestas automáticas en Instagram DM',
      'Comentarios en posts de Facebook',
      'TikTok DM automation',
      'Detección de intención',
      'Respuestas personalizadas',
      'Analytics de engagement'
    ],
    integrations: ['Instagram', 'Facebook', 'TikTok', 'OpenAI'],
    useCases: [
      'Influencers',
      'Marcas de moda',
      'Restaurantes',
      'Gimnasios'
    ],
    complexity: 'medium',
    recommendedPlan: 'professional',
    estimatedSetupTime: '4 minutos',
    price: {
      starter: 149,
      professional: 299,
      business: 599
    }
  },
  {
    id: 'invoice-automation',
    name: 'Facturación Automática',
    description: 'Genera y envía facturas automáticamente. Recordatorios de pago, seguimiento de cobros y conciliación bancaria.',
    category: 'sales',
    icon: '💳',
    features: [
      'Generación automática de facturas',
      'Envío por email',
      'Recordatorios de pago',
      'Integración con Stripe/PayPal',
      'Conciliación bancaria',
      'Reportes financieros'
    ],
    integrations: ['Stripe', 'PayPal', 'Email', 'Google Sheets', 'QuickBooks'],
    useCases: [
      'Freelancers',
      'Agencias',
      'SaaS',
      'Consultorías'
    ],
    complexity: 'complex',
    recommendedPlan: 'business',
    estimatedSetupTime: '5 minutos',
    price: {
      starter: 179,
      professional: 349,
      business: 699
    }
  },
  {
    id: 'onboarding-assistant',
    name: 'Asistente de Onboarding',
    description: 'Guía a nuevos clientes paso a paso en su proceso de onboarding. Envía recursos, responde preguntas y hace seguimiento.',
    category: 'customer-service',
    icon: '🎓',
    features: [
      'Flujo de onboarding automatizado',
      'Envío secuencial de recursos',
      'Check-ins automáticos',
      'Respuestas a FAQs',
      'Escalado a soporte humano',
      'Métricas de completitud'
    ],
    integrations: ['Email', 'Slack', 'WhatsApp', 'CRM'],
    useCases: [
      'SaaS',
      'Plataformas educativas',
      'Apps móviles',
      'Servicios digitales'
    ],
    complexity: 'medium',
    recommendedPlan: 'professional',
    estimatedSetupTime: '4 minutos',
    price: {
      starter: 149,
      professional: 299,
      business: 599
    }
  },
  {
    id: 'abandoned-cart',
    name: 'Recuperación de Carritos',
    description: 'Recupera carritos abandonados automáticamente con mensajes personalizados y ofertas especiales.',
    category: 'ecommerce',
    icon: '🛍️',
    features: [
      'Detección de carritos abandonados',
      'Mensajes personalizados por WhatsApp',
      'Descuentos automáticos',
      'Secuencia de 3 mensajes',
      'A/B testing de mensajes',
      'ROI tracking'
    ],
    integrations: ['Shopify', 'WooCommerce', 'WhatsApp', 'Email'],
    useCases: [
      'E-commerce',
      'Tiendas online',
      'Marketplaces'
    ],
    complexity: 'medium',
    recommendedPlan: 'professional',
    estimatedSetupTime: '3 minutos',
    price: {
      starter: 149,
      professional: 299,
      business: 599
    }
  },
  {
    id: 'recruitment-assistant',
    name: 'Asistente de Reclutamiento',
    description: 'Automatiza el pre-screening de candidatos, agenda entrevistas y envía seguimiento.',
    category: 'sales',
    icon: '👔',
    features: [
      'Pre-screening automatizado',
      'Preguntas de calificación',
      'Agendado de entrevistas',
      'Envío de pruebas técnicas',
      'Notificaciones a RRHH',
      'Base de datos de candidatos'
    ],
    integrations: ['Email', 'Google Calendar', 'LinkedIn', 'Calendly'],
    useCases: [
      'Agencias de reclutamiento',
      'Departamentos de RRHH',
      'Startups en crecimiento'
    ],
    complexity: 'complex',
    recommendedPlan: 'business',
    estimatedSetupTime: '5 minutos',
    price: {
      starter: 179,
      professional: 349,
      business: 699
    }
  },
  {
    id: 'event-registration',
    name: 'Registro de Eventos',
    description: 'Gestiona inscripciones a eventos, envía confirmaciones, recordatorios y follow-ups post-evento.',
    category: 'booking',
    icon: '🎟️',
    features: [
      'Formulario de inscripción automatizado',
      'Confirmaciones instantáneas',
      'Recordatorios de evento',
      'Check-in digital',
      'Encuestas post-evento',
      'Certificados de asistencia'
    ],
    integrations: ['Email', 'WhatsApp', 'Google Forms', 'Zoom'],
    useCases: [
      'Conferencias',
      'Webinars',
      'Talleres',
      'Eventos corporativos'
    ],
    complexity: 'medium',
    recommendedPlan: 'professional',
    estimatedSetupTime: '4 minutos',
    price: {
      starter: 129,
      professional: 249,
      business: 499
    }
  }
]

export const getCategoryEmoji = (category: AgentCategory): string => {
  const emojiMap: Record<AgentCategory, string> = {
    'customer-service': '💬',
    'sales': '💰',
    'booking': '📅',
    'ecommerce': '🛒',
    'marketing': '📢'
  }
  return emojiMap[category]
}
