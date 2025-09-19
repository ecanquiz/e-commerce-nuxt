<script setup lang="ts">
//import LanguageSelector from './LanguageSelector.vue';
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';
import { useClickOutside } from '../composables/useClickOutside';
import type { Product, Vineyard } from '~~/shared/types';

const props = defineProps({
  modelValue: Boolean,
  navigation: {
    type: Array as PropType<Array<{ name: string; href: string }>>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const route = useRoute()
const auth = useAuthStore()
const cart = useCartStore()
const { t } = useI18n()

// Búsqueda
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

const isActive = (path: string) => route.path === path
const closeMenu = () => emit('update:modelValue', false)

const handleSearch = (e: Event) => {
  searchQuery.value = (e.target as HTMLInputElement).value
  // Implementar lógica de búsqueda (similar a SearchBar.vue)
}

const handleSearchSubmit = () => {
  // Lógica de envío de búsqueda
}

const handleProductSelect = (product: Product, vineyard: Vineyard) => {
  closeMenu()
  // Navegar al producto
}

const handleLogout = async () => {
  await auth.logout()
  closeMenu()
  await navigateTo('/')
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    red: 'bg-red-100 text-red-800',
    white: 'bg-yellow-100 text-yellow-800',
    // ... otras categorías
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const mobileMenuRef = ref<HTMLElement | null>(null)
useClickOutside(mobileMenuRef, () => {
  emit('update:modelValue', false)
}) 
</script>

<template>
<Transition
  enter-active-class="transition duration-200 ease-out"
  leave-active-class="transition duration-150 ease-in"
  enter-from-class="opacity-0 -translate-y-2"
  enter-to-class="opacity-100 translate-y-0"
  leave-from-class="opacity-100 translate-y-0"
  leave-to-class="opacity-0 -translate-y-2"
>
  <div v-if="modelValue" class="md:hidden bg-white border-t shadow-lg">
    <!-- Menú de navegación -->
    <div class="px-2 pt-2 pb-3 space-y-1">
      <NuxtLink
        v-for="item in navigation"
        :key="item.href"
        :to="item.href"
        class="block px-3 py-2 text-base font-medium transition-colors"
        :class="route.path === item.href 
          ? 'text-burgundy-600 bg-burgundy-50' 
          : 'text-gray-700 hover:text-burgundy-600 hover:bg-gray-50'"
        @click="emit('update:modelValue', false)"
      >
        {{ item.name }}
      </NuxtLink>
    </div>

    <!-- Sección inferior (carrito, auth, etc.) -->
    <div class="pt-4 pb-3 border-t border-gray-200">
      <!-- Barra de búsqueda móvil -->
      <div class="px-5 mb-4">
        <form @submit.prevent="handleSearchSubmit" class="flex items-center bg-white border border-gray-300 rounded-lg">
          <select
            v-model="searchCategory"
            class="bg-gray-50 border-r border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none rounded-l-lg"
          >
            <option v-for="category in searchCategories" :key="category.value" :value="category.value">
              {{ $t(category.label) }}
            </option>
          </select>
          <input
            type="text"
            :placeholder="$t('common.search') + ' vinos...'"
            v-model="searchQuery"
            @input="handleSearch"
            class="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
          >
          <button type="submit" class="bg-[color:var(--color-burgundy)] text-white px-4 py-2 rounded-r-lg">
            <Icon name="lucide:search" class="h-4 w-4" />
          </button>
        </form>

        <!-- Resultados de búsqueda móvil -->
        <div v-if="showSearchResults && searchResults.length > 0" class="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <div class="p-2">
            <div class="text-xs text-gray-500 px-3 py-2 border-b">
              {{ searchResults.length }} {{ $t('products.productsFound') }}
            </div>
            <button
              v-for="{product, vineyard} in searchResults"
              :key="`${vineyard.id}-${product.id}`"
              @click="handleProductSelect(product, vineyard)"
              class="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <NuxtImg
                :src="product.image"
                :alt="product.name"
                class="w-12 h-12 object-cover rounded-lg"
                width="48"
                height="48"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ product.name }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ vineyard.name }}
                </p>
                <div class="flex items-center space-x-2 mt-1">
                  <span :class="`text-xs px-2 py-1 rounded-full ${getCategoryColor(product.category)}`">
                    {{ product.category }}
                  </span>
                  <span class="text-sm font-medium text-[color:var(--color-burgundy)]">
                    ${{ product.price.toLocaleString() }}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Carrito -->
      <div class="flex items-center px-5 space-x-3">
        <NuxtLink
          to="/cart"
          class="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-[color:var(--color-burgundy)] transition-colors"
          @click="closeMenu"
        >
          <Icon name="lucide:shopping-cart" class="h-5 w-5" />
          <span>{{ $t('navigation.cart') }} ({{ cart.itemCount }})</span>
        </NuxtLink>
      </div>

      <!-- Usuario autenticado -->
      <div v-if="auth.isAuthenticated" class="mt-3 px-5 space-y-1">
        <NuxtLink
          to="/profile"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[color:var(--color-burgundy)] transition-colors"
          @click="closeMenu"
        >
          {{ $t('navigation.profile') }}
        </NuxtLink>
        <button
          @click="handleLogout"
          class="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[color:var(--color-burgundy)] transition-colors"
        >
          {{ $t('navigation.logout') }}
        </button>
      </div>

      <!-- Usuario invitado -->
      <div v-else class="mt-3 px-5 space-y-1">
        <div class="px-3 py-2">
          <LanguageSelector />
        </div>
        <NuxtLink
          to="/login"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[color:var(--color-burgundy)] transition-colors"
          @click="closeMenu"
        >
          {{ $t('navigation.login') }}
        </NuxtLink>
        <NuxtLink
          to="/register/customer"
          class="block px-3 py-2 text-base font-medium bg-[color:var(--color-burgundy)] text-white rounded-md hover:bg-[color:var(--color-burgundy-dark)] transition-colors"
          @click="closeMenu"
        >
          {{ $t('navigation.register') }}
        </NuxtLink>
      </div>
    </div>
  </div>
  </Transition>
</template>
