'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavMemphis() {
  const path = usePathname()
  const isHome = path === '/'

  return (
    <nav className={`nav-memphis${isHome ? '' : ' nav-solid'}`}>
      <div className="nav-memphis-inner">
        <Link href="/" className="nav-memphis-logo">
          Pro<em>IA</em>
        </Link>
        <div className="nav-memphis-links">
          <Link href="/alquiler-express" className="nav-memphis-link">Quiero alquilar</Link>
          <Link href="/soy-propietario" className="nav-memphis-link">Soy propietario</Link>
        </div>
        <div className="nav-memphis-end">
          <a href="https://wa.me/595992900799" target="_blank" className="nav-m-ghost">
            Hablar con un agente
          </a>
          <Link href="/alquiler-express" className="nav-m-cta">Comenzar →</Link>
        </div>
      </div>
    </nav>
  )
}
