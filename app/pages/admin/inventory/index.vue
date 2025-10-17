<script setup lang="ts">
import  ProductCard from './components/ProductCardInventory.vue'
import  ProductForm from './components/ProductForm.vue'
import  StockModal from './components/StockModal.vue'

definePageMeta({
    layout: 'admin'
})

const {
  // Data
  categories,
  products,
  stats,
  lowStockProducts,
  filteredProducts,
  
  // Filters
  searchQuery,
  selectedCategory,
  stockFilter,
  
  // Loading states
  categoriesPending,
  productsPending,
  
  // Actions
  loadCategories,
  loadProducts,
  
  // Utilities
  getStockStatus
} = useInventory()

// State
const showProductForm = ref(false)
const selectedProduct = ref<ProductWithInventory | null>(null)

// Computed
const lowStockCount = computed(() => lowStockProducts.value.length)

// Methods
const handleEditStock = (product: ProductWithInventory) => {
  selectedProduct.value = product
}

const handleDelete = async (productId: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    try {
      const { deleteProduct } = useInventory()
      await deleteProduct(productId)
      useNotification().success('Producto eliminado exitosamente')
    } catch (error: any) {
      useNotification().error(`Error al eliminar producto: ${error.message}`)
    }
  }
}

const handleProductSuccess = async () => {
  showProductForm.value = false
  await loadProducts()
  useNotification().success('Producto creado exitosamente')
}

const handleStockSuccess = async () => {
  selectedProduct.value = null
  await loadProducts()
  useNotification().success('Stock actualizado exitosamente')
}

// Lifecycle
onMounted(async () => {
  // Only load if there is no data
  if (categories.value.length === 0) {
    await loadCategories()
  }
  // Only load if there is no data
  if (products.value.length === 0) {
    await loadProducts()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <Icon name="mdi:barrel" class="w-8 h-8 text-wine-600 mr-3" />
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Viñedo San Miguel</h1>
              <p class="text-sm text-gray-500">Sistema de Inventario de Vinos</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Stock Alerts -->
            <div v-if="lowStockCount > 0" class="flex items-center text-yellow-600">
              <Icon name="mdi:alert" class="w-5 h-5 mr-1" />
              <span class="text-sm font-medium">{{ lowStockCount }} productos con stock bajo</span>
            </div>

            <button
              @click="showProductForm = true"
              class="bg-wine-600 text-white px-4 py-2 rounded-md hover:bg-wine-700 transition-colors font-medium"
            >
              Agregar Producto
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters and Stats -->
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <!-- Total Products -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <Icon name="mdi:package-variant" class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Productos</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
              </div>
            </div>
          </div>

          <!-- Total Stock -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <Icon name="mdi:check-circle" class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Stock Total</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalStock }}</p>
              </div>
            </div>
          </div>

          <!-- Low Stock -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <Icon name="mdi:alert" class="w-6 h-6 text-yellow-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Stock Bajo</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.lowStock }}</p>
              </div>
            </div>
          </div>

          <!-- Total Value -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-wine-100 rounded-lg">
                <Icon name="mdi:cash" class="w-6 h-6 text-wine-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Valor Inventario</p>
                <p class="text-2xl font-semibold text-gray-900">${{ stats.totalValue.toFixed(0) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div class="flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar productos..."
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              />
            </div>
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <select
              v-model="stockFilter"
              class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-wine-500 focus:border-transparent"
            >
              <option value="">Todos los stocks</option>
              <option value="available">Disponible</option>
              <option value="low">Stock Bajo</option>
              <option value="out">Sin Stock</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="productsPending" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wine-600"></div>
        <p class="mt-2 text-gray-500">Cargando productos...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
        <Icon name="mdi:package-variant-closed" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
        <p class="mt-1 text-sm text-gray-500">Comienza agregando tu primer producto de vino.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @edit-stock="handleEditStock"
          @delete="handleDelete"
        />
      </div>
    </main>

    <!-- Modals -->
    <ProductForm 
      v-if="showProductForm"
      @close="showProductForm = false" 
      @success="handleProductSuccess" 
    />

    <StockModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
      @success="handleStockSuccess"
    />
  </div>
</template>
