import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();

  if (import.meta.client) {
    if (authStore.isAuthenticated) {
      await Promise.allSettled([
        authStore.loadUser(),
        //cartStore.loadCart()
      ]);
    } else {
      //await cartStore.loadCart();
    }
  }
});
