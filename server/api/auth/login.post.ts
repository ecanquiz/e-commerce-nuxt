import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)    
    
    // Transparent proxy: passing everything directly
    return await authService.login(body);    
  } catch (error: any) {
    // Resend the exact error from Nest to Nest
    console.error('🔐 [Nitro] Login proxy error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el login',
      data: error.data || error
    });
  }
})