<script setup lang="ts">
import { ShoppingCart, Eye, Wine, Calendar } from 'lucide-vue-next';
import { useCartStore } from '~/store/cart';
import type { ProductLegacy } from '~~/shared/types';

interface Props {
  product: ProductLegacy;
  onViewDetails?: (product: ProductLegacy) => void;
}

const props = defineProps<Props>();

const cartStore = useCartStore();

const categoryColors = {
  red: 'bg-red-100 text-red-800',
  white: 'bg-yellow-100 text-yellow-800',
  rose: 'bg-pink-100 text-pink-800',
  sparkling: 'bg-blue-100 text-blue-800',
  dessert: 'bg-purple-100 text-purple-800',
};

const handleAddToCart = () => {
  cartStore.addItem(props.product);
};

const handleViewDetails = () => {
  if (props.onViewDetails) {
    props.onViewDetails(props.product);
  }
};
</script>

<template>
  <div class="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
    <div class="relative">
      <img
        :src="product.image"
        :alt="product.name"
        class="object-cover w-full h-48"
      />
      <div class="absolute top-4 left-4">
        <span class="px-2 py-1 rounded-full text-xs font-medium" :class="categoryColors[product.category]">
          {{ product.category }}
        </span>
      </div>
      <div v-if="product.stock <= 5" class="absolute px-2 py-1 text-xs text-white bg-red-500 rounded-full top-4 right-4">
        Últimas unidades
      </div>
      <button
        v-if="onViewDetails"
        @click="handleViewDetails"
        class="absolute p-2 text-white transition-colors bg-black bg-opacity-50 rounded-full bottom-4 right-4 hover:bg-opacity-70"
      >
        <Eye class="w-4 h-4" />
      </button>
    </div>
    
    <div class="p-6">
      <div class="flex items-start justify-between mb-2">
        <h3 class="text-lg font-bold text-gray-900">{{ product.name }}</h3>
        <div class="flex items-center text-gray-500">
          <Calendar class="w-4 h-4 mr-1" />
          <span class="text-sm">{{ product.vintage }}</span>
        </div>
      </div>
      
      <!--p class="mb-2 text-sm text-gray-600">{{ vineyard.name }}</p-->
      
      <p class="mb-4 text-gray-700 line-clamp-2">{{ product.description }}</p>
      
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-gray-500">
            <Wine class="w-4 h-4 mr-1" />
            <span class="text-sm">{{ product.alcoholContent }}%</span>
          </div>
          <div class="text-sm text-gray-500">{{ product.volume }}ml</div>
        </div>
        <div class="text-sm text-gray-500">Stock: {{ product.stock }}</div>
      </div>
      <div class="flex items-center justify-between pace-x-2 ">
        <div class="mt-2 ml-auto text-2xl font-bold text-burgundy-600">
          ${{ product.price.toLocaleString() }}
        </div>
      </div>
      
      <div class="flex items-center justify-between space-x-2 ">
        <div class="flex space-x-2 ">
          <button
            v-if="onViewDetails"
            @click="handleViewDetails"
            class="flex items-center py-2 space-x-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-md px-7 hover:bg-gray-200"
          >
            <Eye class="w-4 h-4" />
            <span>Ver</span>
          </button>
          <button
            @click="handleAddToCart"
            :disabled="product.stock === 0"
            class="flex items-center py-2 space-x-2 text-white transition-colors rounded-md px-7 bg-burgundy-600 hover:bg-burgundy-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart class="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
