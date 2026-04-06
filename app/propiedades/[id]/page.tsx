'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PROPIEDADES, getPropiedad } from '@/lib/propiedades'
import Icon from '@/components/Icon'

export default function PropiedadDetalle() {
  const { id } = useParams<{ id: string }>()
  const prop = getPropiedad(id)
  const [fotoActiva, setFotoActiva] = useState<number | null>(null)

  if (!prop) return (
    <div style={{ paddingTop: '140px', textAlign: 'center' }}>
      <p style={{ color: '#888', marginBottom: 16 }}>Propiedad no encontrada</p>
      <Link href="/alquiler-express" className="m-btn m-btn-orange">Ver propiedades →</Link>
    </div>
  )

  const otras = PROPIEDADES.filter(p => p.id !== prop.id).slice(0, 2)

  return (
    <>
      {/* LIGHTBOX */}
      {fotoActiva !== null && (
        <div className="pd-lightbox" onClick={() => setFotoActiva(null)}>
          <button className="pd-lb-close" onClick={() => setFotoActiva(null)}>✕</button>
          <img src={prop.imgs[fotoActiva]} alt="" className="pd-lb-img" />
          <div className="pd-lb-nav">
            <button onClick={e => { e.stopPropagation(); setFotoActiva(i => Math.max(0, (i ?? 0) - 1)) }}>‹</button>
            <span>{(fotoActiva ?? 0) + 1} / {prop.imgs.length}</span>
            <button onClick={e => { e.stopPropagation(); setFotoActiva(i => Math.min(prop.imgs.length - 1, (i ?? 0) + 1)) }}>›</button>
          </div>
        </div>
      )}

      <div className="pd-page">

        {/* BREADCRUMB */}
        <div className="pd-breadcrumb">
          <Link href="/alquiler-express">← Propiedades</Link>
          <span>/</span>
          <span>{prop.zona}</span>
          <span>/</span>
          <span>{prop.titulo}</span>
        </div>

        {/* TITULO */}
        <div className="pd-header">
          <div>
            <h1 className="pd-titulo">{prop.titulo}</h1>
            <p className="pd-loc">📍 {prop.zona}, {prop.ciudad}</p>
          </div>
          <div className="pd-badges">
            <span className="pd-badge-orange">Sin depósito · Sin fiador</span>
            <span className="pd-badge-blue">{prop.tipo}</span>
          </div>
        </div>

        {/* GALERÍA AIRBNB */}
        <div className="pd-gallery">
          <div className="pd-gallery-main" onClick={() => setFotoActiva(0)}>
            <img src={prop.imgs[0]} alt={prop.titulo} />
          </div>
          <div className="pd-gallery-grid">
            {prop.imgs.slice(1, 5).map((src, i) => (
              <div key={i} className="pd-gallery-thumb" onClick={() => setFotoActiva(i + 1)}>
                <img src={src} alt="" />
                {i === 3 && prop.imgs.length > 5 && (
                  <div className="pd-gallery-more">Ver todas</div>
                )}
              </div>
            ))}
          </div>
          <button className="pd-gallery-btn" onClick={() => setFotoActiva(0)}>
            <Icon name="image" size={14} /> Ver todas las fotos
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="pd-body">

          {/* IZQUIERDA */}
          <div className="pd-left">

            {/* STATS */}
            <div className="pd-stats">
              {[
                [String(prop.dormitorios), 'dormitorio' + (prop.dormitorios > 1 ? 's' : ''), 'bed'],
                [String(prop.banos), 'baño' + (prop.banos > 1 ? 's' : ''), 'droplets'],
                [String(prop.metros) + 'm²', 'superficie', 'maximize'],
              ].map(([v, l, ic]) => (
                <div key={l} className="pd-stat">
                  <span className="pd-stat-icon"><Icon name={ic} size={20} /></span>
                  <div>
                    <div className="pd-stat-val">{v}</div>
                    <div className="pd-stat-lbl">{l}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pd-divider" />

            {/* DESCRIPCIÓN */}
            <section className="pd-section">
              <h2 className="pd-section-title">Descripción</h2>
              <p className="pd-desc">{prop.desc}</p>
            </section>

            <div className="pd-divider" />

            {/* AMENITIES */}
            <section className="pd-section">
              <h2 className="pd-section-title">¿Qué incluye?</h2>
              <div className="pd-amenities">
                {prop.amenities.map(a => (
                  <div key={a} className="pd-amenity">
                    <span className="pd-amenity-check">✓</span>
                    {a}
                  </div>
                ))}
              </div>
            </section>

            <div className="pd-divider" />

            {/* GARANTÍA PROIA */}
            <section className="pd-section">
              <h2 className="pd-section-title">Garantía ProIA</h2>
              <div className="pd-garantia">
                {[
                  ['shield','Cobro garantizado','Si el inquilino no paga, ProIA paga igual al propietario.'],
                  ['zap','Aprobación en 24h','La IA evalúa tu perfil automáticamente en menos de un día.'],
                  ['file','Contrato digital','100% digital. Firmás desde el celular, sin papel.'],
                ].map(([ic, t, d]) => (
                  <div key={t} className="pd-garantia-item">
                    <span className="pd-garantia-icon"><Icon name={ic} size={20} /></span>
                    <div>
                      <div className="pd-garantia-title">{t}</div>
                      <div className="pd-garantia-desc">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* OTRAS PROPIEDADES */}
            {otras.length > 0 && (
              <>
                <div className="pd-divider" />
                <section className="pd-section">
                  <h2 className="pd-section-title">También te puede interesar</h2>
                  <div className="pd-otras">
                    {otras.map(o => (
                      <Link key={o.id} href={`/propiedades/${o.id}`} className="pd-otra">
                        <img src={o.img} alt={o.titulo} />
                        <div className="pd-otra-info">
                          <div className="pd-otra-zona">📍 {o.zona}</div>
                          <div className="pd-otra-precio">${o.precio.toLocaleString()}/mes</div>
                          <div className="pd-otra-desc">{o.dormitorios} dorm · {o.metros}m²</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* DERECHA — CARD STICKY */}
          <div className="pd-right">
            <div className="pd-card">
              <div className="pd-card-precio">
                ${prop.precio.toLocaleString()}
                <span className="pd-card-mes">/mes</span>
              </div>
              <div className="pd-card-sub">Sin depósito · Sin fiador · Aprobación 24h</div>

              <div className="pd-card-rows">
                {[
                  ['Cochera', prop.amenities.includes('Cochera')],
                  ['Amoblado', prop.amenities.includes('Amoblado')],
                  ['Mascotas permitidas', prop.amenities.includes('Mascotas OK')],
                  ['Balcón/Terraza', prop.amenities.includes('Balcón') || prop.amenities.includes('Balcón/Terraza')],
                ].map(([lbl, yes]) => (
                  <div key={lbl as string} className="pd-card-row">
                    <span>{lbl as string}</span>
                    <span style={{ fontWeight: 700, color: yes ? '#16a34a' : '#ccc' }}>{yes ? '✓' : '—'}</span>
                  </div>
                ))}
              </div>

              <Link href="/alquiler-express" className="m-btn m-btn-orange" style={{ display: 'block', textAlign: 'center', padding: '16px', marginBottom: '10px' }}>
                Aplicar para esta propiedad →
              </Link>
              <a href="https://wa.me/595992900799" target="_blank" className="pd-card-wa">
                <Icon name="message" size={16} /> Consultar por WhatsApp
              </a>
              <p className="pd-card-note">No se te cobrará nada hasta que te aprueben</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
