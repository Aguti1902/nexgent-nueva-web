import type { Metadata } from 'next'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesList from '@/components/services/ServicesList'
import HowItWorks from '@/components/services/HowItWorks'
import TechStack from '@/components/services/TechStack'
import ServicesCTA from '@/components/services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Servicios - NexGent | Agentes de IA para Empresas',
  description: 'Descubre todos nuestros servicios de automatización con IA: WhatsApp, llamadas, reservas, recordatorios y más.',
  keywords: 'servicios IA, WhatsApp bot, automatización empresarial, agentes virtuales',
}

export default function ServiciosPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <HowItWorks />
      <TechStack />
      <ServicesCTA />
    </>
  )
}

