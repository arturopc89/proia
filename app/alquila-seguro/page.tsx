'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

export default function AlquilaSeguro() {
  useEffect(() => {
    document.body.style.cursor = 'default'
    const frames = document.querySelectorAll('.m-photo-frame')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('char-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.3 }
    )
    frames.forEach(f => obs.observe(f))
    return () => { document.body.style.cursor = ''; obs.disconnect() }
  }, [])

  return (
    <>
      {/* HERO */}
      <div className="m-inner-hero m-inner-hero-blue" style={{ paddingTop: '140px' }}>
        <div className="m-box">
          <div className="m-inner-hero-grid">
            <div className="m-inner-text">
              <p className="m-eyebrow">Para propietarios</p>
              <h1>Alquila<br /><em className="door-em">seguro</em></h1>
              <p>Publicá tu propiedad y olvidate. ProIA gestiona todo y te garantiza el cobro aunque el inquilino no pague.</p>
              <div className="m-inner-stats">
                {[['100%','Cobro garantizado'],['$0','Costo inicial'],['11d','Para encontrar inquilino']].map(([v,l]) => (
                  <div key={l}>
                    <div className="m-inner-stat-val">{v}</div>
                    <div className="m-inner-stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '32px' }}>
                <Link href="/publicar" className="m-btn m-btn-orange">Publicar mi propiedad →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div className="m-two-col">
            <div>
              <p className="m-eyebrow">Proceso</p>
              <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)', marginBottom: '32px' }}>
                Así de <em className="m-em">simple.</em>
              </h2>
              <div className="m-steps">
                {[
                  ['Publicás','Subís tu propiedad con fotos y descripción. Nosotros hacemos el resto.'],
                  ['IA selecciona','Analizamos cientos de perfiles y elegimos el inquilino ideal para vos.'],
                  ['Firmamos','Contrato digital en minutos. Sin papeles, sin notarías.'],
                  ['Cobrás siempre','El 1° de cada mes, sin excusas. Aunque el inquilino no pague.'],
                ].map(([t, d]) => (
                  <div key={t} className="m-step">
                    <div className="m-step-num">→</div>
                    <div>
                      <div className="m-step-title">{t}</div>
                      <div className="m-step-desc">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-photo-frame">
              <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80" alt="Propiedad en alquiler" className="m-photo-bg" />
              <img src="/personajes/pareja.png" alt="" className="m-photo-char" />
              <div className="m-photo-badge">11 días promedio para alquilar</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="m-section-blue">
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Beneficios</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: '#fff' }}>
              Tu inversión, <em className="m-em">protegida.</em>
            </h2>
          </div>
          <div className="m-benefits">
            {([
              ['shield','Cobro garantizado','Si el inquilino no paga, ProIA paga. Sin vueltas.'],
              ['cpu','Selección con IA','Analizamos solvencia, historial y comportamiento.'],
              ['file','Contratos digitales','Firma electrónica válida. Cero papeleo físico.'],
              ['wrench','Gestión de reparaciones','Coordinamos mantenimiento sin que te ocupes.'],
              ['bar-chart','Dashboard en tiempo real','Ves todo desde tu teléfono: pagos, contratos, estado.'],
              ['message','Soporte 24/7','Un equipo real detrás cuando lo necesitás.'],
            ] as [string,string,string][]).map(([ic, t, d]) => (
              <div key={t} className="m-benefit m-benefit-dark">
                <div className="m-benefit-icon"><Icon name={ic} /></div>
                <div className="m-benefit-title m-benefit-title-w">{t}</div>
                <div className="m-benefit-desc m-benefit-desc-w">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div className="m-stats-strip">
            {[['340+','Propietarios activos'],['$0','Pérdidas por impago'],['100%','Cobro garantizado'],['4.9★','Satisfacción propietario']].map(([v,l]) => (
              <div key={l} className="m-strip-stat">
                <div className="m-strip-val">{v}</div>
                <div className="m-strip-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="m-section" style={{ padding: '0 0 80px' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Precio</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Sin letra <em className="m-em">chica.</em>
            </h2>
          </div>
          <div style={{ maxWidth: '480px', margin: '0 auto', background: 'var(--m-black)', borderRadius: '24px', padding: '48px', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Comisión mensual</div>
            <div style={{ fontSize: '72px', fontWeight: 900, letterSpacing: '-4px', lineHeight: 1, color: 'var(--orange)', marginBottom: '8px' }}>8%</div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,.5)', marginBottom: '32px' }}>del alquiler mensual · Todo incluido</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', textAlign: 'left' }}>
              {['Cobro garantizado incluso si no paga','Selección de inquilinos con IA','Contratos digitales ilimitados','Gestión de reparaciones y mantenimiento','Dashboard y reportes en tiempo real','Soporte 24/7 dedicado'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--orange)', fontWeight: 700, marginTop: '2px' }}>✓</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)' }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/publicar" className="m-btn m-btn-orange" style={{ display: 'block', textAlign: 'center', padding: '16px 32px' }}>
              Publicar mi propiedad gratis →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="m-box">
          <div className="m-cta-banner">
            <h2>¿Listo para alquilar seguro?</h2>
            <p>Más de 340 propietarios ya cobran siempre con ProIA. Sin riesgos, sin preocupaciones.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/publicar" className="m-btn-white">Publicar mi propiedad →</Link>
              <a href="https://wa.me/595992900799" target="_blank" className="m-btn m-btn-outline-w">Hablar con un agente</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
