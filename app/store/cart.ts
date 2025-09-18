import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useLocalStorage } from '@vueuse/core'
import type { CartItem, Product } from '~~/shared/types'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)
  const auth = useAuthStore()
  
  const total = computed(() => 
    items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  const itemCount = computed(() => 
    items.value.reduce((count, item) => count + item.quantity, 0)
  );

  const loadFromStorage = (): void => {    
    if (import.meta.client) { // Check if we are on the client side
      const guestCart = localStorage.getItem('guest-cart');
      items.value = guestCart ? JSON.parse(guestCart) : [];
    } else {
      items.value = []; // Default value for SSR
    }
  };

  // Load initial cart
  const loadCart = async (): Promise<void> => {    
    loading.value = true;
    try {
      if (auth.isAuthenticated) {
        const { data } = await useFetch('/api/cart');
        items.value = data.value?.items || [];
      } else {
        loadFromStorage(); // Load from localStorage for guest.
      }
    }
    finally{
      loading.value = false;
    }
  };

  // Add item to cart
  const addItem = async (
    product: Product,
    quantity: number = 1
  ): Promise<void> => {
    if (!auth.isAuthenticated) {
      // Guest mode
      const existingItem = items.value.find(item => 
        item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.value.push({ product, quantity });
      }
      
      localStorage.setItem('guest-cart', JSON.stringify(items.value));
      return;
    };

    // Authenticated user
    if (product.stock < quantity) {
      throw new Error('Stock insuficiente');
    };

    const existingItem = items.value.find(item => 
      item.product.id === product.id
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        throw new Error('No hay suficiente stock');
      }
      existingItem.quantity = newQuantity;
    } else {
      items.value.push({ product, quantity });
    }
    
    await syncCart();
  }

  // Update quantity
  const updateQuantity = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    const item = items.value.find(item => 
      item.product.id === productId
    );
    
    if (item) {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }
      
      if (auth.isAuthenticated && quantity > item.product.stock) {
        throw new Error('No hay suficiente stock');
      }
      
      item.quantity = quantity;
      
      if (auth.isAuthenticated) {
        await syncCart();
      } else {
        localStorage.setItem('guest-cart', JSON.stringify(items.value));
      }
    }
  };

  // Delete item
  const removeItem = async (
    productId: string,
  ): Promise<void> => {
    items.value = items.value.filter(item => 
      !(item.product.id === productId)
    );
    
    if (auth.isAuthenticated) {
      await syncCart();
    } else {
      localStorage.setItem('guest-cart', JSON.stringify(items.value));
    }
  };

  // Synchronize with server
  const syncCart = async (): Promise<void> => {    
    loading.value = true;
    try {
      await useFetch('/api/cart/update', {
        method: 'POST',
        body: { items: items.value }
      });
    } finally {
      loading.value = false;
    }
  }

  // Clear cart
  const clearCart = async (): Promise<void> => {
    items.value = [];
    
    if (auth.isAuthenticated) {
      await syncCart();
    } else {
      localStorage.removeItem('guest-cart');
    }
  }

  // Migrate cart from guest to user
  const migrateGuestCart = async (): Promise<void> => {
    const guestCart = localStorage.getItem('guest-cart');
    if (guestCart) {
      const guestItems: CartItem[] = JSON.parse(guestCart);
      items.value = guestItems;
      await syncCart();
      localStorage.removeItem('guest-cart');
    }
  }

  return {
    items,
    total,
    itemCount,
    loading,
    loadCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    migrateGuestCart,
  }
}, { 
  historyEnabled: true
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}