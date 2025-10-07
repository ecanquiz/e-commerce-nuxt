<script setup lang="ts">
import { Star, ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-vue-next';

const props = defineProps<{
  openGallery: (images: string[], startIndex: number, title: string) => void;
}>();

defineEmits(['open-review']);

// Mock data para reseñas (en producción vendría del backend)
const mockReviews = [
  {
    id: 1,
    author: 'María González',
    rating: 5,
    date: new Date('2024-01-15'),
    comment: 'Excelente experiencia. Los vinos son de primera calidad y el servicio impecable.',
    likes: 12,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop']
  },
  // ... más reseñas
];

const getRatingPercentage = (rating: number) => {
  // Mock data - en producción calcularías basado en datos reales
  const percentages = [80, 65, 45, 30, 15];
  return percentages[5 - rating] || 0;
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
</script>

<template>
  <div class="space-y-8">
    <!-- Resumen de Calificaciones -->
    <div class="p-6 bg-white rounded-lg shadow-sm">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Calificación Principal -->
        <!-- TODOdiv class="text-center">
          <div class="mb-2 text-6xl font-bold text-burgundy-600">
            {{ vineyard.rating }}
          </div>
          <div class="flex justify-center mb-2">
            <Star
              v-for="star in 5"
              :key="star"
              class="h-6 w-6"
              :class="star <= Math.floor(vineyard.rating)
                ? 'text-gold-400 fill-current'
                : 'text-gray-300'"
            />
          </div>
          <p class="text-gray-600">
            Basado en {{ vineyard.reviewCount }} reseñas
          </p>
        </div-->

        <!-- Distribución de Calificaciones -->
        <div class="space-y-3">
          <div 
            v-for="rating in [5, 4, 3, 2, 1]" 
            :key="rating" 
            class="flex items-center space-x-3"
          >
            <span class="w-8 text-sm font-medium">{{ rating }}★</span>
            <div class="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                class="h-2 transition-all duration-1000 rounded-full bg-gold-400"
                :style="{ width: `${getRatingPercentage(rating)}%` }"
              ></div>
            </div>
            <span class="w-12 text-sm text-gray-600">
              {{ Math.round(getRatingPercentage(rating)) }}%
            </span>
          </div>
        </div>

        <!-- Estadísticas Adicionales -->
        <div class="space-y-4">
          <div class="p-4 text-center rounded-lg bg-green-50">
            <div class="text-2xl font-bold text-green-600">94%</div>
            <div class="text-sm text-gray-600">Lo recomiendan</div>
          </div>
          <div class="grid grid-cols-2 gap-2 text-center">
            <div class="p-2 rounded bg-gray-50">
              <div class="font-semibold text-burgundy-600">4.8</div>
              <div class="text-xs text-gray-600">Calidad vino</div>
            </div>
            <div class="p-2 rounded bg-gray-50">
              <div class="font-semibold text-burgundy-600">4.7</div>
              <div class="text-xs text-gray-600">Atención</div>
            </div>
            <div class="p-2 rounded bg-gray-50">
              <div class="font-semibold text-burgundy-600">4.6</div>
              <div class="text-xs text-gray-600">Precio</div>
            </div>
            <div class="p-2 rounded bg-gray-50">
              <div class="font-semibold text-burgundy-600">4.9</div>
              <div class="text-xs text-gray-600">Experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros y Acciones -->
    <div class="p-6 bg-white rounded-lg shadow-sm">
      <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div class="flex flex-wrap gap-2">
          <select class="px-3 py-2 text-sm border border-gray-300 rounded-md">
            <option>Todas las calificaciones</option>
            <option>5 estrellas</option>
            <option>4 estrellas</option>
            <option>3 estrellas</option>
            <option>2 estrellas</option>
            <option>1 estrella</option>
          </select>
          <select class="px-3 py-2 text-sm border border-gray-300 rounded-md">
            <option>Todos los tipos</option>
            <option>Productos</option>
            <option>Servicios</option>
            <option>Experiencia general</option>
          </select>
          <select class="px-3 py-2 text-sm border border-gray-300 rounded-md">
            <option>Más recientes</option>
            <option>Más útiles</option>
            <option>Mejor calificación</option>
            <option>Peor calificación</option>
          </select>
        </div>
        <button 
          @click="$emit('open-review')"
          class="flex items-center px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-burgundy-600 hover:bg-burgundy-700"
        >
          <Star class="w-5 h-5 mr-2" />
          Escribir Reseña
        </button>
      </div>
    </div>

    <!-- Lista de Reseñas -->
    <div class="space-y-6">
      <div 
        v-for="review in mockReviews" 
        :key="review.id" 
        class="p-6 bg-white rounded-lg shadow-sm"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h4 class="font-semibold text-gray-900">{{ review.author }}</h4>
            <p class="text-sm text-gray-600">{{ formatDate(review.date) }}</p>
          </div>
          <div class="flex">
            <Star
              v-for="star in 5"
              :key="star"
              class="h-5 w-5"
              :class="star <= review.rating
                ? 'text-gold-400 fill-current'
                : 'text-gray-300'"
            />
          </div>
        </div>
        
        <p class="mb-4 text-gray-700">{{ review.comment }}</p>
        
        <div v-if="review.images.length > 0" class="flex gap-2 mb-4">
          <img
            v-for="(image, index) in review.images"
            :key="index"
            :src="image"
            :alt="`Imagen ${index + 1}`"
            class="object-cover w-20 h-20 rounded-lg cursor-pointer"
            @click="openGallery(review.images, index, `Reseña de ${review.author}`)"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <button class="flex items-center space-x-1 hover:text-burgundy-600">
              <ThumbsUp class="w-4 h-4" />
              <span>Útil ({{ review.likes }})</span>
            </button>
            <button class="flex items-center space-x-1 hover:text-burgundy-600">
              <MessageSquare class="w-4 h-4" />
              <span>Responder</span>
            </button>
          </div>
          <button class="text-sm text-gray-500 hover:text-gray-700">
            <MoreHorizontal class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
