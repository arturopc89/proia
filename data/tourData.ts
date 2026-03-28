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

// Use Pannellum's demo image until real 360° photos are available
const DEMO_360 = 'https://pannellum.org/images/alma.jpg'

export const tourScenes: Record<string, TourScene> = {
  sala: {
    title: 'Sala de estar',
    image: DEMO_360,
    hotSpots: [
      { pitch: -10, yaw: 30, type: 'scene', sceneId: 'dormitorio', text: 'Ir al dormitorio' },
      { pitch: 5, yaw: -60, type: 'info', text: 'Piso importado Rovere Naturale · 120cm x 20cm' },
      { pitch: 15, yaw: 120, type: 'info', text: 'Ventanas piso-techo · Doble vidrio · Orientación Este' }
    ]
  },
  dormitorio: {
    title: 'Dormitorio principal',
    image: DEMO_360,
    hotSpots: [
      { pitch: -5, yaw: -90, type: 'scene', sceneId: 'bano', text: 'Ir al baño en suite' }
    ]
  },
  bano: {
    title: 'Baño en suite',
    image: DEMO_360,
    hotSpots: []
  },
  cocina: {
    title: 'Cocina equipada',
    image: DEMO_360,
    hotSpots: []
  },
  terraza: {
    title: 'Terraza',
    image: DEMO_360,
    hotSpots: []
  }
}

export const sceneDescriptions: Record<string, string> = {
  sala: 'Sala amplia, ventanas piso-techo. Orientación Este. Luz natural 8h/día. Certificación energética A+.',
  dormitorio: 'Dormitorio principal con baño en suite. Vestidor integrado. Aire acondicionado incluido.',
  bano: 'Baño en mármol travertino. Ducha lluvia 60×60cm. Grifería Grohe importada.',
  cocina: 'Cocina totalmente equipada. Mesadas de granito. Electrodomésticos Bosch incluidos.',
  terraza: 'Terraza de 18m² con vista panorámica a Asunción. Orientación Oeste. Ideal atardeceres.'
}
