import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('🔐 [Nitro] Login proxy - passing through to Nest')
    
    // Nitro como proxy transparente - pasar todo directamente
    return await authService.login(body)
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Login proxy error:', error)
    // Re-enviar el error exacto de Nest
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el login',
      data: error.data || error
    })
  }
})