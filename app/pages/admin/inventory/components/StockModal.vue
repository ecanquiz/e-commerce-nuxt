<script setup lang="ts">
import { useInventory } from '../composables/useInventory';
import type { ProductWithInventory } from '~~/shared/types/inventory'

interface Props {
  product: ProductWithInventory
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  success: []
}>()

const { updateInventory } = useInventory()

const loading = ref(false)
const inventory = ref(props.product.inventory)
const stockChange = ref(0)
const operation = ref<'add' | 'subtract' | 'set'>('add')
const minimumStock = ref(inventory.value?.minimum_stock || 10)
const maximumStock = ref(inventory.value?.maximum_stock || 1000)
const reason = ref('')
const loadingInventory = ref(false)

// Cargar inventory cuando se abre el modal
watch(() => props.product, async (product) => {
  if (product) {
    loadingInventory.value = true
    try {
      const { getProductInventory } = useInventory()
      inventory.value = await getProductInventory(product.id)
    } catch (error) {
      console.error('Error loading inventory:', error)
      useNotification().error('Error al cargar información de inventario')
    } finally {
      loadingInventory.value = false
    }
  }
}, { immediate: true })

const handleUpdateStock = async () => {
  if (!inventory.value) {
    useNotification().error('No se encontró información de inventario para este producto')
    return
  }

  loading.value = true
  try {
    let newStock = inventory.value.current_stock

    switch (operation.value) {
      case 'add':
        newStock += stockChange.value
        break
      case 'subtract':
        newStock = Math.max(0, newStock - stockChange.value)
        break
      case 'set':
        newStock = stockChange.value
        break
    }

    await updateInventory(props.product.id, {
      current_stock: newStock,
      minimum_stock: minimumStock.value,
      maximum_stock: maximumStock.value,
      updated_by: `user - ${reason.value || 'Sin motivo especificado'}`
    })

    emit('success')
  } catch (error: any) {
    useNotification().error(`Error al actualizar el stock: ${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      <!-- Loading state -->
      <div v-if="loadingInventory" class="p-6 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-500">Cargando información de inventario...</p>
      </div>
      <div v-else class="flex items-center justify-between p-6 border-b">
        <h3 class="text-lg font-semibold text-gray-900">
          Gestionar Stock - {{ product.name }}
        </h3>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6">
        <div class="mb-6">
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">
                {{ inventory?.current_stock || 0 }}
              </div>
              <div class="text-sm text-blue-600">Stock Actual</div>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600">
                {{ inventory?.minimum_stock || 0 }}
              </div>
              <div class="text-sm text-yellow-600">Stock Mínimo</div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleUpdateStock" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Ajustar Stock
            </label>
            <div class="flex items-center space-x-2">
              <select
                v-model="operation"
                class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="add">Agregar</option>
                <option value="subtract">Restar</option>
                <option value="set">Establecer</option>
              </select>
              <input
                v-model.number="stockChange"
                type="number"
                min="0"
                required
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cantidad"
              />
            </div>
            <div class="text-sm text-gray-500 mt-1">
              <span v-if="operation === 'add'">Se agregarán {{ stockChange }} unidades</span>
              <span v-else-if="operation === 'subtract'">Se restarán {{ stockChange }} unidades</span>
              <span v-else>El stock se establecerá en {{ stockChange }} unidades</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Stock Mínimo
            </label>
            <input
              v-model.number="minimumStock"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Stock mínimo de alerta"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Stock Máximo
            </label>
            <input
              v-model.number="maximumStock"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Capacidad máxima"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Motivo (opcional)
            </label>
            <input
              v-model="reason"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Recepción de mercadería, venta, etc."
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              @click="emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {{ loading ? 'Actualizando...' : 'Actualizar Stock' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
