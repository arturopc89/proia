'use client'
import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatBotProps {
  pageContext?: 'home' | 'express' | 'rto' | 'portfolio'
}

// Simple session ID (persists for the tab session)
const sessionId = Math.random().toString(36).slice(2)

export default function ChatBot({ pageContext = 'home' }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const now = () => new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messages, loading])

  async function saveToSupabase(msgs: Message[]) {
    try {
      await supabase.from('chat_sessions').upsert({
        session_id: sessionId,
        messages: msgs,
        updated_at: new Date().toISOString(),
        page_context: pageContext
      })
    } catch {
      // Supabase not configured yet — silently skip
    }
  }

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, pageContext })
      })
      const data = await res.json()
      const reply = data.content || 'Hubo un error. Intentá de nuevo.'
      const updated = [...newMessages, { role: 'assistant' as const, content: reply }]
      setMessages(updated)
      saveToSupabase(updated)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Intentá de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function formatContent(text: string) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
  }

  return (
    <div className="chat-shell">
      <div className="chat-top">
        <div className="chat-av">✦</div>
        <div>
          <div className="chat-nm">ProIA Advisor</div>
          <div className="chat-st">● Conectado · Claude AI · PropTech Paraguay</div>
        </div>
      </div>

      <div className="chat-msgs" ref={chatBoxRef}>
        {/* Initial greeting */}
        <div className="cm ai">
          <div className="cm-bub">
            Hola 👋 Soy el asesor inmobiliario IA de ProIA, entrenado con datos del mercado paraguayo y PropTech LATAM. ¿En qué te puedo ayudar?
          </div>
          <div className="cm-t">ahora</div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`cm ${msg.role === 'user' ? 'user' : 'ai'}`}>
            <div
              className="cm-bub"
              dangerouslySetInnerHTML={
                msg.role === 'assistant'
                  ? { __html: formatContent(msg.content) }
                  : undefined
              }
            >
              {msg.role === 'user' ? msg.content : undefined}
            </div>
            <div className="cm-t">{now()}</div>
          </div>
        ))}

        {loading && (
          <div className="typing-ind show">
            <div className="t-dot" />
            <div className="t-dot" />
            <div className="t-dot" />
          </div>
        )}
      </div>

      <div className="chat-bar">
        <input
          className="chat-in"
          type="text"
          placeholder="Preguntá sobre el mercado, propiedades, retornos..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="chat-send" onClick={sendMessage} disabled={loading}>
          ↑
        </button>
      </div>
    </div>
  )
}
