import { useServicesStore } from '~/store/services'

export default defineNuxtPlugin(async (nuxtApp) => {
  const servicesStore = useServicesStore()

  // Preload services in SSR or if they are not loaded
  if (import.meta.server || !servicesStore.loaded) {
    await servicesStore.preloadServices() 
  }
});