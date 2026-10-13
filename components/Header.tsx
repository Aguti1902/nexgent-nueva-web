'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Hello Nails', href: '/casos-exito/hello-nails' },
    { label: 'Nuestro proceso', href: '/#proceso' },
    { label: 'Contacto', href: '/contacto' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
            <Image
              src="/images/LOGO.png"
              alt="NexGent"
              width={180}
              height={50}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contacto"
              className="bg-black text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 whitespace-nowrap"
            >
              Agenda una llamada
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-800 font-medium py-3 px-2 rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contacto"
                className="block bg-black text-white text-center font-semibold px-5 py-3 rounded-full hover:bg-gray-800 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agenda una llamada
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
