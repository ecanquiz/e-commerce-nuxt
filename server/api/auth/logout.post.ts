import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Authorization token required'
      })
    }
    
    console.log('🔐 [Nitro] Logout proxy - passing through to Nest')
    return await authService.logout(authHeader)
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Logout proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el logout',
      data: error.data || error
    })
  }
})