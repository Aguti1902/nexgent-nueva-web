import type { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import FAQSection from '@/components/contact/FAQSection'

export const metadata: Metadata = {
  title: 'Contacto - NexGent | Solicita tu Demo Gratuita',
  description: 'Contacta con NexGent y descubre cómo los agentes de IA pueden transformar tu negocio. Demo gratuita sin compromiso.',
  keywords: 'contacto NexGent, demo IA, solicitar información, agentes IA empresas',
}

export default function ContactoPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <FAQSection />
    </>
  )
}

