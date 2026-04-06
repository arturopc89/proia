export interface Propiedad {
  id: string
  titulo: string
  zona: string
  ciudad: string
  precio: number
  dormitorios: number
  banos: number
  metros: number
  img: string
  imgs: string[]
  desc: string
  amenities: string[]
  tipo: string
  disponible: boolean
}

export const PROPIEDADES: Propiedad[] = [
  {
    id: 'villa-morra-3dorm',
    titulo: 'Apartamento luminoso con vista panorámica',
    zona: 'Villa Morra',
    ciudad: 'Asunción',
    precio: 1200,
    dormitorios: 3,
    banos: 2,
    metros: 95,
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    ],
    desc: 'Amplio apartamento en el corazón de Villa Morra. Cocina equipada, luminoso living comedor con vista a la ciudad. Edificio con seguridad 24h, piscina y gym.',
    amenities: ['Cochera', 'Piscina', 'Gym', 'Seguridad 24h', 'Balcón', 'Aire acond.', 'Ascensor'],
    tipo: 'Apartamento',
    disponible: true,
  },
  {
    id: 'mcal-lopez-4dorm',
    titulo: 'Residencia familiar en zona premium',
    zona: 'Mcal. López',
    ciudad: 'Asunción',
    precio: 1850,
    dormitorios: 4,
    banos: 3,
    metros: 130,
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    desc: 'Residencia de lujo con amplio jardín privado sobre avenida premium. Diseño moderno, terminaciones de primera. Ideal para familias que buscan confort y seguridad.',
    amenities: ['Cochera', 'Jardín', 'Seguridad 24h', 'Aire acond.', 'Calefacción', 'Amoblado', 'WiFi incluido', 'Parrilla'],
    tipo: 'Casa',
    disponible: true,
  },
  {
    id: 'recoleta-2dorm',
    titulo: 'Piso moderno con terminaciones premium',
    zona: 'Recoleta',
    ciudad: 'Asunción',
    precio: 850,
    dormitorios: 2,
    banos: 1,
    metros: 65,
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    desc: 'Coqueto apartamento en Recoleta. Perfecto para profesionales o parejas. Excelente conectividad, cerca de restaurantes y centros comerciales.',
    amenities: ['Balcón', 'Aire acond.', 'Ascensor', 'Seguridad 24h'],
    tipo: 'Apartamento',
    disponible: true,
  },
]

export function getPropiedad(id: string) {
  return PROPIEDADES.find(p => p.id === id)
}
