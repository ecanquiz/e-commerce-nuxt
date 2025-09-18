<script setup lang="ts">
import { X, ChevronLeft, ChevronRight, Download, Share } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  title: string;
}>();

const emit = defineEmits(['close', 'update:currentIndex']);

const nextImage = () => {
  const newIndex = (props.currentIndex + 1) % props.images.length;
  emit('update:currentIndex', newIndex);
};

const prevImage = () => {
  const newIndex = props.currentIndex === 0 
    ? props.images.length - 1 
    : props.currentIndex - 1;
  emit('update:currentIndex', newIndex);
};

const goToImage = (index: number) => {
  emit('update:currentIndex', index);
};

const downloadImage = () => {
  const imageUrl = props.images[props.currentIndex];
  if (!imageUrl) {
    console.error('No image URL found for download');
    return;
  }

  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `${props.title}-${props.currentIndex + 1}.jpg`;
  link.click();
};

const shareImage = async () => {
  const imageUrl = props.images[props.currentIndex];
  if (!imageUrl) {
    alert('No se puede compartir: URL de imagen no disponible');
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: props.title,
        url: imageUrl
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  } else {
    try {
      await navigator.clipboard.writeText(imageUrl);
      alert('Enlace copiado al portapapeles');
    } catch (error) {
      console.log('Error copying to clipboard:', error);
      alert('No se pudo copiar el enlace');
    }
  }
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
    <div class="relative flex items-center justify-center w-full h-full p-4">
      <!-- Botón Cerrar -->
      <button
        @click="$emit('close')"
        class="absolute z-10 p-2 text-white transition-colors bg-black/50 rounded-full top-4 right-4 hover:bg-black/70"
      >
        <X class="w-6 h-6" />
      </button>

      <!-- Título -->
      <div class="absolute z-10 top-4 left-4">
        <h3 class="text-xl font-bold text-white">{{ title }}</h3>
        <p class="text-sm text-gray-300">
          {{ currentIndex + 1 }} de {{ images.length }}
        </p>
      </div>

      <!-- Imagen Principal -->
      <div class="relative max-w-4xl max-h-full">
        <img
          :src="images[currentIndex]"
          :alt="`${title} ${currentIndex + 1}`"
          class="object-contain max-w-full max-h-full"
        />

        <!-- Controles de Navegación -->
        <button
          v-if="images.length > 1"
          @click="prevImage"
          class="absolute p-3 text-white transition-colors transform -translate-y-1/2 bg-black/50 rounded-full left-4 top-1/2 hover:bg-black/70"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        
        <button
          v-if="images.length > 1"
          @click="nextImage"
          class="absolute p-3 text-white transition-colors transform -translate-y-1/2 bg-black/50 rounded-full right-4 top-1/2 hover:bg-black/70"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>

      <!-- Miniaturas -->
      <div v-if="images.length > 1" class="absolute transform -translate-x-1/2 bottom-4 left-1/2">
        <div class="flex max-w-md p-2 space-x-2 overflow-x-auto bg-black/50 rounded-lg">
          <button
            v-for="(image, index) in images"
            :key="index"
            @click="goToImage(index)"
            class="flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors"
            :class="index === currentIndex ? 'border-white' : 'border-transparent hover:border-gray-300'"
          >
            <img
              :src="image"
              :alt="`Miniatura ${index + 1}`"
              class="object-cover w-full h-full"
            />
          </button>
        </div>
      </div>

      <!-- Controles adicionales -->
      <div class="absolute z-10 flex space-x-2 top-4 right-28">
        <button
          @click="downloadImage"
          class="p-2 text-white transition-colors bg-black/50 rounded-full hover:bg-black/70"
          title="Descargar imagen"
        >
          <Download class="w-6 h-6" />
        </button>

        <button
          @click="shareImage"
          class="p-2 text-white transition-colors bg-black/50 rounded-full hover:bg-black/70"
          title="Compartir imagen"
        >
          <Share class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>
