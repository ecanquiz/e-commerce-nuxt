import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  // Rutas protegidas
  const protectedRoutes = ['/dashboard', '/profile']
  const isProtected = protectedRoutes.some(route => 
    to.path.startsWith(route)
  )

  if (isProtected && !auth.isAuthenticated) {
    return navigateTo('/login?redirect=' + to.path)
  }
})
