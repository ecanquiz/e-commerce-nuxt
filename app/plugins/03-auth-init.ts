import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';

export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    console.log('🔄 Plugin 02-auth-init started...');
    
    const authStore = useAuthStore();
    const cartStore = useCartStore();

    // 1. Mostrar estado inicial
    console.log('📊 Initial state:', {
      token: authStore.token,
      user: authStore.user,
      isHydrated: authStore._isHydrated
    });

    // 2. Hidratar desde storage
    authStore.hydrateFromStorage();
    console.log('📊 After hydration:', {
      token: authStore.token,
      user: authStore.user,
      isHydrated: authStore._isHydrated
    });

    // 3. Cargar carrito
    await cartStore.loadCart();
    console.log('🛒 Cart loaded:', cartStore.items.length, 'items');

    // 4. Verificar autenticación
    if (authStore.token) {
      console.log('🔐 Token found, verifying with API...');
      
      if (!authStore.user) {
        console.log('👤 No user data, loading from API...');
        try {
          const success = await authStore.loadUser();
          if (success) {
            console.log('✅ User authenticated:', authStore.user!.email);
          } else {
            console.warn('❌ Token invalid, clearing auth data');
            authStore.clearAuthData();
          }
        } catch (error) {
          console.error('❌ Error loading user:', error);
          authStore.clearAuthData();
        }
      } else {
        console.log('✅ User already exists, no API call needed');
      }
    } else {
      console.log('🔐 No token found, guest mode');
    }

    console.log('🎉 Auth initialization complete', {
      user: authStore.user?.email,
      hasToken: !!authStore.token,
      isAuthenticated: authStore.isAuthenticated,
      cartItems: cartStore.items.length
    });
  }
});