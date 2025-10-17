import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Transparent proxy: passing everything directly  to Nest
    return await authService.resetPassword(body);    
  } catch (error: any) {
    // Resend the exact error from Nest    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error reseteando contraseña',
      data: error.data || error
    });
  }
})
