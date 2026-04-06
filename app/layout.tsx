import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import NavMemphis from '@/components/NavMemphis'

export const metadata: Metadata = {
  title: 'ProIA — La inmobiliaria inteligente · Paraguay',
  description: 'Sin depósito, sin fiador. Alquilá, comprá o publicá tu propiedad con IA. Cobro garantizado.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LenisProvider>
          <NavMemphis />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
