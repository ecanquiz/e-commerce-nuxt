
<script setup lang="ts">
import { Search, MapPin } from 'lucide-vue-next'
import type { Product, Vineyard } from '~~/shared/types'
//import useClickOutside from '~/composables/useClickOutside'  
import { useClickOutside } from '../useClickOutside'  

const { t } = useI18n()
const router = useRouter()

// Estado
const searchQuery = ref('')
const searchCategory = ref('all')
const showSearchResults = ref(false)
const searchResults = ref<Array<{ product: Product; vineyard: Vineyard }>>([])

// Categorías de búsqueda
const searchCategories = [
  { value: 'all', label: 'products.allCategories' },
  { value: 'red', label: 'products.redWines' },
  { value: 'white', label: 'products.whiteWines' },
  { value: 'rose', label: 'products.roseWines' },
  { value: 'sparkling', label: 'products.sparklingWines' },
  { value: 'dessert', label: 'products.dessertWines' }
]

// Colores por categoría
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'red': return 'bg-red-100 text-red-800'
    case 'white': return 'bg-yellow-100 text-yellow-800'
    case 'rose': return 'bg-pink-100 text-pink-800'
    case 'sparkling': return 'bg-blue-100 text-blue-800'
    case 'dessert': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Manejadores
const handleSearch = (e: Event) => {
  const query = (e.target as HTMLInputElement).value
  searchQuery.value = query
  
  if (!query.trim()) {
    searchResults.value = []
    showSearchResults.value = false
    return
  }

  // Aquí iría la lógica de búsqueda real
  // Por ahora usamos datos mock
  searchResults.value = mockSearch(query, searchCategory.value)
  showSearchResults.value = true
}

const handleSearchSubmit = () => {
  if (searchQuery.value.trim()) {
    const queryParams: Record<string, string> = { search: searchQuery.value.trim() }
    if (searchCategory.value !== 'all') {
      queryParams.category = searchCategory.value
    }
    
    router.push({
      path: '/products',
      query: queryParams
    })
    
    searchQuery.value = ''
    showSearchResults.value = false
  }
}

const handleProductSelect = (product: Product, vineyard: Vineyard) => {
  searchQuery.value = ''
  showSearchResults.value = false
  router.push({
    path: `/vineyard/${vineyard.id}`,
    state: { selectedProduct: product.id }
  })
}

// Función mock para simular búsqueda (reemplazar con API real)
const mockSearch = (query: string, category: string) => {
  // Implementación mock similar a la de React
  // Deberías reemplazar esto con una llamada a tu API
  return []
}

// Closes the dropdown when clicking outside
const dropdownRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
useClickOutside(dropdownRef, () => {
  showSearchResults.value = false
}, { ignore: [buttonRef] }) // Do not close if this button is clicked
</script>

<template>
  <div class="hidden md:block py-3 border-t border-gray-100">
    <div class="relative max-w-4xl mx-auto">
      <form @submit.prevent="handleSearchSubmit" class="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <!-- Selector de categoría -->
        <div class="relative">
          <select
            v-model="searchCategory"
            class="appearance-none bg-gray-50 border-r border-gray-300 px-4 py-3 pr-8 text-sm text-gray-700 focus:outline-none focus:bg-white rounded-l-lg"
          >
            <option v-for="category in searchCategories" :key="category.value" :value="category.value">
              {{ $t(category.label) }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Input de búsqueda -->
        <div class="flex-1 relative">
          <input
            type="text"
            :placeholder="$t('common.search') + ' vinos, viñedos, categorías...'"
            v-model="searchQuery"
            @input="handleSearch"
            @focus="searchResults.length > 0 ? showSearchResults = true : null"
            class="w-full px-4 py-3 text-gray-700 focus:outline-none"
          />
        </div>

        <!-- Botón de búsqueda -->
        <button
          type="submit"
          class="bg-burgundy-600 hover:bg-burgundy-700 text-white px-6 py-3 rounded-r-lg transition-colors flex items-center space-x-2"
        >
          <Search class="h-5 w-5" />
          <span class="hidden sm:inline">{{ $t('common.search') }}</span>
        </button>
      </form>

      <!-- Resultados de búsqueda -->
      <div v-if="showSearchResults && searchResults.length > 0" class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
        <div class="p-3">
          <div class="flex items-center justify-between text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
            <span>{{ searchResults.length }} {{ $t('products.productsFound') }}</span>
            <span class="text-burgundy-600">{{ $t('common.search') }} todos</span>
          </div>
          <div class="grid grid-cols-1 gap-2 mt-2">
            <button
              v-for="{ product, vineyard } in searchResults"
              :key="`${vineyard.id}-${product.id}`"
              @click="handleProductSelect(product, vineyard)"
              class="w-full flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left border border-transparent hover:border-gray-200"
            >
              <NuxtImg
                :src="product.image"
                :alt="product.name"
                class="w-16 h-16 object-cover rounded-lg"
                width="64"
                height="64"
              />
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold text-gray-900 truncate">
                  {{ product.name }}
                </h4>
                <div class="flex items-center space-x-2 mt-1">
                  <MapPin class="h-3 w-3 text-gray-400" />
                  <span class="text-xs text-gray-500 truncate">
                    {{ vineyard.name }} • {{ vineyard.location }}
                  </span>
                </div>
                <div class="flex items-center space-x-2 mt-2">
                  <span :class="`text-xs px-2 py-1 rounded-full ${getCategoryColor(product.category)}`">
                    {{ product.category }}
                  </span>
                  <span class="text-xs text-gray-500">
                    {{ product.vintage }} • {{ product.alcoholContent }}%
                  </span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-burgundy-600">
                  ${{ product.price.toLocaleString() }}
                </div>
                <div class="text-xs text-green-600">
                  {{ product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock' }}
                </div>
              </div>
            </button>
          </div>
          <button
            v-if="searchQuery.trim()"
            @click="handleSearchSubmit"
            class="w-full p-3 text-left hover:bg-burgundy-50 rounded-lg transition-colors border-t border-gray-100 mt-2"
          >
            <div class="flex items-center justify-center space-x-2 text-burgundy-600 font-medium">
              <Search class="h-4 w-4" />
              <span>{{ $t('common.view') }} todos los resultados para "{{ searchQuery }}"</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
