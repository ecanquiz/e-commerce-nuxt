import { inventoryService } from '~~/server/services'
import type { Product } from '~~/shared/types/inventory'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const productData: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
      name: body.name,
      description: body.description,
      category_id: body.category_id,
      vintage_year: body.vintage_year,
      alcohol_content: body.alcohol_content,
      grape_variety: body.grape_variety,
      region: body.region,
      price: body.price,
      image_url: body.image_url,
      is_active: body.is_active !== undefined ? body.is_active : true
    }

    const newProduct = await inventoryService.createProduct(productData)
    return newProduct
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating product'
    })
  }
})