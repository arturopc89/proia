'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeroDoors = dynamic(() => import('@/components/HeroDoors'), { ssr: false })

export default function Home() {
  return (
    <>
      {/* ── HERO PUERTAS ── */}
      <HeroDoors />

      {/* ── 01 QUIERO ALQUILAR ── */}
      <section className="m-section-light">
        <div className="m-box">
          <div className="m-two-col">
            <div>
              <p className="m-eyebrow">01 — Quiero alquilar</p>
              <div className="m-section-num">01</div>
              <h2 style={{ fontSize: 'clamp(36px,4.5vw,62px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.0, color: 'var(--m-black)', marginBottom: '24px' }}>
                Tu próximo hogar,<br/>sin <em className="m-em">barreras.</em>
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.7, maxWidth: '440px', marginBottom: '32px' }}>
                Accedé a los mejores apartamentos de Asunción sin depósito y sin fiador. ProIA evalúa tu perfil en 24 horas y te conecta directo con el propietario.
              </p>
              <div className="m-steps">
                {[
                  ['Elegís','Buscás entre propiedades verificadas con tour 3D.'],
                  ['IA evalúa','Tu perfil se analiza en minutos, no días.'],
                  ['Firmás digital','Contrato 100% digital desde el celular.'],
                  ['Te mudás','Sin filas, sin burocracia, sin depósito.'],
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
              <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                <Link href="/alquiler-express" className="m-btn m-btn-orange">Ver propiedades →</Link>
                <Link href="/compra-alquilando" className="m-btn m-btn-outline">Compra Alquilando</Link>
              </div>
            </div>
            <div className="m-char-wrap">
              <img src="/personajes/agente-mujer.png" alt="Asesora ProIA" />
              <div className="m-char-badge">Sin depósito · Sin fiador · 24h</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 SOY PROPIETARIO ── */}
      <section className="m-section-blue">
        <div className="m-box">
          <div className="m-two-col-rev">
            <div className="m-char-wrap">
              <img src="/personajes/agente-hombre.png" alt="Asesor ProIA" style={{ mixBlendMode: 'luminosity', opacity: 0.9 }} />
              <div className="m-char-badge m-char-badge-dark">+340 propietarios activos</div>
            </div>
            <div>
              <p className="m-eyebrow">02 — Soy propietario</p>
              <div className="m-section-num m-section-num-w">02</div>
              <h2 style={{ fontSize: 'clamp(36px,4.5vw,62px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.0, color: '#fff', marginBottom: '24px' }}>
                Alquilá seguro.<br/><em className="m-em">Cobrá siempre.</em>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: '440px', marginBottom: '32px' }}>
                ProIA gestiona todo por vos: inquilinos, contratos, cobros y mantenimiento. Si el inquilino no paga, vos sí cobrás.
              </p>
              <div className="m-benefits" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
                {[
                  ['🛡️','Cobro garantizado','Aunque el inquilino no pague.'],
                  ['📄','Contratos digitales','Firma electrónica en minutos.'],
                  ['🤖','Selección IA','Los mejores perfiles, siempre.'],
                  ['📊','Dashboard 24/7','Todo tu portfolio en un panel.'],
                ].map(([ic, t, d]) => (
                  <div key={t} className="m-benefit m-benefit-dark">
                    <div className="m-benefit-icon">{ic}</div>
                    <div className="m-benefit-title m-benefit-title-w">{t}</div>
                    <div className="m-benefit-desc m-benefit-desc-w">{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                <Link href="/alquila-seguro" className="m-btn m-btn-orange">Publicar propiedad →</Link>
                <Link href="/vende-con-renta" className="m-btn m-btn-outline-w">Vende con Renta</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Números que importan</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Resultados <em className="m-em">reales.</em>
            </h2>
          </div>
          <div className="m-stats-strip">
            {[['11d','Tiempo promedio para alquilar'],['$0','Depósito requerido'],['100%','Cobro garantizado'],['24h','Aprobación de perfil']].map(([v,l]) => (
              <div key={l} className="m-strip-stat">
                <div className="m-strip-val">{v}</div>
                <div className="m-strip-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="m-box">
          <div className="m-cta-banner">
            <h2>¿Listo para empezar?</h2>
            <p>Más de 340 propietarios y miles de inquilinos ya confían en ProIA. Sumate hoy.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/alquiler-express" className="m-btn-white">Quiero alquilar →</Link>
              <Link href="/alquila-seguro" className="m-btn m-btn-outline-w" style={{ position: 'relative' }}>Publicar propiedad</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--m-black)', padding: '48px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="m-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: '6px' }}>
              Pro<span style={{ color: 'var(--orange)' }}>IA</span>
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.35)' }}>
              Av. Molas López esq. José A Moreno, Edificio ON CoWorking, Of. 201, Asunción
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a href="https://wa.me/595992900799" target="_blank" style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)', textDecoration: 'none' }}>WhatsApp</a>
            <a href="mailto:info@proia.pro" style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)', textDecoration: 'none' }}>info@proia.pro</a>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.2)' }}>© 2026 ProIA</span>
          </div>
        </div>
      </footer>
    </>
  )
}
