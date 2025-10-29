'use client'

import Image from 'next/image'

export default function NexibotHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-black border-b border-yellow-400/30 z-[9999]">
      <nav className="w-full px-6 lg:px-8 py-3 max-w-full">
        <div className="flex items-center justify-center">
          {/* Logo NEXIBOT centrado */}
          <Image
            src="/images/NEXIBOTBLANCO.png"
            alt="NEXIBOT"
            width={200}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </div>
      </nav>
    </header>
  )
}

