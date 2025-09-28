<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth'

definePageMeta({
  ssr: false 
})

const route = useRoute()
const authStore = useAuthStore()
const token = ref(route.query.token as string)
const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')
const retryCount = ref(0)
const maxRetries = 3
const retryDelay = 1000 // 1 second between attempts

onMounted(async () => {
  if (!token.value) {
    status.value = 'error'
    message.value = 'Token de verificación requerido'
    return
  }

  await verifyEmailWithRetry()
})

async function verifyEmailWithRetry() {
  while (retryCount.value < maxRetries && status.value === 'loading') {
    try {
      const result = await authStore.verifyEmail(token.value)
      status.value = 'success'
      message.value = result.message || 'Email verificado correctamente'
      console.log('✅ Verificación exitosa')
      break; // Exit if successful
    } catch (error) {
      retryCount.value++;
      
      if (retryCount.value >= maxRetries) {
        status.value = 'error';
        message.value = 'Error después de múltiples intentos. Por favor contacta soporte.';
        break;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * retryCount.value));
    }
  }
}

/*async function verifyEmail() {
  console.log(`🔄 Intento ${retryCount.value + 1} de ${maxRetries}`) 
  
  const { $encryptedFetch } = useNuxtApp(); // USE $encryptedFetch with Nitro endpoint
  const encryptedFetch = $encryptedFetch as (url: string, options?: any) => Promise<any>;
  
  try {
    const response = await encryptedFetch(`/api/auth/verify-email?token=${encodeURIComponent(token.value)}`, {
      method: 'GET',
      retry: 0
    });
    
    status.value = 'success'
    message.value = response.message || 'Email verificado correctamente'
    console.log('✅ Verificación exitosa')
    
  } catch (error: any) {
    console.error('Error verificando email:', error)
    throw error
  }
}*/

</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-2xl font-bold mb-4 text-gray-600">Verificación de Email</h1>
      
      <div v-if="status === 'loading'" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Verificando tu email...</p>
        <p v-if="retryCount > 0" class="text-sm text-gray-500 mt-2">
          Intento {{ retryCount + 1 }} de {{ maxRetries }}
        </p>
      </div>
      
      <div v-else-if="status === 'success'" class="text-green-600 text-center">
        <CheckCircleIcon class="h-12 w-12 mx-auto mb-4" />
        <p class="font-semibold">{{ message }}</p>
        <NuxtLink to="/auth/login" class="text-blue-600 hover:underline mt-4 inline-block">
          Ir al login
        </NuxtLink>
      </div>
      
      <div v-else class="text-red-600 text-center">
        <XCircleIcon class="h-12 w-12 mx-auto mb-4" />
        <p class="font-semibold">{{ message }}</p>
        <button 
          v-if="retryCount < maxRetries && status === 'error'"
          @click="verifyEmailWithRetry"
          class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Reintentar
        </button>
        <NuxtLink to="/" class="text-blue-600 hover:underline mt-4 inline-block">
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>