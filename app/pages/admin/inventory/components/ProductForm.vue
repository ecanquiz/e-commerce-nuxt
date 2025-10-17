<script setup lang="ts">
// @ts-nocheck
const emit = defineEmits<{
  close: []
  success: []
}>()

const { categories, categoriesPending, createProduct } = useInventory()

const loading = ref(false)
const currentYear = new Date().getFullYear()

const form = reactive({
  name: '',
  description: '',
  category_id: '',
  vintage_year: currentYear,
  alcohol_content: 0,
  grape_variety: '',
  region: '',
  price: 0,
  image_url: '',
  is_active: true
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await createProduct({
      name: form.name,
      description: form.description,
      category_id: form.category_id,
      vintage_year: form.vintage_year,
      alcohol_content: form.alcohol_content,
      grape_variety: form.grape_variety,
      region: form.region,
      price: form.price,
      image_url: form.image_url,
      is_active: form.is_active
    })
    
    emit('success')
  } catch (error: any) {
    useNotification().error(`Error al crear el producto: ${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="max-w-2xl w-full mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
        <h2 class="text-2xl font-bold text-gray-900">Agregar Nuevo Producto</h2>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Vino *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="Ej: Reserva Cabernet Sauvignon"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              v-model="form.category_id"
              required
              :disabled="categoriesPending"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
            >
              <option value="">Seleccionar categoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Año de Cosecha *
            </label>
            <input
              v-model.number="form.vintage_year"
              type="number"
              required
              :min="1900"
              :max="currentYear + 5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="2023"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Graduación Alcohólica (%)
            </label>
            <input
              v-model.number="form.alcohol_content"
              type="number"
              step="0.1"
              min="0"
              max="100"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="13.5"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Variedad de Uva
            </label>
            <input
              v-model="form.grape_variety"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="Cabernet Sauvignon"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Región
            </label>
            <input
              v-model="form.region"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="Valle de Uco, Mendoza"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Precio ($) *
            </label>
            <input
              v-model.number="form.price"
              type="number"
              step="0.01"
              min="0"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="25.99"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              URL de Imagen
            </label>
            <input
              v-model="form.image_url"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="https://images.pexels.com/..."
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
            placeholder="Describe las características, notas de cata y maridajes recomendados..."
          ></textarea>
        </div>

        <div class="flex items-center">
          <input
            v-model="form.is_active"
            id="is_active"
            type="checkbox"
            class="h-4 w-4 text-wine-600 focus:ring-wine-500 border-gray-300 rounded"
          />
          <label for="is_active" class="ml-2 block text-sm text-gray-700">
            Producto activo
          </label>
        </div>

        <div class="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            @click="emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2 bg-wine-600 text-white rounded-md hover:bg-wine-700 disabled:opacity-50 transition-colors"
          >
            {{ loading ? 'Guardando...' : 'Guardar Producto' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
