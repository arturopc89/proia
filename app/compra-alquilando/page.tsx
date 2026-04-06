'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

export default function CompraAlquilando() {
  useEffect(() => {
    document.body.style.cursor = 'default'
    return () => { document.body.style.cursor = '' }
  }, [])

  return (
    <>
      {/* HERO */}
      <div className="m-inner-hero m-inner-hero-blue" style={{ paddingTop: '140px' }}>
        <div className="m-box">
          <div style={{ maxWidth: '640px' }}>
            <p className="m-eyebrow">Para inquilinos</p>
            <h1>Compra<br /><em className="door-em">alquilando</em></h1>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '18px', lineHeight: 1.7, maxWidth: '480px', margin: '16px 0 32px' }}>
              Tu alquiler de hoy se convierte en la cuota de tu casa propia. Sin enganche, sin historial crediticio.
            </p>
            <div className="m-inner-stats">
              {[['$0','Enganche inicial'],['100%','Alquiler aplicado'],['5 años','Para decidir comprar']].map(([v,l]) => (
                <div key={l}>
                  <div className="m-inner-stat-val">{v}</div>
                  <div className="m-inner-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px' }}>
              <Link href="/alquiler-express" className="m-btn m-btn-orange">Ver propiedades →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div className="m-two-col">
            <div>
              <p className="m-eyebrow">Cómo funciona</p>
              <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)', marginBottom: '24px' }}>
                Alquilás hoy,<br /><em className="m-em">comprás mañana.</em>
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.7, maxWidth: '440px', marginBottom: '32px' }}>
                Vivís en la propiedad que querés comprar. Cada mes que pagás alquiler, esa plata se acumula como parte del precio de compra.
              </p>
              <div className="m-steps">
                {[
                  ['Elegís','Seleccionás una propiedad Compra Alquilando del catálogo ProIA.'],
                  ['Alquilás','Te instalás y empezás a pagar tu alquiler mensual.'],
                  ['Acumulás','Cada pago suma para el precio final. Te decimos exactamente cuánto.'],
                  ['Decidís','En cualquier momento de los primeros 5 años, ejercés la opción de compra.'],
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
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" alt="Apartamento moderno" />
              <div className="m-photo-badge">Tu alquiler ya es tuyo</div>
            </div>
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="m-section-blue">
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Por qué elegirlo</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: '#fff' }}>
              La forma más <em className="m-em">inteligente</em> de comprar.
            </h2>
          </div>
          <div className="m-benefits">
            {([
              ['home','Sin enganche','No necesitás ahorros previos para empezar a construir tu patrimonio.'],
              ['trending-up','Precio fijado','El precio de compra se pacta al inicio. No importa si el mercado sube.'],
              ['dollar','Alquiler que no se pierde','Cada peso que pagás cuenta para la compra. No tirás plata.'],
              ['clipboard','Sin historial crediticio','Evaluamos tu capacidad actual, no tu pasado bancario.'],
              ['key','Vivís en la propiedad','Desde el primer día es tu hogar, aunque no sea tuyo todavía.'],
              ['check-circle','Opción, no obligación','Si cambias de idea, podés no comprar. Solo perdés lo que acordaste.'],
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

      {/* EJEMPLO */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Ejemplo real</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Las cuentas <em className="m-em">claras.</em>
            </h2>
          </div>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ background: 'var(--m-bg)', border: '1px solid rgba(0,0,0,.08)', borderRadius: '24px', padding: '40px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--m-black)', marginBottom: '24px' }}>Apartamento 3 dorm · Villa Morra</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  ['Precio de compra pactado', '$120,000'],
                  ['Alquiler mensual', '$1,200/mes'],
                  ['% aplicado a la compra', '30% del alquiler'],
                  ['Acumulado en 3 años', '$12,960'],
                  ['Precio final si comprás', '$107,040'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>{k}</span>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--m-black)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', background: 'var(--orange)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.7)', marginBottom: '4px' }}>Ahorrás respecto al precio original</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff' }}>$12,960</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="m-box">
          <div className="m-cta-banner">
            <h2>¿Querés una casa propia?</h2>
            <p>Empezá hoy. Cada mes que alquilás, estás más cerca de comprar.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/alquiler-express" className="m-btn-white">Ver propiedades →</Link>
              <a href="https://wa.me/595992900799" target="_blank" className="m-btn m-btn-outline-w">Hablar con un agente</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
