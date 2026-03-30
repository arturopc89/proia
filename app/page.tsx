'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false })

export default function Home() {
  const [dashTab, setDashTab] = useState('portfolio')
  const [featTab, setFeatTab] = useState('ia-pred')
  const [showBubble, setShowBubble] = useState(true)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('loader')?.classList.add('gone')
    }, 2100)
    return () => clearTimeout(timer)
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

  // Cursor hover effect
  useEffect(() => {
    const cur = document.getElementById('cur')
    const curR = document.getElementById('cur-r')
    if (!cur || !curR) return
    const els = document.querySelectorAll<HTMLElement>('a,button,.mod-card,.mc,.f-tab,.faq-q,.pr-card')
    const enter = () => { cur.style.transform = 'scale(2)'; curR.style.opacity = '.3'; curR.style.transform = 'scale(1.4)' }
    const leave = () => { cur.style.transform = 'scale(1)'; curR.style.opacity = '.55'; curR.style.transform = 'scale(1)' }
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })
    return () => els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
  })

  // Bubble se cierra cuando termina el video
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const onEnd = () => setShowBubble(false)
    vid.addEventListener('ended', onEnd)
    return () => vid.removeEventListener('ended', onEnd)
  }, [])

  function openChat() {
    setShowBubble(false)
    setTimeout(() => {
      const ia = document.getElementById('ia')
      if (ia) ia.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  // IntersectionObserver reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.06 })
    document.querySelectorAll('.rev:not(.vis)').forEach(r => obs.observe(r))
    return () => obs.disconnect()
  }, [dashTab, featTab])

  return (
    <>
      {/* Custom cursor */}
      <div id="cur" />
      <div id="cur-r" />

      {/* Loader */}
      <div id="loader">
        <div className="ld-br">
          <div className="ld-sq">
            <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
          </div>
          <span className="ld-wm">Pro<span>IA</span></span>
        </div>
        <div className="ld-bar"><div className="ld-fill" /></div>
        <div className="ld-sub">Inicializando plataforma</div>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-i">
          <Link href="/" className="nav-br">
            <div className="nav-sq"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
            <span className="nav-nm">Pro<span>IA</span></span>
          </Link>
          <div className="nav-ls">
            <a href="#sistema">Plataforma</a>
            <Link href="/alquiler-express">Alquiler Express</Link>
            <Link href="/rent-to-own">Rent-to-Own</Link>
            <Link href="/portfolio-pro">Portfolio Pro</Link>
            <a href="#ia">IA Advisor</a>
          </div>
          <div className="nav-end">
            <button className="n-g">Iniciar sesión</button>
            <a href="#cta" className="n-s">Comenzar →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero-master">
        <div className="h-orb h-orb-1" />
        <div className="h-orb h-orb-2" />
        <div className="box" style={{ width: '100%' }}>
          <div className="hero-grid">

            {/* COLUMNA IZQUIERDA */}
            <div className="hero-left">
              <div className="hero-badge" style={{ animation: 'fadeUp .6s ease .2s both' }}>
                <span className="badge-dot" /> PropTech #1 en Paraguay
              </div>
              <h1 style={{ animation: 'fadeUp .6s ease .35s both' }}>
                Tu patrimonio.<br /><span className="it">Inteligente.</span><br />Escalable.
              </h1>
              <p className="hero-sub" style={{ animation: 'fadeUp .6s ease .5s both' }}>
                Gestioná tus propiedades con IA real, tours 3D y automatización total. Del primer alquiler a un portfolio de edificios — un solo sistema.
              </p>
              <div className="hero-ctas" style={{ animation: 'fadeUp .6s ease .65s both' }}>
                <a href="#sistema" className="btn solid">▶&nbsp; Ver demo en vivo</a>
                <Link href="/alquiler-express" className="btn ghost">Alquiler Express →</Link>
              </div>
              <div className="hero-tech" style={{ animation: 'fadeUp .6s ease .8s both' }}>
                <span className="tech-label">Stack</span>
                <div className="tech-pills">
                  <span className="tech-pill">Supabase</span><span className="tech-pill">Claude AI</span><span className="tech-pill">Vercel</span><span className="tech-pill">Matterport</span>
                </div>
              </div>
              <div className="hero-stats-row" style={{ animation: 'fadeUp .6s ease .95s both' }}>
                <div><div className="hero-stat-val">$47K</div><div className="hero-stat-lbl">Ingresos/mes promedio</div></div>
                <div><div className="hero-stat-val">94%</div><div className="hero-stat-lbl">Ocupación garantizada</div></div>
                <div><div className="hero-stat-val">24h</div><div className="hero-stat-lbl">Aprobación inquilinos</div></div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Valentina */}
            <div className="hero-right">
              <div className="valentina-glow" />
              <div className="valentina-ring" style={{ width: '280px', height: '280px', border: '1px solid rgba(45,91,227,.12)' }} />
              <div className="valentina-ring" style={{ width: '380px', height: '380px', border: '1px solid rgba(45,91,227,.07)' }} />

              <video
                ref={videoRef}
                id="valentina-video"
                autoPlay
                muted={muted}
                playsInline
                style={{
                  position: 'relative',
                  zIndex: 1,
                  height: '88vh',
                  maxHeight: '720px',
                  width: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                  filter: 'brightness(1.05) contrast(1.02)',
                  animation: 'fadeUp .8s ease 1.1s both',
                }}
              >
                <source src="/valentina.mp4" type="video/mp4" />
              </video>

              {/* Botón de sonido */}
              <button
                className="valentina-sound"
                onClick={() => {
                  setMuted(m => !m)
                  videoRef.current?.play()
                }}
                title={muted ? 'Activar audio' : 'Silenciar'}
              >
                {muted ? '🔇' : '🔊'}
              </button>

              {/* Bubble al lado de su boca */}
              {showBubble && (
                <div className="valentina-bubble">
                  <p>"Hola! Soy <strong>Valentina</strong>, tu asesora de ProIA. ¿Te muestro las propiedades disponibles hoy?"</p>
                  <div className="valentina-bubble-btns">
                    <button className="vb-yes" onClick={openChat}>Sí, mostrámelas</button>
                    <button className="vb-no" onClick={() => setShowBubble(false)}>Ahora no</button>
                  </div>
                </div>
              )}

              {/* Badge flotante */}
              <div className="valentina-prop-badge">
                <div className="vpb-inner">
                  <div className="vpb-icon">🏢</div>
                  <div>
                    <div className="vpb-title">Villa Morra · Disponible</div>
                    <div className="vpb-price">$1,200/mes · Sin depósito</div>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /hero-grid */}

          {/* DASHBOARD */}
          <div className="dash-wrap">
            <div className="dash-shell">
              <div className="dash-bar">
                <div className="ds r" /><div className="ds y" /><div className="ds g" />
                <div className="dash-url"><span style={{ color: 'var(--green)', fontSize: '11px' }}>🔒</span> app.proia.pro/dashboard</div>
              </div>
              <div className="dash-tabs">
                {(['portfolio','valuacion','gestion','fintech','global'] as const).map((id, i) => {
                  const labels = ['📊 Portfolio','🧠 IA Valuación','🔄 Gestión 360°','🏦 Fintech','🌍 Global']
                  return (
                    <button key={id} className={`d-tab${dashTab === id ? ' active' : ''}`} onClick={() => setDashTab(id)}>
                      {labels[i]}
                    </button>
                  )
                })}
              </div>
              <div className="dash-panels">
                {/* Portfolio */}
                <div className={`d-panel${dashTab === 'portfolio' ? ' active' : ''}`}>
                  <div className="kpi-row">
                    <div className="kpi"><div className="kpi-l">Ingresos / Mes</div><div className="kpi-v">$47.2K</div><div className="kpi-d up">↑ +12.4%</div></div>
                    <div className="kpi"><div className="kpi-l">Ocupación</div><div className="kpi-v">94%</div><div className="kpi-d up">↑ Óptimo</div></div>
                    <div className="kpi"><div className="kpi-l">Propiedades</div><div className="kpi-v">7</div><div className="kpi-d up">+1 este mes</div></div>
                    <div className="kpi"><div className="kpi-l">Valuación Total</div><div className="kpi-v">$3.8M</div><div className="kpi-d up">↑ +8.2%</div></div>
                  </div>
                  <div className="ptable">
                    <div className="pt-r hd"><span>Propiedad</span><span>$/mes</span><span>Estado</span></div>
                    <div className="pt-r"><div className="pt-nm"><div className="pt-av b">🏢</div><div><div className="pt-n">Torre Molas López 201</div><div className="pt-a">Asunción</div></div></div><span className="pt-p">$1,850</span><span className="pill ok">Alquilada</span></div>
                    <div className="pt-r"><div className="pt-nm"><div className="pt-av t">🏘️</div><div><div className="pt-n">Residencial Villa Morra</div><div className="pt-a">Asunción</div></div></div><span className="pt-p">$1,200</span><span className="pill av">Disponible</span></div>
                    <div className="pt-r"><div className="pt-nm"><div className="pt-av a">🏗️</div><div><div className="pt-n">Edificio San Lorenzo B2</div><div className="pt-a">San Lorenzo</div></div></div><span className="pt-p">$950</span><span className="pill wk">Renovación</span></div>
                  </div>
                  <div className="ai-al"><div className="ai-al-ic">🤖</div><div><strong>Alerta IA:</strong> Villa Morra lleva 18 días vacía. Bajar 4.2% cerraría en 7 días. Costo actual: <strong>$720.</strong></div></div>
                </div>

                {/* IA Valuación */}
                <div className={`d-panel${dashTab === 'valuacion' ? ' active' : ''}`}>
                  <div className="iav-grid">
                    <div>
                      <div className="iav-sb">🔍 <span>Villa Morra, 3 dorm, 120m², Asunción</span><span style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', borderRadius: '4px', padding: '1px 5px', fontSize: '9px', color: 'var(--gray-400)' }}>⏎</span></div>
                      <div className="iav-rc">
                        <div className="iav-addr">📍 Villa Morra · Análisis en 1.2s</div>
                        <div className="iav-price">$1,180 <span style={{ fontSize: '13px', color: 'var(--gray-400)', fontWeight: 400 }}>/mes</span></div>
                        <div className="iav-rng">Rango: $1,050 — $1,310</div>
                        <div className="iav-tags"><span className="iav-tag b">Precio óptimo</span><span className="iav-tag g">Demanda alta</span><span className="iav-tag a">Zona premium</span></div>
                      </div>
                    </div>
                    <div>
                      <div className="iav-conf">
                        <div className="iav-cl">Confianza del modelo</div>
                        <div className="iav-bar"><div className="iav-fill" style={{ width: '94%' }} /></div>
                        <div className="iav-pct">94%</div>
                      </div>
                      <div className="iav-fac">
                        <div className="iav-f"><span className="iav-fn">Ubicación</span><div className="iav-fb"><div className="iav-ff" style={{ width: '92%' }} /></div><span className="iav-fv">9.2</span></div>
                        <div className="iav-f"><span className="iav-fn">Estado</span><div className="iav-fb"><div className="iav-ff" style={{ width: '85%' }} /></div><span className="iav-fv">8.5</span></div>
                        <div className="iav-f"><span className="iav-fn">Demanda</span><div className="iav-fb"><div className="iav-ff" style={{ width: '88%' }} /></div><span className="iav-fv">8.8</span></div>
                        <div className="iav-f"><span className="iav-fn">Tendencia</span><div className="iav-fb"><div className="iav-ff" style={{ width: '91%' }} /></div><span className="iav-fv">↑9.1%</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gestión */}
                <div className={`d-panel${dashTab === 'gestion' ? ' active' : ''}`}>
                  <div className="g-grid">
                    <div className="g-card"><div className="g-ic b">📄</div><div className="g-tt">Contratos Digitales</div><div className="g-ds">Firma electrónica 100% digital.</div><div className="g-st on"><div className="g-dot" />Activo</div></div>
                    <div className="g-card"><div className="g-ic g">💳</div><div className="g-tt">Cobro Automático</div><div className="g-ds">Débito + garantía de pago.</div><div className="g-st on"><div className="g-dot" />Activo</div></div>
                    <div className="g-card"><div className="g-ic t">🔧</div><div className="g-tt">Mantenimiento</div><div className="g-ds">Tickets en tiempo real.</div><div className="g-st soon"><div className="g-dot" />Q2 2026</div></div>
                    <div className="g-card"><div className="g-ic a">📊</div><div className="g-tt">Reportes Fiscales</div><div className="g-ds">Generación automática.</div><div className="g-st soon"><div className="g-dot" />Q2 2026</div></div>
                    <div className="g-card"><div className="g-ic p">🔔</div><div className="g-tt">Alertas IA</div><div className="g-ds">Proactivas, sin que lo pidas.</div><div className="g-st on"><div className="g-dot" />Activo</div></div>
                    <div className="g-card"><div className="g-ic b">📱</div><div className="g-tt">App Móvil</div><div className="g-ds">iOS y Android.</div><div className="g-st soon"><div className="g-dot" />Q4 2026</div></div>
                  </div>
                </div>

                {/* Fintech */}
                <div className={`d-panel${dashTab === 'fintech' ? ' active' : ''}`}>
                  <div className="ft-grid">
                    <div className="ft-big">
                      <div className="ft-bl">Premium fintech</div>
                      <div className="ft-bv">+20%</div>
                      <div className="ft-bs">sobre modelos sin fintech</div>
                      <div className="ft-bb">✦ Habi y QuintoAndar lo validan</div>
                    </div>
                    <div className="ft-sm">
                      <div className="ft-sc"><div className="ft-si">🏠</div><div className="ft-sv">$2.4M</div><div className="ft-sl">Hipotecas originadas</div><div className="ft-sd">↑ +34% Q1</div></div>
                      <div className="ft-sc"><div className="ft-si">🛡️</div><div className="ft-sv">127</div><div className="ft-sl">Seguros activos</div><div className="ft-sd">↑ Impago: 0.8%</div></div>
                    </div>
                    <div className="ft-funnel">
                      <div className="ft-ftl">Embudo Rent-to-Own</div>
                      <div className="funnel">
                        <div className="f-st"><div className="f-bar" style={{ background: 'var(--blue-500)' }}>340</div><div className="f-lbl">Interesados</div></div>
                        <div className="f-st"><div className="f-bar" style={{ background: 'var(--blue-600)', height: '32px' }}>210</div><div className="f-lbl">Calificados</div></div>
                        <div className="f-st"><div className="f-bar" style={{ background: 'var(--blue-700)', height: '26px' }}>98</div><div className="f-lbl">Contratos</div></div>
                        <div className="f-st"><div className="f-bar" style={{ background: 'var(--teal)', height: '20px' }}>41</div><div className="f-lbl">Compraron</div></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global */}
                <div className={`d-panel${dashTab === 'global' ? ' active' : ''}`}>
                  <div className="gl-grid">
                    <div>
                      <div className="globe-v">
                        <div className="globe-rings">
                          <div className="gl-ring" style={{ width: '160px', height: '160px', border: '1px solid rgba(45,91,227,.25)' }} />
                          <div className="gl-ring" style={{ width: '260px', height: '260px', border: '1px dashed rgba(45,91,227,.15)' }} />
                        </div>
                        <div className="gl-ctr">🌎</div>
                        <div className="gl-dots">
                          <div className="gl-dot" style={{ top: '38%', left: '36%' }}>🇵🇾</div>
                          <div className="gl-dot" style={{ top: '33%', left: '30%' }}>🇨🇴</div>
                          <div className="gl-dot" style={{ top: '48%', left: '28%' }}>🇵🇪</div>
                          <div className="gl-dot" style={{ top: '28%', left: '26%' }}>🇲🇽</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginTop: '10px' }}>
                        <div style={{ background: 'var(--gray-50)', borderRadius: '9px', padding: '10px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--blue-950)' }}>4</div><div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>Países</div></div>
                        <div style={{ background: 'var(--gray-50)', borderRadius: '9px', padding: '10px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--blue-950)' }}>$3.9B</div><div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>Mercado 2030</div></div>
                        <div style={{ background: 'var(--gray-50)', borderRadius: '9px', padding: '10px', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--blue-950)' }}>0</div><div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>Líderes PY</div></div>
                      </div>
                    </div>
                    <div className="gl-countries">
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Expansión</div>
                      <div className="gc-itm"><div className="gc-l"><div className="gc-f">🇵🇾</div><div className="gc-n">Paraguay</div></div><div className="gc-s live">LIVE</div></div>
                      <div className="gc-itm"><div className="gc-l"><div className="gc-f">🇨🇴</div><div className="gc-n">Colombia</div></div><div className="gc-s q2">Q2 2026</div></div>
                      <div className="gc-itm"><div className="gc-l"><div className="gc-f">🇵🇪</div><div className="gc-n">Perú</div></div><div className="gc-s q4">Q4 2026</div></div>
                      <div className="gc-itm"><div className="gc-l"><div className="gc-f">🇲🇽</div><div className="gc-n">México</div></div><div className="gc-s plan">2027</div></div>
                      <div className="gc-itm"><div className="gc-l"><div className="gc-f">🇦🇷</div><div className="gc-n">Argentina</div></div><div className="gc-s plan">2027</div></div>
                      <div className="gl-note">🏆 <strong>First-mover:</strong> Paraguay, Perú y Ecuador son los únicos mercados LATAM sin líder PropTech.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...Array(2)].map((_, ri) => (
            <span key={ri} style={{ display: 'contents' }}>
              <div className="tk"><span className="tk-v">$1.76B</span><span className="tk-l">Mercado PropTech LATAM 2025</span></div><span className="tk-sp">·</span>
              <div className="tk"><span className="tk-v">13.6%</span><span className="tk-l">CAGR 2023–2030</span></div><span className="tk-sp">·</span>
              <div className="tk"><span className="tk-v">$3.9B</span><span className="tk-l">Proyección 2030</span></div><span className="tk-sp">·</span>
              <div className="tk"><span className="tk-v">234</span><span className="tk-l">Empresas en LATAM</span></div><span className="tk-sp">·</span>
              <div className="tk"><span className="tk-v">+67%</span><span className="tk-l">VC Recovery 2025</span></div><span className="tk-sp">·</span>
              <div className="tk"><span className="tk-v">0</span><span className="tk-l">Líderes en Paraguay</span></div><span className="tk-sp">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* SISTEMA */}
      <section id="sistema" style={{ background: '#fff' }}>
        <div className="box">
          <div className="rev" style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 52px' }}>
            <div className="eyebrow">La Plataforma</div>
            <h2>Todo lo que tu<br /><span className="it">patrimonio necesita.</span></h2>
            <p style={{ marginTop: '12px', color: 'var(--gray-500)', fontSize: '16px', lineHeight: 1.7 }}>Cuatro módulos que trabajan juntos para hacer crecer tu inversión.</p>
          </div>
          <div className="sist-wrap">
            <div className="rev">
              <div className="feat-tabs">
                {[
                  { id: 'ia-pred', ic: 'b', emoji: '🧠', title: 'IA Predictiva de Valuación', desc: 'Precios óptimos en segundos con 94% de precisión' },
                  { id: 'gest360', ic: 't', emoji: '🔄', title: 'Gestión 360° Automatizada', desc: 'Desde el contrato hasta el cobro, sin fricción' },
                  { id: 'fintech', ic: 'g', emoji: '🏦', title: 'Convergencia Fintech', desc: 'Hipotecas, seguros y rent-to-own integrados' },
                  { id: 'global', ic: 'a', emoji: '🌍', title: 'Arquitectura Global desde Día 1', desc: 'Paraguay hoy, LATAM mañana, el mundo después' }
                ].map(t => (
                  <button key={t.id} className={`f-tab${featTab === t.id ? ' active' : ''}`} onClick={() => setFeatTab(t.id)}>
                    <div className={`f-tab-ic ${t.ic}`}>{t.emoji}</div>
                    <div><div className="f-tab-title">{t.title}</div><div className="f-tab-desc">{t.desc}</div></div>
                  </button>
                ))}
              </div>
            </div>
            <div className="feat-panels rev d2">
              <div className={`f-panel${featTab === 'ia-pred' ? ' active' : ''}`}>
                <div className="fp-card blue"><div className="fp-ey blue">🧠 IA Predictiva</div><div className="fp-title">Sabe cuánto vale antes de que lo publiques</div><div className="fp-desc">El modelo analiza miles de variables del mercado paraguayo: zona, m², estado, demanda histórica y tendencias. Resultado en menos de 2 segundos.</div><div className="fp-chart"><div className="fc-b" style={{ height: '38%', background: 'var(--blue-100)' }} /><div className="fc-b" style={{ height: '52%', background: 'var(--blue-200)' }} /><div className="fc-b" style={{ height: '45%', background: 'var(--blue-100)' }} /><div className="fc-b" style={{ height: '68%', background: 'var(--blue-400)' }} /><div className="fc-b" style={{ height: '72%', background: 'var(--blue-500)' }} /><div className="fc-b" style={{ height: '85%', background: 'var(--blue-600)' }} /><div className="fc-b" style={{ height: '91%', background: 'var(--blue-700)' }} /><div className="fc-b" style={{ height: '78%', background: 'var(--blue-300)', border: '2px dashed var(--blue-500)' }} /></div><div className="fp-stats"><div className="fp-st"><div className="fp-stv">94%</div><div className="fp-stl">Precisión</div></div><div className="fp-st"><div className="fp-stv">1.2s</div><div className="fp-stl">Respuesta</div></div><div className="fp-st"><div className="fp-stv">5K+</div><div className="fp-stl">Variables</div></div></div><div className="fp-badges"><span className="fp-bg blue">Machine Learning</span><span className="fp-bg blue">Tiempo real</span><span className="fp-bg green">Validado</span></div></div>
              </div>
              <div className={`f-panel${featTab === 'gest360' ? ' active' : ''}`}>
                <div className="fp-card teal"><div className="fp-ey teal">🔄 Gestión 360°</div><div className="fp-title">Tu propiedad funciona mientras dormís</div><div className="fp-desc">Contratos digitales, cobros automáticos, mantenimiento y reportes fiscales. Todo en un solo lugar, todo automatizado.</div><div className="fp-list"><div className="fp-li"><div className="fp-chk teal">✓</div>Firma electrónica en minutos</div><div className="fp-li"><div className="fp-chk teal">✓</div>Cobro automático + garantía</div><div className="fp-li"><div className="fp-chk teal">✓</div>Tickets de mantenimiento</div><div className="fp-li"><div className="fp-chk teal">✓</div>Reportes fiscales auto.</div><div className="fp-li"><div className="fp-chk teal">✓</div>Alertas proactivas de IA</div></div><div className="fp-stats"><div className="fp-st"><div className="fp-stv">0</div><div className="fp-stl">Papel</div></div><div className="fp-st"><div className="fp-stv">98%</div><div className="fp-stl">Cobros a tiempo</div></div><div className="fp-st"><div className="fp-stv">-80%</div><div className="fp-stl">Tiempo gestión</div></div></div><div className="fp-badges"><span className="fp-bg teal">Firma digital</span><span className="fp-bg teal">Pagos auto</span><span className="fp-bg green">Garantía</span></div></div>
              </div>
              <div className={`f-panel${featTab === 'fintech' ? ' active' : ''}`}>
                <div className="fp-card green"><div className="fp-ey green">🏦 Fintech</div><div className="fp-title">El modelo que multiplica el valor</div><div className="fp-desc">Las empresas PropTech que integran finanzas tienen valoración 15–20% superior. Hipotecas, seguros y rent-to-own son el diferencial.</div><div className="fp-list"><div className="fp-li"><div className="fp-chk green">✓</div>Hipotecas propias</div><div className="fp-li"><div className="fp-chk green">✓</div>Seguros de renta integrados</div><div className="fp-li"><div className="fp-chk green">✓</div>Rent-to-own nativo</div><div className="fp-li"><div className="fp-chk green">✓</div>Score crediticio propio</div></div><div className="fp-stats"><div className="fp-st"><div className="fp-stv">+20%</div><div className="fp-stl">Valoración</div></div><div className="fp-st"><div className="fp-stv">4x</div><div className="fp-stl">Retención RTO</div></div><div className="fp-st"><div className="fp-stv">0.8%</div><div className="fp-stl">Impago</div></div></div><div className="fp-badges"><span className="fp-bg green">Rent-to-Own</span><span className="fp-bg green">Seguros</span><span className="fp-bg amber">Hipotecas Q4</span></div></div>
              </div>
              <div className={`f-panel${featTab === 'global' ? ' active' : ''}`}>
                <div className="fp-card amber"><div className="fp-ey amber">🌍 Global</div><div className="fp-title">Construido para escalar al mundo</div><div className="fp-desc">El stack está diseñado para operar en múltiples países, monedas y regulaciones desde el día 1. Lo que funciona en Paraguay escala sin reescribir nada.</div><div className="fp-list"><div className="fp-li"><div className="fp-chk amber">✓</div>Multi-país, multi-moneda</div><div className="fp-li"><div className="fp-chk amber">✓</div>API pública para agencias</div><div className="fp-li"><div className="fp-chk amber">✓</div>White-label para franquicias</div><div className="fp-li"><div className="fp-chk amber">✓</div>Supabase + Vercel Edge</div></div><div className="fp-stats"><div className="fp-st"><div className="fp-stv">4</div><div className="fp-stl">Países</div></div><div className="fp-st"><div className="fp-stv">$3.9B</div><div className="fp-stl">Mercado 2030</div></div><div className="fp-st"><div className="fp-stv">99.9%</div><div className="fp-stl">Uptime</div></div></div><div className="fp-badges"><span className="fp-bg amber">Multi-país</span><span className="fp-bg amber">API pública</span><span className="fp-bg purple">White-label</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODELOS */}
      <section style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)' }}>
        <div className="box">
          <div className="modelos-head rev">
            <div className="eyebrow">Soluciones</div>
            <h2>Tres productos.<br /><span className="it">Un ecosistema.</span></h2>
            <p>Hacé click para ver la landing completa de cada producto.</p>
          </div>
          <div className="mod-grid">
            <Link href="/alquiler-express" className="mod-card rev" style={{ textDecoration: 'none' }}>
              <div className="mod-ic b">🔑</div>
              <h3>Alquiler Express</h3>
              <p>Sin depósito. Sin fiador. Sin comisión. La IA evalúa el riesgo en 24h y el propietario cobra garantizado.</p>
              <ul className="mod-list"><li>Aprobación en 24 horas</li><li>Cobro garantizado siempre</li><li>Contrato 100% digital</li><li>Gestión de incidentes</li></ul>
              <span className="mod-link">Ver landing completa →</span>
            </Link>
            <Link href="/rent-to-own" className="mod-card feat rev d1" style={{ textDecoration: 'none' }}>
              <div className="mod-badge">Flagship</div>
              <div className="mod-ic t">🏠</div>
              <h3>Rent-to-Own</h3>
              <p>Alquilá hoy. Comprá mañana. Cada mes que pagás se convierte en capital hacia tu propiedad.</p>
              <ul className="mod-list"><li>Capital acumulado desde día 1</li><li>Precio de compra fijo</li><li>Financiamiento integrado</li><li>Mayor retención · Mayor margen</li></ul>
              <span className="mod-link">Ver landing completa →</span>
            </Link>
            <Link href="/portfolio-pro" className="mod-card rev d2" style={{ textDecoration: 'none' }}>
              <div className="mod-ic g">💼</div>
              <h3>Portfolio Pro</h3>
              <p>Para inversores con múltiples propiedades. Dashboard unificado, IA de precios y reportes automáticos.</p>
              <ul className="mod-list"><li>Dashboard centralizado</li><li>IA optimización precios</li><li>Reportes fiscales auto.</li><li>API para inmobiliarias</li></ul>
              <span className="mod-link">Ver landing completa →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* IA ADVISOR CHATBOT */}
      <section id="ia" className="ia-sec" style={{ padding: '88px 0' }}>
        <div className="ia-bg" /><div className="ia-grid-bg" />
        <div className="box" style={{ position: 'relative', zIndex: 2 }}>
          <div className="ia-layout">
            <div className="ia-left rev">
              <div className="eyebrow white">El Cerebro</div>
              <h2>Tu asesor <span className="it">24/7.</span><br />Sin honorarios.</h2>
              <p>Conectado a Claude AI. Conoce el mercado paraguayo, tus propiedades y la industria PropTech LATAM en tiempo real.</p>
              <div className="ia-feats">
                <div className="ia-f"><div className="ia-f-ic">📊</div><div><div className="ia-f-tt">Análisis de mercado real</div><div className="ia-f-ds">Datos actualizados de Asunción y LATAM en segundos.</div></div></div>
                <div className="ia-f"><div className="ia-f-ic">⚡</div><div><div className="ia-f-tt">Alertas proactivas</div><div className="ia-f-ds">Vacancia, vencimientos y riesgos — sin que lo pidas.</div></div></div>
                <div className="ia-f"><div className="ia-f-ic">🌍</div><div><div className="ia-f-tt">Multipaís, multilenguaje</div><div className="ia-f-ds">Paraguay, Colombia, Perú y México en el mismo sistema.</div></div></div>
              </div>
            </div>
            <div className="rev d2">
              <ChatBot pageContext="home" />
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)' }}>
        <div className="box">
          <div className="rmap-head rev">
            <div className="eyebrow">El Plan</div>
            <h2>De <span className="it">Asunción</span> al mundo.</h2>
            <p>Roadmap claro, hitos medibles. Del MVP a la plataforma PropTech líder de LATAM hispano.</p>
          </div>
          <div className="phases rev">
            <div className="phase"><div className="ph-num done">✓</div><div className="ph-time">Hoy · 2026</div><div className="ph-title">Fundación</div><ul className="ph-items"><li>Plataforma web live</li><li>Alquiler Express</li><li>Rent-to-Own</li><li>Asunción</li></ul></div>
            <div className="phase"><div className="ph-num now">2</div><div className="ph-time">Q2 · 2026</div><div className="ph-title">Inteligencia</div><ul className="ph-items"><li>IA Advisor live</li><li>Tour Virtual 3D</li><li>Dashboard inversor</li><li>Contratos digitales</li></ul></div>
            <div className="phase"><div className="ph-num fut">3</div><div className="ph-time">Q4 · 2026</div><div className="ph-title">Fintech</div><ul className="ph-items"><li>Hipotecas propias</li><li>Seguros integrados</li><li>Tokenización</li><li>App móvil</li></ul></div>
            <div className="phase"><div className="ph-num fut">4</div><div className="ph-time">2027</div><div className="ph-title">Expansión</div><ul className="ph-items"><li>Colombia y Perú</li><li>API agencias</li><li>White-label B2B</li><li>Serie A</li></ul></div>
          </div>
        </div>
      </section>

      {/* MERCADO */}
      <section style={{ background: '#fff' }}>
        <div className="box">
          <div className="merc-layout">
            <div className="mcards rev">
              <div className="eyebrow">La Oportunidad</div>
              <h2>El mercado espera al que <span className="it">llega primero.</span></h2>
              <div style={{ height: '16px' }} />
              <div className="mc"><div className="mc-ic b">📈</div><div><div className="mc-v">$3.9B</div><div className="mc-lb">Mercado PropTech LATAM 2030</div><div className="mc-sub">CAGR 13.6% — Grand View Research</div></div></div>
              <div className="mc"><div className="mc-ic g">🇵🇾</div><div><div className="mc-v">0</div><div className="mc-lb">Líderes PropTech en Paraguay</div><div className="mc-sub">Mercado virgen. First-mover total.</div></div></div>
              <div className="mc"><div className="mc-ic t">💰</div><div><div className="mc-v">+67%</div><div className="mc-lb">Recuperación VC PropTech 2025</div><div className="mc-sub">El capital vuelve. El momento es ahora.</div></div></div>
              <div className="mc"><div className="mc-ic a">🏆</div><div><div className="mc-v">+20%</div><div className="mc-lb">Premium PropTech + Fintech</div><div className="mc-sub">Validado por Habi y QuintoAndar.</div></div></div>
            </div>
            <div className="chart-panel rev d2">
              <div className="cp-hd">VC PropTech LATAM (US$ Millones)</div>
              <div className="bar-chart">
                <div className="bcw"><div className="bc def" style={{ height: '20%' }}><span className="bc-top gray">$261M</span></div><div className="bc-lbl">2020</div></div>
                <div className="bcw"><div className="bc fill" style={{ height: '100%' }}><span className="bc-top blue">$1.3B</span></div><div className="bc-lbl">2021</div></div>
                <div className="bcw"><div className="bc def" style={{ height: '30%' }}><span className="bc-top gray">$400M</span></div><div className="bc-lbl">2022</div></div>
                <div className="bcw"><div className="bc def" style={{ height: '30%' }}><span className="bc-top gray">$400M</span></div><div className="bc-lbl">2023</div></div>
                <div className="bcw"><div className="bc fill" style={{ height: '38%' }}><span className="bc-top blue">$500M</span></div><div className="bc-lbl">2024</div></div>
                <div className="bcw"><div className="bc proj" style={{ height: '64%' }}><span className="bc-top teal">$835M↑</span></div><div className="bc-lbl" style={{ color: 'var(--teal)' }}>2025E</div></div>
              </div>
              <div className="cpills">
                <span className="cpill hot">🇵🇾 Paraguay</span><span className="cpill hot">🇵🇪 Perú</span><span className="cpill hot">🇪🇨 Ecuador</span>
                <span className="cpill cool">🇧🇷 QuintoAndar</span><span className="cpill cool">🇨🇴 Habi</span><span className="cpill cool">🇲🇽 La Haus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec" id="cta" style={{ padding: '100px 0' }}>
        <div className="box"><div className="cta-c">
          <div className="eyebrow white">El Comienzo</div>
          <h2>Esto no es una demo.<br /><span className="it">Es el primer día.</span></h2>
          <p>Tenemos la tecnología. Tienen el patrimonio y la visión. Juntos construimos el QuintoAndar de Paraguay.</p>
          <div className="cta-btns">
            <a href="tel:+595992900799" className="btn white-btn">📞&nbsp; +595 992 900 799</a>
            <a href="mailto:info@proia.pro" className="btn outline-white">✉️&nbsp; info@proia.pro</a>
          </div>
        </div></div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="box">
          <div className="ft-top">
            <div><div className="ft-br-logo"><div className="ft-br-sq">🏢</div><span className="ft-br-nm">ProIA</span></div><div className="ft-desc">Plataforma PropTech inteligente para Paraguay y Latinoamérica.</div></div>
            <div className="ft-col"><div className="ft-ct">Producto</div><Link href="/alquiler-express">Alquiler Express</Link><Link href="/rent-to-own">Rent-to-Own</Link><Link href="/portfolio-pro">Portfolio Pro</Link><a href="#ia">IA Advisor</a></div>
            <div className="ft-col"><div className="ft-ct">Empresa</div><a href="#">Nosotros</a><a href="#">Inversores</a><a href="#">Blog</a><a href="#">Carreras</a></div>
            <div className="ft-col"><div className="ft-ct">Contacto</div><a href="mailto:info@proia.pro">info@proia.pro</a><a href="tel:+595992900799">+595 992 900 799</a><a href="#">ON CoWorking, Of. 201</a><a href="#">Asunción, Paraguay</a></div>
          </div>
          <div className="ft-bot"><span className="ft-copy">© 2026 ProIA · Tecnología Inmobiliaria Inteligente</span><div className="ft-links"><a href="#">Privacidad</a><a href="#">Términos</a></div></div>
        </div>
      </footer>
    </>
  )
}
