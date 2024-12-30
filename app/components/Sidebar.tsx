'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} min-h-screen bg-gray-800 text-white transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <nav className="space-y-2">
          <Link 
            href="/" 
            className={`flex items-center px-4 py-2 rounded transition-colors ${
              pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <span className="mr-3">🏠</span>
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link 
            href="/projects" 
            className={`flex items-center px-4 py-2 rounded transition-colors ${
              pathname === '/projects' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <span className="mr-3">📁</span>
            {isOpen && <span>Projeler</span>}
          </Link>
          <Link 
            href="/settings" 
            className={`flex items-center px-4 py-2 rounded transition-colors ${
              pathname === '/settings' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <span className="mr-3">⚙️</span>
            {isOpen && <span>Ayarlar</span>}
          </Link>
        </nav>
      </div>
    </aside>
  )
} 