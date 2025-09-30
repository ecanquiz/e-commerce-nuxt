<script setup lang="ts">
import { Calendar, Clock, Users, Play, X, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { Service } from '~~/shared/types';

interface Props {
  service: Service;
}

const props = defineProps<Props>();

const selectedImage = ref(0);
const showGallery = ref(false);
const showVideoModal = ref(false);
const selectedVideo = ref('');

const categoryIcons = {
  tasting: '🍷',
  tour: '🚶‍♂️',
  event: '🎉',
  restaurant: '🍽️',
  direct_sale: '🛒',
  accommodation: '🏨'
};

const categoryColors = {
  tasting: 'bg-purple-100 text-purple-800',
  tour: 'bg-green-100 text-green-800',
  event: 'bg-pink-100 text-pink-800',
  restaurant: 'bg-orange-100 text-orange-800',
  direct_sale: 'bg-blue-100 text-blue-800',
  accommodation: 'bg-indigo-100 text-indigo-800'
};

const handleReservation = () => {
  if (props.service.calComLink) {
    window.open(props.service.calComLink, '_blank');
  }
};

const handleVideoClick = (videoUrl: string) => {
  selectedVideo.value = videoUrl;
  showVideoModal.value = true;
};

const closeVideoModal = () => {
  showVideoModal.value = false;
  selectedVideo.value = '';
};

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  // @ts-ignore
  return (match && match[2].length === 11) ? match[2] : null;
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
    <!-- Header Image -->
    <div class="relative h-64">
      <img
        :src="service.images[selectedImage]"
        :alt="service.name"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 rounded-full text-sm font-medium" :class="categoryColors[service.category]">
          {{ categoryIcons[service.category] }} {{ service.name }}
        </span>
      </div>
      <div v-if="service.images.length > 1" class="absolute bottom-4 left-4 flex space-x-2">
        <button
          v-for="(_, index) in service.images"
          :key="index"
          @click="selectedImage = index"
          class="w-3 h-3 rounded-full transition-colors"
          :class="index === selectedImage ? 'bg-white' : 'bg-white/50'"
        />
      </div>
      <button
        @click="showGallery = true"
        class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm hover:bg-black/70 transition-colors flex items-center space-x-1"
      >
        <span>Ver galería ({{ service.images.length }})</span>
      </button>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-xl font-bold text-gray-900">{{ service.name }}</h3>
        <div v-if="service.price" class="text-right">
          <div class="text-2xl font-bold text-burgundy-600">
            ${{ service.price.toLocaleString() }}
          </div>
          <div class="text-sm text-gray-500">por persona</div>
        </div>
      </div>

      <p class="text-gray-600 mb-4">{{ service.description }}</p>

      <!-- Service Details -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div v-if="service.duration" class="flex items-center text-gray-600">
          <Clock class="h-4 w-4 mr-2" />
          <span class="text-sm">{{ service.duration }}</span>
        </div>
        <div v-if="service.capacity" class="flex items-center text-gray-600">
          <Users class="h-4 w-4 mr-2" />
          <span class="text-sm">Hasta {{ service.capacity }} personas</span>
        </div>
      </div>

      <!-- Features -->
      <div class="mb-6">
        <h4 class="font-semibold text-gray-900 mb-2">Incluye:</h4>
        <div class="grid grid-cols-1 gap-1">
          <div
            v-for="(feature, index) in service.features.slice(0, 3)"
            :key="index"
            class="flex items-center text-sm text-gray-600"
          >
            <div class="w-2 h-2 bg-burgundy-600 rounded-full mr-2"></div>
            {{ feature }}
          </div>
          <div v-if="service.features.length > 3" class="text-sm text-gray-500 mt-1">
            +{{ service.features.length - 3 }} características más
          </div>
        </div>
      </div>

      <!-- Schedule -->
      <div v-if="service.schedule" class="mb-6">
        <h4 class="font-semibold text-gray-900 mb-2">Horarios:</h4>
        <p class="text-sm text-gray-600">{{ service.schedule }}</p>
      </div>

      <!-- Videos -->
      <div v-if="service.videos.length > 0" class="mb-6">
        <h4 class="font-semibold text-gray-900 mb-2">Videos:</h4>
        <div class="flex space-x-2">
          <div
            v-for="(video, index) in service.videos"
            :key="index"
            class="relative group cursor-pointer"
            @click="handleVideoClick(video)"
          >
            <div class="bg-gray-900 rounded-lg w-20 h-12 flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Play class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3">
        <button
          v-if="service.calComLink"
          @click="handleReservation"
          class="flex-1 bg-burgundy-600 text-white py-3 px-4 rounded-lg hover:bg-burgundy-700 transition-colors font-semibold flex items-center justify-center"
        >
          <Calendar class="h-4 w-4 mr-2" />
          Reservar Ahora
        </button>
        <button
          @click="showGallery = true"
          class="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Ver Más
        </button>
      </div>
    </div>

    <!-- Gallery Modal -->
    <div v-if="showGallery" class="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <!-- Botón Cerrar -->
        <button
          @click="showGallery = false"
          class="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <X class="h-6 w-6" />
        </button>

        <!-- Título y Contador -->
        <div class="absolute top-4 left-4 z-10">
          <h3 class="text-white text-xl font-bold">{{ service.name }}</h3>
          <p class="text-gray-300 text-sm">
            {{ selectedImage + 1 }} de {{ service.images.length }}
          </p>
        </div>

        <!-- Imagen Principal -->
        <div class="relative max-w-4xl max-h-full">
          <img
            :src="service.images[selectedImage]"
            :alt="`${service.name} ${selectedImage + 1}`"
            class="max-w-full max-h-full object-contain"
          />

          <!-- Controles de Navegación -->
          <button
            v-if="service.images.length > 1"
            @click="selectedImage = selectedImage === 0 ? service.images.length - 1 : selectedImage - 1"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
          >
            <ChevronLeft class="h-6 w-6" />
          </button>
          
          <button
            v-if="service.images.length > 1"
            @click="selectedImage = (selectedImage + 1) % service.images.length"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
          >
            <ChevronRight class="h-6 w-6" />
          </button>
        </div>

        <!-- Miniaturas -->
        <div v-if="service.images.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div class="flex space-x-2 bg-black/50 rounded-lg p-2 max-w-md overflow-x-auto">
            <button
              v-for="(image, index) in service.images"
              :key="index"
              @click="selectedImage = index"
              class="flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors"
              :class="index === selectedImage ? 'border-white' : 'border-transparent hover:border-gray-300'"
            >
              <img
                :src="image"
                :alt="`Miniatura ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Información del Servicio -->
        <div class="absolute bottom-20 left-4 right-4 z-10">
          <div class="bg-black/70 text-white rounded-lg p-4 max-w-md">
            <h4 class="font-semibold mb-2">{{ service.name }}</h4>
            <p class="text-sm text-gray-300 mb-2">{{ service.description }}</p>
            <div v-if="service.price" class="text-lg font-bold text-gold-400">
              ${{ service.price.toLocaleString() }}
            </div>
            <div v-if="service.duration" class="text-sm text-gray-300">
              Duración: {{ service.duration }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <div v-if="showVideoModal" class="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-xl font-bold text-gray-900">{{ service.name }} - Video</h3>
          <button
            @click="closeVideoModal"
            class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X class="h-6 w-6" />
          </button>
        </div>
        <div class="aspect-video">
          <iframe
            v-if="getYouTubeVideoId(selectedVideo)"
            width="100%"
            height="100%"
            :src="`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo)}?autoplay=1`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
          <div v-else class="w-full h-full bg-gray-900 flex items-center justify-center">
            <div class="text-center text-white">
              <Play class="h-16 w-16 mx-auto mb-4" />
              <p class="text-lg">Video no disponible</p>
              <p class="text-sm text-gray-300">URL: {{ selectedVideo }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

