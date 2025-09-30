import { defineStore } from 'pinia'
import type { Service } from '~~/shared/types'

export const useServicesStore = defineStore('services', () => {
  const services = ref<Product[]>([])
  const loading = ref(false)
  const loaded = ref(false)

   // Get vineyard by ID
    const getServicesById = (id: string) => {
      return services.value.find(p => p.id === id)
    }

    const fetchServices = async () => {
    if (loaded.value && services.value.length > 0) {
      return services.value
    }

    loading.value = true
    try {
      const { data } = await useFetch('/api/services')
      services.value = data.value || []
      loaded.value = true
      return services.value
    } catch (error) {
      console.error('Error loading vineyards:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  // Preload services for SSR
  const preloadServices = async () => {
    // Only preload if not in client or not loaded
    if (import.meta.server || !loaded.value) {
      await fetchServices()
    }
  }

  const featuredProducts = computed(
    () => services.value//.slice(0, 3)
  )

  const highlightedProducts = computed( 
    () => services.value//.slice(0, 6)
  )

  return { services, loading, loaded, featuredProducts, highlightedProducts, fetchServices, preloadServices, getServicesById }
})