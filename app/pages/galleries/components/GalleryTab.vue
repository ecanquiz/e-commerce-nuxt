<script setup lang="ts">
import { ChevronLeft, ChevronRight, Play } from 'lucide-vue-next';

const props = defineProps<{
  gallery: string[];
  openGallery: (images: string[], startIndex: number, title: string) => void;
  openVideo: (videoUrl: string, title: string) => void;
}>();

const currentIndex = ref(0);
const serviceImages = ref(new Map<string, number>());

/*const hasServiceImages = computed(() => 
  props.vineyard.services.some(service => service.images.length > 0)
);

const servicesWithImages = computed(() => 
  props.vineyard.services.filter(service => service.images.length > 0)
);*/

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.vineyard.gallery.length;
};

const prevImage = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.gallery.length - 1 
    : currentIndex.value - 1;
};

const rotateServiceImage = (service: Service, direction: number) => {
  const current = serviceImages.value.get(service.id) || 0;
  const newIndex = (current + direction + service.images.length) % service.images.length;
  serviceImages.value.set(service.id, newIndex);
  // Aquí necesitarías actualizar la imagen principal
};

const setServiceImage = (service: Service, index: number) => {
  serviceImages.value.set(service.id, index);
  // Aquí necesitarías actualizar la imagen principal
};
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-gray-900">Galería</h2>
    
    <!-- Galería Principal del Viñedo -->
    <div class="mb-12">
      <h3 class="mb-4 text-xl font-bold text-gray-900">Instalaciones</h3>
      <div class="relative">
        <div class="relative overflow-hidden bg-gray-100 rounded-lg h-80">
          <img
            :src="gallery[currentIndex] || gallery[0]"
            :alt="`Instalaciones ${currentIndex + 1}`"
            class="object-cover w-full h-full cursor-pointer"
            @click="openGallery(gallery, currentIndex, 'Instalaciones del Viñedo')"
          />
          
          <!-- Navigation Arrows -->
          <button
            v-if="gallery.length > 1"
            @click="prevImage"
            class="absolute p-2 text-white transition-colors transform -translate-y-1/2 bg-black/50 rounded-full left-4 top-1/2 hover:bg-black/70"
          >
            <ChevronLeft class="w-6 h-6" />
          </button>
          <button
            v-if="gallery.length > 1"
            @click="nextImage"
            class="absolute p-2 text-white transition-colors transform -translate-y-1/2 bg-black/50 rounded-full right-4 top-1/2 hover:bg-black/70"
          >
            <ChevronRight class="w-6 h-6" />
          </button>

          <!-- Image Counter -->
          <div class="absolute px-3 py-1 text-sm text-white bg-black/50 rounded bottom-4 right-4">
            {{ currentIndex + 1 }} / {{ gallery.length }}
          </div>

          <!-- Maximize Button -->
          <button
            @click="openGallery(gallery, currentIndex, 'Instalaciones del Viñedo')"
            class="absolute px-3 py-1 text-sm text-white transition-colors bg-black/50 rounded bottom-4 left-4 hover:bg-black/70"
          >
            Ver en pantalla completa
          </button>
        </div>

        <!-- Thumbnail Navigation -->
        <div v-if="gallery.length > 1" class="flex mt-4 space-x-2 overflow-x-auto pb-2">
          <button
            v-for="(image, index) in gallery"
            :key="index"
            @click="currentIndex = index"
            class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors"
            :class="index === currentIndex ? 'border-burgundy-600' : 'border-gray-200 hover:border-gray-300'"
          >
            <img
              :src="image"
              :alt="`Thumbnail ${index + 1}`"
              class="object-cover w-full h-full"
            />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Galerías de Servicios -->
    <!--div v-if="hasServiceImages" class="mb-12">
      <h3 class="mb-6 text-xl font-bold text-gray-900">Galerías de Servicios</h3>
      <div class="space-y-8">
        <div 
          v-for="service in servicesWithImages" 
          :key="service.id" 
          class="bg-white rounded-lg shadow-sm p-6"
        >
          <h4 class="mb-4 text-lg font-semibold text-gray-800">{{ service.name }}</h4>
          
          <div class="relative">
            <div class="relative overflow-hidden bg-gray-100 rounded-lg h-64">
              <img
                :src="service.images[0]"
                :alt="`${service.name} 1`"
                class="object-cover w-full h-full cursor-pointer"
                @click="openGallery(service.images, 0, service.name)"
              />
              
              <button
                v-if="service.images.length > 1"
                @click="rotateServiceImage(service, -1)"
                class="absolute p-2 text-white transition-colors transform -translate-y-1/2 bg-black/50 rounded-full left-4 top-1/2 hover:bg-black/70"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                v-if="service.images.length > 1"
                @click="rotateServiceImage(service, 1)"
                class="absolute p-2 text-white transition-colors transform -translate-y-1/2 bg-black/50 rounded-full right-4 top-1/2 hover:bg-black/70"
              >
                <ChevronRight class="w-5 h-5" />
              </button>

              <div class="absolute px-2 py-1 text-sm text-white bg-black/50 rounded bottom-4 right-4">
                1 / {{ service.images.length }}
              </div>

              <button
                @click="openGallery(service.images, 0, service.name)"
                class="absolute px-3 py-1 text-sm text-white transition-colors bg-black/50 rounded bottom-4 left-4 hover:bg-black/70"
              >
                Maximizar
              </button>
            </div>

            <div v-if="service.images.length > 1" class="flex mt-4 space-x-2 overflow-x-auto pb-2">
              <button
                v-for="(image, index) in service.images"
                :key="index"
                @click="setServiceImage(service, index)"
                class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-burgundy-600 transition-colors"
              >
                <img
                  :src="image"
                  :alt="`${service.name} ${index + 1}`"
                  class="object-cover w-full h-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div-->
    
    <!-- Videos -->
    <!--div v-if="vineyard.videos.length > 0">
      <h3 class="mb-6 text-xl font-bold text-gray-900">Videos</h3>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div 
            v-for="(video, index) in vineyard.videos" 
            :key="index" 
            class="relative cursor-pointer group"
            @click="openVideo(video, `Video ${index + 1} - ${vineyard.name}`)"
          >
            <div class="flex items-center justify-center h-48 transition-colors bg-gray-900 rounded-lg hover:bg-gray-800">
              <Play class="w-12 h-12 text-white" />
            </div>
            <p class="mt-2 text-sm text-gray-600">Video {{ index + 1 }}</p>
          </div>
        </div>
      </div>
    </div-->
  </div>
</template>

