import { useVineyardsStore } from '~/store/vineyards'

export default defineNuxtPlugin(async (nuxtApp) => {
  const vineyardsStore = useVineyardsStore()

  // Preload vineyards in SSR or if they are not loaded
  if (import.meta.server || !vineyardsStore.loaded) {
    await vineyardsStore.preloadVineyards()
  }
});
