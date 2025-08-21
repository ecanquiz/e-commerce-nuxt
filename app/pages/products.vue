
<script setup lang="ts">
import { Search, Filter, Wine, DollarSign } from 'lucide-vue-next';
import { useVineyardsStore } from '~/store/vineyards'
import type { Product, Vineyard } from '~~/shared/types';

const { t } = useI18n()

const storeVineyardsStore = useVineyardsStore();
//storeVineyardsStore.fetchVineyards();
const mockVineyards = storeVineyardsStore.vineyards

interface ProductWithVineyard {
  product: Product;
  vineyard: Vineyard;
}

interface ProductModalState {
  isOpen: boolean;
  product: Product | null;
  vineyard: Vineyard | null;
}

const route = useRoute();
const router = useRouter();

// Obtener parámetros iniciales de la URL
const initialSearch = Array.isArray(route.query.search) 
  ? route.query.search[0] || '' 
  : route.query.search || '';

const initialCategory = Array.isArray(route.query.category)
  ? route.query.category[0] || ''
  : route.query.category || '';

// Estado reactivo
const searchTerm = ref(initialSearch);
const selectedCategory = ref(initialCategory);
const priceRange = ref('');
const sortBy = ref('name');
const productModal = reactive<ProductModalState>({
  isOpen: false,
  product: null,
  vineyard: null
});

// Datos estáticos
const categories = ['red', 'white', 'rose', 'sparkling', 'dessert'];
const priceRanges = [
  { label: t('products.priceRanges.under5k'), value: '0-5000' },
  { label: t('products.priceRanges.5k-10k'), value: '5000-10000' },
  { label: t('products.priceRanges.10k-20k'), value: '10000-20000' },
  { label: t('products.priceRanges.over20k'), value: '20000+' },
];

// Obtener todos los productos de todos los viñedos
const allProducts: ProductWithVineyard[] = mockVineyards.flatMap(vineyard => 
  vineyard.products.map(product => ({ product, vineyard }))
);

// Productos filtrados
const filteredProducts = computed(() => {
  let filtered = allProducts
    .filter(({ product }) => 
      product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    .filter(({ product }) => 
      selectedCategory.value === '' || product.category === selectedCategory.value
    )
    .filter(({ product }) => {
      if (priceRange.value === '') return true;
      const [min, max] = priceRange.value.split('-').map(Number);
      if (priceRange.value.includes('+')) return product.price >= min;
      return product.price >= min && product.price <= max;
    });

  // Ordenar
  return filtered.sort((a, b) => {
    if (sortBy.value === 'name') return a.product.name.localeCompare(b.product.name);
    if (sortBy.value === 'price-low') return a.product.price - b.product.price;
    if (sortBy.value === 'price-high') return b.product.price - a.product.price;
    if (sortBy.value === 'vintage') return b.product.vintage - a.product.vintage;
    return 0;
  });
});

// Setters que actualizan la URL
const setSearchTerm = (value: string) => {
  searchTerm.value = value;
  updateUrl();
};

const setSelectedCategory = (value: string) => {
  selectedCategory.value = value;
  updateUrl();
};

const setPriceRange = (value: string) => {
  priceRange.value = value;
};

const setSortBy = (value: string) => {
  sortBy.value = value;
};

// Actualizar URL con los filtros
const updateUrl = () => {
  const query: Record<string, string> = {};
  
  if (searchTerm.value) query.search = searchTerm.value;
  if (selectedCategory.value) query.category = selectedCategory.value;
  
  router.replace({
    path: route.path,
    query
  });
};

// Modal functions
const openProductModal = (product: Product, vineyard: Vineyard) => {
  productModal.isOpen = true;
  productModal.product = product;
  productModal.vineyard = vineyard;
};

const closeProductModal = () => {
  productModal.isOpen = false;
  productModal.product = null;
  productModal.vineyard = null;
};

// Watch for route changes to update filters
watch(() => route.query, (newQuery) => {
  if (newQuery.search !== undefined) {
    searchTerm.value = Array.isArray(newQuery.search) ? newQuery.search[0] || '' : newQuery.search || '';
  }
  if (newQuery.category !== undefined) {
    selectedCategory.value = Array.isArray(newQuery.category) ? newQuery.category[0] || '' : newQuery.category || '';
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {{ t('products.title') }}
        </h1>
        <p class="text-xl text-gray-600">
          {{ t('products.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              :placeholder="t('products.searchPlaceholder')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
              :value="searchTerm"
              @input="setSearchTerm(($event.target as HTMLInputElement).value)"
            />
          </div>
          
          <div class="relative">
            <Wine class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent appearance-none"
              :value="selectedCategory"
              @change="setSelectedCategory(($event.target as HTMLSelectElement).value)"
            >
              <option value="">{{ t('products.allCategories') }}</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category.charAt(0).toUpperCase() + category.slice(1) }}
              </option>
            </select>
          </div>
          
          <div class="relative">
            <DollarSign class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent appearance-none"
              :value="priceRange"
              @change="setPriceRange(($event.target as HTMLSelectElement).value)"
            >
              <option value="">{{ t('products.allPrices') }}</option>
              <option
                v-for="range in priceRanges"
                :key="range.value"
                :value="range.value"
              >
                {{ range.label }}
              </option>
            </select>
          </div>
          
          <div class="relative">
            <Filter class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent appearance-none"
              :value="sortBy"
              @change="setSortBy(($event.target as HTMLSelectElement).value)"
            >
              <option value="name">{{ t('products.sortOptions.nameAZ') }}</option>
              <option value="price-low">{{ t('products.sortOptions.priceLow') }}</option>
              <option value="price-high">{{ t('products.sortOptions.priceHigh') }}</option>
              <option value="vintage">{{ t('products.sortOptions.vintage') }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-gray-600">
          {{ filteredProducts.length }} {{ t('products.productsFound') }}
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard 
          v-for="{ product, vineyard } in filteredProducts"
          :key="product.id"
          :product="product"
          :vineyard="vineyard"
          @view-details="openProductModal(product, vineyard)"
        />
      </div>

      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <Search class="h-16 w-16 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {{ t('products.noProducts.title') }}
        </h3>
        <p class="text-gray-600">
          {{ t('products.noProducts.description') }}
        </p>
      </div>
    </div>

    <!-- Modal de Detalles del Producto -->
    <ProductDetailModal
      v-if="productModal.isOpen && productModal.product && productModal.vineyard"
      :product="productModal.product"
      :vineyard="productModal.vineyard"
      :is-open="productModal.isOpen"
      @close="closeProductModal"
    />
  </div>
</template>

