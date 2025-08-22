import { defineStore } from 'pinia'
import type { Vineyard } from '~~/shared/types'

export const useVineyardsStore = defineStore('vineyards', () => {
  const vineyards = ref<Vineyard[]>([])
  const loading = ref(false)
  const loaded = ref(false)

  // Get vineyard by ID
  const getVineyardById = (id: string) => {
    return vineyards.value.find(v => v.id === id)
  }

  // Obtaining products from a vineyard
  const getVineyardProducts = (vineyardId: string) => {
    const vineyard = getVineyardById(vineyardId)
    return vineyard?.products || []
  }

  // Search vineyards
  const searchVineyards = (query: string) => {
    return vineyards.value.filter(v => 
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      v.location.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Load vineyards (client or server)
  const fetchVineyards = async () => {
    if (loaded.value && vineyards.value.length > 0) {
      return vineyards.value
    }

    loading.value = true
    try {
      const { data } = await useFetch('/api/vineyards')
      vineyards.value = data.value?.data || []
      loaded.value = true
      return vineyards.value
    } catch (error) {
      console.error('Error loading vineyards:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  // Preload vineyards for SSR
  const preloadVineyards = async () => {
    // Only preload if not in client or not loaded
    if (import.meta.server || !loaded.value) {
      await fetchVineyards()
    }
  }

  return { 
    vineyards, 
    loading, 
    loaded,
    fetchVineyards,
    preloadVineyards,
    getVineyardById,
    getVineyardProducts,
    searchVineyards
  }
});
