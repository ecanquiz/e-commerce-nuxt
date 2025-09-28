import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('🔐 [Nitro] Register proxy - passing through to Nest')
    
    // Nitro como proxy transparente - pasar todo directamente
    return await authService.register(body)
    
  } catch (error: any) {
    console.error('🔐 [Nitro] Register proxy error:', error)
    // Re-enviar el error exacto de Nest
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el registro',
      data: error.data || error
    })
  }
})