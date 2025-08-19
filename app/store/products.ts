import { defineStore } from 'pinia'
import type { Product } from '~~/shared/types'


export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    const { data } = await useFetch('/api/products/search')
    products.value = data.value?.data || []
    loading.value = false
  }

  return { products, loading, fetchProducts }
})