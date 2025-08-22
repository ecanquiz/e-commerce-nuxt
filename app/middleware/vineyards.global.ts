import { useVineyardsStore } from '~/store/vineyards'

export default defineNuxtRouteMiddleware(async (to) => {
  const vineyardsStore = useVineyardsStore()
  
  // Routes that require pre-loaded vineyards
  const vineyardsRoutes = ['/', '/vineyards', '/products', '/vineyard/']
  
  const needsVineyards = vineyardsRoutes.some(route => 
    to.path === route || to.path.startsWith(route)
  )

  if (needsVineyards && !vineyardsStore.loaded) {
    await vineyardsStore.preloadVineyards()
  }
})