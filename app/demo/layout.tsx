'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex flex-col">
      {/* Logo compacto */}
      <div className="relative z-50 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-4 pb-2">
          <Link href="/" className="block w-fit">
            <div className="relative h-10 w-32 lg:h-12 lg:w-40 hover:opacity-80 transition-opacity duration-300">
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

      <div className="flex-1 flex items-center overflow-hidden">
        {children}
      </div>
    </main>
  )
}

