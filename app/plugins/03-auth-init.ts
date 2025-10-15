import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';

export default defineNuxtPlugin(async () => {
  if (import.meta.client) {    
    const authStore = useAuthStore();
    const cartStore = useCartStore();

    authStore.hydrateFromStorage();

    await cartStore.loadCart();

    if (authStore.token) {      
      if (!authStore.user) {
        try {
          const success = await authStore.loadUser();
          if (!success) {
            console.warn('❌ Token invalid, clearing auth data');
            authStore.clearAuthData();
          } // else { console.log('✅ User authenticated:', authStore.user!.email); }
        } catch (error) {
          console.error('❌ Error loading user:', error);
          authStore.clearAuthData();
        }
      } // else { console.log('✅ User already exists, no API call needed'); }
    } // else { console.log('🔐 No token found, guest mode'); }

    /*console.log('🎉 Auth initialization complete', {
      user: authStore.user?.email,
      hasToken: !!authStore.token,
      isAuthenticated: authStore.isAuthenticated,
      cartItems: cartStore.items.length
    });*/
  }
});

