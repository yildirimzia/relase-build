'use client'
import { FiUser } from 'react-icons/fi'

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center px-6">
      <div className="flex-1 flex items-center">
        <div className="flex flex-col">
          <h3 className="font-medium text-gray-900 dark:text-white">Ahmet Yılmaz</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">ahmet.yilmaz@email.com</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <FiUser size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header 