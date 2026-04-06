'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NavMemphis() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav-memphis nav-white${scrolled ? ' nav-shadowed' : ''}`}>
      <div className="nav-memphis-inner">
        <Link href="/" className="nav-memphis-logo">
          <img src="/logo.png" alt="ProIA" className="nav-memphis-logo-img" />
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
