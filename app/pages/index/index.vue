<!--script setup>
definePageMeta({
  layout: 'default',
})
</script>

<template>
<UApp>
    UApp
</UApp>
</template-->

<script setup lang="ts">
import { Grape, Star, Award, Users, ArrowRight, MapPin, Tag, TrendingUp } from 'lucide-vue-next';
import type { Promotion, Vineyard } from '~~/shared/types';

const { t } = useI18n()

const mockVineyards: Vineyard[] = [
  {
    id: '1',
    name: 'Bodega Catena Zapata',
    description: 'Reconocida mundialmente por sus vinos de alta gama, Catena Zapata es pionera en la viticultura de altura en Argentina. Con viñedos ubicados en las mejores zonas de Mendoza, producen vinos que expresan la pureza y intensidad de la altura.',
    location: 'Mendoza, Argentina',
    image: 'https://images.pexels.com/photos/17930530/pexels-photo-17930530.jpeg?auto=compress&cs=tinysrgb&w=800',
    coverImage: 'https://images.pexels.com/photos/19772197/pexels-photo-19772197.jpeg?auto=compress&cs=tinysrgb&w=1920',
    established: 1902,
    owner: 'Familia Catena',
    phone: '+54 261 413-1100',
    email: 'info@catenazapata.com',
    website: 'https://www.catenazapata.com',
    services: [
      {
        id: 'degustacion-premium',
        name: 'Degustación Premium',
        description: 'Experiencia exclusiva de cata de nuestros mejores vinos',
        longDescription: 'Sumérgete en una experiencia sensorial única donde nuestros sommeliers expertos te guiarán a través de una cata de 6 vinos premium, incluyendo nuestras etiquetas más exclusivas. La degustación incluye maridaje con quesos artesanales y productos gourmet locales.',
        price: 8500,
        duration: '2 horas',
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
        category: 'tasting'
      },
      {
        id: 'visita-guiada',
        name: 'Visita Guiada Completa',
        description: 'Recorrido por viñedos, bodega y proceso de elaboración',
        longDescription: 'Descubre los secretos de la elaboración del vino en un recorrido completo por nuestros viñedos de altura, instalaciones de producción y cavas de crianza. Incluye degustación de 3 vinos y explicación detallada del proceso de vinificación.',
        price: 4500,
        duration: '1.5 horas',
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
        category: 'tour'
      },
      {
        id: 'eventos-privados',
        name: 'Eventos Privados',
        description: 'Celebraciones exclusivas en nuestras instalaciones',
        longDescription: 'Organiza tu evento especial en un entorno único rodeado de viñedos. Ofrecemos servicios completos para bodas, celebraciones corporativas, cumpleaños y eventos especiales con catering gourmet y selección de vinos premium.',
        price: 25000,
        duration: '4-8 horas',
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
        category: 'event'
      },
      {
        id: 'restaurante-terroir',
        name: 'Restaurante Terroir',
        description: 'Gastronomía gourmet con maridaje de vinos',
        longDescription: 'Disfruta de una experiencia gastronómica excepcional en nuestro restaurante con vista a los viñedos. Nuestro chef ejecutivo crea platos únicos utilizando ingredientes locales, perfectamente maridados con nuestros vinos.',
        price: 12000,
        duration: '2-3 horas',
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
        category: 'restaurant'
      },
      {
        id: 'venta-directa',
        name: 'Venta Directa',
        description: 'Compra directa en bodega con descuentos especiales',
        longDescription: 'Adquiere nuestros vinos directamente en bodega con precios preferenciales y acceso a etiquetas exclusivas no disponibles en el mercado. Incluye asesoramiento personalizado y degustación previa a la compra.',
        duration: '30-60 minutos',
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
        category: 'direct_sale'
      }
    ],
    gallery: [
      'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3756623/pexels-photo-3756623.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/15603504/pexels-photo-15603504.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ'],
    rating: 4.9,
    reviewCount: 247,
    products: [
      {
        id: '1',
        vineyardId: '1',
        name: 'Catena Zapata Malbec',
        description: 'Un Malbec excepcional de viñedos de altura que expresa la elegancia y complejidad de este terroir único.',
        price: 15000,
        category: 'red',
        vintage: 2020,
        alcoholContent: 14.5,
        volume: 750,
        stock: 25,
        image: 'https://images.pexels.com/photos/10039989/pexels-photo-10039989.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/237774/pexels-photo-237774.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Notas de frutas negras, especias y taninos elegantes',
        food_pairing: ['Carnes rojas', 'Quesos maduros', 'Chocolate negro'],
        awards: ['Wine Spectator 95 pts', 'Robert Parker 94 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
      {
        id: '2',
        vineyardId: '1',
        name: 'Catena Zapata Chardonnay',
        description: 'Chardonnay de viñedos de altura con fermentación en barricas francesas, equilibrio perfecto entre frescura y complejidad.',
        price: 12000,
        category: 'white',
        vintage: 2021,
        alcoholContent: 13.5,
        volume: 750,
        stock: 18,
        image: 'https://images.pexels.com/photos/2954924/pexels-photo-2954924.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Aromas cítricos, notas de vainilla y final mineral',
        food_pairing: ['Pescados', 'Mariscos', 'Pollo'],
        awards: ['Wine Advocate 92 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
    ],
  },
  {
    id: '2',
    name: 'Bodega Norton',
    description: 'Con más de 125 años de historia, Norton es una de las bodegas más tradicionales de Argentina. Ubicada en Mendoza, combina tradición e innovación para crear vinos de excelente calidad.',
    location: 'Mendoza, Argentina',
    image: 'https://images.pexels.com/photos/31498834/pexels-photo-31498834.jpeg?auto=compress&cs=tinysrgb&w=800',
    coverImage: 'https://images.pexels.com/photos/31498834/pexels-photo-31498834.jpeg?auto=compress&cs=tinysrgb&w=1920',
    established: 1895,
    owner: 'Familia Norton',
    phone: '+54 261 490-9700',
    email: 'info@norton.com.ar',
    website: 'https://www.norton.com.ar',
    services: [
      {
        id: 'degustacion-clasica',
        name: 'Degustación Clásica',
        description: 'Cata tradicional de nuestros vinos emblemáticos',
        longDescription: 'Experimenta la tradición de más de 125 años en una degustación que incluye nuestros vinos más representativos. Aprende sobre la historia de la bodega y las características únicas de cada etiqueta.',
        price: 3500,
        duration: '1 hora',
        capacity: 15,
        images: [
          'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Cata de 4 vinos',
          'Historia de la bodega',
          'Maridaje con aperitivos',
          'Guía especializado'
        ],
        schedule: 'Martes a Domingo: 11:00, 15:00, 17:00',
        calComLink: 'https://cal.com/norton/degustacion-clasica',
        category: 'tasting'
      },
      {
        id: 'tour-historico',
        name: 'Tour Histórico',
        description: 'Recorrido por la historia y tradición de Norton',
        longDescription: 'Sumérgete en más de un siglo de historia vitivinícola. Visita nuestras instalaciones históricas, conoce el proceso tradicional de elaboración y descubre los secretos que han hecho de Norton una bodega legendaria.',
        price: 2800,
        duration: '1.5 horas',
        capacity: 25,
        images: [
          'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ'],
        features: [
          'Instalaciones históricas',
          'Proceso tradicional',
          'Archivo histórico',
          'Degustación final'
        ],
        schedule: 'Lunes a Sábado: 10:00, 14:00, 16:00',
        calComLink: 'https://cal.com/norton/tour-historico',
        category: 'tour'
      }
    ],
    gallery: [
      'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    videos: ['video3.mp4'],
    rating: 4.7,
    reviewCount: 189,
    products: [
      {
        id: '3',
        vineyardId: '2',
        name: 'Norton Reserva Malbec',
        description: 'Malbec de gran estructura y elegancia, con crianza en barricas francesas que le otorga complejidad y suavidad.',
        price: 8500,
        category: 'red',
        vintage: 2019,
        alcoholContent: 14.0,
        volume: 750,
        stock: 32,
        image: 'https://images.pexels.com/photos/26834221/pexels-photo-26834221.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Frutas rojas maduras, especias dulces y taninos redondos',
        food_pairing: ['Asado', 'Cordero', 'Pastas'],
        awards: ['Decanter Bronze Medal'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
    ],
  },
  {
    id: '3',
    name: 'Bodega Rutini Wines',
    description: 'Fundada en 1885, Rutini Wines es reconocida por su excelencia en la elaboración de vinos premium. Con viñedos en las mejores zonas de Mendoza, produce vinos que reflejan el terroir único de la región.',
    location: 'Mendoza, Argentina',
    image: 'https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&w=800',
    coverImage: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920',
    established: 1885,
    owner: 'Grupo Rutini',
    phone: '+54 261 413-2042',
    email: 'info@rutiniwines.com',
    services: [
      {
        id: 'catas-premium',
        name: 'Catas Premium',
        description: 'Experiencia exclusiva de degustación de vinos premium',
        longDescription: 'Disfruta de una experiencia única de degustación con nuestros mejores vinos, guiada por expertos enólogos que te contarán la historia y características de cada etiqueta.',
        price: 6500,
        duration: '1.5 horas',
        capacity: 12,
        images: [
          'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Degustación de 5 vinos premium',
          'Guía de enólogo experto',
          'Maridaje con productos locales',
          'Certificado de participación'
        ],
        schedule: 'Martes a Domingo: 11:00, 15:00, 17:00',
        calComLink: 'https://cal.com/rutini/catas-premium',
        category: 'tasting'
      },
      {
        id: 'visitas-exclusivas',
        name: 'Visitas Exclusivas',
        description: 'Recorrido VIP por instalaciones y viñedos',
        longDescription: 'Acceso exclusivo a áreas restringidas de la bodega, incluyendo cavas privadas y salas de degustación VIP con atención personalizada.',
        price: 8500,
        duration: '2 horas',
        capacity: 8,
        images: [
          'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1803105/pexels-photo-1803105.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Acceso a áreas VIP',
          'Degustación de vinos exclusivos',
          'Atención personalizada',
          'Regalo especial'
        ],
        schedule: 'Lunes a Sábado: 10:00, 14:00',
        calComLink: 'https://cal.com/rutini/visitas-exclusivas',
        category: 'tour'
      }
    ],
    gallery: [
      'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/29160034/pexels-photo-29160034.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/20535799/pexels-photo-20535799.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ'],
    rating: 4.8,
    reviewCount: 156,
    products: [
      {
        id: '4',
        vineyardId: '3',
        name: 'Rutini Cabernet Sauvignon',
        description: 'Cabernet Sauvignon de excelente estructura y concentración, con notas de frutas negras y especias.',
        price: 11000,
        category: 'red',
        vintage: 2020,
        alcoholContent: 14.2,
        volume: 750,
        stock: 22,
        image: 'https://images.pexels.com/photos/15745876/pexels-photo-15745876.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Cassis, cedro, especias y taninos firmes',
        food_pairing: ['Carnes rojas', 'Cordero', 'Quesos duros'],
        awards: ['Tim Atkin 93 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
    ],
  },
  {
    id: '4',
    name: 'Bodega Alamos',
    description: 'Situada en las estribaciones de los Andes, Alamos produce vinos que capturan la esencia de la montaña. Con una filosofía de respeto por el terroir, elaboran vinos frescos y expresivos.',
    location: 'Mendoza, Argentina',
    image: 'https://images.pexels.com/photos/45209/purple-grapes-vineyard-napa-valley-napa-vineyard-45209.jpeg?auto=compress&cs=tinysrgb&w=800',
    coverImage: 'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=1920',
    established: 1995,
    owner: 'Catena Zapata',
    phone: '+54 261 490-0214',
    email: 'info@alamoswines.com',
    services: [
      {
        id: 'degustaciones-alamos',
        name: 'Degustaciones',
        description: 'Cata de vinos con vista a los Andes',
        longDescription: 'Experimenta nuestros vinos en un entorno único con vista panorámica a la cordillera de los Andes. Una experiencia sensorial completa.',
        price: 3800,
        duration: '1 hora',
        capacity: 15,
        images: [
          'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Vista panorámica a los Andes',
          'Degustación de 4 vinos',
          'Aperitivos incluidos',
          'Guía especializado'
        ],
        schedule: 'Todos los días: 10:00, 15:00, 17:00',
        calComLink: 'https://cal.com/alamos/degustaciones',
        category: 'tasting'
      },
      {
        id: 'tours-vinedos',
        name: 'Tours de Viñedos',
        description: 'Recorrido por viñedos de altura',
        longDescription: 'Camina entre nuestros viñedos de altura y descubre cómo el terroir único de los Andes influye en nuestros vinos.',
        price: 2500,
        duration: '1.5 horas',
        capacity: 20,
        images: [
          'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Caminata por viñedos',
          'Explicación del terroir',
          'Degustación al aire libre',
          'Fotografías incluidas'
        ],
        schedule: 'Lunes a Viernes: 9:00, 11:00, 16:00',
        calComLink: 'https://cal.com/alamos/tours-vinedos',
        category: 'tour'
      }
    ],
    gallery: [
      'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    videos: [],
    rating: 4.6,
    reviewCount: 98,
    products: [
      {
        id: '5',
        vineyardId: '4',
        name: 'Alamos Malbec',
        description: 'Malbec joven y fresco que expresa la tipicidad varietal con frutas rojas vibrantes y taninos suaves.',
        price: 4500,
        category: 'red',
        vintage: 2021,
        alcoholContent: 13.8,
        volume: 750,
        stock: 45,
        image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Frutas rojas frescas, especias suaves y final sedoso',
        food_pairing: ['Pizza', 'Hamburguesas', 'Pasta con salsa roja'],
        awards: [],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
    ],
  },
  {
    id: '5',
    name: 'Bodega Salentein',
    description: 'Ubicada en el Valle de Uco, Salentein combina arquitectura moderna con tradición vitivinícola. Sus viñedos de altura producen vinos de gran intensidad y elegancia.',
    location: 'Valle de Uco, Mendoza',
    image: 'https://images.pexels.com/photos/2339180/pexels-photo-2339180.jpeg?auto=compress&cs=tinysrgb&w=800',
    coverImage: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920',
    established: 1990,
    owner: 'Familia Pon',
    phone: '+54 262 242-9090',
    email: 'info@salentein.com',
    services: [
      {
        id: 'degustaciones-premium-salentein',
        name: 'Degustaciones Premium',
        description: 'Experiencia premium en el Valle de Uco',
        longDescription: 'Degustación exclusiva de nuestros vinos más selectos en un entorno arquitectónico único, combinando arte, vino y paisaje.',
        price: 9500,
        duration: '2 horas',
        capacity: 10,
        images: [
          'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Vinos ultra premium',
          'Arquitectura única',
          'Arte y cultura',
          'Maridaje gourmet'
        ],
        schedule: 'Miércoles a Domingo: 11:00, 15:00',
        calComLink: 'https://cal.com/salentein/degustaciones-premium',
        category: 'tasting'
      },
      {
        id: 'arte-vino',
        name: 'Arte y Vino',
        description: 'Experiencia cultural única',
        longDescription: 'Combina tu pasión por el vino con el arte en nuestro espacio cultural, donde podrás disfrutar de exposiciones mientras degustas nuestros mejores vinos.',
        price: 7500,
        duration: '2.5 horas',
        capacity: 12,
        images: [
          'https://images.pexels.com/photos/2339181/pexels-photo-2339181.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1803105/pexels-photo-1803105.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Exposición de arte',
          'Degustación cultural',
          'Guía artístico',
          'Experiencia única'
        ],
        schedule: 'Sábados y Domingos: 14:00',
        calComLink: 'https://cal.com/salentein/arte-vino',
        category: 'tasting' // TODO no exist this type: 'cultural'
      }
    ],
    gallery: [
      'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1803105/pexels-photo-1803105.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    videos: ['video5.mp4'],
    rating: 4.9,
    reviewCount: 203,
    products: [
      {
        id: '6',
        vineyardId: '5',
        name: 'Salentein Primus Malbec',
        description: 'Malbec premium de viñedos seleccionados, con crianza en barricas francesas que le otorga complejidad excepcional.',
        price: 18000,
        category: 'red',
        vintage: 2019,
        alcoholContent: 14.8,
        volume: 750,
        stock: 15,
        image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Frutas negras concentradas, especias complejas y taninos nobles',
        food_pairing: ['Cordero patagónico', 'Bife de chorizo', 'Quesos de cabra'],
        awards: ['Wine Spectator 94 pts', 'James Suckling 95 pts'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
    ],
  },
  {
    id: '6',
    name: 'Bodega Luigi Bosca',
    description: 'Fundada en 1901, Luigi Bosca es sinónimo de tradición y excelencia. Con más de 120 años de historia, produce vinos que reflejan la pasión y el conocimiento transmitido de generación en generación.',
    location: 'Mendoza, Argentina',
    image: 'https://images.pexels.com/photos/2339181/pexels-photo-2339181.jpeg?auto=compress&cs=tinysrgb&w=800',
    coverImage: 'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=1920',
    established: 1901,
    owner: 'Familia Arizu',
    phone: '+54 261 413-2045',
    email: 'info@luigibosca.com.ar',
    services: [
      {
        id: 'visitas-historicas',
        name: 'Visitas Históricas',
        description: 'Recorrido por más de 120 años de historia',
        longDescription: 'Sumérgete en la rica historia de Luigi Bosca, una de las bodegas más tradicionales de Argentina. Conoce el legado familiar y la evolución de la viticultura argentina.',
        price: 4200,
        duration: '1.5 horas',
        capacity: 18,
        images: [
          'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1803105/pexels-photo-1803105.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Historia familiar',
          'Archivo histórico',
          'Instalaciones centenarias',
          'Degustación tradicional'
        ],
        schedule: 'Lunes a Sábado: 10:00, 14:00, 16:00',
        calComLink: 'https://cal.com/luigi-bosca/visitas-historicas',
        category: 'tour'
      },
      {
        id: 'catas-verticales',
        name: 'Catas Verticales',
        description: 'Degustación de diferentes añadas',
        longDescription: 'Experimenta la evolución de nuestros vinos a través del tiempo con una cata vertical que incluye diferentes añadas del mismo vino.',
        price: 8800,
        duration: '2 horas',
        capacity: 8,
        images: [
          'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        features: [
          'Diferentes añadas',
          'Evolución del vino',
          'Sommelier experto',
          'Experiencia única'
        ],
        schedule: 'Viernes y Sábados: 15:00',
        calComLink: 'https://cal.com/luigi-bosca/catas-verticales',
        category: 'tasting'
      }
    ],
    gallery: [
      'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1803105/pexels-photo-1803105.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    videos: [],
    rating: 4.7,
    reviewCount: 134,
    products: [
      {
        id: '7',
        vineyardId: '6',
        name: 'Luigi Bosca Malbec DOC',
        description: 'Malbec de denominación de origen controlada, expresión pura del terroir de Luján de Cuyo.',
        price: 9500,
        category: 'red',
        vintage: 2020,
        alcoholContent: 14.3,
        volume: 750,
        stock: 28,
        image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: ['https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=400'],
        tasting_notes: 'Violetas, ciruelas, especias y mineralidad',
        food_pairing: ['Milanesas', 'Empanadas', 'Chorizo'],
        awards: ['Mundus Vini Gold Medal'],
        createdAt: '2024-01-15T10:00:00Z',
        stockHistory: []
      },
    ],
  },
];

const featuredVineyards = mockVineyards.slice(0, 3);
const highlightedVineyards = mockVineyards.slice(0, 6);

const carouselSlides = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    description: t('home.hero.description'),
    buttonText: t('home.hero.exploreButton'),
    buttonLink: '/vineyards'
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Experiencias Únicas',
    subtitle: 'Degustaciones y Tours',
    description: 'Vive experiencias inolvidables con catas exclusivas y recorridos por los viñedos más hermosos.',
    buttonText: 'Ver Experiencias',
    buttonLink: '/vineyards'
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Vinos de Colección',
    subtitle: 'Ediciones Limitadas',
    description: 'Accede a vinos exclusivos y ediciones limitadas que no encontrarás en ningún otro lugar.',
    buttonText: 'Ver Colección',
    buttonLink: '/products'
  }
];

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Descuento Especial',
    description: 'Obtén 20% de descuento en tu primera compra de vinos premium',
    discount: '20% OFF',
    validUntil: '31 de Diciembre',
    image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Aprovechar Oferta',
    buttonLink: '/products',
    type: 'discount'
  },
  {
    id: '2',
    title: 'Envío Gratis',
    description: 'Envío gratuito en compras superiores a $50,000',
    discount: 'Envío Gratis',
    validUntil: 'Todo el mes',
    image: 'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Comprar Ahora',
    buttonLink: '/products',
    type: 'free-shipping'
  },
  {
    id: '3',
    title: 'Pack Degustación',
    description: 'Lleva 3 botellas seleccionadas por nuestros sommeliers',
    discount: 'Oferta Especial',
    validUntil: '15 de Enero',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Ver Pack',
    buttonLink: '/products',
    type: 'special-offer'
  }
];


</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Carousel -->
    <section class="relative">
      <Carousel :slides="carouselSlides" />
    </section>

    <!-- Promotions Banner -->
    <PromotionBanner :promotions="promotions" />

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ t('home.features.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('home.features.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-burgundy-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Grape class="h-10 w-10 text-burgundy-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Directo del Productor</h3>
            <p class="text-gray-600">
              {{ t('home.features.directProducer.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-gold-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Award class="h-10 w-10 text-gold-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('home.features.qualityGuaranteed.title') }}</h3>
            <p class="text-gray-600">
              {{ t('home.features.qualityGuaranteed.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-green-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Users class="h-10 w-10 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('home.features.exclusiveCommunity.title') }}</h3>
            <p class="text-gray-600">
              {{ t('home.features.exclusiveCommunity.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Vineyards -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ t('home.featuredVineyards.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('home.featuredVineyards.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VineyardCard 
            v-for="vineyard in featuredVineyards" 
            :key="vineyard.id" 
            :vineyard="vineyard" 
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink
            to="/vineyards"
            class="bg-burgundy-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-burgundy-700 transition-colors inline-flex items-center"
          >
            {{ t('home.featuredVineyards.viewAll') }}
            <ArrowRight class="ml-2 h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Highlighted Vineyards Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-4">
            <TrendingUp class="h-8 w-8 text-burgundy-600 mr-3" />
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
              {{ t('home.popularVineyards.title') }}
            </h2>
          </div>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('home.popularVineyards.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(vineyard, index) in highlightedVineyards" 
            :key="vineyard.id" 
            class="relative"
          >
            <div v-if="index < 3" class="absolute -top-2 -right-2 z-10">
              <div class="bg-gold-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {{ index + 1 }}
              </div>
            </div>
            <VineyardCard :vineyard="vineyard" />
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink
            to="/vineyards"
            class="bg-burgundy-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-burgundy-700 transition-colors inline-flex items-center"
          >
            {{ t('home.popularVineyards.exploreAll') }}
            <ArrowRight class="ml-2 h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-burgundy-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">50+</div>
            <div class="text-gray-300">{{ t('home.stats.vineyards') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">500+</div>
            <div class="text-gray-300">{{ t('home.stats.wines') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">10k+</div>
            <div class="text-gray-300">{{ t('home.stats.customers') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">98%</div>
            <div class="text-gray-300">{{ t('home.stats.satisfaction') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-gold-400 to-gold-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          {{ t('home.cta.title') }}
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          {{ t('home.cta.description') }}
        </p>
        <NuxtLink
          to="/register/vineyard"
          class="bg-white text-gold-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
        >
          {{ t('home.cta.registerButton') }}
          <ArrowRight class="ml-2 h-5 w-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

