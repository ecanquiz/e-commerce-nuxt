import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();

  // 1. First hydrate from localStorage (NO API)
  authStore.hydrateFromStorage();

  // 2. Then load cart (always)
  await cartStore.loadCart();

      // 3. If there is a token, verify with API
    if (authStore.token) {
      try {
        const authSuccess = await authStore.loadUser();
        
        if (!authSuccess) {
          //Invalid token, clear auth but keep cart
          authStore.clearAuthData();
          console.warn('Invalid token, session cleared');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authStore.clearAuthData();
      }
    }

    console.log('Auth initialization complete:', {
      hasUser: !!authStore.user,
      hasToken: !!authStore.token,
      cartItems: cartStore.items.length
    });  
});
