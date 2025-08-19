<script setup lang="ts">
import { Tag, Clock, ArrowRight } from 'lucide-vue-next';
import type { PropType } from 'vue';
import type { Promotion } from '~~/shared/types';

const props = defineProps({
  promotions: {
    type: Array as PropType<Promotion[]>,
    required: true,
    default: () => []
  }
});

const getPromotionColor = (type: string) => {
  switch (type) {
    case 'discount':
      return 'bg-red-500';
    case 'free-shipping':
      return 'bg-green-500';
    case 'special-offer':
      return 'bg-purple-500';
    default:
      return 'bg-burgundy-500';
  }
};
</script>

<template>
  <div class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Promociones Especiales
        </h2>
        <p class="text-xl text-gray-600">
          No te pierdas estas ofertas exclusivas en vinos seleccionados
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="promotion in promotions"
          :key="promotion.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div class="relative">
            <img
              :src="promotion.image"
              :alt="promotion.title"
              class="w-full h-48 object-cover"
            />
            <div 
              class="absolute top-4 left-4 text-white px-3 py-1 rounded-full flex items-center"
              :class="getPromotionColor(promotion.type)"
            >
              <Tag class="h-4 w-4 mr-1" />
              <span class="text-sm font-medium">{{ promotion.discount }}</span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ promotion.title }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ promotion.description }}
            </p>
            
            <div class="flex items-center text-gray-500 mb-4">
              <Clock class="h-4 w-4 mr-2" />
              <span class="text-sm">Válido hasta: {{ promotion.validUntil }}</span>
            </div>
            
            <NuxtLink
              :to="promotion.buttonLink"
              class="inline-flex items-center bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors font-medium"
            >
              {{ promotion.buttonText }}
              <ArrowRight class="h-4 w-4 ml-2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
