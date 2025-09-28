import { useProductsStore } from '~/store/products'

export default defineNuxtPlugin(async (nuxtApp) => {
  const productsStore = useProductsStore()

  // Preload products in SSR or if they are not loaded
  if (import.meta.server || !productsStore.loaded) {
    await productsStore.preloadProducts()
  }
});