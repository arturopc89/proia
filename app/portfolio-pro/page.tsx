'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false })

export default function PortfolioPro() {
  useEffect(() => {
    document.body.style.cursor = 'default'
    return () => { document.body.style.cursor = '' }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.06 })
    document.querySelectorAll('.rev:not(.vis)').forEach(r => obs.observe(r))
    return () => obs.disconnect()
  }, [])

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
      <div id="cur" /><div id="cur-r" />

      <nav>
        <div className="nav-i">
          <Link href="/" className="nav-br">
            <div className="nav-sq"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
            <span className="nav-nm">Pro<span>IA</span></span>
          </Link>
          <div className="nav-ls">
            <Link href="/">Plataforma</Link>
            <Link href="/alquiler-express">Alquiler Express</Link>
            <Link href="/rent-to-own">Rent-to-Own</Link>
            <Link href="/portfolio-pro" style={{ color: 'var(--purple)', background: 'var(--purple-l)', borderRadius: '7px' }}>Portfolio Pro</Link>
          </div>
          <div className="nav-end">
            <button className="n-g">Iniciar sesión</button>
            <Link href="/" className="n-s">Comenzar →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="sub-hero" style={{ background: 'linear-gradient(180deg,#fff 0%,#F5F3FF 100%)' }}>
        <div className="box">
          <Link href="/" className="sub-back">← Volver a ProIA</Link>
          <div className="sub-hero-grid">
            <div>
              <div className="eyebrow" style={{ color: 'var(--purple)' }}>Portfolio Pro</div>
              <h1>Tu portfolio.<br />Un solo<br /><span className="it" style={{ color: 'var(--purple)' }}>sistema.</span></h1>
              <p style={{ marginTop: '18px', fontSize: '18px', color: 'var(--gray-500)', lineHeight: 1.7, maxWidth: '480px' }}>Para inversores con múltiples propiedades. Dashboard unificado, IA de optimización de precios, reportes fiscales automáticos y gestión completa de inquilinos.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}>
                <button className="btn solid" style={{ background: 'var(--purple)', boxShadow: '0 4px 18px rgba(139,92,246,.3)' }}>Activar Portfolio Pro →</button>
                <button className="btn ghost">Ver demo</button>
              </div>
              <div className="hero-stats">
                <div className="h-stat"><div className="h-stat-v">7+</div><div className="h-stat-l">Propiedades</div></div>
                <div className="h-stat"><div className="h-stat-v">11%</div><div className="h-stat-l">ROI Promedio</div></div>
                <div className="h-stat"><div className="h-stat-v">-80%</div><div className="h-stat-l">Tiempo gestión</div></div>
              </div>
            </div>
            <div>
              <div className="sub-hero-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Portfolio de edificios" />
                <div className="img-badge"><div className="img-badge-val">$3.8M</div><div className="img-badge-lbl">💼 Valuación total · 7 propiedades</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD EN VIVO */}
      <section className="sub-section">
        <div className="box">
          <div className="two-col">
            <div className="rev">
              <div className="eyebrow" style={{ color: 'var(--purple)' }}>Dashboard en vivo</div>
              <h2>Todo tu portfolio<br /><span className="it">en una pantalla.</span></h2>
              <p style={{ marginTop: '14px', color: 'var(--gray-500)', lineHeight: 1.8, fontSize: '15px' }}>Dejá de abrir 7 apps distintas. ProIA unifica todas tus propiedades, inquilinos, cobros y reportes en un solo dashboard actualizado en tiempo real.</p>
              <div className="step-list">
                <div className="step-item"><div className="step-num" style={{ background: 'var(--purple)' }}>✓</div><div><div className="step-title">KPIs consolidados</div><div className="step-desc">Ingresos totales, ocupación, ROI y valuación de todo el portfolio en tiempo real.</div></div></div>
                <div className="step-item"><div className="step-num" style={{ background: 'var(--purple)' }}>✓</div><div><div className="step-title">Alertas inteligentes</div><div className="step-desc">La IA te avisa antes de que un problema se convierta en pérdida. Proactivo, no reactivo.</div></div></div>
                <div className="step-item"><div className="step-num" style={{ background: 'var(--purple)' }}>✓</div><div><div className="step-title">Reportes fiscales</div><div className="step-desc">Generación automática de reportes para tu contador. Listo para presentar ante la SET.</div></div></div>
              </div>
            </div>
            <div className="rev d2">
              <div className="sub-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80" alt="Dashboard analytics" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section className="sub-section gray">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow" style={{ color: 'var(--purple)' }}>Módulos incluidos</div>
            <h2>Todo lo que<br /><span className="it">un inversor necesita.</span></h2>
          </div>
          <div className="benefits-grid">
            <div className="ben-card rev"><div className="ben-icon">🧠</div><div className="ben-title">IA de Precios</div><div className="ben-desc">Recomendaciones automáticas de precio óptimo para cada propiedad según el mercado actual.</div></div>
            <div className="ben-card rev d1"><div className="ben-icon">📊</div><div className="ben-title">Analytics Avanzado</div><div className="ben-desc">Comparativas de rentabilidad, tendencias de mercado y benchmarking contra el sector.</div></div>
            <div className="ben-card rev d2"><div className="ben-icon">💳</div><div className="ben-title">Cobro Automatizado</div><div className="ben-desc">Débito automático a todos tus inquilinos. Un solo día de acreditación para todo el portfolio.</div></div>
            <div className="ben-card rev"><div className="ben-icon">📄</div><div className="ben-title">Contratos Masivos</div><div className="ben-desc">Gestión de todos los contratos desde un solo lugar. Renovaciones automáticas con firma digital.</div></div>
            <div className="ben-card rev d1"><div className="ben-icon">🔧</div><div className="ben-title">Mantenimiento Central</div><div className="ben-desc">Todos los tickets de todas las propiedades. Proveedores gestionados por ProIA.</div></div>
            <div className="ben-card rev d2"><div className="ben-icon">🌐</div><div className="ben-title">API para Agencias</div><div className="ben-desc">Conectá tu agencia inmobiliaria. Sincronización bidireccional con tus sistemas existentes.</div></div>
          </div>
        </div>
      </section>

      {/* IA PREDICTIVA */}
      <section className="sub-section">
        <div className="box">
          <div className="two-col">
            <div className="rev d2">
              <div className="sub-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&q=80" alt="Inversión inmobiliaria" />
              </div>
            </div>
            <div className="rev">
              <div className="eyebrow" style={{ color: 'var(--purple)' }}>IA Predictiva</div>
              <h2>Decisiones basadas<br /><span className="it">en datos, no intuición.</span></h2>
              <p style={{ marginTop: '14px', color: 'var(--gray-500)', lineHeight: 1.8, fontSize: '15px' }}>El módulo de IA analiza tu portfolio completo y recomienda cuándo subir o bajar precios, cuándo renovar contratos y cuándo conviene vender.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                <div style={{ background: 'var(--purple-l)', border: '1px solid rgba(139,92,246,.2)', borderRadius: '12px', padding: '16px' }}><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--purple)', marginBottom: '4px' }}>📈 Recomendación activa</div><div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>Torre Molas 201: mercado subió 6.2%. Podés subir el alquiler de $1,850 a $1,965 en la próxima renovación.</div></div>
                <div style={{ background: 'var(--amber-l)', border: '1px solid rgba(245,158,11,.2)', borderRadius: '12px', padding: '16px' }}><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber)', marginBottom: '4px' }}>⚠️ Alerta de vacancia</div><div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>Villa Morra: 18 días vacío. Bajar 4.2% cierra el contrato esta semana. Costo acumulado: $720.</div></div>
                <div style={{ background: 'var(--green-l)', border: '1px solid rgba(16,185,129,.2)', borderRadius: '12px', padding: '16px' }}><div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green)', marginBottom: '4px' }}>✅ Oportunidad detectada</div><div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>San Lorenzo: predio a 200m en venta 18% bajo mercado. Potencial de apreciación: 24% en 24 meses.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="sub-section gray">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow" style={{ color: 'var(--purple)' }}>Planes</div>
            <h2>Escalá cuando<br /><span className="it">vos querés.</span></h2>
          </div>
          <div className="pricing-cards">
            <div className="pr-card rev"><div className="pr-label">Starter</div><div className="pr-price">$49 <span>/mes</span></div><div className="pr-desc">Para inversores con hasta 3 propiedades que quieren empezar a profesionalizarse.</div><ul className="pr-list"><li>Hasta 3 propiedades</li><li>Dashboard básico</li><li>IA de precios</li><li>Cobro automatizado</li></ul><button className="btn ghost" style={{ width: '100%', justifyContent: 'center' }}>Comenzar</button></div>
            <div className="pr-card pop rev d1"><div className="pr-label">Pro <span className="pop-badge">POPULAR</span></div><div className="pr-price">$129 <span>/mes</span></div><div className="pr-desc">Para inversores serios. Hasta 10 propiedades con IA avanzada y reportes fiscales.</div><ul className="pr-list"><li>Hasta 10 propiedades</li><li>Dashboard avanzado</li><li>IA predictiva completa</li><li>Reportes fiscales auto.</li></ul><button className="btn solid" style={{ background: 'var(--purple)', width: '100%', justifyContent: 'center' }}>Comenzar →</button></div>
            <div className="pr-card rev d2"><div className="pr-label">Enterprise</div><div className="pr-price">Custom</div><div className="pr-desc">Para family offices y fondos. Propiedades ilimitadas, API, white-label y soporte dedicado.</div><ul className="pr-list"><li>Propiedades ilimitadas</li><li>API para agencias</li><li>White-label disponible</li><li>Soporte 24/7 dedicado</li></ul><button className="btn ghost" style={{ width: '100%', justifyContent: 'center' }}>Hablar con ventas</button></div>
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
              <h2>Optimizá tu<br /><span className="it">portfolio hoy.</span></h2>
              <p>Preguntá al asesor IA sobre gestión de múltiples propiedades, optimización de precios y estrategias de inversión.</p>
            </div>
            <div className="rev d2">
              <ChatBot pageContext="portfolio" />
            </div>
          </div>
        </div>
      </section>

      <div className="box"><div className="sub-cta rev" style={{ background: 'linear-gradient(135deg,var(--purple),var(--blue-800))' }}>
        <h2>Tu portfolio merece<br /><span className="it">management profesional.</span></h2>
        <p>Unificá todo en un solo sistema. Ahorrá tiempo, aumentá rentabilidad y tomá decisiones con datos reales.</p>
        <div className="cta-btns"><button className="btn white-btn">Empezar prueba gratuita →</button><button className="btn outline-white">Ver demo en vivo</button></div>
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
