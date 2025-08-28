import { vineyardService } from '~~/server/services'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireAuth(event)
    const body = await readBody(event)
    
    const vineyard = await vineyardService.createVineyard(body, user.id)
    return vineyard
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al crear viñedo'
    })
  }
})
