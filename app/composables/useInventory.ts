import type { ProductWithInventory, Category, Product, StockUpdate } from '~~/shared/types'

export const useInventory = () => {
  // Reactive states for filters
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const stockFilter = ref('')

  //Categories - only one instance
  const categoriesFetch = useEncryptedFetch<Category[]>('/api/categories', {
    key: 'inventory-categories',
    server: true,
    immediate: false,
    lazy: true
  })

  const categories = computed(() => categoriesFetch.data.value || [])
  
  // Products - only one instance
  const productsFetch = useEncryptedFetch<ProductWithInventory[]>('/api/inventory', {
    key: 'inventory-products',
    server: true,
    immediate: false,
    lazy: true
  })

  const products = computed(() => productsFetch.data.value || [])

  // Filtering - without recreating internal refs
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = !searchQuery.value ||
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.grape_variety?.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesCategory = !selectedCategory.value ||
        product.category_id === selectedCategory.value

      const matchesStock = !stockFilter.value ||
        (stockFilter.value === 'available' && (product.inventory?.current_stock || 0) > (product.inventory?.minimum_stock || 10)) ||
        (stockFilter.value === 'low' && (product.inventory?.current_stock || 0) <= (product.inventory?.minimum_stock || 10) && (product.inventory?.current_stock || 0) > 0) ||
        (stockFilter.value === 'out' && (product.inventory?.current_stock || 0) === 0)

      return matchesSearch && matchesCategory && matchesStock
    })
  })

  // Calculated statistics
  const stats = computed(() => {
    const allProducts = products.value
    
    return {
      totalProducts: allProducts.length,
      totalStock: allProducts.reduce((acc, product) => acc + (product.inventory?.current_stock || 0), 0),
      lowStock: allProducts.filter(product =>
        (product.inventory?.current_stock || 0) <= (product.inventory?.minimum_stock || 10) &&
        (product.inventory?.current_stock || 0) > 0
      ).length,
      totalValue: allProducts.reduce((acc, product) =>
        acc + (product.price * (product.inventory?.current_stock || 0)), 0
      )
    }
  })

  const lowStockProducts = computed(() => {
    return products.value.filter(product =>
      product.inventory &&
      product.inventory.current_stock <= product.inventory.minimum_stock
    )
  })

  // Stock status helper
  const getStockStatus = (product: ProductWithInventory) => {
    const stock = product.inventory?.current_stock || 0
    const minStock = product.inventory?.minimum_stock || 10

    if (stock === 0) return { status: 'Sin Stock', class: 'bg-red-100 text-red-800', textClass: 'text-red-600' }
    if (stock <= minStock) return { status: 'Stock Bajo', class: 'bg-yellow-100 text-yellow-800', textClass: 'text-yellow-600' }
    return { status: 'Disponible', class: 'bg-green-100 text-green-800', textClass: 'text-green-600' }
  }

  // Actions - Simple functions without recreating useEncryptedFetch
  const loadCategories = async () => {
    try {
      await categoriesFetch.execute()
      if (categoriesFetch.error.value) {
        throw new Error(categoriesFetch.error.value.message)
      }
      return categories.value
    } catch (error) {
      console.error('❌ Error loading categories:', error)
      throw error
    }
  }

  const loadProducts = async () => {
    try {
      await productsFetch.execute()
      if (productsFetch.error.value) {
        throw new Error(productsFetch.error.value.message)
      }
      return products.value
    } catch (error) {
      console.error('❌ Error loading products:', error)
      throw error
    }
  }

  const getProduct = async (id: string) => {
    const { data, error, execute } = useEncryptedFetch<ProductWithInventory>(`/api/inventory/${id}`, {
      key: `product-${id}`,
      server: true,
      lazy: true,
      immediate: false
    })

    try {
      await execute()
      if (error.value) {
        throw new Error(error.value.message)
      }
      return data.value
    } catch (error) {
      console.error(`❌ Error loading product ${id}:`, error)
      throw error
    }
  }

  const createProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error, execute } = useEncryptedFetch<Product>('/api/inventory', {
      method: 'POST',
      body: productData,
      key: 'create-product',
      lazy: true,
      immediate: false
    })

    try {
      await execute()
      if (error.value) {
        throw new Error(error.value.message)
      }
      
      // Refresh products list after creation
      await productsFetch.refresh()
      return data.value
    } catch (error) {
      console.error('❌ Error creating product:', error)
      throw error
    }
  }

  const updateInventory = async (productId: string, stockUpdate: StockUpdate) => {
    const { data, error, execute } = useEncryptedFetch<any>(`/api/inventory/${productId}`, {
      method: 'PUT',
      body: stockUpdate,
      key: `update-inventory-${productId}`,
      lazy: true,
      immediate: false
    })

    try {
      await execute()
      if (error.value) {
        throw new Error(error.value.message)
      }
      
      // Refresh products list after update
      await productsFetch.refresh()
      return data.value
    } catch (error) {
      console.error('❌ Error updating inventory:', error)
      throw error
    }
  }

  const deleteProduct = async (productId: string) => {
    const { error, execute } = useEncryptedFetch(`/api/inventory/${productId}`, {
      method: 'DELETE',
      key: `delete-product-${productId}`,
      lazy: true,
      immediate: false
    })

    try {
      await execute()
      if (error.value) {
        throw new Error(error.value.message)
      }
      
      // Refresh products list after deletion
      await productsFetch.refresh()
    } catch (error) {
      console.error('❌ Error deleting product:', error)
      throw error
    }
  }

  return {
    // Data
    categories,
    products,
    lowStockProducts,
    stats,
    filteredProducts,
    
    // Filters
    searchQuery,
    selectedCategory,
    stockFilter,
    
    // Loading states
    categoriesPending: categoriesFetch.pending,
    productsPending: productsFetch.pending,
    
    // Error states
    categoriesError: categoriesFetch.error,
    productsError: productsFetch.error,
    
    // Actions
    loadCategories,
    loadProducts,
    getProduct,
    createProduct,
    updateInventory,
    deleteProduct,
    
    // Utilities
    getStockStatus,
    
    // Refresh methods
    refreshProducts: productsFetch.refresh,
    refreshCategories: categoriesFetch.refresh
  }
}
