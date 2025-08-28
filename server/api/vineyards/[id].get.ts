import { vineyardService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params!
    const vineyard = await vineyardService.getVineyardById(id)
    
    return vineyard
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener viñedo'
    })
  }
})
