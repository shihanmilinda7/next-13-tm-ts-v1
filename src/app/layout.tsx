import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GlobalContextProvider } from './globalContext/store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CeyInfo Taskmon',
  description: 'Monitor tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 text-slate-800 container mx-auto p-4`}>
        <AuthProvider>
          <GlobalContextProvider>
            {children}
            <ToastContainer />
          </GlobalContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
