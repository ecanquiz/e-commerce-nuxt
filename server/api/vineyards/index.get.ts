import { vineyardService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const vineyards = await vineyardService.getAllVineyards()
    
    return {
      data: vineyards,
      meta: { 
        total: vineyards.length,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener viñedos'
    })
  }
})
