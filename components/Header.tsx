'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { FaWhatsapp, FaPhoneAlt, FaCalendarCheck, FaCut, FaBuilding, FaBook, FaQuestionCircle, FaRobot, FaEnvelope, FaComments, FaChartLine, FaTooth, FaUtensils, FaShoppingCart, FaHome, FaDumbbell, FaHotel, FaBell, FaDatabase, FaFileInvoice, FaCar, FaGraduationCap, FaBriefcase, FaHandshake } from 'react-icons/fa'
import Button from './ui/Button'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const menuItems = {
    soluciones: [
      { icon: FaWhatsapp, title: 'WhatsApp Business', description: 'Automatiza tu atención en WhatsApp', href: '/soluciones/whatsapp-business' },
      { icon: FaPhoneAlt, title: 'Llamadas con IA', description: 'Agentes de voz inteligentes', href: '/soluciones/llamadas-ia' },
      { icon: FaCalendarCheck, title: 'Gestión de Reservas', description: 'Sistema automático de citas', href: '/soluciones/gestion-reservas' },
      { icon: FaComments, title: 'Chatbot Web', description: 'Asistente virtual para tu web', href: '/soluciones/chatbot-web' },
      { icon: FaEnvelope, title: 'Email Automation', description: 'Campañas y seguimiento automático', href: '/soluciones/email-automation' },
      { icon: FaChartLine, title: 'CRM con IA', description: 'Gestión inteligente de clientes', href: '/soluciones/crm-ia' },
      { icon: FaBell, title: 'Recordatorios', description: 'Sistema inteligente de notificaciones', href: '/soluciones/recordatorios' },
      { icon: FaRobot, title: 'Asistente Virtual', description: 'Agente IA personalizado', href: '/soluciones/asistente-virtual' },
      { icon: FaDatabase, title: 'Base de Datos IA', description: 'Análisis y gestión inteligente', href: '/soluciones/base-datos-ia' },
      { icon: FaFileInvoice, title: 'Facturación', description: 'Automatiza tu facturación', href: '/soluciones/facturacion' },
    ],
    industrias: [
      { icon: FaCut, title: 'Salones de Belleza', description: 'Automatización para peluquerías', href: '/industrias/salones-belleza' },
      { icon: FaTooth, title: 'Clínicas Dentales', description: 'Soluciones para clínicas de salud', href: '/industrias/clinicas-dentales' },
      { icon: FaUtensils, title: 'Restaurantes', description: 'Gestión de reservas y pedidos', href: '/industrias/restaurantes' },
      { icon: FaShoppingCart, title: 'Ecommerce', description: 'Atención y ventas online', href: '/industrias/ecommerce' },
      { icon: FaHome, title: 'Inmobiliarias', description: 'Gestión de visitas y consultas', href: '/industrias/inmobiliarias' },
      { icon: FaDumbbell, title: 'Gimnasios', description: 'Reservas de clases y seguimiento', href: '/industrias/gimnasios' },
      { icon: FaHotel, title: 'Hoteles', description: 'Check-in y atención 24/7', href: '/industrias/hoteles' },
      { icon: FaBuilding, title: 'Consultoría', description: 'Agendamiento y calificación', href: '/industrias/consultoria' },
      { icon: FaCar, title: 'Concesionarios', description: 'Gestión de test drives y ventas', href: '/industrias/concesionarios' },
      { icon: FaGraduationCap, title: 'Centros Educativos', description: 'Matrículas y comunicación', href: '/industrias/educacion' },
    ],
    recursos: [
      { icon: FaBook, title: 'Blog', description: 'Artículos y novedades', href: '/recursos/blog' },
      { icon: FaQuestionCircle, title: 'Centro de Ayuda', description: 'Guías y tutoriales', href: '/recursos/centro-ayuda' },
    ],
  }

  return (
    <>
      {/* Header principal - Fixed */}
      <header 
        className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 transition-all duration-300 z-[9999]"
      >
        <nav className="w-full px-6 lg:px-8 py-3 max-w-full relative" style={{ zIndex: 99999 }}>
        <div className="flex items-center justify-between">
          {/* Logo y menú a la izquierda */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image 
                src="/images/LOGO.png" 
                alt="NexGent" 
                width={200} 
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className="text-gray-700 hover:text-black transition-colors duration-300 font-medium px-4 py-2"
              >
                Inicio
              </Link>

              {/* Dropdown: Soluciones */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('soluciones')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors duration-300 font-medium px-4 py-2"
                >
                  Soluciones
                  <HiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'soluciones' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'soluciones' && (
                  <div className="absolute left-0 pt-4" style={{ zIndex: 999999, top: '100%' }}>
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-[90vw] max-w-[640px]">
                      <div className="grid grid-cols-2 gap-2">
                        {menuItems.soluciones.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-black flex-shrink-0">
                              <item.icon className="text-lg" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-black text-sm">{item.title}</p>
                              <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown: Industrias */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('industrias')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors duration-300 font-medium px-4 py-2"
                >
                  Industrias
                  <HiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'industrias' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'industrias' && (
                  <div className="absolute left-0 pt-4" style={{ zIndex: 999999, top: '100%' }}>
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-[90vw] max-w-[640px]">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {menuItems.industrias.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-black flex-shrink-0">
                              <item.icon className="text-lg" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-black text-sm">{item.title}</p>
                              <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <Link
                          href="/contacto"
                          className="flex items-center justify-center gap-2 w-full bg-black text-white rounded-lg px-4 py-3 hover:bg-gray-800 transition-colors"
                        >
                          <FaHandshake className="text-lg" />
                          <span className="font-medium">¿No ves tu industria? Contáctanos</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/casos-exito"
                className="text-gray-700 hover:text-black transition-colors duration-300 font-medium px-4 py-2"
              >
                Casos de Éxito
              </Link>

              {/* Dropdown: Recursos */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('recursos')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors duration-300 font-medium px-4 py-2"
                >
                  Recursos
                  <HiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'recursos' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'recursos' && (
                  <div className="absolute left-0 pt-4" style={{ zIndex: 999999, top: '100%' }}>
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-80">
                      {menuItems.recursos.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-black flex-shrink-0">
                            <item.icon className="text-lg" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-black text-sm">{item.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contacto"
                className="text-gray-700 hover:text-black transition-colors duration-300 font-medium px-4 py-2"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Botones a la derecha */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href="/contacto" variant="outline" size="sm">
              Iniciar sesión
            </Button>
            <Button href="/demo" variant="primary" size="sm">
              Pide tu demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 space-y-1 animate-fadeInUp max-h-[70vh] overflow-y-auto">
            <Link
              href="/"
              className="block text-gray-900 hover:bg-gray-50 transition-colors duration-300 font-medium py-3 px-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            
            <div className="py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3 px-2">Soluciones</p>
              <div className="space-y-1">
                {menuItems.soluciones.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors duration-300 py-3 px-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-black flex-shrink-0">
                      <item.icon className="text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3 px-2">Industrias</p>
              <div className="space-y-1">
                {menuItems.industrias.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors duration-300 py-3 px-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-black flex-shrink-0">
                      <item.icon className="text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/casos-exito"
              className="block text-gray-900 hover:bg-gray-50 transition-colors duration-300 font-medium py-3 px-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Casos de Éxito
            </Link>

            <div className="py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3 px-2">Recursos</p>
              <div className="space-y-1">
                {menuItems.recursos.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors duration-300 py-3 px-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-black flex-shrink-0">
                      <item.icon className="text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contacto"
              className="block text-gray-900 hover:bg-gray-50 transition-colors duration-300 font-medium py-3 px-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>

            <div className="flex flex-col gap-3 pt-4 px-2">
              <Button href="/contacto" variant="outline" className="w-full">
                Iniciar sesión
              </Button>
              <Button href="/demo" variant="primary" className="w-full">
                Pide tu demo
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  )
}
