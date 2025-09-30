import { serviceService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const products = await serviceService.getAllServices()
    return products
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener productos'
    })
  }
})
