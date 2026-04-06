'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

export default function VendeConRenta() {
  useEffect(() => {
    document.body.style.cursor = 'default'
    return () => { document.body.style.cursor = '' }
  }, [])

  return (
    <>
      {/* HERO */}
      <div className="m-inner-hero" style={{ paddingTop: '140px', background: 'var(--m-black)' }}>
        <div className="m-box">
          <div className="m-inner-hero-grid">
            <div className="m-inner-text">
              <p className="m-eyebrow">Para propietarios</p>
              <h1 style={{ color: '#fff' }}>Vende con<br /><em className="door-em">renta</em></h1>
              <p style={{ color: 'rgba(255,255,255,.65)' }}>Vendé tu propiedad al mejor precio mientras seguís cobrando alquiler. Sin meses vacíos, sin perder ingresos.</p>
              <div className="m-inner-stats">
                {([['+12%','Precio vs. desocupada'],['$0','Meses sin ingreso'],['2x','Exposición en mercado']] as [string,string][]).map(([v,l]) => (
                  <div key={l}>
                    <div className="m-inner-stat-val">{v}</div>
                    <div className="m-inner-stat-lbl" style={{ color: 'rgba(255,255,255,.4)' }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/publicar" className="m-btn m-btn-orange">Publicar mi propiedad →</Link>
                <a href="https://wa.me/595992900799" target="_blank" className="m-btn" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.2)' }}>Hablar con agente</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARATIVA */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>El problema tradicional</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Vendiendo vacía<br /><em className="m-em">perdés plata.</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '20px', padding: '32px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Sin ProIA</div>
              {['Desocupás la propiedad para venderla','Perdés $1,200/mes mientras esperás comprador','El mercado la ve "fría" y ofrecen menos','Promedio 6-12 meses para cerrar venta','Perdés $7,200–$14,400 en alquileres'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#dc2626', fontWeight: 700 }}>✗</span>
                  <span style={{ fontSize: '14px', color: '#666' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '32px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Con ProIA</div>
              {['La propiedad se vende con inquilino adentro','Seguís cobrando $1,200/mes hasta el cierre','Propiedades con renta se valúan +12% más','Compradores inversores buscan activos rentando','Sin pérdidas, sin meses vacíos'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#444' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="m-section-blue">
        <div className="m-box">
          <div className="m-two-col-rev">
            <div className="m-photo-frame">
              <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" alt="Propiedad en venta con renta" className="m-photo-bg" />
              <img src="/personajes/agente-hombre.png" alt="" className="m-photo-char" />
              <div className="m-photo-badge">+12% precio promedio</div>
            </div>
            <div>
              <p className="m-eyebrow">Proceso</p>
              <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: '#fff', marginBottom: '32px' }}>
                Vendés más,<br /><em className="m-em">perdés menos.</em>
              </h2>
              <div className="m-steps">
                {[
                  ['Publicás','Cargamos tu propiedad con fotos profesionales y valoración de mercado.'],
                  ['Gestionamos','Encontramos inquilino mientras atraemos compradores inversores en paralelo.'],
                  ['Cobrás','Seguís recibiendo alquiler cada mes mientras se negocia la venta.'],
                  ['Cerrás','Cuando aparece el comprador ideal, coordinamos todo el cierre. Vos solo firmás.'],
                ].map(([t, d]) => (
                  <div key={t} className="m-step">
                    <div className="m-step-num" style={{ color: 'var(--orange)' }}>→</div>
                    <div>
                      <div className="m-step-title" style={{ color: '#fff' }}>{t}</div>
                      <div className="m-step-desc" style={{ color: 'rgba(255,255,255,.55)' }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUIÉN ES */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>¿Es para mí?</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Ideal si <em className="m-em">querés vender</em> pero…
            </h2>
          </div>
          <div className="m-benefits">
            {([
              ['clock','No es urgente','Podés esperar el precio justo sin apuro. Mientras tanto, cobrás.'],
              ['trending-up','No querés bajar el precio','Una propiedad con renta activa se negocia desde una posición de fuerza.'],
              ['dollar','Necesitás el flujo','No podés darte el lujo de meses sin ingresos mientras esperás comprador.'],
              ['bar-chart','Tenés varios inmuebles','Optimizá tu portfolio: vendé los que no querés, mantenés los que sí.'],
              ['globe','Vivís en el exterior','Gestionamos todo sin que tengas que volver. Cobrás y cerrás de forma remota.'],
              ['shield','Querés maximizar','Buscás el máximo retorno posible. Esta es la estrategia.'],
            ] as [string,string,string][]).map(([ic, t, d]) => (
              <div key={t} className="m-benefit">
                <div className="m-benefit-icon"><Icon name={ic} /></div>
                <div className="m-benefit-title">{t}</div>
                <div className="m-benefit-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="m-box">
          <div className="m-cta-banner">
            <h2>¿Querés vender mejor?</h2>
            <p>Publicá hoy y empezá a cobrar mientras tu propiedad se vende al precio que se merece.</p>
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
