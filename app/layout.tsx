import type { Metadata } from 'next'
import { Poppins, Monda } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import { NexibotProvider } from '@/contexts/NexibotContext'

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const monda = Monda({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-monda',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NexGent - Agentes de IA para Empresas',
  description: 'Automatiza atención al cliente, ventas y reservas con agentes de inteligencia artificial. Tu próximo empleado estrella es un agente de IA.',
  keywords: 'agentes IA, inteligencia artificial, automatización empresarial, WhatsApp bot, atención cliente IA',
  authors: [{ name: 'NexGent' }],
  icons: {
    icon: '/images/ISOTIPO.png',
    shortcut: '/images/ISOTIPO.png',
    apple: '/images/ISOTIPO.png',
  },
  openGraph: {
    title: 'NexGent - Agentes de IA para Empresas',
    description: 'Automatiza tu negocio con inteligencia artificial',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${poppins.variable} ${monda.variable} font-poppins antialiased bg-white text-secondary`}>
        <NexibotProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </NexibotProvider>
      </body>
    </html>
  )
}


