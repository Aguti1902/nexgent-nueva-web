'use client'

import Image from 'next/image'
import NexibotToggle from '../NexibotToggle'
import { FaRobot } from 'react-icons/fa'

export default function NexibotHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-black border-b border-yellow-400/30 z-[9999]">
      <nav className="w-full px-6 lg:px-8 py-4 max-w-full">
        <div className="flex items-center justify-between">
          {/* Logo NEXIBOT */}
          <div className="flex items-center gap-3">
            <FaRobot className="text-3xl text-yellow-400" />
            <h1 className="font-monda text-2xl font-bold">
              <span className="text-white">NEX</span>
              <span className="text-yellow-400">IBOT</span>
            </h1>
          </div>

          {/* Toggle */}
          <NexibotToggle />
        </div>
      </nav>
    </header>
  )
}

