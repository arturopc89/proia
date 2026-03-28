'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false })

export default function RentToOwn() {
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
            <Link href="/rent-to-own" style={{ color: 'var(--green)', background: 'var(--green-l)', borderRadius: '7px' }}>Rent-to-Own</Link>
            <Link href="/portfolio-pro">Portfolio Pro</Link>
          </div>
          <div className="nav-end">
            <button className="n-g">Iniciar sesión</button>
            <Link href="/" className="n-s">Comenzar →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="sub-hero" style={{ background: 'linear-gradient(180deg,#fff 0%,#F0FFF4 100%)' }}>
        <div className="box">
          <Link href="/" className="sub-back">← Volver a ProIA</Link>
          <div className="sub-hero-grid">
            <div>
              <div className="eyebrow" style={{ color: 'var(--green)' }}>Rent-to-Own</div>
              <h1>Alquilá hoy.<br />Comprá<br /><span className="it" style={{ color: 'var(--green)' }}>mañana.</span></h1>
              <p style={{ marginTop: '18px', fontSize: '18px', color: 'var(--gray-500)', lineHeight: 1.7, maxWidth: '480px' }}>Cada mes que pagás de alquiler se convierte en capital acumulado hacia la compra de tu propiedad. El camino más accesible hacia la vivienda propia en LATAM.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}>
                <button className="btn green-btn">Quiero mi casa →</button>
                <button className="btn ghost">Soy inversor</button>
              </div>
              <div className="hero-stats">
                <div className="h-stat"><div className="h-stat-v">4x</div><div className="h-stat-l">+ Retención</div></div>
                <div className="h-stat"><div className="h-stat-v">14%</div><div className="h-stat-l">ROI anual</div></div>
                <div className="h-stat"><div className="h-stat-v">$0</div><div className="h-stat-l">Entrada inicial</div></div>
              </div>
            </div>
            <div>
              <div className="sub-hero-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80" alt="Casa propia en Paraguay" />
                <div className="img-badge"><div className="img-badge-val">30% acumulado</div><div className="img-badge-lbl">🏠 En 36 meses · Familia Martínez</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="sub-section">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow" style={{ color: 'var(--green)' }}>¿Cómo funciona?</div>
            <h2>Cada peso que pagás<br /><span className="it">trabaja para vos.</span></h2>
          </div>
          <div className="process-steps rev">
            <div className="proc-step"><div className="proc-num" style={{ background: 'var(--green)' }}>1</div><div className="proc-title">Elegís la propiedad</div><div className="proc-desc">Buscás entre las propiedades disponibles. Precio de compra fijado desde el inicio.</div></div>
            <div className="proc-step"><div className="proc-num" style={{ background: 'var(--green)' }}>2</div><div className="proc-title">Firmás el acuerdo</div><div className="proc-desc">Contrato que define el precio de compra, la cuota mensual y el período (24–60 meses).</div></div>
            <div className="proc-step"><div className="proc-num" style={{ background: 'var(--green)' }}>3</div><div className="proc-title">Vivís y acumulás</div><div className="proc-desc">Cada mes, un porcentaje de tu alquiler se acredita como adelanto de compra.</div></div>
            <div className="proc-step"><div className="proc-num" style={{ background: 'var(--green)' }}>4</div><div className="proc-title">Ejercés la opción</div><div className="proc-desc">Al término del período, comprás con el capital acumulado como pago inicial. ¡Es tuya!</div></div>
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="sub-section gray">
        <div className="box">
          <div className="two-col">
            <div className="rev">
              <div className="eyebrow" style={{ color: 'var(--green)' }}>La calculadora</div>
              <h2>¿Cuánto<br /><span className="it">acumulás?</span></h2>
              <p style={{ marginTop: '14px', color: 'var(--gray-500)', lineHeight: 1.8, fontSize: '15px' }}>Con una propiedad de $120,000 y una cuota mensual de $1,200, en 36 meses acumulás $12,960 de capital — el 10.8% del valor de la propiedad, listo para la compra.</p>
              <div style={{ background: '#fff', border: '1px solid var(--gray-100)', borderRadius: '14px', padding: '20px', marginTop: '24px', boxShadow: 'var(--sh-sm)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: 'var(--green-l)', borderRadius: '10px', padding: '14px' }}><div style={{ fontSize: '10px', color: '#065F46', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Capital acumulado</div><div style={{ fontSize: '28px', fontWeight: 800, color: '#065F46', letterSpacing: '-1px' }}>$12,960</div><div style={{ fontSize: '11px', color: '#065F46' }}>en 36 meses</div></div>
                  <div style={{ background: 'var(--blue-50)', borderRadius: '10px', padding: '14px' }}><div style={{ fontSize: '10px', color: 'var(--blue-700)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Precio bloqueado</div><div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--blue-700)', letterSpacing: '-1px' }}>$120K</div><div style={{ fontSize: '11px', color: 'var(--blue-700)' }}>sin importar el mercado</div></div>
                  <div style={{ background: 'var(--amber-l)', borderRadius: '10px', padding: '14px' }}><div style={{ fontSize: '10px', color: '#92400E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>ROI inversor</div><div style={{ fontSize: '28px', fontWeight: 800, color: '#92400E', letterSpacing: '-1px' }}>14.2%</div><div style={{ fontSize: '11px', color: '#92400E' }}>anual estimado</div></div>
                  <div style={{ background: 'var(--gray-50)', borderRadius: '10px', padding: '14px' }}><div style={{ fontSize: '10px', color: 'var(--gray-500)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Tasa conversión</div><div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-1px' }}>68%</div><div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>ejercen la opción</div></div>
                </div>
              </div>
            </div>
            <div className="rev d2">
              <div className="sub-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1448630360428-65456885c650?w=700&q=80" alt="Casa moderna" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARA INVERSORES */}
      <section className="sub-section">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow" style={{ color: 'var(--green)' }}>Para inversores</div>
            <h2>El producto que más<br /><span className="it">retiene y más genera.</span></h2>
          </div>
          <div className="benefits-grid">
            <div className="ben-card rev"><div className="ben-icon">🔒</div><div className="ben-title">Precio bloqueado</div><div className="ben-desc">El inquilino tiene incentivo para quedarse. No se va porque tiene capital acumulado en juego.</div></div>
            <div className="ben-card rev d1"><div className="ben-icon">💰</div><div className="ben-title">14.2% ROI anual</div><div className="ben-desc">Mayor que el alquiler tradicional. La prima de compra genera retorno adicional al propietario.</div></div>
            <div className="ben-card rev d2"><div className="ben-icon">📉</div><div className="ben-title">0% Vacancia</div><div className="ben-desc">El inquilino no abandona la propiedad. Tiene todo el incentivo para mantenerla en perfecto estado.</div></div>
            <div className="ben-card rev"><div className="ben-icon">📊</div><div className="ben-title">Valorización incluida</div><div className="ben-desc">Precio bloqueado para el comprador, pero la propiedad sigue valorizándose en el mercado.</div></div>
            <div className="ben-card rev d1"><div className="ben-icon">🤝</div><div className="ben-title">ProIA gestiona todo</div><div className="ben-desc">Desde el contrato hasta la escritura. Vos solo cobrás. Nosotros manejamos la operación completa.</div></div>
            <div className="ben-card rev d2"><div className="ben-icon">🏦</div><div className="ben-title">Fintech integrado</div><div className="ben-desc">Hipotecas y seguros disponibles. El paquete completo para cerrar la venta de forma garantizada.</div></div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="sub-section gray">
        <div className="box">
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }} className="rev">
            <div className="eyebrow" style={{ color: 'var(--green)' }}>Planes</div>
            <h2>Elegí tu<br /><span className="it">período.</span></h2>
          </div>
          <div className="pricing-cards">
            <div className="pr-card rev"><div className="pr-label">Corto plazo</div><div className="pr-price">24 <span>meses</span></div><div className="pr-desc">Para propiedades hasta $80,000. Acumulás entre 8–12% del valor total.</div><ul className="pr-list"><li>Capital acumulado: 10%</li><li>ROI estimado: 12% anual</li><li>Salida anticipada: sí</li><li>Refinanciación: disponible</li></ul><button className="btn ghost" style={{ width: '100%', justifyContent: 'center' }}>Comenzar</button></div>
            <div className="pr-card pop rev d1"><div className="pr-label">Recomendado <span className="pop-badge">POPULAR</span></div><div className="pr-price">36 <span>meses</span></div><div className="pr-desc">El período más elegido. Balance perfecto entre acumulación y compromiso.</div><ul className="pr-list"><li>Capital acumulado: 15%</li><li>ROI estimado: 14.2% anual</li><li>Salida anticipada: sí</li><li>Descuento precio: 2%</li></ul><button className="btn green-btn" style={{ width: '100%', justifyContent: 'center' }}>Comenzar →</button></div>
            <div className="pr-card rev d2"><div className="pr-label">Largo plazo</div><div className="pr-price">60 <span>meses</span></div><div className="pr-desc">Máxima acumulación. Para propiedades premium y familias que planifican el largo plazo.</div><ul className="pr-list"><li>Capital acumulado: 25%</li><li>ROI estimado: 16% anual</li><li>Salida anticipada: sí</li><li>Hipoteca garantizada: sí</li></ul><button className="btn ghost" style={{ width: '100%', justifyContent: 'center' }}>Comenzar</button></div>
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
              <h2>Calculá tu<br /><span className="it">acumulación.</span></h2>
              <p>Nuestro asesor IA calcula cuánto capital acumulás según la propiedad que elegís y el período que preferís.</p>
            </div>
            <div className="rev d2">
              <ChatBot pageContext="rto" />
            </div>
          </div>
        </div>
      </section>

      <div className="box"><div className="sub-cta rev" style={{ background: 'linear-gradient(135deg,var(--green),#059669)' }}>
        <h2>Tu casa empieza<br /><span className="it">este mes.</span></h2>
        <p>No esperés más. Cada mes que pasa es capital que no acumulás. Empezá tu camino hacia la vivienda propia hoy.</p>
        <div className="cta-btns"><button className="btn white-btn">Calculá tu acumulación →</button><button className="btn outline-white">Hablar con un asesor</button></div>
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
