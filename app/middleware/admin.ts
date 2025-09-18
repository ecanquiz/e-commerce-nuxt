import { useAuthStore } from '@/store/auth';
export default defineNuxtRouteMiddleware((to, from) => {

  const auth = useAuthStore(); 
  
  if (!auth.user || auth.user.role !== 'admin') {
    return navigateTo('/');
  }
});