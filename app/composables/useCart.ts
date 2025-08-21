import type { CartItem, Product, Vineyard } from '~~/shared/types';

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []);

  const addItem = (product: Product, vineyard: Vineyard, quantity: number = 1) => {
    const existingItemIndex = cart.value.findIndex(
      item => item.product.id === product.id && item.vineyard.id === vineyard.id
    );

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si el item ya existe
      // @ts-ignore
      cart.value[existingItemIndex].quantity += quantity;
    } else {
      // Agregar nuevo item
      cart.value.push({
        product,
        vineyard,
        quantity
      });
    }
  };

  const removeItem = (productId: string, vineyardId: string) => {
    const index = cart.value.findIndex(
      item => item.product.id === productId && item.vineyard.id === vineyardId
    );
    
    if (index >= 0) {
      cart.value.splice(index, 1);
    }
  };

  const updateQuantity = (productId: string, vineyardId: string, quantity: number) => {
    const item = cart.value.find(
      item => item.product.id === productId && item.vineyard.id === vineyardId
    );
    
    if (item) {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const totalItems = computed(() => 
    cart.value.reduce((total, item) => total + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  return {
    cart: readonly(cart),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
};