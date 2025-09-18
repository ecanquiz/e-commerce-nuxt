export default defineNuxtRouteMiddleware((to, from) => {
  // Verificar si viene del proceso de checkout
  const fromCheckout = localStorage.getItem('fromCheckout');
  
  if (!fromCheckout) {
    return navigateTo('/');
  }
  
  // Limpiar el flag después de la verificación
  localStorage.removeItem('fromCheckout');
});
