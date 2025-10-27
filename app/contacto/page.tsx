import type { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import FAQSection from '@/components/contact/FAQSection'

export const metadata: Metadata = {
  title: 'Contacto - NexGent | Hablemos de tu Proyecto',
  description: 'Contacta con NexGent para consultas, presupuestos o información sobre nuestros servicios de IA. Estamos aquí para ayudarte.',
  keywords: 'contacto NexGent, consultas IA, presupuesto IA, información agentes IA',
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

