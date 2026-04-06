'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PROPIEDADES, getPropiedad } from '@/lib/propiedades'
import Icon from '@/components/Icon'

export default function PropiedadDetalle() {
  const { id } = useParams<{ id: string }>()
  const prop = getPropiedad(id)
  const [foto, setFoto] = useState(0)

  useEffect(() => {
    document.body.style.cursor = 'default'
    return () => { document.body.style.cursor = '' }
  }, [])

  if (!prop) return (
    <div style={{ paddingTop: '120px', textAlign: 'center' }}>
      <h1>Propiedad no encontrada</h1>
      <Link href="/alquiler-express" className="m-btn m-btn-orange" style={{ marginTop: 24, display: 'inline-block' }}>Ver propiedades →</Link>
    </div>
  )

  const otras = PROPIEDADES.filter(p => p.id !== prop.id).slice(0, 2)

  return (
    <>
      {/* HERO FOTO */}
      <div style={{ paddingTop: '66px', background: '#111' }}>
        <div style={{ position: 'relative', height: 'clamp(300px,50vh,520px)', overflow: 'hidden' }}>
          <img src={prop.imgs[foto]} alt={prop.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.88 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {prop.imgs.map((src, i) => (
              <button key={i} onClick={() => setFoto(i)}
                style={{ width: 56, height: 40, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === foto ? 'var(--orange)' : 'rgba(255,255,255,.3)'}`, cursor: 'pointer', padding: 0, background: 'none' }}>
                <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              </button>
            ))}
          </div>
          <div style={{ position: 'absolute', top: '20px', left: '24px' }}>
            <Link href="/alquiler-express" style={{ background: 'rgba(0,0,0,.5)', color: '#fff', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              ← Volver
            </Link>
          </div>
        </div>
      </div>

      {/* DETALLE */}
      <div style={{ background: 'var(--m-bg)', minHeight: '60vh' }}>
        <div className="m-box" style={{ padding: '40px 24px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>

            {/* IZQUIERDA */}
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', background: 'rgba(241,127,6,.1)', padding: '4px 12px', borderRadius: '100px' }}>
                  Disponible · Sin depósito
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--m-blue)', background: 'var(--m-blue-light)', padding: '4px 12px', borderRadius: '100px' }}>
                  {prop.tipo}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--m-black)', marginBottom: '8px', lineHeight: 1.1 }}>
                {prop.titulo}
              </h1>
              <p style={{ fontSize: '15px', color: '#888', marginBottom: '28px' }}>📍 {prop.zona}, {prop.ciudad}</p>

              {/* STATS */}
              <div style={{ display: 'flex', gap: '24px', padding: '20px 0', borderTop: '1px solid rgba(0,0,0,.08)', borderBottom: '1px solid rgba(0,0,0,.08)', marginBottom: '28px', flexWrap: 'wrap' }}>
                {[
                  [prop.dormitorios + ' dorm.', 'bed'],
                  [prop.banos + ' baños', 'droplets'],
                  [prop.metros + 'm²', 'maximize'],
                ].map(([v, ic]) => (
                  <div key={v as string} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--m-blue)' }}><Icon name={ic as string} size={18} /></span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--m-black)' }}>{v}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--m-black)', marginBottom: '12px' }}>Descripción</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#555', marginBottom: '32px' }}>{prop.desc}</p>

              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--m-black)', marginBottom: '16px' }}>Amenities</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {prop.amenities.map(a => (
                  <span key={a} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--m-blue)', background: 'var(--m-blue-light)', padding: '6px 14px', borderRadius: '100px' }}>
                    {a}
                  </span>
                ))}
              </div>

              {/* OTRAS PROPIEDADES */}
              {otras.length > 0 && (
                <>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--m-black)', marginBottom: '16px' }}>También te puede interesar</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {otras.map(o => (
                      <Link key={o.id} href={`/propiedades/${o.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(0,0,0,.07)', transition: 'transform .2s' }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                          <img src={o.img} alt={o.titulo} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                          <div style={{ padding: '14px' }}>
                            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>📍 {o.zona}</div>
                            <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--m-black)', marginBottom: '2px' }}>${o.precio.toLocaleString()}/mes</div>
                            <div style={{ fontSize: '12px', color: '#888' }}>{o.dormitorios} dorm · {o.metros}m²</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* DERECHA — CTA CARD */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,.08)', position: 'sticky', top: '90px' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--m-black)', marginBottom: '4px' }}>
                ${prop.precio.toLocaleString()}<span style={{ fontSize: '16px', fontWeight: 500, color: '#888' }}>/mes</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 700, marginBottom: '20px' }}>Sin depósito · Sin fiador · Aprobación 24h</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {[['Cochera incluida', prop.amenities.includes('Cochera')],['Amoblado', prop.amenities.includes('Amoblado')],['Mascotas OK', prop.amenities.includes('Mascotas OK')]].map(([label, yes]) => (
                  <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#666' }}>{label as string}</span>
                    <span style={{ fontWeight: 700, color: yes ? '#16a34a' : '#999' }}>{yes ? '✓ Sí' : '✗ No'}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: '1px', background: 'rgba(0,0,0,.07)', marginBottom: '20px' }} />

              <Link href="/alquiler-express" className="m-btn m-btn-orange" style={{ display: 'block', textAlign: 'center', marginBottom: '10px', padding: '16px' }}>
                Aplicar para esta propiedad →
              </Link>
              <a href="https://wa.me/595992900799" target="_blank"
                style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,.12)', fontSize: '14px', fontWeight: 700, color: 'var(--m-black)', textDecoration: 'none' }}>
                Consultar por WhatsApp
              </a>

              <div style={{ marginTop: '20px', padding: '14px', background: 'var(--m-blue-light)', borderRadius: '12px', fontSize: '12px', color: 'var(--m-blue)', lineHeight: 1.6 }}>
                <strong>ProIA garantiza:</strong> Si el inquilino no paga, el propietario igual cobra. Cobro garantizado 100%.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
