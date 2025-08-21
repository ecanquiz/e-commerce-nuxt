<script setup lang="ts">
import { Star } from 'lucide-vue-next';

interface Props {
  modelValue: number;
  size?: 'small' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'large'
});

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>();

const hoverRating = ref(0);
</script>

<template>
  <div class="flex space-x-1">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      @click="$emit('update:modelValue', star)"
      @mouseenter="hoverRating = star"
      @mouseleave="hoverRating = 0"
      class="transition-colors"
    >
      <Star
        :class="[
          size === 'large' ? 'h-8 w-8' : 'h-5 w-5',
          star <= (hoverRating || modelValue) 
            ? 'text-gold-400 fill-current' 
            : 'text-gray-300'
        ]"
      />
    </button>
  </div>
</template>

