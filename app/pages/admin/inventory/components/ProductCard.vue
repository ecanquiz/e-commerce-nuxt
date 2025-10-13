<script setup lang="ts">
import type { ProductWithInventory } from '~~/shared/types/inventory'

interface Props {
  product: ProductWithInventory
}

const props = defineProps<Props>()
const emit = defineEmits<{
  editStock: [product: ProductWithInventory]
  delete: [id: string]
}>()

const { getStockStatus } = useInventory()

const stockStatus = computed(() => getStockStatus(props.product))

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg'
}
</script>

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
          :class="stockStatus.class"
          class="px-2 py-1 text-xs font-semibold rounded-full"
        >
          {{ stockStatus.status }}
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
          <Icon name="mdi:grapes" class="w-4 h-4 mr-2" />
          <span>{{ product.grape_variety }}</span>
        </div>
        <div v-if="product.region" class="flex items-center">
          <Icon name="mdi:map-marker" class="w-4 h-4 mr-2" />
          <span>{{ product.region }}</span>
        </div>
        <div v-if="product.alcohol_content" class="flex items-center">
          <Icon name="mdi:glass-cocktail" class="w-4 h-4 mr-2" />
          <span>{{ product.alcohol_content }}% ABV</span>
        </div>
      </div>

      <div class="flex justify-between items-center mb-4">
        <div class="text-2xl font-bold text-wine-600">
          ${{ product.price.toFixed(2) }}
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Stock</div>
          <div class="font-semibold" :class="stockStatus.textClass">
            {{ product.inventory?.current_stock || 0 }}
          </div>
        </div>
      </div>

      <div class="flex space-x-2">
        <button
          @click="emit('editStock', product)"
          class="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Gestionar Stock
        </button>
        <button
          @click="emit('delete', product.id)"
          class="bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors"
        >
          <Icon name="mdi:delete" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
