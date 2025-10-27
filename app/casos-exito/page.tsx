import type { Metadata } from 'next'
import CasesHero from '@/components/cases/CasesHero'
import FeaturedCases from '@/components/cases/FeaturedCases'
import Industries from '@/components/cases/Industries'
import Testimonials from '@/components/cases/Testimonials'
import CasesCTA from '@/components/cases/CasesCTA'

export const metadata: Metadata = {
  title: 'Casos de Éxito - NexGent | Resultados Reales con IA',
  description: 'Descubre cómo empresas líderes están transformando su negocio con nuestros agentes de IA. Casos de éxito reales con resultados medibles.',
  keywords: 'casos de éxito IA, testimonios automatización, resultados agentes IA',
}

export default function CasosExitoPage() {
  return (
    <>
      <CasesHero />
      <FeaturedCases />
      <Industries />
      <Testimonials />
      <CasesCTA />
    </>
  )
}

