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
      {/* Logo NO fijo - posición normal */}
      <div className="relative z-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-8 pb-4 md:pt-5 md:pb-2 lg:py-6">
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

