'use client'
import { useEffect, useRef, useState } from 'react'
import { tourScenes, sceneDescriptions, TourScene } from '@/data/tourData'

declare global {
  interface Window { pannellum: any }
}

interface Tour3DProps {
  propertyName?: string
  propertyPrice?: string
  propertyAddress?: string
}

export default function Tour3D({
  propertyName = 'Torre Molas López — Piso 7',
  propertyPrice = '$1,850/mes · 98m²',
  propertyAddress = 'Asunción, Paraguay'
}: Tour3DProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const pannellumRef = useRef<any>(null)
  const [currentScene, setCurrentScene] = useState('sala')
  const [isLoading, setIsLoading] = useState(true)
  const [aiDescription, setAiDescription] = useState(sceneDescriptions['sala'])

  useEffect(() => {
    // Load Pannellum CSS
    if (!document.getElementById('pannellum-css')) {
      const link = document.createElement('link')
      link.id = 'pannellum-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
      document.head.appendChild(link)
    }

    function initViewer() {
      if (!viewerRef.current || !window.pannellum) return

      const scenesConfig: Record<string, any> = {}
      Object.entries(tourScenes).forEach(([id, scene]: [string, TourScene]) => {
        scenesConfig[id] = {
          title: scene.title,
          panorama: scene.image,
          hotSpots: scene.hotSpots,
          autoLoad: true
        }
      })

      pannellumRef.current = window.pannellum.viewer(viewerRef.current, {
        type: 'equirectangular',
        default: {
          firstScene: 'sala',
          sceneFadeDuration: 1000,
          autoLoad: true,
          showControls: false,
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
    }

    if (!window.pannellum) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
      script.onload = initViewer
      document.head.appendChild(script)
    } else {
      initViewer()
    }

    return () => {
      if (pannellumRef.current) {
        try { pannellumRef.current.destroy() } catch {}
      }
    }
  }, [])

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
      <div className="tour-badge">
        <div className="tour-badge-addr">📍 {propertyAddress}</div>
        <div className="tour-badge-name">{propertyName}</div>
        <div className="tour-badge-price">{propertyPrice}</div>
      </div>

      {/* AI Description */}
      {aiDescription && (
        <div className="tour-ai-desc">
          <div className="tour-ai-label">🤖 IA Descripción</div>
          <div className="tour-ai-text">{aiDescription}</div>
        </div>
      )}

      {/* Room controls */}
      <div className="tour-controls">
        {Object.entries(tourScenes).map(([id, scene]) => (
          <button
            key={id}
            onClick={() => goToScene(id)}
            className={`tour-btn ${currentScene === id ? 'active' : 'inactive'}`}
          >
            {scene.title}
          </button>
        ))}
      </div>
    </div>
  )
}
