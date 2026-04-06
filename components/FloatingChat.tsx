'use client'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface Message { role: 'user' | 'assistant'; content: string }

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const path = usePathname()

  const pageContext = path.includes('alquiler-express') ? 'express'
    : path.includes('compra-alquilando') ? 'rto'
    : path.includes('portfolio') ? 'portfolio'
    : 'general'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, pageContext }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.content }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Hubo un error. Intentá de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fc-wrap">
      {open && (
        <div className="fc-panel">
          <div className="fc-head">
            <div className="fc-head-info">
              <div className="fc-avatar">IA</div>
              <div>
                <div className="fc-name">Asesor ProIA</div>
                <div className="fc-status">En línea · responde al instante</div>
              </div>
            </div>
            <button className="fc-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="fc-messages">
            {messages.length === 0 && (
              <div className="fc-welcome">
                <div className="fc-welcome-msg">
                  Hola, soy el asesor IA de ProIA. Puedo ayudarte a encontrar propiedades, entender los productos o resolver cualquier duda. ¿Por dónde empezamos?
                </div>
                <div className="fc-suggestions">
                  {['¿Cómo alquilo sin depósito?','¿Cuánto cobra ProIA?','¿Qué es Compra Alquilando?'].map(s => (
                    <button key={s} className="fc-suggest" onClick={() => { setInput(s); }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`fc-msg ${m.role}`}>
                {m.role === 'assistant' && <div className="fc-msg-avatar">IA</div>}
                <div className="fc-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="fc-msg assistant">
                <div className="fc-msg-avatar">IA</div>
                <div className="fc-bubble fc-typing"><span/><span/><span/></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="fc-input-row">
            <input
              className="fc-input"
              placeholder="Escribí tu consulta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button className="fc-send" onClick={send} disabled={!input.trim() || loading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      <button className={`fc-btn${open ? ' fc-btn-open' : ''}`} onClick={() => setOpen(o => !o)}>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
