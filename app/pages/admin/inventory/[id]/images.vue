<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useNotification } from '@/composables/useNotification';
import { useImageUpload } from './composables/useImageUpload';
import ModalImagePreview from './components/ModalImagePreview.vue';
import IconArrowLeft from './components/icons/ArrowLeft.vue'
import IconEdit from './components/icons/Edit.vue'
import IconEye from './components/icons/Eye.vue'
import IconImage from './components/icons/Image.vue'
import IconCheck from './components/icons/Check.vue'
import IconTrash from './components/icons/Trash.vue'
import IconFileSize from './components/icons/FileSize.vue'

definePageMeta({
    layout: 'admin'
})

// Types
interface ProductImage {
  id: string
  url: string
  key: string
  type: string
  size: number
  createdAt: string
  productId: string
  merchantId: string
}

// Config
const maxImages = 20

// Route
const route = useRoute()
const productId = route.params.id as string

// Auth (debes adaptar según tu sistema de autenticación)
const { user } = useAuthStore()
// const merchantId = user?.value?.merchantId || 'current-merchant-id'
const merchantId = user?.vineyardId || 'current-merchant-id'

// State
const product = ref<any>(null)
const images = ref<ProductImage[]>([])
const loading = ref(true)
const deletingImageId = ref<string | null>(null)
const selectedImage = ref<ProductImage | null>(null)

// Composable
const { getProductImages, deleteImage: deleteImageApi } = useImageUpload()

// Load product data and images
onMounted(async () => {
  await loadProductData()
  await loadImages()
})

const loadProductData = async () => {
  try {
    // Aquí cargas los datos del producto desde tu API
    // product.value = await $fetch(`/api/products/${productId}`)
    product.value = {
      id: productId,
      name: 'Producto de ejemplo', // Esto vendrá de tu API
      description: 'Descripción del producto'
    }
  } catch (error) {
    useNotification().error('Error al cargar el producto')
    console.error('Error loading product:', error)
  }
}

const loadImages = async () => {
  try {
    loading.value = true
    images.value = await getProductImages(productId, merchantId)
  } catch (error: any) {
    useNotification().error(error.message || 'Error al cargar las imágenes')
  } finally {
    loading.value = false
  }
}

// Event handlers
const handleImageSuccess = (newImage: ProductImage) => {
  images.value.unshift(newImage)
  useNotification().success('Imagen subida exitosamente')
}

const handleImageError = (error: string) => {
  useNotification().error(error)
}

const handleLoading = (isLoading: boolean) => {
  // Puedes usar esto para mostrar un loading global si lo necesitas
}

const viewImage = (image: ProductImage) => {
  selectedImage.value = image
}

const deleteImage = async (imageId: string) => {
  if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
    return
  }

  try {
    deletingImageId.value = imageId
    await deleteImageApi(imageId)
    images.value = images.value.filter(img => img.id !== imageId)
    useNotification().success('Imagen eliminada exitosamente')
  } catch (error: any) {
    useNotification().error(error.message || 'Error al eliminar la imagen')
  } finally {
    deletingImageId.value = null
  }
}

// Meta tags
useSeoMeta({
  title: `Imágenes del Producto - ${product.value?.name || 'Cargando...'}`,
  description: `Gestiona las imágenes del producto ${product.value?.name || ''}`
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <NuxtLink 
              to="/admin/inventory" 
              class="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <IconArrowLeft class="w-4 h-4" />
              Volver al inventario
            </NuxtLink>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Imágenes</h1>
          <p class="text-gray-600 mt-2">{{ product?.name || 'Cargando...' }}</p>
        </div>
        
        <div class="flex gap-3">
          <NuxtLink 
            :to="`/admin/inventory/${productId}/edit`"
            class="btn-secondary flex items-center gap-2"
          >
            <IconEdit class="w-4 h-4" />
            Editar Producto
          </NuxtLink>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Imágenes subidas</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ images.length }}/{{ maxImages }}
              </p>
            </div>
            <div class="p-3 bg-blue-50 rounded-full">
              <IconImage class="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div class="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(images.length / maxImages) * 100}%` }"
            ></div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-green-50 rounded-full">
              <IconCheck class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Límite por producto</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ maxImages }} imágenes</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-orange-50 rounded-full">
              <IconFileSize class="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Tamaño máximo</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">5 MB</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Panel de subida -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm sticky top-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Agregar nueva imagen</h2>
            
            <ImageUpload
              :product-id="productId"
              :merchant-id="merchantId"
              :max-images="maxImages"
              :current-count="images.length"
              @success="handleImageSuccess"
              @error="handleImageError"
              @loading="handleLoading"
              class="mb-4"
            />

            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 class="font-medium text-blue-900 mb-2">Recomendaciones</h3>
              <ul class="text-sm text-blue-800 space-y-1">
                <li>• Formatos: JPG, PNG, WEBP</li>
                <li>• Tamaño máximo: 5MB por imagen</li>
                <li>• Resolución recomendada: 800x600px</li>
                <li>• Fondos blancos o neutros</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Galería de imágenes -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">Imágenes del producto</h2>
              <p class="text-sm text-gray-600 mt-1">
                Arrastra para reordenar o haz clic en eliminar para remover
              </p>
            </div>

            <div class="p-6">
              <!-- Estado vacío -->
              <div 
                v-if="images.length === 0 && !loading" 
                class="text-center py-12"
              >
                <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <IconImage class="w-10 h-10 text-gray-400" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No hay imágenes</h3>
                <p class="text-gray-500 mb-4">Comienza subiendo la primera imagen del producto</p>
              </div>

              <!-- Loading -->
              <div v-else-if="loading" class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p class="text-gray-600 mt-4">Cargando imágenes...</p>
              </div>

              <!-- Grid de imágenes -->
              <div 
                v-else
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                <div
                  v-for="(image, index) in images"
                  :key="image.id"
                  class="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50 aspect-square"
                >
                  <img
                    :src="image.url"
                    :alt="`Imagen ${index + 1} de ${product?.name}`"
                    class="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  <!-- Overlay de acciones -->
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div class="flex gap-2">
                      <button
                        @click="viewImage(image)"
                        class="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Ver imagen"
                      >
                        <IconEye class="w-4 h-4" />
                      </button>
                      <button
                        @click="deleteImage(image.id)"
                        :disabled="deletingImageId === image.id"
                        class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors disabled:bg-red-300"
                        title="Eliminar imagen"
                      >
                        <IconTrash class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <!-- Indicador de imagen principal -->
                  <div 
                    v-if="index === 0"
                    class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium"
                  >
                    Principal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver imagen -->
    <ModalImagePreview
      v-if="selectedImage"
      :image="selectedImage"
      @close="selectedImage = null"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}

.sticky {
  position: sticky;
}
</style>