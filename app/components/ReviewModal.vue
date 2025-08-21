<script setup lang="ts">
import { X, Camera, Upload, Star } from 'lucide-vue-next';

interface Props {
  isOpen: boolean;
  vineyardName: string;
}

interface Emits {
  (e: 'close'): void;
  (e: 'submit', reviewData: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const rating = ref(0);
const ratings = reactive({
  overall: 0,
  wineQuality: 0,
  service: 0,
  value: 0,
  atmosphere: 0
});

const reviewData = reactive({
  title: '',
  content: '',
  type: '',
  wouldRecommend: true,
  visitDate: '',
  images: [] as File[]
});

const ratingText = computed(() => {
  switch (rating.value) {
    case 5: return 'Excelente';
    case 4: return 'Muy bueno';
    case 3: return 'Bueno';
    case 2: return 'Regular';
    case 1: return 'Malo';
    default: return '';
  }
});

const handleSubmit = () => {
  emit('submit', {
    ...reviewData,
    rating: rating.value,
    ratings,
    vineyardName: props.vineyardName
  });
  resetForm();
};

const resetForm = () => {
  rating.value = 0;
  Object.assign(ratings, {
    overall: 0,
    wineQuality: 0,
    service: 0,
    value: 0,
    atmosphere: 0
  });
  Object.assign(reviewData, {
    title: '',
    content: '',
    type: '',
    wouldRecommend: true,
    visitDate: '',
    images: []
  });
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-900">
          Escribir Reseña - {{ vineyardName }}
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 transition-colors hover:text-gray-700"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Calificación General -->
        <div>
          <label class="block mb-3 text-lg font-semibold text-gray-900">
            Calificación General
          </label>
          <div class="flex items-center space-x-4">
            <StarRating :value="rating" @change="setRating" />
            <span class="text-lg font-medium text-gray-700">
              {{ rating > 0 ? ratingText : '' }}
            </span>
          </div>
        </div>

        <!-- ... resto del formulario ... -->

        <!-- Botones -->
        <div class="flex pt-6 space-x-4 border-t">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="rating === 0 || reviewData.content.length < 50"
            class="flex-1 px-4 py-2 text-white transition-colors rounded-md bg-burgundy-600 hover:bg-burgundy-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publicar Reseña
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


