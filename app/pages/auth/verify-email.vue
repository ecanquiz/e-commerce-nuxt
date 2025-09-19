<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next';

definePageMeta({
  ssr: false 
})

const route = useRoute()
const token = ref(route.query.token as string)
const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')
const retryCount = ref(0)
const maxRetries = 3
const retryDelay = 1000 // 1 segundo entre intentos

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
      await verifyEmail();
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

async function verifyEmail() {
  console.log(`🔄 Intento ${retryCount.value + 1} de ${maxRetries}`)
  
  // Use $fetch instead of useFetch for better error handling
  const response = await $fetch(`/api/auth/verify-email?token=${encodeURIComponent(token.value)}`, {
    retry: 0, // Disable automatic retry of $fetch
    onRequestError: ({ error }) => {
      console.error('Error de request:', error)
      throw error
    },
    onResponseError: ({ response }) => {
      console.error('Error de response:', response._data)
      throw response._data
    }
  })
  
  status.value = 'success'
  message.value = response.message || 'Email verificado correctamente'
  console.log('✅ Verificación exitosa')
}
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