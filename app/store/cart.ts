import type { CartItem } from '~/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const addItem = (product: any) => { /* ... */ };
  return { items, addItem };
});