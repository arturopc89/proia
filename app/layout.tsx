import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import NavMemphis from '@/components/NavMemphis'
import FloatingChat from '@/components/FloatingChat'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-jakarta',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ProIA — La inmobiliaria inteligente · Paraguay',
  description: 'Sin depósito, sin fiador. Alquilá, comprá o publicá tu propiedad con IA. Cobro garantizado.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${plusJakarta.variable} ${instrumentSerif.variable}`}>
      <body>
        <LenisProvider>
          <NavMemphis />
          {children}
          <FloatingChat />
        </LenisProvider>
      </body>
    </html>
  )
}
