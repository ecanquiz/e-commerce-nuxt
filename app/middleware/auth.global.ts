import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  
  // Routes that require authentication
  const protectedRoutes = ['/checkout', '/profile', '/orders'];

  const isProtected = protectedRoutes.some(route => 
    to.path.startsWith(route)
  );

  if (isProtected && !authStore.isAuthenticated) {
    return navigateTo(`/login?redirect=${to.path}`)
  }

  // For API calls, ensure cart is loaded
  if (import.meta.client && to.path === '/cart') {
    cartStore.loadCart();
  }
});
