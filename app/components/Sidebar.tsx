'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-[#1E293B] min-h-screen border-r border-slate-700 transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {isOpen && <h1 className="text-xl font-bold text-slate-200">Dashboard</h1>}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-slate-700 transition-colors text-slate-200"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <nav className="space-y-2">
          <Link 
            href="/" 
            className={`flex items-center px-4 py-2 rounded transition-colors text-slate-300 ${
              pathname === '/' ? 'bg-slate-700' : 'hover:bg-slate-700'
            }`}
          >
            <span className="mr-3">🏠</span>
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link 
            href="/projects" 
            className={`flex items-center px-4 py-2 rounded transition-colors text-slate-300 ${
              pathname === '/projects' ? 'bg-slate-700' : 'hover:bg-slate-700'
            }`}
          >
            <span className="mr-3">📁</span>
            {isOpen && <span>Projeler</span>}
          </Link>
          <Link 
            href="/settings" 
            className={`flex items-center px-4 py-2 rounded transition-colors text-slate-300 ${
              pathname === '/settings' ? 'bg-slate-700' : 'hover:bg-slate-700'
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