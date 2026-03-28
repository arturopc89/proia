import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProIA — Plataforma Inmobiliaria Inteligente',
  description: 'PropTech #1 en Paraguay. Gestioná tus propiedades con IA real, tours 3D y automatización total.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
