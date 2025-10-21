import {
  categories as categoriesModel,
  products as productsModel,
  inventory as inventoryModel,
  stockMovement as stockMovementModel

} from '~~/server/models/inventory.model'
import type {
  Category,
  Product,
  Inventory,
  ProductWithInventory,
  StockUpdate
} from '~~/shared/types'


export interface InventoryService {
  getCategories(): Promise<Category[]>
  getProducts(authorization?: string): Promise<ProductWithInventory[]>
  getProduct(id: string): Promise<ProductWithInventory | null>
  createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>, authorization?: string): Promise<Product>
  updateInventory(productId: string, stockUpdate: StockUpdate, authorization?: string): Promise<Inventory>
  deleteProduct(productId: string, authorization?: string): Promise<void>
  getLowStockProducts(): Promise<ProductWithInventory[]>
  getProductInventory(productId: string, authorization?: string): Promise<Inventory>
  // If you need to manipulate stockMovements directly:
  // createStockMovement?(movement: Omit<StockMovement, 'id' | 'created_at'>): Promise<StockMovement>
}

// Mock implementation
export class MockInventoryService implements InventoryService {
  private categories: Category[] = categoriesModel;
  private products: Product[] = productsModel;
  private inventory: Inventory[] = inventoryModel;
  private stockMovements: StockMovement[] = stockMovementModel;

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  async getCategories(): Promise<Category[]> {
    return this.categories
  }

  async getProducts(authorization?: string): Promise<ProductWithInventory[]> {
    return this.products.map((product: Product) => ({
      ...product,
      category: this.categories.find((cat: Category) => cat.id === product.category_id),
      inventory: this.inventory.find((inv: Inventory) => inv.product_id === product.id),
      stock_movements: this.stockMovements.filter((mov: any) => mov.product_id === product.id)
    }))
  }

  async getProduct(id: string): Promise<ProductWithInventory | null> {
    const product = this.products.find(p => p.id === id)
    if (!product) return null

    return {
      ...product,
      category: this.categories.find((cat: Category) => cat.id === product.category_id),
      inventory: this.inventory.find((inv: Inventory) => inv.product_id === product.id)
    }
  }

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>, authorization?: string): Promise<Product> {
    const newProduct: Product = {
      ...productData,
      id: this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    this.products.push(newProduct)

    // Create initial inventory entry
    const newInventory: Inventory = {
      id: this.generateId(),
      product_id: newProduct.id,
      current_stock: 0,
      reserved_stock: 0,
      minimum_stock: 10,
      maximum_stock: 1000,
      last_updated: new Date().toISOString(),
      updated_by: 'user'
    }
    this.inventory.push(newInventory)

    return newProduct
  }

  async updateInventory(productId: string, stockUpdate: StockUpdate, authorization?: string): Promise<Inventory> {
    const index = this.inventory.findIndex(inv => inv.product_id === productId)
    
    if (index === -1) {
      throw new Error('Inventory not found')
    }

    this.inventory[index] = {
      ...this.inventory[index]!,
      ...stockUpdate,
      last_updated: new Date().toISOString()
    }

    return this.inventory[index]!;
  }

  async deleteProduct(productId: string, authorization?: string): Promise<void> {
    this.products = this.products.filter(product => product.id !== productId)
    this.inventory = this.inventory.filter(inv => inv.product_id !== productId)
  }

  async getLowStockProducts(): Promise<ProductWithInventory[]> {
    const products = await this.getProducts()
    return products.filter(product =>
      product.inventory &&
      product.inventory.current_stock <= product.inventory.minimum_stock
    )
  }

  async getProductInventory(productId: string, authorization?: string): Promise<Inventory> {
        const index = this.inventory.findIndex(inv => inv.product_id === productId)
    
    if (index === -1) {
      throw new Error('Inventory not found')
    }

    this.inventory[index] = {
      ...this.inventory[index]!,
      //...stockUpdate,
      last_updated: new Date().toISOString()
    }

    return this.inventory[index]!;
  }
}

// Nest implementation (para el futuro)
export class NestInventoryService implements InventoryService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEST_API_URL || 'http://localhost:3001'
  }

  async getCategories(): Promise<Category[]> {
    const response = await $fetch(`${this.baseUrl}/categories`)
    return response as unknown as Promise<Category[]>
  }

  async getProducts(authorization?: string): Promise<ProductWithInventory[]> {
    const response = await $fetch(`${this.baseUrl}/products`, {
      headers: { Authorization: authorization || '' },
    })
    return response as unknown as Promise<ProductWithInventory[]>
  }

  async getProduct(id: string): Promise<ProductWithInventory | null> {
    const response = await $fetch(`${this.baseUrl}/products/${id}`)
    return response as unknown as Promise<ProductWithInventory>
  }

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>, authorization?: string): Promise<Product> {
    const response = await $fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      body: productData,
      headers: { Authorization: authorization || '' }
    })
    return response as unknown as Promise<Product>
  }

  async updateInventory(productId: string, stockUpdate: StockUpdate, authorization?: string): Promise<Inventory> {
    const response = await $fetch(`${this.baseUrl}/inventory/product/${productId}`, {
      method: 'PUT',
      body: stockUpdate,
      headers: { Authorization: authorization || '' }
    })
    return response as unknown as Promise<Inventory>
  }

  async deleteProduct(productId: string, authorization?: string): Promise<void> {
    await $fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: authorization || '' }
    })
  }

  async getLowStockProducts(): Promise<ProductWithInventory[]> {
    const response = await $fetch(`${this.baseUrl}/products/low-stock`)
    return response as unknown as Promise<ProductWithInventory[]>
  }

  async getProductInventory(productId: string, authorization?: string): Promise<Inventory> {
    const response = await $fetch(`${this.baseUrl}/inventory/product/${productId}`, {
      headers: { Authorization: authorization || '' }
    })
    return response as unknown as Promise<Inventory>
  }
}
