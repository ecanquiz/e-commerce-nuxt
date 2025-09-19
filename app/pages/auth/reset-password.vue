<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

definePageMeta({
  ssr: false
});

const route = useRoute()
const token = ref(route.query.token as string)
const newPassword = ref('')
const confirmPassword = ref('')
const isSubmitted = ref(false)
const loading = ref(false)
const error = ref('')
const authStore = useAuthStore()

onMounted(() => {
  if (!token.value) {
    error.value = 'Token de verificación inválido'
  }
})

const handleSubmit = async () => {
  error.value = ''

  if (!token.value) {
    error.value = 'Token inválido'
    return
  }

  if (newPassword.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true

  try {
    await authStore.resetPassword(token.value, newPassword.value)
    isSubmitted.value = true
  } catch (err: any) {
    error.value = err.message || 'Error actualizando contraseña'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Estado de éxito -->
      <div v-if="isSubmitted" class="text-center">
        <CheckCircle class="mx-auto h-16 w-16 text-green-500" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Contraseña Actualizada
        </h2>
        <p class="mt-4 text-sm text-gray-600">
          Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.
        </p>
      
        <div class="text-center mt-6">
          <NuxtLink
            to="/auth/login"
            class="inline-flex items-center text-burgundy-600 hover:text-burgundy-500 font-medium"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            Volver al inicio de sesión
          </NuxtLink>
        </div>
      </div>

      <!-- Formulario de reset -->
      <div v-else>
        <div class="text-center">
          <Lock class="mx-auto h-12 w-12 text-burgundy-600" />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Nueva Contraseña
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <div class="space-y-4">
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700">
                Nueva Contraseña
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  v-model="newPassword"
                  type="password"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 focus:z-10 sm:text-sm"
                  placeholder="Nueva contraseña"
                  :disabled="loading"
                />
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmar contraseña"
                  :disabled="loading"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading || !token"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-burgundy-600 hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Actualizando...' : 'Actualizar Contraseña' }}
            </button>
          </div>

          <div class="text-center">
            <NuxtLink
              to="/auth/login"
              class="inline-flex items-center text-burgundy-600 hover:text-burgundy-500 font-medium"
            >
              <ArrowLeft class="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
