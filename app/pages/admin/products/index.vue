<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from './components/ProductCardMerchant.vue'
import ProductForm from './components/ProductForm.vue'
import StockModal from './components/StockModal.vue'
import { dataService } from './services/dataService'
import { createSampleProducts } from './utils/sampleData'
import type { Category, ProductWithInventory } from './lib/supabase'

definePageMeta({ layout: 'merchant'});
useHead({ title: 'Viñedo | Productos' });

const products = ref<ProductWithInventory[]>([])

const categories = ref<Category[]>([])
const loading = ref(false)
const showProductForm = ref(false)
const selectedProduct = ref<ProductWithInventory | null>(null)

// Filters
const searchQuery = ref('')
const selectedCategory = ref('')
const stockFilter = ref('')

// Computed properties
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.grape_variety.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value ||
      product.category_id === selectedCategory.value

    const matchesStock = !stockFilter.value ||
      (stockFilter.value === 'available' && (product.inventory?.current_stock || 0) > (product.inventory?.minimum_stock || 10)) ||
      (stockFilter.value === 'low' && (product.inventory?.current_stock || 0) <= (product.inventory?.minimum_stock || 10) && (product.inventory?.current_stock || 0) > 0) ||
      (stockFilter.value === 'out' && (product.inventory?.current_stock || 0) === 0)

    return matchesSearch && matchesCategory && matchesStock
  })
})

const stats = computed(() => {
  return {
    totalProducts: products.value.length,
    totalStock: products.value.reduce((acc, product) => acc + (product.inventory?.current_stock || 0), 0),
    lowStock: products.value.filter(product =>
      (product.inventory?.current_stock || 0) <= (product.inventory?.minimum_stock || 10) &&
      (product.inventory?.current_stock || 0) > 0
    ).length,
    totalValue: products.value.reduce((acc, product) =>
      acc + (product.price * (product.inventory?.current_stock || 0)), 0
    )
  }
})

const lowStockCount = computed(() => stats.value.lowStock)

// Methods
const loadData = async () => {
  loading.value = true
  try {
    const [productsData, categoriesData] = await Promise.all([
      dataService.getProducts(),
      dataService.getCategories()
    ])
    products.value = productsData
    categories.value = categoriesData
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const handleEditStock = (product: ProductWithInventory) => {
  selectedProduct.value = product
}

const handleDelete = async (productId: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    try {
      await dataService.deleteProduct(productId)
      await loadData()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar el producto')
    }
  }
}

const handleProductSuccess = async () => {
  await loadData()
}

const handleStockSuccess = async () => {
  await loadData()
}

const handleCreateSampleData = async () => {
  if (confirm('¿Crear productos de ejemplo? Esto añadirá 4 productos con inventario.')) {
    loading.value = true
    try {
      await createSampleProducts()
      await loadData()
      alert('Productos de ejemplo creados exitosamente!')
    } catch (error) {
      console.error('Error creating sample data:', error)
      alert('Error al crear productos de ejemplo')
    } finally {
      loading.value = false
    }
  }
}

onMounted(() => {
  //loadData()

products.value.push({
      name: 'Reserva Cabernet Sauvignon 2021',
      description: 'Vino tinto de cuerpo completo con notas de cassis, cedro y vainilla. Envejecido 12 meses en barricas de roble francés.',
      category_id: '1', // Tinto
      vintage_year: 2021,
      alcohol_content: 14.5,
      grape_variety: 'Cabernet Sauvignon',
      region: 'Valle de Uco, Mendoza',
      price: 45.99,
      image_url: 'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg',
      is_active: true
    }

);
products.value.push({
      name: 'Chardonnay Premium 2022',
      description: 'Vino blanco elegante con aromas florales y cítricos, con un toque mineral y final persistente.',
      category_id: '2', // Blanco
      vintage_year: 2022,
      alcohol_content: 13.0,
      grape_variety: 'Chardonnay',
      region: 'Valle de Casablanca, Chile',
      price: 32.50,
      image_url: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg',
      is_active: true
    }
  
);
products.value.push({
      name: 'Rosé de Malbec 2023',
      description: 'Rosado fresco y afrutado, ideal para aperitivos y comidas ligeras. Notas de fresa y durazno.',
      category_id: '3', // Rosado
      vintage_year: 2023,
      alcohol_content: 12.5,
      grape_variety: 'Malbec',
      region: 'San Rafael, Mendoza',
      price: 28.75,
      image_url: 'https://images.pexels.com/photos/1170099/pexels-photo-1170099.jpeg',
      is_active: true
    }
  
);
products.value.push({
      name: 'Espumante Brut Nature',
      description: 'Espumante método tradicional, sin dosaje. Burbujas finas y persistentes con notas cítricas.',
      category_id: '4', // Espumoso
      vintage_year: 2020,
      alcohol_content: 12.0,
      grape_variety: 'Chardonnay, Pinot Noir',
      region: 'Patagonia, Argentina',
      price: 55.00,
      image_url: 'https://images.pexels.com/photos/5946984/pexels-photo-5946984.jpeg',
      is_active: true
    }
  
);



})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-wine-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83z"/>
            </svg>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Viñedo San Miguel</h1>
              <p class="text-sm text-gray-500">Sistema de Inventario de Vinos</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Stock Alerts -->
            <div v-if="lowStockCount > 0" class="flex items-center text-yellow-600">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span class="text-sm font-medium">{{ lowStockCount }} productos con stock bajo</span>
            </div>

            <button
              v-if="stats.totalProducts === 0"
              @click="handleCreateSampleData"
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium mr-3"
            >
              Crear Datos de Ejemplo
            </button>
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
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Productos</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Stock Total</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalStock }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Stock Bajo</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.lowStock }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-wine-100 rounded-lg">
                <svg class="w-6 h-6 text-wine-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
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
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wine-600"></div>
        <p class="mt-2 text-gray-500">Cargando productos...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m16 0h-2M4 13h2" />
        </svg>
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
    <div v-if="showProductForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ProductForm @close="showProductForm = false" @success="handleProductSuccess" />
    </div>

    <StockModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
      @success="handleStockSuccess"
    />
  </div>
</template>

