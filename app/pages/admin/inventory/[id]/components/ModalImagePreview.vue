<script setup lang="ts">
import IconClose from './icons/Close.vue'

interface Props {
  image: {
    url: string
    size: number
    createdAt: string
  }
}

defineProps<Props>()
defineEmits<{
  close: []
}>()

const formatFileSize = (bytes: number) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div class="relative max-w-4xl max-h-[90vh] mx-4">
      <!-- Imagen -->
      <img
        :src="image.url"
        :alt="'Imagen del producto'"
        class="max-w-full max-h-[80vh] object-contain rounded-lg"
      />
      
      <!-- Botón cerrar -->
      <button
        @click="$emit('close')"
        class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
      >
        <IconClose class="w-8 h-8" />
      </button>
      
      <!-- Información de la imagen -->
      <div class="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
        <div class="flex justify-between items-center text-sm">
          <span>Tamaño: {{ formatFileSize(image.size) }}</span>
          <span>Subida: {{ formatDate(image.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

