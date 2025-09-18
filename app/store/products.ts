import { defineStore } from 'pinia'
import type { Product } from '~~/shared/types'


export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const loaded = ref(false)

  /*const fetchProducts = async () => {
    loading.value = true
    const { data } = await useFetch('/api/products/search')
        console.log('store de producto')

    products.value = data.value?.data || []
    loading.value = false
  }

  const fetchAllProducts = async () => {
    loading.value = true
    const { data } = await useFetch('/api/products')
    products.value = data.value || []
    loading.value = false
  }*/
   // Get vineyard by ID
    const getProductsById = (id: string) => {
      return products.value.find(p => p.id === id)
    }

    const fetchProducts = async () => {
    if (loaded.value && products.value.length > 0) {
      return products.value
    }

    loading.value = true
    try {
      const { data } = await useFetch('/api/products')
      products.value = data.value || []
      loaded.value = true
      return products.value
    } catch (error) {
      console.error('Error loading vineyards:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  // Preload products for SSR
  const preloadProducts = async () => {
    // Only preload if not in client or not loaded
    if (import.meta.server || !loaded.value) {
      await fetchProducts()
    }
  }

  const featuredProducts = computed(
    () => products.value//.slice(0, 3)
  )

  const highlightedProducts = computed( 
    () => products.value//.slice(0, 6)
  )

  return { products, loading, loaded, featuredProducts, highlightedProducts, fetchProducts, preloadProducts, getProductsById }
})