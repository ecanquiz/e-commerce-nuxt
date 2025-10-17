import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)    
    
    // Transparent proxy: passing everything directly to Nest
    return await authService.register(body);    
  } catch (error: any) {
    console.error('🔐 [Nitro] Register proxy error:', error)
    // Resend the exact error from Nest
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el registro',
      data: error.data || error
    })
  }
})
