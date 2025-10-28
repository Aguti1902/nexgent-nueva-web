'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollPopup from '@/components/ScrollPopup'
import ChatWidget from '@/components/ChatWidget'
import { useNexibot } from '@/contexts/NexibotContext'
import NexibotInterface from '@/components/nexibot/NexibotInterface'
import NexibotTransition from '@/components/NexibotTransition'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { isNexibotMode } = useNexibot()
  const isDemoPage = pathname === '/demo'
  const isAdminPage = pathname?.startsWith('/admin')

  // Para páginas de demo y admin, solo mostramos el contenido sin Header/Footer
  if (isDemoPage || isAdminPage) {
    return <>{children}</>
  }

  // Si está en modo NEXIBOT, mostrar la interfaz de NEXIBOT
  if (isNexibotMode) {
    return (
      <>
        <Header />
        <NexibotTransition />
        <NexibotInterface />
      </>
    )
  }

  // Para el resto de páginas, mostramos Header, Footer y widgets
  return (
    <>
      <Header />
      <NexibotTransition />
      <main className="min-h-screen overflow-x-hidden" style={{ paddingTop: '88px' }}>
        {children}
      </main>
      <Footer />
      <ScrollPopup />
      <ChatWidget />
    </>
  )
}

