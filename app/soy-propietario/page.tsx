'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

export default function SoyPropietario() {
  useEffect(() => {
    document.body.style.cursor = 'default'
    return () => { document.body.style.cursor = '' }
  }, [])

  return (
    <>
      {/* HERO */}
      <div className="m-inner-hero m-inner-hero-blue" style={{ paddingTop: '140px' }}>
        <div className="m-box">
          <div className="m-inner-hero-grid">
            <div className="m-inner-text">
              <p className="m-eyebrow">Propietarios</p>
              <h1>Soy<br /><em className="door-em">propietario</em></h1>
              <p>Elegí cómo querés hacer crecer tu inversión. ProIA gestiona todo, vos solo cobrás.</p>
              <div className="m-inner-stats">
                {[['$0','Costo inicial'],['100%','Cobro garantizado'],['+340','Propietarios activos']].map(([v,l]) => (
                  <div key={l}>
                    <div className="m-inner-stat-val">{v}</div>
                    <div className="m-inner-stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-inner-char">
              <img src="/personajes/agente-hombre.png" alt="Asesor ProIA" />
            </div>
          </div>
        </div>
      </div>

      {/* DOS OPCIONES */}
      <section className="m-section" style={{ padding: '80px 0 120px' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Dos caminos, un objetivo</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              ¿Cuál es tu <em className="m-em">situación?</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Alquila Seguro */}
            <Link href="/alquila-seguro" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--m-blue)', borderRadius: '24px', padding: '40px', color: '#fff', transition: 'transform .25s', cursor: 'pointer' }}
                   onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-6px)')}
                   onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 20 }}>
                  <Icon name="shield" size={26} />
                </div>
                <div style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '8px' }}>Alquila Seguro</div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Publicá tu propiedad, ProIA se encarga de todo. Cobro garantizado aunque el inquilino no pague.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {['Cobro garantizado','Gestión 360°','Contratos digitales'].map(t => (
                    <span key={t} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '100px', padding: '5px 12px' }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>Ver Alquila Seguro →</span>
              </div>
            </Link>
            {/* Vende con Renta */}
            <Link href="/vende-con-renta" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--m-black)', borderRadius: '24px', padding: '40px', color: '#fff', transition: 'transform .25s', cursor: 'pointer' }}
                   onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-6px)')}
                   onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(241,127,6,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', marginBottom: 20 }}>
                  <Icon name="trending-up" size={26} />
                </div>
                <div style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '8px' }}>Vende con Renta</div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Vendé tu propiedad mientras seguís cobrando alquiler. Sin meses vacíos, con +12% de valor.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {['Sin meses vacíos','+12% valor','Doble exposición'].map(t => (
                    <span key={t} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '100px', padding: '5px 12px' }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--orange)' }}>Ver Vende con Renta →</span>
              </div>
            </Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/publicar" className="m-btn m-btn-orange" style={{ fontSize: '15px', padding: '16px 36px' }}>
              Publicar propiedad gratis →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
