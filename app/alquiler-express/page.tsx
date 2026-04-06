'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Icon from '@/components/Icon'
import { PROPIEDADES } from '@/lib/propiedades'

const Tour3D = dynamic(() => import('@/components/Tour3D'), { ssr: false })

interface FaqItem { q: string; a: string }
const faqs: FaqItem[] = [
  { q: '¿Cómo evalúa la IA mi perfil?', a: 'El sistema analiza tu historial de pagos, ingresos verificados, antigüedad laboral y otros factores crediticios. Es un proceso 100% objetivo y sin discriminación. No importa si no tenés historial local.' },
  { q: '¿Qué pasa si no puedo pagar un mes?', a: 'ProIA paga al propietario de todas formas. Luego trabajamos con vos un plan de regularización. El propietario nunca pierde, y vos tenés tiempo para resolver tu situación.' },
  { q: '¿Cuánto cuesta el servicio para el inquilino?', a: 'Sin comisión. Sin depósito. Pagás solo tu alquiler mensual. El costo del servicio lo absorbe el propietario, quien a cambio obtiene garantía de cobro y gestión total.' },
  { q: '¿Puedo romper el contrato antes de tiempo?', a: 'Sí, con aviso de 30 días. Los términos exactos están en tu contrato digital. No hay multas abusivas — solo el período de aviso estipulado.' }
]

export default function AlquilerExpress() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
              <p className="m-eyebrow">Para inquilinos</p>
              <h1>Alquilá sin<br /><em className="door-em">burocracia</em></h1>
              <p>Sin depósito, sin fiador, sin comisión. La IA evalúa tu perfil en 24h y te conecta directo con el propietario.</p>
              <div className="m-inner-stats">
                {[['24h','Aprobación'],['$0','Depósito'],['98%','Cobros a tiempo']].map(([v,l]) => (
                  <div key={l}>
                    <div className="m-inner-stat-val">{v}</div>
                    <div className="m-inner-stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/compra-alquilando" className="m-btn m-btn-orange">Compra Alquilando →</Link>
                <Link href="/soy-propietario" className="m-btn m-btn-outline">Soy propietario</Link>
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
              <p className="m-eyebrow">¿Cómo funciona?</p>
              <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)', marginBottom: '32px' }}>
                Simple como <em className="m-em">debe ser.</em>
              </h2>
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
            </div>
            <div className="m-photo-frame">
              <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" alt="Apartamento moderno" className="m-photo-bg" />
              <img src="/personajes/agente-mujer.png" alt="" className="m-photo-char" />
              <div className="m-photo-badge">Sin depósito · Sin fiador · 24h</div>
            </div>
          </div>
        </div>
      </section>

      {/* TOUR 3D */}
      <section className="m-section" style={{ padding: '100px 0 80px', background: 'var(--m-bg)' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Tour Virtual</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Visitá sin <em className="m-em">salir de casa.</em>
            </h2>
          </div>
          <Tour3D />
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="m-section-blue">
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Beneficios</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: '#fff' }}>
              Lo que cambia <em className="m-em">para siempre.</em>
            </h2>
          </div>
          <div className="m-benefits">
            {([
              ['ban','Sin depósito','No necesitás meses de garantía anticipada.'],
              ['users','Sin fiador','La IA asume el riesgo crediticio.'],
              ['tag','Sin comisión','El inquilino no paga comisión inmobiliaria.'],
              ['zap','Aprobación en 24h','Respuesta automática en menos de un día.'],
              ['smartphone','100% Digital','Desde la búsqueda hasta el contrato.'],
              ['shield','Cobro garantizado','El propietario cobra siempre, pase lo que pase.'],
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

      {/* PROPIEDADES */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Propiedades destacadas</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Tu próximo <em className="m-em">hogar.</em>
            </h2>
          </div>
          <div className="m-prop-grid">
            {PROPIEDADES.map(p => (
              <Link key={p.id} href={`/propiedades/${p.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(0,0,0,.06)', transition: 'transform .25s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-6px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={p.img} alt={p.zona} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '6px' }}>📍 {p.zona}, {p.ciudad}</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--m-black)', marginBottom: '4px' }}>${p.precio.toLocaleString()}/mes</div>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>{p.dormitorios} dorm · {p.banos} baños · {p.metros}m²</div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', background: 'rgba(241,127,6,.08)', padding: '4px 10px', borderRadius: '100px' }}>Disponible · Sin depósito</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="m-section" style={{ padding: '0 0 80px', background: 'var(--m-bg)' }}>
        <div className="m-box">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>Testimonios</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Lo que dicen <em className="m-em">nuestros usuarios.</em>
            </h2>
          </div>
          <div className="m-testi-grid">
            {[
              { q: '"Me aprobaron en 19 horas. Sin fiador, sin depósito. Jamás imaginé que alquilar podía ser así de fácil."', name: 'Carlos M.', role: 'Inquilino · Villa Morra' },
              { q: '"Como propietaria, cobro el 1° de cada mes sin falta. ProIA asume el riesgo y yo me olvido."', name: 'Ana R.', role: 'Propietaria · 3 propiedades' },
              { q: '"Llegué de Buenos Aires y conseguí departamento en 2 días. Sin conocer a nadie, increíble."', name: 'Diego F.', role: 'Inquilino · Recoleta' },
            ].map(({ q, name, role }) => (
              <div key={name} style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,.06)' }}>
                <div style={{ fontSize: '20px', color: 'var(--orange)', marginBottom: '12px' }}>★★★★★</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#444', marginBottom: '20px' }}>{q}</p>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--m-black)' }}>{name}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="m-section" style={{ padding: '80px 0' }}>
        <div className="m-box" style={{ maxWidth: '700px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="m-eyebrow" style={{ justifyContent: 'center' }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--m-black)' }}>
              Preguntas <em className="m-em">frecuentes.</em>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: openFaq === i ? 'var(--m-black)' : '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: '16px', overflow: 'hidden', transition: 'background .2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: openFaq === i ? '#fff' : 'var(--m-black)' }}>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: 'var(--orange)', fontWeight: 300, flexShrink: 0, marginLeft: '16px' }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="m-box">
          <div className="m-cta-banner">
            <h2>¿Listo para mudarte?</h2>
            <p>Aprobación en 24h, sin depósito, sin comisión. Tu próximo hogar te está esperando.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/compra-alquilando" className="m-btn-white">Compra Alquilando →</Link>
              <a href="https://wa.me/595992900799" target="_blank" className="m-btn m-btn-outline-w">Hablar con un agente</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
