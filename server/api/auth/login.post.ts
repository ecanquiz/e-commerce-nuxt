import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email y contraseña son requeridos'
      })
    }

    return await authService.login(email, password)
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el login'
    })
  }
})
