<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <CheckCircle class="mx-auto h-20 w-20 text-green-500" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          ¡Compra Exitosa!
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Tu pedido ha sido procesado correctamente
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div class="border-b pb-4">
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Número de Pedido
          </h3>
          <p class="text-2xl font-bold text-burgundy-600">
            {{ orderNumber }}
          </p>
        </div>
        
        <div class="space-y-3">
          <div class="flex items-center text-gray-600">
            <Mail class="h-5 w-5 mr-3" />
            <span class="text-sm">
              Recibirás un email de confirmación en breve
            </span>
          </div>
          
          <div class="flex items-center text-gray-600">
            <Package class="h-5 w-5 mr-3" />
            <span class="text-sm">
              Tu pedido será procesado en 1-2 días hábiles
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <NuxtLink
          to="/products"
          class="w-full bg-burgundy-600 text-white py-3 px-4 rounded-lg hover:bg-burgundy-700 transition-colors font-semibold flex items-center justify-center"
        >
          Continuar Comprando
          <ArrowRight class="h-5 w-5 ml-2" />
        </NuxtLink>
        
        <NuxtLink
          to="/"
          class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
        >
          Volver al Inicio
        </NuxtLink>
      </div>

      <div class="text-center">
        <p class="text-xs text-gray-500">
          ¿Necesitas ayuda? <NuxtLink to="/contact" class="text-burgundy-600 hover:text-burgundy-500">Contáctanos</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-vue-next';


definePageMeta({
  // middleware: 'order-success'
});

// Opcional: Si necesitas lógica adicional a nivel de página
// Por ejemplo, verificar que el usuario viene de un proceso de checkout
/*import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Verificar si el usuario viene de un proceso de checkout válido
  // Puedes usar el store o localStorage para esta verificación
  const fromCheckout = localStorage.getItem('fromCheckout');
  
  if (!fromCheckout) {
    // Redirigir si no viene del checkout
    router.push('/');
  } else {
    // Limpiar el flag después de la verificación
    localStorage.removeItem('fromCheckout');
  }
});
*/


// Generar número de pedido único
const orderNumber = ref('VY-' + Math.random().toString(36).substr(2, 9).toUpperCase());

// Opcional: Si quieres obtener el número de pedido de la ruta o store
// const route = useRoute();
// const orderNumber = ref(route.params.orderId || 'VY-' + Math.random().toString(36).substr(2, 9).toUpperCase());

// Opcional: Si quieres guardar el pedido en el store
// const orderStore = useOrderStore();
// orderStore.setCurrentOrder(orderNumber.value);



</script>