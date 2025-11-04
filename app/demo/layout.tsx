'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaTimes } from 'react-icons/fa'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <main className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex flex-col">
      {/* Logo y Botón Cerrar */}
      <div className="relative z-50 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-5 pb-3 flex items-center justify-between">
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

          {/* Botón X para cerrar */}
          <button
            onClick={() => router.back()}
            className="bg-white hover:bg-gray-100 text-black rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Cerrar"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center overflow-hidden">
        {children}
      </div>
    </main>
  )
}

