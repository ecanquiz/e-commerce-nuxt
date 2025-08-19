<script setup lang="ts">
import { MapPin, Star, Award, Clock } from 'lucide-vue-next';
import type { PropType } from 'vue';
import type { Vineyard } from '~~/shared/types';

const props = defineProps({
  vineyard: {
    type: Object as PropType<Vineyard>,
    required: true
  }
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div class="relative">
      <img
        :src="vineyard.image"
        :alt="vineyard.name"
        class="w-full h-48 object-cover"
      />
      <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1 shadow-md">
        <Star class="h-4 w-4 text-yellow-400 fill-current" />
        <span class="text-sm font-medium">{{ vineyard.rating }}</span>
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-xl font-bold text-gray-900">{{ vineyard.name }}</h3>
        <div class="flex items-center text-gray-500">
          <Clock class="h-4 w-4 mr-1" />
          <span class="text-sm">Est. {{ vineyard.established }}</span>
        </div>
      </div>
      
      <div class="flex items-center text-gray-600 mb-3">
        <MapPin class="h-4 w-4 mr-1" />
        <span class="text-sm">{{ vineyard.location }}</span>
      </div>
      
      <p class="text-gray-700 mb-4 line-clamp-3">{{ vineyard.description }}</p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="service in vineyard.services.slice(0, 3)"
          :key="service.id"
          class="px-2 py-1 bg-burgundy-100 text-burgundy-800 text-xs rounded-full"
        >
          {{ service.name }}
        </span>
        <span 
          v-if="vineyard.services.length > 3" 
          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
        >
          +{{ vineyard.services.length - 3 }} más
        </span>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-gray-500">
            <Award class="h-4 w-4 mr-1" />
            <span class="text-sm">{{ vineyard.products.length }} vinos</span>
          </div>
          <div class="text-sm text-gray-500">
            {{ vineyard.reviewCount }} reseñas
          </div>
        </div>
        
        <NuxtLink
          :to="`/vineyard/${vineyard.id}`"
          class="bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors text-sm font-medium"
        >
          Ver Detalles
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
