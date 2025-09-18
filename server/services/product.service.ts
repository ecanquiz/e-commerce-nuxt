import generateId from '../utils/generateId';

export interface ProductService {
  getAllProducts(): Promise<any[]>
  getProductById(id: string): Promise<any>
  searchProducts(query: string, category?: string): Promise<any[]>
  createProduct(productData: any, userId: string): Promise<any>
  updateProduct(id: string, productData: any, userId: string): Promise<any>
  deleteProduct(id: string, userId: string): Promise<void>
}

// Mock implementation - BASADO EN TU CÓDIGO ACTUAL
export class MockProductService implements ProductService {
  async getAllProducts() {
    const { mockProducts } = await import('~~/server/models/product.model')
    
    return mockProducts.map(product => {      
      return { ...product }
    })
  }

  async getProductById(id: string) {
    const { getProductById } = await import('~~/server/models/product.model')
    
    const product = getProductById(id)
    if (!product) {
      throw createError({
        statusCode: 404,
        message: 'Producto no encontrado'
      })
    }
    
    return { ...product }
  }

  async searchProducts(query: string, category?: string) {
    const { searchProducts } = await import('~~/server/models/product.model')
    
    const results = searchProducts(query, category)
    
    return results.map(product => {
      
      return { ...product, }
    })
  }

  async createProduct(productData: any, userId: string) {
    const { mockProducts } = await import('~~/server/models/product.model')

    const newProduct = {
      id: `product_${generateId()}`,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockProducts.push(newProduct)
    return newProduct
  }

  async updateProduct(id: string, productData: any, userId: string) {
    const { mockProducts } = await import('~~/server/models/product.model')
    
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Producto no encontrado'
      })
    }

    mockProducts[index] = {
      ...mockProducts[index],
      ...productData,
      updatedAt: new Date().toISOString()
    }

    return mockProducts[index]
  }

  async deleteProduct(id: string, userId: string) {
    const { mockProducts } = await import('~~/server/models/product.model')
    
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Producto no encontrado'
      })
    }
    mockProducts.splice(index, 1)
  }
}

// Nest implementation - PARA EL FUTURO
export class NestProductService implements ProductService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEST_API_URL || 'http://localhost:3001'
  }

  async getAllProducts() {
    const response = await $fetch(`${this.baseUrl}/products`)
    return response as unknown as Promise<any[]>
  }

  async getProductById(id: string) {
    const response = await $fetch(`${this.baseUrl}/products/${id}`)
    return response
  }

  async searchProducts(query: string, category?: string) {
    const response = await $fetch(`${this.baseUrl}/products/search`, {
      query: { q: query, category }
    })
    return response as unknown as Promise<any[]>
  }

  async createProduct(productData: any, userId: string) {
    const response = await $fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      body: productData,
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response
  }

  async updateProduct(id: string, productData: any, userId: string) {
    const response = await $fetch(`${this.baseUrl}/products/${id}`, {
      method: 'PUT',
      body: productData,
      headers: { Authorization: `Bearer ${userId}` }
    })
    return response
  }

  async deleteProduct(id: string, userId: string) {
    await $fetch(`${this.baseUrl}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userId}` }
    })
  }
}
