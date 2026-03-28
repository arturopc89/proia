# 🚀 PROMPT MAESTRO — ProIA · Claude Code
## Objetivo: Hacer funcionar el chatbot IA + Tour 3D en 90 minutos

---

## CONTEXTO DEL PROYECTO

Estás trabajando en **ProIA** — plataforma PropTech para Paraguay.
El archivo base ya existe: `proia-v4.html` (landing master + 3 sub-landings integradas).

Tenés que implementar DOS cosas reales:
1. **Chatbot conectado a Claude API** (claude-sonnet-4-20250514)
2. **Tour Virtual 3D real** con Pannellum (fotos 360° o equirectangulares)

Stack: **Next.js + Supabase + Vercel** (ya configurados)

---

## TAREA 1: CHATBOT IA CON CLAUDE API

### Lo que hay que hacer:

**A) Crear API Route en Next.js**

```
/app/api/chat/route.ts
```

```typescript
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Sos el asesor inmobiliario IA de ProIA, la plataforma PropTech líder de Paraguay.
Respondés en español rioplatense, de forma concisa, experta y orientada a cerrar.

CONTEXTO DEL MERCADO PARAGUAYO:
- Asunción: precios 18% bajo valor justo vs LATAM. Demanda +24% últimos 6 meses
- Zonas premium: Villa Morra, Mcal. López, Recoleta, San Lorenzo
- Alquiler 3 dorm Asunción: $900–$1,500/mes
- ROI alquiler tradicional: 7–9% anual
- Paraguay es el ÚNICO mercado LATAM sin líder PropTech. Ventana de 18–24 meses

MERCADO PROPTECH LATAM:
- Tamaño 2025: $1.76B USD. CAGR 13.6%. Proyección 2030: $3.9B
- Competidores: QuintoAndar (BR, $5.1B), Habi (CO, $1B+), La Haus (MX)
- Convergencia PropTech+Fintech agrega 20% a la valoración
- VC Recovery 2025: +67%

PRODUCTOS PROIA:
1. ALQUILER EXPRESS: sin depósito, sin fiador, sin comisión para el inquilino.
   - Evaluación IA en 24h. Cobro garantizado al propietario pase lo que pase.
   - Precio: gratuito para inquilino. Propietario paga comisión del 8% mensual.

2. RENT-TO-OWN: alquiler que acumula capital hacia la compra.
   - Períodos: 24, 36 o 60 meses
   - ROI para inversor: 12–16% anual según período
   - 68% de inquilinos ejercen la opción de compra
   - Capital acumulado: 10–25% del valor según período

3. PORTFOLIO PRO: gestión de múltiples propiedades
   - Planes: Starter $49/mes (hasta 3 prop), Pro $129/mes (hasta 10), Enterprise custom
   - IA de precios, reportes fiscales automáticos, API para agencias

INSTRUCCIONES:
- Máximo 3 párrafos por respuesta
- Usá datos concretos y números reales
- Siempre terminá con una acción sugerida o pregunta de cierre
- Si preguntan por precios específicos, dales rangos reales de Asunción
- Si preguntan por propiedades disponibles, mencioná Villa Morra, Mcal. López, Recoleta
- Usá emojis con moderación (1–2 por respuesta máximo)`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages
    })
    
    return NextResponse.json({ 
      content: response.content[0].type === 'text' ? response.content[0].text : '' 
    })
  } catch (error) {
    console.error('Claude API error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
```

**B) Variables de entorno necesarias**

```env
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**C) Componente Chat React**

```
/components/ChatBot.tsx
```

El chat debe:
- Mostrar historial de mensajes (user / assistant)
- Indicador de "escribiendo..." (3 puntitos animados) mientras espera
- Input + botón enviar. Enter para enviar
- Auto-scroll al último mensaje
- Guardar historial en estado React (array de `{role, content}`)
- Llamar a `/api/chat` con el historial completo en cada mensaje
- Manejo de errores con mensaje amigable

**D) Guardar conversaciones en Supabase**

Crear tabla:
```sql
create table chat_sessions (
  id uuid default gen_random_uuid() primary key,
  session_id text not null,
  messages jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  page_context text -- 'home' | 'express' | 'rto' | 'portfolio'
);
```

Upsert la conversación después de cada mensaje:
```typescript
await supabase
  .from('chat_sessions')
  .upsert({ session_id, messages: chatHistory, updated_at: new Date(), page_context })
```

---

## TAREA 2: TOUR VIRTUAL 3D CON PANNELLUM

### Lo que hay que hacer:

**A) Instalar Pannellum**

```bash
npm install pannellum
# o usar CDN en el HTML:
# <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
# <script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
```

**B) Estructura de datos del tour**

```typescript
// /data/tourData.ts
export const tourScenes = {
  sala: {
    title: "Sala de estar",
    image: "/tours/molas-lopez/sala.jpg", // foto 360° equirectangular
    hotSpots: [
      {
        pitch: -10,
        yaw: 30,
        type: "scene",
        sceneId: "comedor",
        text: "Ir al comedor"
      },
      {
        pitch: 5,
        yaw: -60,
        type: "info",
        text: "Piso importado Rovere Naturale · 120cm x 20cm"
      },
      {
        pitch: 15,
        yaw: 120,
        type: "info", 
        text: "Ventanas piso-techo · Doble vidrio · Orientación Este"
      }
    ]
  },
  dormitorio: {
    title: "Dormitorio principal",
    image: "/tours/molas-lopez/dormitorio.jpg",
    hotSpots: [
      {
        pitch: -5,
        yaw: -90,
        type: "scene",
        sceneId: "bano",
        text: "Ir al baño en suite"
      }
    ]
  },
  bano: {
    title: "Baño en suite",
    image: "/tours/molas-lopez/bano.jpg",
    hotSpots: []
  },
  cocina: {
    title: "Cocina equipada",
    image: "/tours/molas-lopez/cocina.jpg",
    hotSpots: []
  },
  terraza: {
    title: "Terraza",
    image: "/tours/molas-lopez/terraza.jpg",
    hotSpots: []
  }
}
```

**C) Componente Tour3D**

```
/components/Tour3D.tsx
```

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

// Pannellum se carga via CDN (window.pannellum)
declare global {
  interface Window { pannellum: any }
}

interface TourScene {
  title: string
  image: string
  hotSpots: any[]
}

interface Tour3DProps {
  scenes: Record<string, TourScene>
  defaultScene?: string
  propertyName?: string
  propertyPrice?: string
  propertyAddress?: string
}

export default function Tour3D({ 
  scenes, 
  defaultScene = 'sala',
  propertyName = 'Torre Molas López — Piso 7',
  propertyPrice = '$1,850/mes · 98m²',
  propertyAddress = 'Asunción, Paraguay'
}: Tour3DProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const pannellumRef = useRef<any>(null)
  const [currentScene, setCurrentScene] = useState(defaultScene)
  const [isLoading, setIsLoading] = useState(true)
  const [aiDescription, setAiDescription] = useState('')

  const sceneDescriptions: Record<string, string> = {
    sala: 'Sala amplia, ventanas piso-techo. Orientación Este. Luz natural 8h/día. Certificación energética A+.',
    dormitorio: 'Dormitorio principal con baño en suite. Vestidor integrado. Aire acondicionado incluido.',
    bano: 'Baño en mármol travertino. Ducha lluvia 60×60cm. Grifería Grohe importada.',
    cocina: 'Cocina totalmente equipada. Mesadas de granito. Electrodomésticos Bosch incluidos.',
    terraza: 'Terraza de 18m² con vista panorámica a Asunción. Orientación Oeste. Ideal atardeceres.'
  }

  useEffect(() => {
    // Load Pannellum CSS
    if (!document.getElementById('pannellum-css')) {
      const link = document.createElement('link')
      link.id = 'pannellum-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
      document.head.appendChild(link)
    }
    // Load Pannellum JS
    if (!window.pannellum) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
      script.onload = () => initViewer(defaultScene)
      document.head.appendChild(script)
    } else {
      initViewer(defaultScene)
    }
    return () => { if (pannellumRef.current) pannellumRef.current.destroy() }
  }, [])

  function initViewer(sceneId: string) {
    if (!viewerRef.current || !window.pannellum) return
    
    // Build scenes config for Pannellum
    const scenesConfig: Record<string, any> = {}
    Object.entries(scenes).forEach(([id, scene]) => {
      scenesConfig[id] = {
        title: scene.title,
        panorama: scene.image,
        hotSpots: scene.hotSpots,
        autoLoad: true
      }
    })

    pannellumRef.current = window.pannellum.viewer(viewerRef.current, {
      type: 'multires', // usa 'equirectangular' para fotos normales 360
      default: {
        firstScene: sceneId,
        sceneFadeDuration: 1000,
        autoLoad: true,
        showControls: false, // usamos controles custom
        compass: false,
        hfov: 100
      },
      scenes: scenesConfig
    })

    pannellumRef.current.on('load', () => setIsLoading(false))
    pannellumRef.current.on('scenechange', (id: string) => {
      setCurrentScene(id)
      setAiDescription(sceneDescriptions[id] || '')
    })
    setAiDescription(sceneDescriptions[sceneId] || '')
  }

  function goToScene(sceneId: string) {
    if (pannellumRef.current) {
      pannellumRef.current.loadScene(sceneId)
      setCurrentScene(sceneId)
    }
  }

  return (
    <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', background: '#060E2B' }}>
      {/* Viewer */}
      <div ref={viewerRef} style={{ width: '100%', height: '500px' }} />
      
      {/* Loading */}
      {isLoading && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060E2B', zIndex: 10 }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏠</div>
            <div style={{ fontSize: '14px', opacity: 0.6 }}>Cargando tour virtual...</div>
          </div>
        </div>
      )}

      {/* Property badge */}
      <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px', zIndex: 5 }}>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginBottom: '2px' }}>📍 {propertyAddress}</div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{propertyName}</div>
        <div style={{ fontSize: '11px', color: '#7FA3F5', marginTop: '2px' }}>{propertyPrice}</div>
      </div>

      {/* AI Description */}
      {aiDescription && (
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '12px', padding: '12px', width: '200px', zIndex: 5 }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0EA5E9', marginBottom: '7px' }}>🤖 IA Descripción</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{aiDescription}</div>
        </div>
      )}

      {/* Room controls */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 5 }}>
        {Object.entries(scenes).map(([id, scene]) => (
          <button
            key={id}
            onClick={() => goToScene(id)}
            style={{
              background: currentScene === id ? '#2D5BE3' : 'rgba(255,255,255,0.08)',
              border: `1px solid ${currentScene === id ? '#2D5BE3' : 'rgba(255,255,255,0.12)'}`,
              color: currentScene === id ? '#fff' : 'rgba(255,255,255,0.7)',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '11px',
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {scene.title}
          </button>
        ))}
      </div>
    </div>
  )
}
```

**D) Fotos para el tour — opciones rápidas**

Si NO tenés fotos 360° reales todavía, usá estas opciones:

**Opción 1 — Demo con fotos equirectangulares gratuitas:**
```
https://pannellum.org/images/alma.jpg  ← funciona de inmediato para demo
```

**Opción 2 — Google Street View API** (si tenés key):
```
https://maps.googleapis.com/maps/api/streetview?size=4096x2048&location=LAT,LNG&key=API_KEY
```

**Opción 3 — Matterport embed** (el más profesional):
```tsx
<iframe 
  src="https://my.matterport.com/show/?m=TU_MODEL_ID"
  width="100%" height="500px"
  frameBorder="0" allowFullScreen
/>
```
Para Matterport: crear cuenta gratuita en matterport.com, subir fotos 360° desde app mobile.

**Opción 4 — Kuula** (gratuito, más fácil):
```tsx
<iframe 
  src="https://kuula.co/share/TU_ID?fs=1&vr=1&thumbs=1&info=1&logo=0"
  width="100%" height="500px"
  frameBorder="0" allowFullScreen
/>
```

---

## TAREA 3: ESTRUCTURA DEL PROYECTO NEXT.JS

```
proia/
├── app/
│   ├── page.tsx                    ← Landing master (home)
│   ├── alquiler-express/
│   │   └── page.tsx                ← Landing Alquiler Express
│   ├── rent-to-own/
│   │   └── page.tsx                ← Landing Rent-to-Own  
│   ├── portfolio-pro/
│   │   └── page.tsx                ← Landing Portfolio Pro
│   └── api/
│       └── chat/
│           └── route.ts            ← Claude API endpoint
├── components/
│   ├── ChatBot.tsx                 ← Chatbot component
│   ├── Tour3D.tsx                  ← Pannellum tour component
│   ├── Nav.tsx                     ← Navegación global
│   ├── Footer.tsx                  ← Footer global
│   ├── Dashboard.tsx               ← Dashboard interactivo del hero
│   └── FeatureTabs.tsx             ← Tabs de features clickeables
├── data/
│   └── tourData.ts                 ← Config de escenas del tour
├── public/
│   └── tours/
│       └── molas-lopez/
│           ├── sala.jpg            ← Foto 360° sala
│           ├── dormitorio.jpg      ← Foto 360° dormitorio
│           ├── bano.jpg
│           ├── cocina.jpg
│           └── terraza.jpg
├── lib/
│   └── supabase.ts                 ← Supabase client
├── .env.local                      ← Variables de entorno
└── next.config.js
```

---

## TAREA 4: SUPABASE — TABLAS NECESARIAS

Ejecutar en Supabase SQL Editor:

```sql
-- Sesiones del chat
create table if not exists chat_sessions (
  id uuid default gen_random_uuid() primary key,
  session_id text not null unique,
  messages jsonb not null default '[]'::jsonb,
  page_context text default 'home',
  user_ip text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Leads capturados desde el chat
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  session_id text,
  nombre text,
  email text,
  telefono text,
  interes text, -- 'express' | 'rto' | 'portfolio' | 'inversor'
  mensaje text,
  created_at timestamptz default now()
);

-- Propiedades (para el futuro listing real)
create table if not exists propiedades (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  zona text not null,
  precio_alquiler numeric,
  precio_venta numeric,
  dormitorios int,
  banos int,
  metros numeric,
  tipo text, -- 'apartamento' | 'casa' | 'oficina'
  producto text, -- 'express' | 'rto' | 'ambos'
  tour_url text, -- URL del tour 3D (Matterport/Kuula)
  fotos jsonb default '[]'::jsonb,
  disponible boolean default true,
  created_at timestamptz default now()
);

-- Habilitar RLS
alter table chat_sessions enable row level security;
alter table leads enable row level security;
alter table propiedades enable row level security;

-- Policy pública para leer propiedades
create policy "propiedades_public_read" on propiedades
  for select using (disponible = true);

-- Policy para insertar leads y chat desde el frontend
create policy "leads_insert" on leads for insert with check (true);
create policy "chat_upsert" on chat_sessions for all with check (true);
```

---

## TAREA 5: INTEGRACIÓN DEL CHATBOT EN ALQUILER EXPRESS

En la página de Alquiler Express, el chatbot debe tener contexto específico:

```typescript
// Cuando el usuario está en la página de Alquiler Express,
// pasar page_context: 'express' al API route
// El system prompt ya maneja esto

// Agregar al final del mensaje del chatbot si detecta interés:
// "¿Querés que te conecte con un agente para ver propiedades disponibles hoy?"
```

---

## ORDEN DE EJECUCIÓN (90 minutos)

### Minutos 0–20: Setup básico
```bash
npx create-next-app@latest proia --typescript --tailwind --app
cd proia
npm install @anthropic-ai/sdk @supabase/supabase-js
cp proia-v4.html ./reference/  # guardar como referencia visual
```

### Minutos 20–45: API del chat
1. Crear `/app/api/chat/route.ts` con el system prompt completo
2. Crear `ChatBot.tsx` con historial y typing indicator
3. Testear en localhost con `curl` o Postman
4. Conectar el componente a la UI

### Minutos 45–70: Tour 3D
1. Crear `Tour3D.tsx` con Pannellum
2. Usar la foto demo de pannellum.org para testear
3. Integrar en la página de Alquiler Express
4. Configurar al menos 2 hotspots funcionales

### Minutos 70–90: Deploy
```bash
# Crear proyecto en Vercel
vercel

# Configurar variables de entorno en Vercel dashboard:
# ANTHROPIC_API_KEY
# NEXT_PUBLIC_SUPABASE_URL  
# NEXT_PUBLIC_SUPABASE_ANON_KEY

vercel --prod
```

---

## NOTAS IMPORTANTES PARA CLAUDE CODE

1. **El diseño visual YA ESTÁ HECHO** en `proia-v4.html`. No rediseñes nada. Solo portá la lógica a Next.js manteniendo exactamente el mismo CSS.

2. **Colores del sistema:**
   - Azul principal: `#2D5BE3`
   - Azul oscuro: `#060E2B`  
   - Verde: `#10B981`
   - Fuente: `Plus Jakarta Sans` (Google Fonts)

3. **El chatbot YA TIENE el system prompt** en este documento. Copialo exactamente, no lo modifiques.

4. **Para el Tour 3D**, si no hay fotos 360° reales, usá el demo de Pannellum primero y dejá los placeholders listos para cuando lleguen las fotos reales.

5. **Prioridad absoluta:** Chat funcionando > Tour 3D > Todo lo demás.

6. **No uses `'use client'` en el API route** — es solo Server Component.

7. **Rate limiting básico** para el chat (evitar abuso):
```typescript
// En route.ts, agregar headers de rate limit
export const runtime = 'edge' // más rápido
export const maxDuration = 30
```

---

## RESULTADO ESPERADO AL FINAL

✅ Landing master con dashboard interactivo (ya funciona en HTML)
✅ 3 sub-landings navegables (Express, RTO, Portfolio)
✅ Chatbot conectado a Claude que responde en español con datos reales del mercado PY
✅ Tour Virtual 3D con Pannellum en la sección de Alquiler Express
✅ Todo deployado en Vercel con dominio proia.pro o subdominio de vercel

**URL final objetivo:** `https://proia.vercel.app` o `https://proia.pro`

---

*Generado para Claude Code — ProIA PropTech Paraguay — Marzo 2026*
