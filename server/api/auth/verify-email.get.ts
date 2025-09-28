import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
    
  if (!token || typeof token !== 'string') {
    console.error('[Nuxt] Token missing or invalid');
    throw createError({
      statusCode: 400,
      message: 'Verification token required'
    })
  }

  try {
    const result = await authService.verifyEmail(token);
    return result;
  } catch (error: any) {
    console.error('[Nuxt] Verification error:', error);
    // Propagate the exact NestJS error
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error verifying email',
      data: error.data || error
    })
  }
})
