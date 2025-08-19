<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { PropType } from 'vue';

interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const props = defineProps({
  slides: {
    type: Array as PropType<CarouselSlide[]>,
    required: true,
    default: () => []
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  autoPlayInterval: {
    type: Number,
    default: 5000
  }
});

const currentSlide = ref(0);

// Auto-play functionality
let autoPlayInterval: NodeJS.Timeout | null = null;

const startAutoPlay = () => {
  if (!props.autoPlay || props.slides.length <= 1) return;
  
  stopAutoPlay();
  
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, props.autoPlayInterval);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Handle auto-play on mount and when props change
onMounted(() => {
  if (props.autoPlay) {
    startAutoPlay();
  }
});

onBeforeUnmount(() => {
  stopAutoPlay();
});

// Watch for changes in autoPlay prop
watch(() => props.autoPlay, (newAutoPlay) => {
  if (newAutoPlay) {
    startAutoPlay();
  } else {
    stopAutoPlay();
  }
});

// Watch for changes in slides to reset current slide if needed
watch(() => props.slides, (newSlides) => {
  if (currentSlide.value >= newSlides.length) {
    currentSlide.value = 0;
  }
});
</script>

<template>
  <div class="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
    <!-- Slides -->
    <div class="relative w-full h-full">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 transition-opacity duration-500"
        :class="{ 'opacity-100': index === currentSlide, 'opacity-0': index !== currentSlide }"
      >
        <!-- Capa 1: Imagen de fondo -->
        <div
          class="absolute inset-0 w-full h-full bg-cover bg-center"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
        
        <!-- Capa 2: Overlay oscuro (sobre la imagen, bajo el contenido) -->
        <!--div class="absolute inset-0 bg-black bg-opacity-40"></div-->
                <div class="absolute inset-0 bg-black/40"></div>
        
        <!-- Capa 3: Contenido (sobre el overlay) -->
        <div class="relative h-full flex items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl">
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              {{ slide.title }}
            </h1>
            <p class="text-lg md:text-xl lg:text-2xl text-gray-200 mb-2">
              {{ slide.subtitle }}
            </p>
            <p class="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {{ slide.description }}
            </p>
            <NuxtLink
              :to="slide.buttonLink"
              class="inline-block bg-gold-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gold-600 transition-colors"
            >
              {{ slide.buttonText }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button
      v-if="slides.length > 1"
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors z-10"
    >
      <ChevronLeft class="h-6 w-6" />
    </button>
    
    <button
      v-if="slides.length > 1"
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors z-10"
    >
      <ChevronRight class="h-6 w-6" />
    </button>

    <!-- Dots Indicator -->
    <div 
      v-if="slides.length > 1"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
    >
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-colors"
        :class="index === currentSlide ? 'bg-white' : 'bg-white/50'"
      />
    </div>
  </div>
</template>
