import type { Service } from '~~/shared/types'

// Datos mock de ejemplo (reemplaza con tus datos reales)
export const mockServices: Service[] = [{
        id: 'degustacion-premium',
        name: 'Degustación Premium',
        description: 'Experiencia exclusiva de cata de nuestros mejores vinos',
        longDescription: 'Sumérgete en una experiencia sensorial única donde nuestros sommeliers expertos te guiarán a través de una cata de 6 vinos premium, incluyendo nuestras etiquetas más exclusivas. La degustación incluye maridaje con quesos artesanales y productos gourmet locales.',
        price: 8500,
        duration: 2,// horas',
        capacity: 12,
        images: [
          'https://images.pexels.com/photos/2440527/pexels-photo-2440527.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/8775203/pexels-photo-8775203.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/8093862/pexels-photo-8093862.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Cata de 6 vinos premium',
          'Maridaje con quesos artesanales',
          'Guía de sommelier experto',
          'Certificado de participación',
          'Copa de regalo'
        ],
        schedule: 'Lunes a Domingo: 10:00, 14:00, 16:00',
        calComLink: 'https://cal.com/catena-zapata/degustacion-premium',
        category: 'tasting',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'visita-guiada',
        name: 'Visita Guiada Completa',
        description: 'Recorrido por viñedos, bodega y proceso de elaboración',
        longDescription: 'Descubre los secretos de la elaboración del vino en un recorrido completo por nuestros viñedos de altura, instalaciones de producción y cavas de crianza. Incluye degustación de 3 vinos y explicación detallada del proceso de vinificación.',
        price: 4500,
        duration: 1.5, //'1.5 horas',
        capacity: 20,
        images: [
          'https://images.pexels.com/photos/5490196/pexels-photo-5490196.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/27819451/pexels-photo-27819451.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/9034871/pexels-photo-9034871.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ'],
        features: [
          'Recorrido por viñedos',
          'Visita a la bodega',
          'Explicación del proceso',
          'Degustación de 3 vinos',
          'Guía especializado'
        ],
        schedule: 'Lunes a Viernes: 9:00, 11:00, 15:00, 17:00 | Sábados y Domingos: 10:00, 12:00, 16:00',
        calComLink: 'https://cal.com/catena-zapata/visita-guiada',
        category: 'tour',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'eventos-privados',
        name: 'Eventos Privados',
        description: 'Celebraciones exclusivas en nuestras instalaciones',
        longDescription: 'Organiza tu evento especial en un entorno único rodeado de viñedos. Ofrecemos servicios completos para bodas, celebraciones corporativas, cumpleaños y eventos especiales con catering gourmet y selección de vinos premium.',
        price: 25000,
        duration: 4, //'4-8 horas',
        capacity: 100,
        images: [
          'https://images.pexels.com/photos/12645235/pexels-photo-12645235.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ'],
        features: [
          'Espacios exclusivos',
          'Catering gourmet',
          'Selección de vinos',
          'Decoración incluida',
          'Coordinador de eventos',
          'Música y entretenimiento'
        ],
        schedule: 'Disponible todos los días previa reserva',
        calComLink: 'https://cal.com/catena-zapata/eventos-privados',
        category: 'event',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'restaurante-terroir',
        name: 'Restaurante Terroir',
        description: 'Gastronomía gourmet con maridaje de vinos',
        longDescription: 'Disfruta de una experiencia gastronómica excepcional en nuestro restaurante con vista a los viñedos. Nuestro chef ejecutivo crea platos únicos utilizando ingredientes locales, perfectamente maridados con nuestros vinos.',
        price: 12000,
        duration: 2, //'2-3 horas',
        capacity: 60,
        images: [
          'https://images.pexels.com/photos/13148486/pexels-photo-13148486.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1267358/pexels-photo-1267358.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/14746881/pexels-photo-14746881.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ'],
        features: [
          'Menú degustación 7 pasos',
          'Maridaje con 5 vinos',
          'Ingredientes locales',
          'Vista panorámica',
          'Chef ejecutivo',
          'Servicio personalizado'
        ],
        schedule: 'Almuerzo: 12:00-15:00 | Cena: 19:00-22:00 (Cerrado Lunes)',
        calComLink: 'https://cal.com/catena-zapata/restaurante',
        category: 'restaurant',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'venta-directa',
        name: 'Venta Directa',
        description: 'Compra directa en bodega con descuentos especiales',
        longDescription: 'Adquiere nuestros vinos directamente en bodega con precios preferenciales y acceso a etiquetas exclusivas no disponibles en el mercado. Incluye asesoramiento personalizado y degustación previa a la compra.',
        duration: 1, //'30-60 minutos',
        capacity: 10,
        images: [
          'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/19863260/pexels-photo-19863260.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Precios preferenciales',
          'Etiquetas exclusivas',
          'Asesoramiento personalizado',
          'Degustación previa',
          'Envío a domicilio',
          'Programa de fidelidad'
        ],
        schedule: 'Lunes a Domingo: 9:00-18:00',
        calComLink: 'https://cal.com/catena-zapata/venta-directa',
        category: 'direct_sale',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]

// Helper para buscar productos
export const getProductById = (id: string) => 
  mockServices.find(p => p.id === id)

export const searchProducts = (query: string, category?: string) => {
  return mockServices.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || 
                         p.description.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = !category || category === 'all' || p.category === category
    return matchesQuery && matchesCategory
  })
}
