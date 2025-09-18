import { authService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Basic validation
    if (!body.email || !body.password || !body.name) {
      throw createError({
        statusCode: 400,
        message: 'Datos requeridos faltantes'
      })
    }

    return await authService.register(body)
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el registro'
    })
  }
})