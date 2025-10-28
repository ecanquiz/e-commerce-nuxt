<script setup lang="ts">
import IconUploadFile from './icons/UploadFile.vue'

interface Props {
  productId: string
  merchantId: string
  maxSizeMB?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxSizeMB: 5
})

const emit = defineEmits<{
  success: [data: any]
  error: [error: string]
  loading: [loading: boolean]
}>()

// Estado reactivo
const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const previewUrl = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const error = ref<string | null>(null)

// Configuración
const maxSizeBytes = computed(() => props.maxSizeMB * 1024 * 1024)
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

// Métodos
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    processFile(files[0]!)
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const processFile = (file: File) => {
  error.value = null
  
  // Validar tipo de archivo
  if (!allowedMimeTypes.includes(file.type)) {
    error.value = `Tipo de archivo no permitido. Formatos aceptados: ${allowedMimeTypes.join(', ')}`
    return
  }

  // Validar tamaño
  if (file.size > maxSizeBytes.value) {
    error.value = `El archivo es demasiado grande. Tamaño máximo: ${props.maxSizeMB}MB`
    return
  }

  selectedFile.value = file
  
  // Crear URL para previsualización
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removeFile = () => {
  previewUrl.value = null
  selectedFile.value = null
  error.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const uploadImage = async () => {
  if (!selectedFile.value || !props.productId || !props.merchantId) {
    error.value = 'Falta información requerida'
    return
  }

  uploading.value = true
  error.value = null
  emit('loading', true)

  try {
    // Aquí irá la lógica de cifrado y envío a tu API
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    // Usaremos tu servicio de API (con cifrado)
    const response = await $fetch(`/api/uploads/merchant/${props.merchantId}/product/${props.productId}`, {
      method: 'POST',
      body: formData,
      headers: {
        // Los headers de autorización se manejarán automáticamente
        'Content-Type': 'multipart/form-data'
      }
    })

    emit('success', response)
    removeFile() // Limpiar después de subir exitosamente
    
  } catch (err: any) {
    error.value = err.data?.message || 'Error al subir la imagen'
    emit('error', error.value as string)
  } finally {
    uploading.value = false
    emit('loading', false)
  }
}
</script>

<template>
  <div class="image-upload-container">
    <!-- Zona de arrastrar y soltar -->
    <div
      v-if="!previewUrl"
      class="drop-zone"
      :class="{ 'drag-over': isDragOver }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        @change="handleFileSelect"
        class="hidden"
      />
      <div class="drop-zone-content">
        <IconUploadFile class="upload-icon" />
        <p class="instruction-text">
          <span class="font-semibold">Haz clic para cargar</span> o arrastra y suelta
        </p>
        <p class="file-types">JPG, PNG o WEBP (Máx. {{ maxSizeMB }}MB)</p>
      </div>
    </div>

    <!-- Previsualización -->
    <div v-else class="preview-container">
      <div class="preview-content">
        <img :src="previewUrl" alt="Vista previa" class="preview-image" />
        <div class="preview-info">
          <p class="file-name">{{ selectedFile?.name }}</p>
          <p class="file-size">{{ formatFileSize(selectedFile?.size) }}</p>
        </div>
        <button
          type="button"
          @click="removeFile"
          class="remove-button"
          aria-label="Remover archivo"
        >
          <IconRemove />
        </button>
      </div>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Botones de acción -->
    <div v-if="previewUrl" class="action-buttons">
      <button
        type="button"
        @click="uploadImage"
        :disabled="uploading"
        class="btn-primary"
      >
        <span v-if="uploading">Subiendo...</span>
        <span v-else>Subir Imagen</span>
      </button>
      <button
        type="button"
        @click="removeFile"
        class="btn-secondary"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.image-upload-container {
  @apply w-full max-w-md mx-auto;
}

.drop-zone {
  @apply border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 bg-gray-50 hover:bg-gray-100;
}

.drop-zone.drag-over {
  @apply border-blue-400 bg-blue-50;
}

.drop-zone-content {
  @apply flex flex-col items-center justify-center;
}

.upload-icon {
  @apply w-12 h-12 text-gray-400 mb-4;
}

.instruction-text {
  @apply mb-2 text-sm text-gray-600;
}

.file-types {
  @apply text-xs text-gray-500;
}

.hidden {
  @apply absolute opacity-0 w-0 h-0;
}

.preview-container {
  @apply border border-gray-200 rounded-lg p-4 bg-white;
}

.preview-content {
  @apply flex items-center space-x-4;
}

.preview-image {
  @apply w-20 h-20 object-cover rounded;
}

.preview-info {
  @apply flex-1;
}

.file-name {
  @apply font-medium text-gray-900 truncate;
}

.file-size {
  @apply text-sm text-gray-500;
}

.remove-button {
  @apply p-2 text-gray-400 hover:text-red-500 transition-colors duration-200;
}

.error-message {
  @apply mt-2 text-sm text-red-600;
}

.action-buttons {
  @apply flex space-x-3 mt-4;
}

.btn-primary {
  @apply flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200;
}

.btn-secondary {
  @apply flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200;
}
</style>
