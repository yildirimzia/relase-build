'use client'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'

interface HeaderProps {
  userName: string;
  userEmail: string;
  userImage?: string;
}

const Header = ({ userName, userEmail, userImage }: HeaderProps) => {
  return (
    <header className="w-full bg-[#1E293B] text-white shadow-sm px-6 py-4 border-b border-slate-700">
      <div className="flex items-center justify-end">
        <div className="flex items-center">
          <div className="text-right mr-4">
            <h2 className="font-medium text-slate-200">{userName}</h2>
            <p className="text-slate-400 text-sm">{userEmail}</p>
          </div>
          <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <FiUser size={24} className="text-slate-300" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header