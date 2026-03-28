export interface TourScene {
  title: string
  image: string
  hotSpots: {
    pitch: number
    yaw: number
    type: 'scene' | 'info'
    sceneId?: string
    text: string
  }[]
}

export const tourScenes: Record<string, TourScene> = {
  sala: {
    title: 'Sala de estar',
    image: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/lebombo.jpg',
    hotSpots: [
      { pitch: -10, yaw: 30, type: 'scene', sceneId: 'dormitorio', text: 'Ir al dormitorio' },
      { pitch: 5, yaw: -60, type: 'info', text: 'Piso importado Rovere Naturale · 120cm x 20cm' },
      { pitch: 15, yaw: 120, type: 'info', text: 'Ventanas piso-techo · Doble vidrio · Orientación Este' }
    ]
  },
  dormitorio: {
    title: 'Dormitorio principal',
    image: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/lythwood_room.jpg',
    hotSpots: [
      { pitch: -5, yaw: -90, type: 'scene', sceneId: 'bano', text: 'Ir al baño en suite' },
      { pitch: 0, yaw: 60, type: 'scene', sceneId: 'sala', text: 'Volver a la sala' },
      { pitch: 10, yaw: -20, type: 'info', text: 'Vestidor integrado · 4.5m² · Iluminación LED' }
    ]
  },
  bano: {
    title: 'Baño en suite',
    image: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/hotel_room.jpg',
    hotSpots: [
      { pitch: -5, yaw: 90, type: 'scene', sceneId: 'dormitorio', text: 'Volver al dormitorio' },
      { pitch: 5, yaw: -30, type: 'info', text: 'Mármol travertino · Grifería Grohe importada' }
    ]
  },
  cocina: {
    title: 'Cocina equipada',
    image: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/kiara_interior.jpg',
    hotSpots: [
      { pitch: -5, yaw: 0, type: 'scene', sceneId: 'sala', text: 'Ir a la sala' },
      { pitch: 8, yaw: 150, type: 'info', text: 'Mesadas granito · Electrodomésticos Bosch incluidos' }
    ]
  },
  terraza: {
    title: 'Terraza',
    image: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/lebombo.jpg',
    hotSpots: [
      { pitch: -5, yaw: -120, type: 'scene', sceneId: 'sala', text: 'Volver a la sala' },
      { pitch: 0, yaw: 60, type: 'info', text: 'Vista panorámica Asunción · 18m² · Orientación Oeste' }
    ]
  }
}

export const sceneDescriptions: Record<string, string> = {
  sala: 'Sala amplia con ventanas piso-techo. Orientación Este, luz natural 8h/día. Piso Rovere Naturale importado. Certificación energética A+.',
  dormitorio: 'Dormitorio principal con baño en suite y vestidor integrado de 4.5m². Aire acondicionado incluido. Iluminación LED regulable.',
  bano: 'Baño revestido en mármol travertino. Ducha lluvia 60×60cm. Grifería Grohe importada. Ventilación mecánica.',
  cocina: 'Cocina totalmente equipada. Mesadas de granito negro. Electrodomésticos Bosch incluidos. Extractor silencioso.',
  terraza: 'Terraza de 18m² con vista panorámica a Asunción. Orientación Oeste, ideal para atardeceres. Piso deck composite.'
}
