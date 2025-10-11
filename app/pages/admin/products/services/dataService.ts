import type{ 
  //supabase, 
  Category, Product, Inventory, ProductWithInventory } from '../lib/supabase'

// JSON fallback data structure
const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Tinto', description: 'Vinos tintos con cuerpo y estructura', created_at: new Date().toISOString() },
  { id: '2', name: 'Blanco', description: 'Vinos blancos frescos y aromáticos', created_at: new Date().toISOString() },
  { id: '3', name: 'Rosado', description: 'Vinos rosados ligeros y afrutados', created_at: new Date().toISOString() },
  { id: '4', name: 'Espumoso', description: 'Vinos espumosos y champagnes', created_at: new Date().toISOString() },
  { id: '5', name: 'Dulce', description: 'Vinos dulces y de postre', created_at: new Date().toISOString() },
  { id: '6', name: 'Fortificado', description: 'Vinos fortificados como Oporto y Jerez', created_at: new Date().toISOString() },
]

class DataService {
  private useLocalStorage = true // Start with localStorage by default

  constructor() {
    //this.initializeLocalStorage()
    //this.checkSupabaseConnection()
  }

  private async checkSupabaseConnection() {
    /*try {
      const { error } = await supabase.from('categories').select('count', { count: 'exact', head: true })
      if (error) {
        console.warn('Supabase connection failed, using local storage fallback:', error)
        this.useLocalStorage = true
      } else {
        console.log('Supabase connection successful')
        this.useLocalStorage = false
      }
    } catch (error) {
      console.warn('Supabase connection failed, using local storage fallback:', error)
      this.useLocalStorage = true
    }*/
  }

  private initializeLocalStorage() {
    if (!localStorage.getItem('vineyard_categories')) {
      localStorage.setItem('vineyard_categories', JSON.stringify(DEFAULT_CATEGORIES))
    }
    if (!localStorage.getItem('vineyard_products')) {
      localStorage.setItem('vineyard_products', JSON.stringify([]))
    }
    if (!localStorage.getItem('vineyard_inventory')) {
      localStorage.setItem('vineyard_inventory', JSON.stringify([]))
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  async getCategories(): Promise<Category[]> {
    /*if (this.useLocalStorage) {
      return JSON.parse(localStorage.getItem('vineyard_categories') || '[]')
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []*/
  }

  async getProducts(): Promise<ProductWithInventory[]> {
    /*if (this.useLocalStorage) {
      const products = JSON.parse(localStorage.getItem('vineyard_products') || '[]')
      const inventory = JSON.parse(localStorage.getItem('vineyard_inventory') || '[]')
      const categories = JSON.parse(localStorage.getItem('vineyard_categories') || '[]')

      return products.map((product: Product) => ({
        ...product,
        category: categories.find((cat: Category) => cat.id === product.category_id),
        inventory: inventory.find((inv: Inventory) => inv.product_id === product.id)
      }))
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        inventory(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []*/
  }

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    /*if (this.useLocalStorage) {
      const products = JSON.parse(localStorage.getItem('vineyard_products') || '[]')
      const newProduct: Product = {
        ...productData,
        id: this.generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      products.push(newProduct)
      localStorage.setItem('vineyard_products', JSON.stringify(products))

      // Create initial inventory entry
      const inventory = JSON.parse(localStorage.getItem('vineyard_inventory') || '[]')
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
      inventory.push(newInventory)
      localStorage.setItem('vineyard_inventory', JSON.stringify(inventory))

      return newProduct
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single()

    if (error) throw error

    // Create initial inventory entry
    await supabase
      .from('inventory')
      .insert([{
        product_id: data.id,
        current_stock: 0,
        minimum_stock: 10,
        maximum_stock: 1000,
        updated_by: 'user'
      }])

    return data*/
  }

  async updateInventory(productId: string, stockUpdate: Partial<Inventory>): Promise<Inventory> {
    /*if (this.useLocalStorage) {
      const inventory = JSON.parse(localStorage.getItem('vineyard_inventory') || '[]')
      const index = inventory.findIndex((inv: Inventory) => inv.product_id === productId)

      if (index !== -1) {
        inventory[index] = {
          ...inventory[index],
          ...stockUpdate,
          last_updated: new Date().toISOString()
        }
        localStorage.setItem('vineyard_inventory', JSON.stringify(inventory))
        return inventory[index]
      }
      throw new Error('Inventory not found')
    }

    const { data, error } = await supabase
      .from('inventory')
      .update({
        ...stockUpdate,
        last_updated: new Date().toISOString()
      })
      .eq('product_id', productId)
      .select()
      .single()

    if (error) throw error
    return data*/
  }

  async deleteProduct(productId: string): Promise<void> {
    /*if (this.useLocalStorage) {
      const products = JSON.parse(localStorage.getItem('vineyard_products') || '[]')
      const inventory = JSON.parse(localStorage.getItem('vineyard_inventory') || '[]')

      const filteredProducts = products.filter((product: Product) => product.id !== productId)
      const filteredInventory = inventory.filter((inv: Inventory) => inv.product_id !== productId)

      localStorage.setItem('vineyard_products', JSON.stringify(filteredProducts))
      localStorage.setItem('vineyard_inventory', JSON.stringify(filteredInventory))
      return
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)

    if (error) throw error*/
  }

  async getLowStockProducts(): Promise<ProductWithInventory[]> {
    const products = await this.getProducts()
    return products.filter(product =>
      product.inventory &&
      product.inventory.current_stock <= product.inventory.minimum_stock
    )
  }
}

export const dataService = new DataService()