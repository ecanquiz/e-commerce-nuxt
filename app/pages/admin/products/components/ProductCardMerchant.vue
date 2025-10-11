<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img
        :src="product.image_url || 'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg'"
        :alt="product.name"
        class="w-full h-48 object-cover"
        @error="handleImageError"
      />
      <div class="absolute top-2 right-2">
        <span
          :class="stockStatusClass"
          class="px-2 py-1 text-xs font-semibold rounded-full"
        >
          {{ stockStatus }}
        </span>
      </div>
      <div class="absolute top-2 left-2">
        <span class="bg-wine-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
          {{ product.category?.name || 'Sin categoría' }}
        </span>
      </div>
    </div>

    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
          {{ product.name }}
        </h3>
        <span class="text-sm text-gray-500 ml-2">
          {{ product.vintage_year }}
        </span>
      </div>

      <p class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ product.description || 'Sin descripción disponible' }}
      </p>

      <div class="space-y-2 text-sm text-gray-600 mb-4">
        <div v-if="product.grape_variety" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4V9a4 4 0 00-4-4z" />
          </svg>
          <span>{{ product.grape_variety }}</span>
        </div>
        <div v-if="product.region" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ product.region }}</span>
        </div>
        <div v-if="product.alcohol_content" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ product.alcohol_content }}% ABV</span>
        </div>
      </div>

      <div class="flex justify-between items-center mb-4">
        <div class="text-2xl font-bold text-wine-600">
          ${{ product.price.toFixed(2) }}
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Stock</div>
          <div class="font-semibold" :class="stockTextClass">
            {{ currentStock }}
          </div>
        </div>
      </div>

      <div class="flex space-x-2">
        <button
          @click="$emit('editStock', product)"
          class="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Gestionar Stock
        </button>
        <button
          @click="$emit('delete', product.id)"
          class="bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProductWithInventory } from '../lib/supabase'

const props = defineProps<{
  product: ProductWithInventory
}>()

defineEmits<{
  editStock: [product: ProductWithInventory]
  delete: [id: string]
}>()

const currentStock = computed(() => {
  return props.product.inventory?.current_stock || 0
})

const stockStatus = computed(() => {
  const stock = currentStock.value
  const minStock = props.product.inventory?.minimum_stock || 10

  if (stock === 0) return 'Sin Stock'
  if (stock <= minStock) return 'Stock Bajo'
  return 'Disponible'
})

const stockStatusClass = computed(() => {
  const stock = currentStock.value
  const minStock = props.product.inventory?.minimum_stock || 10

  if (stock === 0) return 'bg-red-100 text-red-800'
  if (stock <= minStock) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
})

const stockTextClass = computed(() => {
  const stock = currentStock.value
  const minStock = props.product.inventory?.minimum_stock || 10

  if (stock === 0) return 'text-red-600'
  if (stock <= minStock) return 'text-yellow-600'
  return 'text-green-600'
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>