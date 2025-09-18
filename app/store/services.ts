import { defineStore } from 'pinia'
import type { Service } from '~~/shared/types'


export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([])
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    const { data } = await useFetch('/api/services/search')
    services.value = data.value?.data || []
    loading.value = false
  }

  return { services, loading, fetchProducts }
})
