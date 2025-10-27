import type { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import OurStory from '@/components/about/OurStory'
import OurMission from '@/components/about/OurMission'
import OurValues from '@/components/about/OurValues'
import WhyChooseUs from '@/components/about/WhyChooseUs'
import AboutCTA from '@/components/about/AboutCTA'

export const metadata: Metadata = {
  title: 'Sobre Nosotros - NexGent | Líderes en IA Empresarial',
  description: 'Conoce NexGent: quiénes somos, nuestra misión y por qué somos la mejor opción para automatizar tu negocio con inteligencia artificial.',
  keywords: 'sobre NexGent, empresa IA, equipo IA, misión visión valores',
}

export default function NosotrosPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurMission />
      <OurValues />
      <WhyChooseUs />
      <AboutCTA />
    </>
  )
}

