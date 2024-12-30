import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Akinon Dashboard',
  description: 'Akinon Dashboard Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header 
              userName="John Doe"
              userEmail="john.doe@example.com"
            />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
