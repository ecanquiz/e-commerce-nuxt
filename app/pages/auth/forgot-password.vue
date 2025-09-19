<script setup lang="ts">
import { Mail, ArrowLeft, CheckCircle } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth'
definePageMeta({
  // layout: 'auth',
  // middleware: 'guest'
});

const email = ref('');
const isSubmitted = ref(false);
const loading = ref(false);
const error = ref('');
const authStore = useAuthStore();

// Validación de email
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Methods
const handleSubmit = async () => {
  error.value = '';

  if (!email.value) {
    error.value = 'Por favor ingresa tu email';
    return;
  }

  if (!isValidEmail(email.value)) {
    error.value = 'Por favor ingresa un email válido';
    return;
  }

  loading.value = true;

  try {
    await authStore.forgotPassword(email.value);
    isSubmitted.value = true;
  } catch (err: any) {
    error.value = err.message || 'Error al enviar el email de recuperación';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  isSubmitted.value = false;
  email.value = '';
  error.value = '';
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Estado de éxito -->
      <div v-if="isSubmitted" class="text-center">
        <CheckCircle class="mx-auto h-16 w-16 text-green-500" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Email Enviado
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Hemos enviado las instrucciones para restablecer tu contraseña a:
        </p>
        <p class="mt-1 text-sm font-medium text-burgundy-600">{{ email }}</p>
        <p class="mt-4 text-sm text-gray-600">
          Revisa tu bandeja de entrada y sigue las instrucciones del email.
          Si no lo encuentras, revisa tu carpeta de spam.
        </p>
      
        <div class="text-center space-y-4 mt-6">
          <NuxtLink
            to="/login"
            class="inline-flex items-center text-burgundy-600 hover:text-burgundy-500 font-medium"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            Volver al inicio de sesión
          </NuxtLink>
          
          <div>
            <button
              @click="resetForm"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              ¿No recibiste el email? Intentar de nuevo
            </button>
          </div>
        </div>
      </div>

      <!-- Formulario de recuperación -->
      <div v-else>
        <div class="text-center">
          <Mail class="mx-auto h-12 w-12 text-burgundy-600" />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Recuperar Contraseña
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Ingresa tu email y te enviaremos las instrucciones para restablecer tu contraseña
          </p>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                required
                class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 focus:z-10 sm:text-sm"
                placeholder="tu@email.com"
                :disabled="loading"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-burgundy-600 hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Enviando...' : 'Enviar Instrucciones' }}
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
