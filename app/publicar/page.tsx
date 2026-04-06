'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

const STEPS = ['Tipo','Producto','Datos','Fotos','Amenities','Precio','Revisión','¡Listo!']

const TIPOS = [
  ['building','Apartamento','Unidad en edificio'],
  ['home','Casa','Vivienda independiente'],
  ['layers','PH / Dúplex','Planta alta o doble nivel'],
  ['briefcase','Local','Espacio comercial'],
  ['sun','Quinta','Con jardín o patio'],
  ['key','Otro','Otro tipo'],
]

const AMENITIES_LIST = [
  ['Cochera','car'],['Piscina','droplets'],['Gym','zap'],
  ['Seguridad 24h','shield'],['Balcón/Terraza','sun'],['Aire acond.','wind'],
  ['Calefacción','thermometer'],['Amoblado','layers'],['WiFi incluido','wifi'],
  ['Lavandería','refresh-cw'],['Ascensor','arrow-up'],['Mascotas OK','heart'],
  ['Jardín','leaf'],['Generador','zap'],['Parrilla','flame'],['Salón usos','users'],
]

const PRODUCTOS = [
  { id:'express', icon:'key',        title:'Alquiler Express',  desc:'Sin depósito para el inquilino. Cobro garantizado para vos. Evaluación en 24h.', extra:'Comisión: 8% mensual', color:'var(--m-blue)' },
  { id:'rto',     icon:'trending-up',title:'Compra Alquilando', desc:'El inquilino acumula capital hacia la compra. Mayor retención y hasta 14.2% ROI.', extra:'ROI estimado: 14.2% anual', color:'var(--green)' },
  { id:'portfolio',icon:'bar-chart', title:'Portfolio Pro',      desc:'Dashboard para múltiples propiedades. IA de precios, reportes fiscales automáticos.', extra:'Desde $49/mes · Hasta 3 propiedades', color:'var(--purple)' },
]

export default function Publicar() {
  const [step, setStep] = useState(0)
  const [tipo, setTipo] = useState<string | null>(null)
  const [producto, setProducto] = useState<string | null>(null)
  const [amenities, setAmenities] = useState<Set<string>>(new Set())
  const [precio, setPrecio] = useState(1200)


  const toggleAmenity = useCallback((name: string) => {
    setAmenities(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  const next = () => { if (step < STEPS.length - 1) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const back = () => { if (step > 0) { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const goTo = (i: number) => { if (i <= step) { setStep(i); window.scrollTo({ top: 0, behavior: 'smooth' }) } }

  const productoLabel = PRODUCTOS.find(p => p.id === producto)?.title ?? ''
  const precioConAmenities = precio + amenities.size * 35

  return (
    <>
      {/* PROGRESS HEADER */}
      <div className="ob-header">
        <div className="ob-header-inner">
          <div className="ob-progress-wrap">
            {STEPS.map((label, i) => (
              <div key={i} className="ob-step-prog" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div
                  className={`ob-dot${i < step ? ' done' : i === step ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  title={label}
                >
                  {i < step ? '✓' : label[0]}
                </div>
                {i < STEPS.length - 1 && <div className={`ob-line${i < step ? ' done' : ''}`} />}
              </div>
            ))}
          </div>
          <span className="ob-save-status">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', marginRight: 6 }} />
            Guardado automáticamente
          </span>
        </div>
      </div>

      <div className="ob-body">
        <div className="ob-content">

          {/* PASO 0: TIPO */}
          {step === 0 && (
            <div className="ob-step-card">
              <p className="m-eyebrow">Paso 1 de 7</p>
              <div className="ob-title">¿Qué tipo de<br />propiedad tenés?</div>
              <div className="ob-sub">Elegí el tipo y configuramos todo lo demás para vos.</div>
              <div className="ob-type-grid">
                {TIPOS.map(([ic, tt, ds]) => (
                  <div key={tt} className={`ob-type${tipo === tt ? ' selected' : ''}`} onClick={() => setTipo(tt)}>
                    <div className="ob-type-icon"><Icon name={ic} size={24} /></div>
                    <div className="ob-type-name">{tt}</div>
                    <div className="ob-type-desc">{ds}</div>
                  </div>
                ))}
              </div>
              <div className="ob-nav">
                <span />
                <button className="ob-next" onClick={next} disabled={!tipo}>Continuar →</button>
              </div>
            </div>
          )}

          {/* PASO 1: PRODUCTO */}
          {step === 1 && (
            <div className="ob-step-card">
              <p className="m-eyebrow">Paso 2 de 7</p>
              <div className="ob-title">¿Cómo querés<br />publicarla?</div>
              <div className="ob-sub">Elegí el modelo que mejor se adapta a tus objetivos.</div>
              <div className="ob-opts">
                {PRODUCTOS.map(p => (
                  <div key={p.id} className={`ob-opt${producto === p.id ? ' selected' : ''}`} onClick={() => setProducto(p.id)}>
                    <div className="ob-opt-icon" style={{ color: p.color }}><Icon name={p.icon} size={22} /></div>
                    <div className="ob-opt-body">
                      <div className="ob-opt-title">{p.title}</div>
                      <div className="ob-opt-desc">{p.desc}</div>
                      <div style={{ marginTop: '6px', fontSize: '11px', fontWeight: 600, color: p.color }}>{p.extra}</div>
                    </div>
                    <div className="ob-opt-check">{producto === p.id ? '✓' : ''}</div>
                  </div>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-back" onClick={back}>← Atrás</button>
                <button className="ob-next" onClick={next} disabled={!producto}>Continuar →</button>
              </div>
            </div>
          )}

          {/* PASO 2: DATOS */}
          {step === 2 && (
            <div className="ob-step-card">
              <p className="m-eyebrow">Paso 3 de 7</p>
              <div className="ob-title">Datos de<br />la propiedad</div>
              <div className="ob-sub">La información que necesitan los interesados para decidir.</div>
              <div className="ob-fields">
                <div className="ob-field">
                  <label>Título del anuncio</label>
                  <input type="text" placeholder="Ej: Apartamento luminoso en Villa Morra con vista panorámica" />
                </div>
                <div className="ob-row">
                  <div className="ob-field">
                    <label>Zona / Barrio</label>
                    <select>
                      <option>Villa Morra</option><option>Mcal. López</option>
                      <option>Recoleta</option><option>Las Mercedes</option>
                      <option>San Lorenzo</option><option>Otro</option>
                    </select>
                  </div>
                  <div className="ob-field">
                    <label>Ciudad</label>
                    <select>
                      <option>Asunción</option><option>San Lorenzo</option>
                      <option>Lambaré</option><option>Fernando de la Mora</option><option>Luque</option>
                    </select>
                  </div>
                </div>
                <div className="ob-row">
                  <div className="ob-field">
                    <label>Dormitorios</label>
                    <select><option>1</option><option>2</option><option>3</option><option>4+</option></select>
                  </div>
                  <div className="ob-field">
                    <label>Baños</label>
                    <select><option>1</option><option>2</option><option>3+</option></select>
                  </div>
                </div>
                <div className="ob-row">
                  <div className="ob-field">
                    <label>Metros cuadrados</label>
                    <input type="number" placeholder="95" />
                  </div>
                  <div className="ob-field">
                    <label>Piso (opcional)</label>
                    <input type="number" placeholder="7" />
                  </div>
                </div>
                <div className="ob-field">
                  <label>Descripción</label>
                  <textarea placeholder="Describí los puntos fuertes. La IA de ProIA va a sugerir una descripción optimizada que podés editar." />
                </div>
              </div>
              <div className="ob-tip">
                <span className="ob-tip-icon"><Icon name="cpu" size={18} /></span>
                <span>La IA de ProIA va a sugerir una descripción optimizada basada en los datos que ingresés. Podés editarla o usarla tal cual.</span>
              </div>
              <div className="ob-nav">
                <button className="ob-back" onClick={back}>← Atrás</button>
                <button className="ob-next" onClick={next}>Continuar →</button>
              </div>
            </div>
          )}

          {/* PASO 3: FOTOS */}
          {step === 3 && (
            <div className="ob-step-card">
              <p className="m-eyebrow">Paso 4 de 7</p>
              <div className="ob-title">Fotos de<br />la propiedad</div>
              <div className="ob-sub">Las propiedades con 8+ fotos reciben 3x más consultas. La primera foto es la portada.</div>
              <div className="ob-upload">
                <div className="ob-upload-icon"><Icon name="image" size={32} /></div>
                <div className="ob-upload-title">Arrastrá las fotos o hacé click para subir</div>
                <div className="ob-upload-sub">JPG o PNG · Máximo 20MB por foto · Mínimo 4 fotos</div>
              </div>
              <div className="ob-photo-grid">
                <div className="ob-photo filled">
                  <div className="ob-photo-cover">PORTADA</div>
                  <span style={{ fontSize: '11px', color: 'var(--m-blue)' }}>Sala</span>
                </div>
                <div className="ob-photo filled"><span style={{ fontSize: '11px', color: 'var(--green)' }}>Dorm.</span></div>
                <div className="ob-photo filled"><span style={{ fontSize: '11px', color: 'var(--amber)' }}>Baño</span></div>
                <div className="ob-photo filled"><span style={{ fontSize: '11px', color: 'var(--purple)' }}>Cocina</span></div>
                {[0,1,2,3].map(i => <div key={i} className="ob-photo"><span>+ Agregar</span></div>)}
              </div>
              <div className="ob-tip">
                <span className="ob-tip-icon"><Icon name="camera" size={18} /></span>
                <span>¿Querés un tour virtual 3D? ProIA coordina un fotógrafo con cámara 360° por <strong>$80 USD</strong>. Resultado en 24h. Las propiedades con tour 3D cierran 3x más rápido.</span>
              </div>
              <div className="ob-nav">
                <button className="ob-back" onClick={back}>← Atrás</button>
                <button className="ob-next" onClick={next}>Continuar →</button>
              </div>
            </div>
          )}

          {/* PASO 4: AMENITIES */}
          {step === 4 && (
            <div className="ob-step-card">
              <p className="m-eyebrow">Paso 5 de 7</p>
              <div className="ob-title">¿Qué incluye<br />la propiedad?</div>
              <div className="ob-sub">Cada amenity sube el precio sugerido. Seleccioná todo lo que aplica.</div>
              <div className="ob-amenities">
                {AMENITIES_LIST.map(([name, ic]) => (
                  <button key={name} className={`ob-amenity${amenities.has(name) ? ' on' : ''}`} onClick={() => toggleAmenity(name)}>
                    <span className="ob-amenity-ic"><Icon name={ic} size={14} /></span>
                    <span>{name}</span>
                  </button>
                ))}
              </div>
              <div className="ob-price-panel">
                <div style={{ fontSize: '11px', color: 'var(--gray-400)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Precio sugerido por IA</div>
                <div className="ob-price-display">
                  <div>
                    <span className="ob-price-val">${precioConAmenities.toLocaleString()}</span>
                    <span className="ob-price-period">/mes</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>+${amenities.size * 35} por amenities</div>
                </div>
              </div>
              <div className="ob-nav">
                <button className="ob-back" onClick={back}>← Atrás</button>
                <button className="ob-next" onClick={next}>Continuar →</button>
              </div>
            </div>
          )}

          {/* PASO 5: PRECIO */}
          {step === 5 && (
            <div className="ob-step-card">
              <p className="m-eyebrow">Paso 6 de 7</p>
              <div className="ob-title">Definí<br />el precio</div>
              <div className="ob-sub">La IA sugiere el precio óptimo según zona, m² y amenities. Vos tenés la última palabra.</div>
              <div className="ob-price-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Precio mensual (USD)</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--m-black)', letterSpacing: '-1.5px' }}>${precio.toLocaleString()}</div>
                </div>
                <input type="range" min="400" max="5000" step="50" value={precio} onChange={e => setPrecio(Number(e.target.value))} style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: 'var(--gray-400)' }}>
                  <span>$400</span><span>$5,000</span>
                </div>
                <div className="ob-price-range">
                  <div className="ob-price-bench">
                    <div className="ob-pb-label">Mínimo zona</div><div className="ob-pb-val">$900</div>
                  </div>
                  <div className="ob-price-bench rec">
                    <div className="ob-pb-label rec-label">IA recomienda</div><div className="ob-pb-val rec-val">$1,180</div>
                  </div>
                  <div className="ob-price-bench">
                    <div className="ob-pb-label">Máximo zona</div><div className="ob-pb-val">$1,500</div>
                  </div>
                </div>
              </div>
              <div className="ob-tip">
                <span className="ob-tip-icon"><Icon name="bar-chart" size={18} /></span>
                <span>Propiedades dentro del rango sugerido se alquilan en <strong>11 días</strong> en promedio. Las que superan el máximo tardan <strong>38 días</strong>.</span>
              </div>
              <div className="ob-nav">
                <button className="ob-back" onClick={back}>← Atrás</button>
                <button className="ob-next" onClick={next}>Revisar publicación →</button>
              </div>
            </div>
          )}

          {/* PASO 6: REVISIÓN */}
          {step === 6 && (
            <div className="ob-step-card">
              <p className="m-eyebrow">Paso 7 de 7</p>
              <div className="ob-title">Revisá antes<br />de publicar</div>
              <div className="ob-sub">Todo se ve perfecto. Publicá cuando estés listo.</div>
              <div className="ob-review">
                <div className="ob-review-img"><Icon name="building" size={32} /></div>
                <div className="ob-review-body">
                  <div className="ob-review-title">{tipo ?? 'Apartamento'} en Villa Morra</div>
                  <div className="ob-review-addr">📍 Villa Morra, Asunción</div>
                  <div className="ob-review-row">
                    <span className="ob-review-key">Producto</span>
                    <span className="ob-review-pill">{productoLabel || 'Alquiler Express'}</span>
                  </div>
                  <div className="ob-review-row">
                    <span className="ob-review-key">Precio</span>
                    <span className="ob-review-val">${precio.toLocaleString()}/mes</span>
                  </div>
                  <div className="ob-review-row">
                    <span className="ob-review-key">Características</span>
                    <span className="ob-review-val">2 dorm · 2 baños · 95m²</span>
                  </div>
                  <div className="ob-review-row">
                    <span className="ob-review-key">Fotos</span>
                    <span className="ob-review-val">4 fotos cargadas</span>
                  </div>
                  <div className="ob-review-row">
                    <span className="ob-review-key">Amenities</span>
                    <span className="ob-review-val">{amenities.size} seleccionados</span>
                  </div>
                </div>
              </div>
              <div className="ob-checklist">
                {[
                  ['Datos completos','Villa Morra · 2 dorm · 2 baños · 95m²'],
                  ['Fotos cargadas','4 de 4 mínimas requeridas'],
                  ['Precio en rango óptimo',`$${precio.toLocaleString()} — dentro del sugerido`],
                  ['Contrato digital listo','Generado automáticamente'],
                  ['Cuenta verificada','Cédula confirmada'],
                ].map(([t, s]) => (
                  <div key={t} className="ob-check">
                    <div className="ob-chk">✓</div>
                    <div>
                      <div className="ob-check-title">{t}</div>
                      <div className="ob-check-sub">{s}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-back" onClick={back}>← Editar</button>
                <button className="ob-next green" onClick={next}>Publicar ahora →</button>
              </div>
            </div>
          )}

          {/* PASO 7: ÉXITO */}
          {step === 7 && (
            <div className="ob-step-card">
              <div className="ob-success">
                <div className="ob-success-icon" style={{ background: 'var(--m-blue-light)', color: 'var(--m-blue)' }}>
                  <Icon name="check-circle" size={40} />
                </div>
                <div className="ob-success-title">¡Publicada con éxito!</div>
                <div className="ob-success-sub">
                  Tu propiedad está activa en ProIA. La IA ya está buscando inquilinos compatibles.
                  Te avisamos por WhatsApp cuando haya consultas.
                </div>
                <div className="ob-success-stats">
                  <div className="ob-ss"><div className="ob-ss-val">24h</div><div className="ob-ss-lbl">Primera consulta</div></div>
                  <div className="ob-ss"><div className="ob-ss-val">11d</div><div className="ob-ss-lbl">Tiempo promedio</div></div>
                  <div className="ob-ss"><div className="ob-ss-val">$0</div><div className="ob-ss-lbl">Hasta que alquilés</div></div>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/" className="m-btn m-btn-orange">Ver mi dashboard →</Link>
                  <button className="m-btn m-btn-outline" onClick={() => { setStep(0); setTipo(null); setProducto(null); setAmenities(new Set()); setPrecio(1200) }}>
                    Publicar otra propiedad
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
