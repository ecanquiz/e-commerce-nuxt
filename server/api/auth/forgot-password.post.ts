import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event)
    
    if (!email) {
      throw createError({
        statusCode: 400,
        message: 'Email es requerido'
      })
    }

    await authService.forgotPassword(email)
    return { message: 'Si el email existe, se enviaron instrucciones' }
    
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error solicitando reset de contraseña'
    })
  }
})
