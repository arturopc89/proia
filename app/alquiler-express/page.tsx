'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false })
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
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.06 })
    document.querySelectorAll('.rev:not(.vis)').forEach(r => obs.observe(r))
    return () => obs.disconnect()
  }, [])

  // Custom cursor
  useEffect(() => {
    const cur = document.getElementById('cur')
    const curR = document.getElementById('cur-r')
    if (!cur || !curR) return
    const move = (e: MouseEvent) => {
      cur.style.left = (e.clientX - 4) + 'px'
      cur.style.top = (e.clientY - 4) + 'px'
      curR.style.left = (e.clientX - 15) + 'px'
      curR.style.top = (e.clientY - 15) + 'px'
    }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div id="cur" />
      <div id="cur-r" />

      <nav>
        <div className="nav-i">
          <Link href="/" className="nav-br">
            <div className="nav-sq"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
            <span className="nav-nm">Pro<span>IA</span></span>
          </Link>
          <div className="nav-ls">
            <Link href="/">Plataforma</Link>
            <Link href="/alquiler-express" style={{ color: 'var(--blue-600)', background: 'var(--blue-50)', borderRadius: '7px' }}>Alquiler Express</Link>
            <Link href="/rent-to-own">Rent-to-Own</Link>
            <Link href="/portfolio-pro">Portfolio Pro</Link>
          </div>
          <div className="nav-end">
            <button className="n-g">Iniciar sesión</button>
            <Link href="/" className="n-s">Comenzar →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="sub-hero" style={{ background: 'linear-gradient(180deg,#fff 0%,var(--blue-50) 100%)' }}>
        <div className="box">
          <Link href="/" className="sub-back">← Volver a ProIA</Link>
          <div className="sub-hero-grid">
            <div>
              <div className="eyebrow">Alquiler Express</div>
              <h1>Alquilá sin<br />depósito, sin<br /><span className="it">burocracia.</span></h1>
              <p style={{ marginTop: '18px', fontSize: '18px', color: 'var(--gray-500)', lineHeight: 1.7, maxWidth: '480px' }}>Sin depósito, sin fiador, sin comisión. La IA evalúa el riesgo en 24h y el propietario cobra garantizado pase lo que pase.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}>
                <button className="btn solid">Quiero alquilar →</button>
                <button className="btn ghost">Soy propietario</button>
              </div>
              <div className="hero-stats">
                <div className="h-stat"><div className="h-stat-v">24h</div><div className="h-stat-l">Aprobación</div></div>
                <div className="h-stat"><div className="h-stat-v">$0</div><div className="h-stat-l">Depósito</div></div>
                <div className="h-stat"><div className="h-stat-v">98%</div><div className="h-stat-l">Cobros a tiempo</div></div>
              </div>
            </div>
            <div>
              <div className="sub-hero-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" alt="Apartamento moderno en Asunción" />
                <div className="img-badge"><div className="img-badge-val">$1,200/mes</div><div className="img-badge-lbl">📍 Villa Morra, Asunción · Disponible hoy</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="sub-section">
        <div className="box">
          <div className="two-col">
            <div className="rev">
              <div className="eyebrow">¿Cómo funciona?</div>
              <h2>Simple como<br /><span className="it">debe ser.</span></h2>
              <div className="step-list">
                <div className="step-item"><div className="step-num">1</div><div><div className="step-title">Elegís tu propiedad</div><div className="step-desc">Buscá entre todas las propiedades verificadas. Filtrá por zona, precio y características. Hacé el tour virtual antes de visitar.</div></div></div>
                <div className="step-item"><div className="step-num">2</div><div><div className="step-title">La IA te evalúa en 24h</div><div className="step-desc">Sin papeleo interminable. El sistema analiza tu perfil y te da respuesta en menos de 24 horas. Sin discriminación, sin subjetividad.</div></div></div>
                <div className="step-item"><div className="step-num">3</div><div><div className="step-title">Firmás todo digital</div><div className="step-desc">El contrato se firma 100% online. Sin ir a la inmobiliaria, sin perder días. Solo tu teléfono y una firma electrónica.</div></div></div>
                <div className="step-item"><div className="step-num">4</div><div><div className="step-title">Te mudás</div><div className="step-desc">Con las llaves en mano y la gestión automatizada. Cualquier problema, un click.</div></div></div>
              </div>
            </div>
            <div className="rev d2">
              <div className="sub-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80" alt="Interior moderno" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOUR 3D */}
      <section className="sub-section gray">
        <div className="box">
          <div className="rev" style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }}>
            <div className="eyebrow">Tour Virtual</div>
            <h2>Visitá sin<br /><span className="it">salir de casa.</span></h2>
            <p style={{ marginTop: '12px', color: 'var(--gray-500)', fontSize: '15px', lineHeight: 1.7 }}>Explorá cada rincón en 360° antes de decidir. Hotspots con información de los materiales.</p>
          </div>
          <div className="rev">
            <Tour3D />
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="sub-section">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow">Beneficios</div>
            <h2>Lo que cambia<br /><span className="it">para siempre.</span></h2>
          </div>
          <div className="benefits-grid">
            <div className="ben-card dark-card rev"><div className="ben-icon">🚫</div><div className="ben-title">Sin depósito</div><div className="ben-desc">No necesitás meses de garantía anticipada. Liberás ese capital para lo que importa.</div></div>
            <div className="ben-card rev d1"><div className="ben-icon">🤝</div><div className="ben-title">Sin fiador</div><div className="ben-desc">La IA asume el riesgo crediticio. No tenés que molestar a familiares o amigos.</div></div>
            <div className="ben-card rev d2"><div className="ben-icon">💸</div><div className="ben-title">Sin comisión</div><div className="ben-desc">El inquilino no paga comisión inmobiliaria. Directo, justo y transparente.</div></div>
            <div className="ben-card rev"><div className="ben-icon">⚡</div><div className="ben-title">Aprobación en 24h</div><div className="ben-desc">Evaluación automática sin burocracia. Respuesta en menos de un día hábil.</div></div>
            <div className="ben-card rev d1"><div className="ben-icon">📱</div><div className="ben-title">100% Digital</div><div className="ben-desc">Desde la búsqueda hasta el contrato. Sin ir a ningún lado, todo desde tu teléfono.</div></div>
            <div className="ben-card rev d2"><div className="ben-icon">🛡️</div><div className="ben-title">Garantía de cobro</div><div className="ben-desc">El propietario cobra siempre, pase lo que pase. ProIA asume el riesgo de impago.</div></div>
          </div>
        </div>
      </section>

      {/* PROPIEDADES */}
      <section className="sub-section">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow">Propiedades destacadas</div>
            <h2>Encontrá tu<br /><span className="it">próximo hogar.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="rev">
            {[
              { img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80', zona: 'Villa Morra, Asunción', precio: '$1,200/mes', desc: '3 dorm · 2 baños · 95m² · Sin depósito' },
              { img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80', zona: 'Mcal. López, Asunción', precio: '$1,850/mes', desc: '4 dorm · 3 baños · 130m² · Piscina' },
              { img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80', zona: 'Recoleta, Asunción', precio: '$850/mes', desc: '2 dorm · 1 baño · 65m² · Piso 8' }
            ].map((p, i) => (
              <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--sh-sm)', transition: 'all .3s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--sh-b)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--sh-sm)'; (e.currentTarget as HTMLElement).style.transform = '' }}>
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.zona} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)', marginBottom: '4px' }}>📍 {p.zona}</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '4px' }}>{p.precio}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{p.desc}</div>
                  <div style={{ marginTop: '10px' }}><span className="pill ok">Disponible</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="sub-section gray">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow">Testimonios</div>
            <h2>Lo que dicen<br /><span className="it">nuestros usuarios.</span></h2>
          </div>
          <div className="testimonial-grid">
            <div className="testi rev"><div className="stars">★★★★★</div><div className="testi-q">"Me aprobaron en 19 horas. Sin fiador, sin depósito. En mi vida me imaginé que alquilar podía ser así de fácil en Paraguay."</div><div className="testi-bot"><div className="testi-av" style={{ background: 'var(--blue-50)' }}>👨</div><div><div className="testi-nm">Carlos M.</div><div className="testi-role">Inquilino · Villa Morra</div></div></div></div>
            <div className="testi rev d1"><div className="stars">★★★★★</div><div className="testi-q">"Como propietaria, cobro el 1ro de cada mes sin falta. ProIA asume el riesgo y yo me olvido. Mis otros alquileres los paso acá también."</div><div className="testi-bot"><div className="testi-av" style={{ background: 'var(--green-l)' }}>👩</div><div><div className="testi-nm">Ana R.</div><div className="testi-role">Propietaria · 3 propiedades</div></div></div></div>
            <div className="testi rev d2"><div className="stars">★★★★★</div><div className="testi-q">"Llegué de Buenos Aires y conseguí departamento en 2 días. Sin conocer a nadie, sin referencias locales. Increíble."</div><div className="testi-bot"><div className="testi-av" style={{ background: 'var(--amber-l)' }}>🧑</div><div><div className="testi-nm">Diego F.</div><div className="testi-role">Inquilino · Recoleta</div></div></div></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sub-section">
        <div className="box" style={{ maxWidth: '700px' }}>
          <div className="rev" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="eyebrow">FAQ</div>
            <h2>Preguntas<br /><span className="it">frecuentes.</span></h2>
          </div>
          <div className="faq-list rev">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}<span className="faq-arrow">+</span>
                </button>
                <div className="faq-a"><div className="faq-a-inner">{faq.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IA CHAT */}
      <section className="ia-sec" style={{ padding: '88px 0' }}>
        <div className="ia-bg" /><div className="ia-grid-bg" />
        <div className="box" style={{ position: 'relative', zIndex: 2 }}>
          <div className="ia-layout">
            <div className="ia-left rev">
              <div className="eyebrow white">IA Advisor</div>
              <h2>Preguntá sobre<br /><span className="it">Alquiler Express.</span></h2>
              <p>Nuestro asesor IA conoce cada detalle del producto. Consultá requisitos, precios, zonas disponibles y más.</p>
            </div>
            <div className="rev d2">
              <ChatBot pageContext="express" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="box"><div className="sub-cta rev">
        <h2>Listo para <span className="it">mudarte?</span></h2>
        <p>Buscá tu próximo hogar hoy. Aprobación en 24h, sin depósito, sin comisión.</p>
        <div className="cta-btns"><button className="btn white-btn">Ver propiedades disponibles →</button><button className="btn outline-white">Hablar con un agente</button></div>
      </div></div>
      <div style={{ height: '80px', background: '#fff' }} />

      <footer>
        <div className="box">
          <div className="ft-top">
            <div><div className="ft-br-logo"><div className="ft-br-sq">🏢</div><span className="ft-br-nm">ProIA</span></div><div className="ft-desc">Plataforma PropTech inteligente para Paraguay y Latinoamérica.</div></div>
            <div className="ft-col"><div className="ft-ct">Producto</div><Link href="/alquiler-express">Alquiler Express</Link><Link href="/rent-to-own">Rent-to-Own</Link><Link href="/portfolio-pro">Portfolio Pro</Link></div>
            <div className="ft-col"><div className="ft-ct">Empresa</div><a href="#">Nosotros</a><a href="#">Inversores</a><a href="#">Blog</a></div>
            <div className="ft-col"><div className="ft-ct">Contacto</div><a href="mailto:info@proia.pro">info@proia.pro</a><a href="tel:+595992900799">+595 992 900 799</a></div>
          </div>
          <div className="ft-bot"><span className="ft-copy">© 2026 ProIA · Tecnología Inmobiliaria Inteligente</span><div className="ft-links"><a href="#">Privacidad</a><a href="#">Términos</a></div></div>
        </div>
      </footer>
    </>
  )
}
