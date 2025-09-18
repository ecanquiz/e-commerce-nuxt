import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)

  console.log('🔐 [Nuxt] Received verification token:', token);
    
  if (!token || typeof token !== 'string') {
    console.error('❌ [Nuxt] Token missing or invalid');
    throw createError({
      statusCode: 400,
      message: 'Token de verificación requerido'
    })
  }

  try {
    console.log('📞 [Nuxt] Calling authService.verifyEmail...');
    const result = await authService.verifyEmail(token);
    console.log('✅ [Nuxt] Verification successful:', result);
    return result;
  } catch (error: any) {
    console.error('❌ [Nuxt] Verification error:', error);
    // console.error('❌ [Nuxt] Error status:', error.statusCode);
    // console.error('❌ [Nuxt] Error message:', error.message);
    // console.error('❌ [Nuxt] Error data:', error.data);

    // Propagate the exact NestJS error
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error verificando el email',
      data: error.data || error
    })
  }
})
