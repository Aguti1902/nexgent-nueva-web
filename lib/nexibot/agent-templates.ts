export interface AgentTemplate {
  id: string
  name: string
  icon: string
  category: 'customer-service' | 'sales' | 'operations' | 'marketing'
  description: string
  features: string[]
  integrations: string[]
  useCases: string[]
  pricing: 'starter' | 'professional' | 'business'
  estimatedSetupTime: string
  monthlyConversations: number
}

export const agentTemplates: AgentTemplate[] = [
  {
    id: 'whatsapp-customer-service',
    name: 'Atención Cliente WhatsApp 24/7',
    icon: '💬',
    category: 'customer-service',
    description: 'Responde consultas de clientes automáticamente por WhatsApp, 24/7 sin interrupciones',
    features: [
      'Respuestas instantáneas 24/7',
      'Comprende lenguaje natural',
      'Escala a humano cuando necesario',
      'Historial de conversaciones',
      'Métricas de satisfacción'
    ],
    integrations: ['WhatsApp Business', 'OpenAI GPT-4', 'Supabase'],
    useCases: [
      'Responder FAQs',
      'Información de productos',
      'Estado de pedidos',
      'Horarios y ubicación'
    ],
    pricing: 'starter',
    estimatedSetupTime: '15 minutos',
    monthlyConversations: 1000
  },
  {
    id: 'appointment-booking-agent',
    name: 'Gestor de Citas Inteligente',
    icon: '📅',
    category: 'operations',
    description: 'Agenda, confirma y gestiona citas automáticamente vía WhatsApp o web',
    features: [
      'Agendamiento automático',
      'Confirmaciones y recordatorios',
      'Reprogramación inteligente',
      'Sincronización con calendario',
      'Notificaciones personalizadas'
    ],
    integrations: ['Google Calendar', 'WhatsApp', 'Calendly', 'Email'],
    useCases: [
      'Clínicas y consultorios',
      'Salones de belleza',
      'Gimnasios y centros wellness',
      'Consultoría y servicios'
    ],
    pricing: 'professional',
    estimatedSetupTime: '20 minutos',
    monthlyConversations: 2000
  },
  {
    id: 'lead-qualification-agent',
    name: 'Calificador de Leads Automático',
    icon: '🎯',
    category: 'sales',
    description: 'Califica leads automáticamente, detecta intención de compra y agenda demos',
    features: [
      'Calificación inteligente de leads',
      'Scoring automático',
      'Detección de intención de compra',
      'Agendamiento de demos',
      'Integración con CRM'
    ],
    integrations: ['HubSpot', 'Salesforce', 'WhatsApp', 'Email', 'LinkedIn'],
    useCases: [
      'SaaS y tech',
      'Servicios B2B',
      'E-commerce alto ticket',
      'Inmobiliarias'
    ],
    pricing: 'professional',
    estimatedSetupTime: '25 minutos',
    monthlyConversations: 3000
  },
  {
    id: 'order-tracking-agent',
    name: 'Seguimiento de Pedidos',
    icon: '📦',
    category: 'customer-service',
    description: 'Proporciona información en tiempo real sobre estado de pedidos y envíos',
    features: [
      'Estado de pedido en tiempo real',
      'Tracking de envíos',
      'Notificaciones automáticas',
      'Gestión de devoluciones',
      'Soporte post-venta'
    ],
    integrations: ['Shopify', 'WooCommerce', 'Correos', 'DHL', 'WhatsApp'],
    useCases: [
      'E-commerce',
      'Retail online',
      'Marketplaces',
      'Dropshipping'
    ],
    pricing: 'professional',
    estimatedSetupTime: '30 minutos',
    monthlyConversations: 5000
  },
  {
    id: 'social-media-responder',
    name: 'Respuestas Automáticas Redes Sociales',
    icon: '📱',
    category: 'marketing',
    description: 'Responde mensajes y comentarios en Instagram, Facebook y TikTok automáticamente',
    features: [
      'Respuestas en múltiples plataformas',
      'Detección de sentimiento',
      'Respuestas personalizadas',
      'Filtrado de spam',
      'Análisis de engagement'
    ],
    integrations: ['Instagram', 'Facebook', 'TikTok', 'Twitter/X', 'LinkedIn'],
    useCases: [
      'Marcas y retail',
      'Influencers',
      'Agencias de marketing',
      'E-commerce'
    ],
    pricing: 'business',
    estimatedSetupTime: '35 minutos',
    monthlyConversations: 10000
  },
  {
    id: 'restaurant-reservations',
    name: 'Reservas para Restaurantes',
    icon: '🍽️',
    category: 'operations',
    description: 'Gestiona reservas, lista de espera y pedidos para domicilio/recogida',
    features: [
      'Sistema de reservas completo',
      'Gestión de lista de espera',
      'Pedidos online',
      'Confirmaciones automáticas',
      'Gestión de aforo'
    ],
    integrations: ['WhatsApp', 'Google Calendar', 'Uber Eats', 'Glovo'],
    useCases: [
      'Restaurantes',
      'Cafeterías',
      'Bares y pubs',
      'Food trucks'
    ],
    pricing: 'professional',
    estimatedSetupTime: '20 minutos',
    monthlyConversations: 3000
  },
  {
    id: 'gym-member-assistant',
    name: 'Asistente para Gimnasios',
    icon: '💪',
    category: 'operations',
    description: 'Gestiona membresías, clases, reservas de equipamiento y recordatorios',
    features: [
      'Reserva de clases',
      'Gestión de membresías',
      'Recordatorios de entrenamientos',
      'Control de aforo',
      'Renovaciones automáticas'
    ],
    integrations: ['WhatsApp', 'Google Calendar', 'Stripe', 'Email'],
    useCases: [
      'Gimnasios',
      'Estudios de yoga',
      'CrossFit boxes',
      'Centros deportivos'
    ],
    pricing: 'professional',
    estimatedSetupTime: '25 minutos',
    monthlyConversations: 4000
  },
  {
    id: 'real-estate-agent',
    name: 'Agente Inmobiliario Virtual',
    icon: '🏠',
    category: 'sales',
    description: 'Califica interesados, agenda visitas y proporciona información de propiedades',
    features: [
      'Información de propiedades',
      'Calificación de interesados',
      'Agendamiento de visitas',
      'Seguimiento automático',
      'Documentación digital'
    ],
    integrations: ['WhatsApp', 'Google Calendar', 'CRM', 'Email', 'DocuSign'],
    useCases: [
      'Inmobiliarias',
      'Promotoras',
      'Agentes independientes',
      'Plataformas de alquiler'
    ],
    pricing: 'business',
    estimatedSetupTime: '30 minutos',
    monthlyConversations: 5000
  },
  {
    id: 'hotel-concierge',
    name: 'Conserje Virtual para Hoteles',
    icon: '🏨',
    category: 'customer-service',
    description: 'Atiende solicitudes de huéspedes, gestiona reservas y proporciona recomendaciones',
    features: [
      'Check-in/check-out digital',
      'Servicios de habitación',
      'Recomendaciones locales',
      'Gestión de incidencias',
      'Servicios adicionales'
    ],
    integrations: ['WhatsApp', 'Email', 'PMS hotelero', 'Google Maps'],
    useCases: [
      'Hoteles',
      'Hostales',
      'Apartamentos turísticos',
      'Resorts'
    ],
    pricing: 'business',
    estimatedSetupTime: '40 minutos',
    monthlyConversations: 8000
  },
  {
    id: 'ecommerce-shopping-assistant',
    name: 'Asistente de Compras E-commerce',
    icon: '🛍️',
    category: 'sales',
    description: 'Ayuda a encontrar productos, recomienda y procesa pedidos vía chat',
    features: [
      'Recomendaciones personalizadas',
      'Búsqueda de productos',
      'Proceso de compra guiado',
      'Upselling inteligente',
      'Soporte post-venta'
    ],
    integrations: ['Shopify', 'WooCommerce', 'WhatsApp', 'Stripe', 'PayPal'],
    useCases: [
      'Tiendas online',
      'Marketplaces',
      'Fashion retail',
      'Electrónica'
    ],
    pricing: 'business',
    estimatedSetupTime: '35 minutos',
    monthlyConversations: 10000
  },
  {
    id: 'hr-recruitment-assistant',
    name: 'Asistente de Reclutamiento',
    icon: '👔',
    category: 'operations',
    description: 'Filtra candidatos, agenda entrevistas y gestiona proceso de selección',
    features: [
      'Screening inicial de CVs',
      'Preguntas de calificación',
      'Agendamiento de entrevistas',
      'Seguimiento de candidatos',
      'Feedback automático'
    ],
    integrations: ['LinkedIn', 'Email', 'Google Calendar', 'ATS', 'WhatsApp'],
    useCases: [
      'Departamentos de RRHH',
      'Agencias de reclutamiento',
      'Startups en crecimiento',
      'Empresas tech'
    ],
    pricing: 'business',
    estimatedSetupTime: '45 minutos',
    monthlyConversations: 6000
  },
  {
    id: 'financial-advisor-bot',
    name: 'Asesor Financiero Virtual',
    icon: '💰',
    category: 'sales',
    description: 'Proporciona información financiera, calcula hipotecas y agenda consultas',
    features: [
      'Calculadora de hipotecas',
      'Información de productos financieros',
      'Calificación de clientes',
      'Agendamiento de asesorías',
      'Documentación requerida'
    ],
    integrations: ['WhatsApp', 'Email', 'CRM financiero', 'Google Calendar'],
    useCases: [
      'Bancos',
      'Asesoras financieras',
      'Corredurías de seguros',
      'Gestoras de inversión'
    ],
    pricing: 'business',
    estimatedSetupTime: '50 minutos',
    monthlyConversations: 4000
  }
]

export function getAgentsByCategory(category: AgentTemplate['category']) {
  return agentTemplates.filter(agent => agent.category === category)
}

export function getAgentById(id: string) {
  return agentTemplates.find(agent => agent.id === id)
}

export function getAgentsByPricing(pricing: AgentTemplate['pricing']) {
  return agentTemplates.filter(agent => agent.pricing === pricing)
}

