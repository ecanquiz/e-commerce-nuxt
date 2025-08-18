import { defineStore } from 'pinia'
import type { Vineyard, Product } from '~/types'


export const useVineyardsStore = defineStore('vineyards', () => {
  const vineyards = ref<Vineyard[]>([])
  const loading = ref(false)

  const fetchVineyards = async () => {
    loading.value = true
    const { data } = await useFetch('/api/vineyards')
    vineyards.value = data.value?.data || []
    loading.value = false
  }

  return { vineyards, loading, fetchVineyards }
})