import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'Authorization')
    const body = await readBody(event)
    
    console.log('🔐 [Nitro] Change password proxy - passing through to Nest')
    
    // Proxy transparente - Nest hará todas las validaciones
    const result = await authService.changePassword(authHeader, body)
    return result
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Change password error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al cambiar la contraseña',
      data: error.data || error
    })
  }
})