import { inventoryService } from '~~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const categories = await inventoryService.getCategories()
    return categories
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting categories'
    })
  }
})
