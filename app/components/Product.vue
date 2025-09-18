<script setup lang="ts">
import { X, ChevronLeft, ChevronRight, Star, Wine, Calendar, Award, ShoppingCart, Play } from 'lucide-vue-next';
import { useCartStore } from '~/store/cart';
import type { Product } from '~~/shared/types';

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const props = defineProps<Props>();
const cartStore = useCartStore();

const currentImageIndex = ref(0);
const currentVideoIndex = ref(0);
const showVideoModal = ref(false);
const quantity = ref(1);

// Mock additional images and videos for demonstration
const allImages = [
  props.product.image,
  ...props.product.images,
  'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
];

// Mock videos for demonstration
const productVideos = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
];

const categoryColors = {
  red: 'bg-red-100 text-red-800',
  white: 'bg-yellow-100 text-yellow-800',
  rose: 'bg-pink-100 text-pink-800',
  sparkling: 'bg-blue-100 text-blue-800',
  dessert: 'bg-purple-100 text-purple-800',
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % allImages.length;
};

const prevImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 ? allImages.length - 1 : currentImageIndex.value - 1;
};

const handleAddToCart = () => {
  cartStore.addItem(props.product, quantity.value);
  props.onClose();
};

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  // @ts-ignore
  return (match && match[2].length === 11) ? match[2] : null;
};

const openVideoModal = (index: number) => {
  currentVideoIndex.value = index;
  showVideoModal.value = true;
};
</script>

<template>
<div>
  <!-- Modal Principal -->
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50">
    <div class="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
        <button
          @click="onClose"
          class="text-gray-500 transition-colors hover:text-gray-700"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
        <!-- Left Column - Images and Videos -->
        <div>
          <!-- Main Image Carousel -->
          <div class="relative mb-6">
            <div class="relative overflow-hidden bg-gray-100 rounded-lg h-96">
              <img
                :src="allImages[currentImageIndex]"
                :alt="`${product.name} ${currentImageIndex + 1}`"
                class="object-cover w-full h-full"
              />
              
              <!-- Navigation Arrows -->
              <button
                v-if="allImages.length > 1"
                @click="prevImage"
                class="absolute p-2 text-white transition-colors transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-70"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                v-if="allImages.length > 1"
                @click="nextImage"
                class="absolute p-2 text-white transition-colors transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-70"
              >
                <ChevronRight class="w-5 h-5" />
              </button>

              <!-- Image Counter -->
              <div class="absolute px-2 py-1 text-sm text-white bg-black bg-opacity-50 rounded bottom-4 right-4">
                {{ currentImageIndex + 1 }} / {{ allImages.length }}
              </div>
            </div>

            <!-- Thumbnail Navigation -->
            <div v-if="allImages.length > 1" class="flex mt-4 space-x-2 overflow-x-auto">
              <button
                v-for="(image, index) in allImages"
                :key="index"
                @click="currentImageIndex = index"
                class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors"
                :class="index === currentImageIndex
                  ? 'border-burgundy-600'
                  : 'border-gray-200 hover:border-gray-300'"
              >
                <img
                  :src="image"
                  :alt="`Thumbnail ${index + 1}`"
                  class="object-cover w-full h-full"
                />
              </button>
            </div>
          </div>

          <!-- Videos Section -->
          <div v-if="productVideos.length > 0">
            <h4 class="mb-4 text-lg font-semibold text-gray-900">Videos del Producto</h4>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(video, index) in productVideos"
                :key="index"
                class="relative cursor-pointer group"
                @click="openVideoModal(index)"
              >
                <div class="flex items-center justify-center h-24 transition-colors bg-gray-900 rounded-lg hover:bg-gray-800">
                  <Play class="w-8 h-8 text-white" />
                </div>
                <div class="absolute inset-0 flex items-center justify-center transition-opacity rounded-lg opacity-0 bg-black/20 group-hover:opacity-100">
                  <div class="text-center text-white">
                    <Play class="w-6 h-6 mx-auto mb-1" />
                    <p class="text-xs">Video {{ index + 1 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Product Details -->
        <div>
          <!-- Product Info -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="categoryColors[product.category]">
                {{ product.category }}
              </span>
              <div class="flex items-center text-gray-500">
                <Calendar class="w-4 h-4 mr-1" />
                <span class="text-sm">{{ product.vintage }}</span>
              </div>
            </div>

            <!--p class="mb-2 text-sm text-burgundy-600">{{ vineyard.name }}</p-->
            <p class="mb-4 text-gray-700">{{ product.description }}</p>

            <!-- Product Specifications -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="flex items-center text-gray-600">
                <Wine class="w-4 h-4 mr-2" />
                <span class="text-sm">{{ product.alcoholContent }}% Vol.</span>
              </div>
              <div class="text-sm text-gray-600">{{ product.volume }}ml</div>
              <div class="text-sm text-gray-600">Stock: {{ product.stock }}</div>
              <div class="text-sm text-gray-600">Año: {{ product.vintage }}</div>
            </div>

            <!-- Tasting Notes -->
            <div class="mb-6">
              <h4 class="mb-2 font-semibold text-gray-900">Notas de Cata</h4>
              <p class="text-sm text-gray-700">{{ product.tasting_notes }}</p>
            </div>

            <!-- Food Pairing -->
            <div class="mb-6">
              <h4 class="mb-2 font-semibold text-gray-900">Maridaje</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(food, index) in product.food_pairing"
                  :key="index"
                  class="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-full"
                >
                  {{ food }}
                </span>
              </div>
            </div>

            <!-- Awards -->
            <div v-if="product.awards.length > 0" class="mb-6">
              <h4 class="flex items-center mb-2 font-semibold text-gray-900">
                <Award class="w-4 h-4 mr-2" />
                Premios y Reconocimientos
              </h4>
              <div class="space-y-1">
                <div v-for="(award, index) in product.awards" :key="index" class="flex items-center text-sm text-gray-600">
                  <Star class="w-3 h-3 mr-2 text-gold-500" />
                  {{ award }}
                </div>
              </div>
            </div>
          </div>

          <!-- Price and Purchase -->
          <div class="pt-6 border-t">
            <div class="flex items-center justify-between mb-4">
              <div class="text-3xl font-bold text-burgundy-600">
                ${{ product.price.toLocaleString() }}
              </div>
              <div class="flex items-center space-x-3">
                <label for="quantity" class="text-sm font-medium text-gray-700">
                  Cantidad:
                </label>
                <select
                  id="quantity"
                  v-model="quantity"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                >
                  <option v-for="i in Math.min(10, product.stock)" :key="i" :value="i">
                    {{ i }}
                  </option>
                </select>
              </div>
            </div>

            <button
              @click="handleAddToCart"
              :disabled="product.stock === 0"
              class="flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition-colors rounded-lg bg-burgundy-600 hover:bg-burgundy-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart class="w-5 h-5 mr-2" />
              {{ product.stock === 0 ? 'Sin Stock' : `Agregar al Carrito - $${(product.price * quantity).toLocaleString()}` }}
            </button>

            <p v-if="product.stock <= 5 && product.stock > 0" class="mt-2 text-sm text-center text-red-600">
              ¡Solo quedan {{ product.stock }} unidades!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Video Modal -->
  <div v-if="showVideoModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-60">
    <div class="relative w-full max-w-4xl mx-4">
      <button
        @click="showVideoModal = false"
        class="absolute right-0 z-10 p-2 text-white transition-colors bg-black bg-opacity-50 rounded-full -top-12 hover:bg-opacity-70"
      >
        <X class="w-6 h-6" />
      </button>

      <div class="absolute left-0 z-10 -top-12">
        <h3 class="text-lg font-bold text-white">
          {{ product.name }} - Video {{ currentVideoIndex + 1 }}
        </h3>
      </div>

      <div class="relative overflow-hidden bg-black rounded-lg" style="padding-bottom: 56.25%">
        <iframe
          v-if="getYouTubeVideoId(productVideos[currentVideoIndex] as string)"
          class="absolute top-0 left-0 w-full h-full"
          :src="`https://www.youtube.com/embed/${getYouTubeVideoId(productVideos[currentVideoIndex] as string)}?autoplay=1`"
          :title="`${product.name} - Video ${currentVideoIndex + 1}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div v-else class="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <div class="text-center text-white">
            <Play class="w-16 h-16 mx-auto mb-4" />
            <p class="text-lg">Video no disponible</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
