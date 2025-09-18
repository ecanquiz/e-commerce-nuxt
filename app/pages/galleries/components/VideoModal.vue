<script setup lang="ts">
import { X, Play } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  videoUrl: string;
  title: string;
}>();

defineEmits(['close']);

const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match?.[2]?.length === 11 ? match[2] : null;
};

const youtubeVideoId = computed(() => getYouTubeVideoId(props.videoUrl));
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
    <div class="relative w-full max-w-4xl mx-4">
      <!-- Botón Cerrar -->
      <button
        @click="$emit('close')"
        class="absolute right-0 z-10 p-2 text-white transition-colors bg-black/50 rounded-full -top-12 hover:bg-black/70"
      >
        <X class="w-6 h-6" />
      </button>

      <!-- Título -->
      <div class="absolute left-0 z-10 -top-12">
        <h3 class="text-lg font-bold text-white">{{ title }}</h3>
      </div>

      <!-- Video Container -->
      <div class="relative overflow-hidden bg-black rounded-lg" style="padding-bottom: 56.25%">
        <iframe
          v-if="youtubeVideoId"
          class="absolute top-0 left-0 w-full h-full"
          :src="`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`"
          :title="title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div v-else class="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <div class="text-center text-white">
            <Play class="w-16 h-16 mx-auto mb-4" />
            <p class="text-lg">Video no disponible</p>
            <p class="mt-2 text-sm text-gray-300">URL: {{ videoUrl }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

