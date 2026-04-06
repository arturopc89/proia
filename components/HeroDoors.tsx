'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function HeroDoors() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const doorLeftRef = useRef<HTMLDivElement>(null)
  const doorRightRef= useRef<HTMLDivElement>(null)
  const behindRef   = useRef<HTMLDivElement>(null)
  const hintRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        pin: true,
        start: 'top top',
        end: '+=100%',
        scrub: 1.2,
        anticipatePin: 1,
      }
    })

    tl.to(doorLeftRef.current,  { xPercent: -100, ease: 'power2.inOut', duration: 1 }, 0)
      .to(doorRightRef.current, { xPercent: 100,  ease: 'power2.inOut', duration: 1 }, 0)
      .from(behindRef.current,  { opacity: 0, scale: 0.96, ease: 'power2.out', duration: 0.8 }, 0.1)

    gsap.to(hintRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=8%',
        scrub: true,
      }
    })
  }, { scope: heroRef })

  return (
    <div ref={heroRef} className="hero-doors">

      {/* DETRÁS — se revela cuando se abren las puertas */}
      <div ref={behindRef} className="door-behind">
        <div className="door-behind-inner">
          <div className="door-behind-grid">
            <div className="door-behind-text">
              <p className="m-eyebrow">La inmobiliaria inteligente</p>
              <h2 className="door-behind-h2">
                La inmobiliaria<br/>que trabaja<br/>
                <em className="m-em">por vos.</em>
              </h2>
              <div className="door-behind-stats">
                {[['24h','Aprobación'],['100%','Cobro garantizado'],['$0','Depósito'],['11d','Para alquilar']].map(([v,l]) => (
                  <div key={l} className="door-stat">
                    <div className="door-stat-val">{v}</div>
                    <div className="door-stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="door-behind-img">
              <img src="/personajes/pareja.png" alt="Inquilinos felices" />
            </div>
          </div>
        </div>
      </div>

      {/* PUERTA IZQUIERDA — Quiero alquilar */}
      <div ref={doorLeftRef} className="door-panel door-left" onClick={() => window.location.href = '/alquiler-express'}>
        <img src="/img/hero-alquiler.jpg" alt="" className="door-bg-img" />
        <div className="door-overlay door-overlay-blue" />
        <img src="/personajes/agente-mujer.png" alt="" className="door-character" />
        <div className="door-hover-line" />
        <div className="door-content">
          <div className="door-label">
            <span className="door-pulse" />
            <span>Para vos</span>
          </div>
          <h1 className="door-h1">
            Quiero<br/>
            <em className="door-em">alquilar</em>
          </h1>
          <p className="door-desc">Sin depósito, sin fiador. Aprobado en 24h.</p>
          <div className="door-pills">
            <span className="door-pill">Alquiler Express</span>
            <span className="door-pill">Compra Alquilando</span>
          </div>
        </div>
      </div>

      {/* PUERTA DERECHA — Soy propietario */}
      <div ref={doorRightRef} className="door-panel door-right" onClick={() => window.location.href = '/soy-propietario'}>
        <img src="/img/hero-propietario.jpg" alt="" className="door-bg-img" />
        <div className="door-overlay door-overlay-dark" />
        <img src="/personajes/agente-hombre.png" alt="" className="door-character" />
        <div className="door-hover-line" />
        <div className="door-content">
          <div className="door-label">
            <span className="door-pulse" />
            <span>Tu inversión</span>
          </div>
          <h1 className="door-h1">
            Soy<br/>
            <em className="door-em">propietario</em>
          </h1>
          <p className="door-desc">Cobro garantizado, gestión cero.</p>
          <div className="door-pills">
            <span className="door-pill">Alquila Seguro</span>
            <span className="door-pill">Vende con Renta</span>
          </div>
        </div>
      </div>

      {/* SCROLL HINT */}
      <div ref={hintRef} className="door-scroll-hint">
        <div className="door-scroll-line" />
        <span>Scroll</span>
      </div>
    </div>
  )
}
