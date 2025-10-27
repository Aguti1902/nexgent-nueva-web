'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Logo alineado con el contenido */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-5 lg:py-6">
          <Link href="/" className="block w-fit">
            <div className="relative h-12 w-40 lg:h-14 lg:w-48 hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/images/LOGO BLANCO.png"
                alt="NexGent"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>
      </div>

      {children}
    </main>
  )
}

