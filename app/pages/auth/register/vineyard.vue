<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import {
  Grape,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  ShoppingBag,
  ArrowRight,
  Check
} from 'lucide-vue-next';
import { useAuthStore } from '@/store/auth';


definePageMeta({
  //layout: 'auth', // Si tienes un layout específico para autenticación
  //middleware: 'guest' // Middleware para redirigir usuarios autenticados
});


// Types
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  vineyardName: string;
  location: string;
  phone: string;
  description: string;
}

const router = useRouter()
const auth = useAuthStore()
const { t } = useI18n()
//const { $auth } = useNuxtApp();

// Reactive state
const formData = reactive<FormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  vineyardName: '',
  location: '',
  phone: '',
  description: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref('');
const loading = ref(false);



// Methods
const handleSubmit = async () => {
  error.value = '';

  if (formData.password !== formData.confirmPassword) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }

  if (formData.password.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres';
    return;
  }

  loading.value = true;

  try {
    await auth.register({
       name: formData.name,
       email: formData.email,
       password: formData.password,
       role: 'vineyard',
       vineyardName: formData.vineyardName,
       location: formData.location,
       phone: formData.phone,
       description: formData.description
    })
    await router.push('/')
    
    // Simulación de registro exitoso
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await router.push('/dashboard/vineyard');
  } catch (err) {
    error.value = 'Error al crear la cuenta';
    console.error('Registration error:', err);
  } finally {
    loading.value = false;
  }
};

const signInWithGoogle = async () => {
  try {
    // Implementar autenticación con Google
    console.log('Google sign in clicked');
    // await $auth.signInWithGoogle();
  } catch (err) {
    error.value = 'Error al iniciar sesión con Google';
    console.error('Google sign in error:', err);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8">
      <div class="text-center">
        <Grape class="mx-auto h-12 w-12 text-burgundy-600" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Crear tu Cuenta
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Elige el tipo de cuenta que mejor se adapte a ti
        </p>
        
        <!-- Elegant Account Type Selector -->
        <div class="mt-8 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <!-- Cliente Button -->
            <NuxtLink to="/auth/register/customer" class="relative">
              <div class="relative flex flex-col items-center p-6 bg-gradient-to-br from-burgundy-50 to-burgundy-100 border-2 border-burgundy-200 rounded-xl cursor-pointer hover:from-burgundy-100 hover:to-burgundy-200 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <div class="w-16 h-16 bg-burgundy-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-bold text-burgundy-900 mb-2">Cliente</h3>
                <p class="text-sm text-burgundy-700 text-center leading-relaxed">
                  Descubre y compra los mejores vinos directamente de los viñedos
                </p>
                <div class="mt-4 flex items-center text-burgundy-600 font-medium">
                  <span class="text-sm">Continuar como Cliente</span>
                  <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </NuxtLink>

            <!-- Viñedo Button -->
            <div class="relative">
              <input
                type="radio"
                id="vineyard"
                name="accountType"
                value="vineyard"
                checked
                readonly
                class="sr-only"
              />
              <label
                for="vineyard"
                class="relative flex flex-col items-center p-6 bg-gradient-to-br from-gold-50 to-gold-100 border-2 border-gold-200 rounded-xl cursor-pointer hover:from-gold-100 hover:to-gold-200 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <div class="absolute top-3 right-3">
                  <div class="w-6 h-6 bg-gold-600 rounded-full flex items-center justify-center">
                    <Check class="w-4 h-4 text-white" />
                  </div>
                </div>
                <div class="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Grape class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-bold text-gold-900 mb-2">Viñedo</h3>
                <p class="text-sm text-gold-700 text-center leading-relaxed">
                  Vende tus vinos y gestiona tu viñedo en nuestra plataforma
                </p>
                <div class="mt-4 flex items-center text-gold-600 font-medium">
                  <span class="text-sm">Registrar mi Viñedo</span>
                  <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </label>
            </div>
          </div>
        </div>

        <p class="mt-4 text-sm text-gray-600">
          ¿Ya tienes cuenta?
          <NuxtLink
            to="/login"
            class="font-medium text-burgundy-600 hover:text-burgundy-500 ml-1"
          >
            Iniciar sesión
          </NuxtLink>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Información Personal -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Información Personal</h3>
            
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Nombre del responsable
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  v-model="formData.name"
                  name="name"
                  type="text"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                  placeholder="Tu nombre completo"
                />
              </div>
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
                  v-model="formData.email"
                  name="email"
                  type="email"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  v-model="formData.phone"
                  name="phone"
                  type="tel"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  v-model="formData.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" class="h-5 w-5 text-gray-400" />
                  <Eye v-else class="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  name="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                  placeholder="Confirmar contraseña"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <EyeOff v-if="showConfirmPassword" class="h-5 w-5 text-gray-400" />
                  <Eye v-else class="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <!-- Información del Viñedo -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Información del Viñedo</h3>
            
            <div>
              <label for="vineyardName" class="block text-sm font-medium text-gray-700">
                Nombre del viñedo
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Grape class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="vineyardName"
                  v-model="formData.vineyardName"
                  name="vineyardName"
                  type="text"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                  placeholder="Bodega Los Viñedos"
                />
              </div>
            </div>

            <div>
              <label for="location" class="block text-sm font-medium text-gray-700">
                Ubicación
              </label>
              <div class="mt-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  v-model="formData.location"
                  name="location"
                  type="text"
                  required
                  class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                  placeholder="Mendoza, Argentina"
                />
              </div>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">
                Descripción del viñedo
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                name="description"
                rows="4"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                placeholder="Describe tu viñedo, su historia, características especiales..."
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-burgundy-600 hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creando cuenta...' : 'Crear Cuenta de Viñedo' }}
          </button>
        </div>

        <div class="text-center">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">O continúa con</span>
            </div>
          </div>
          
          <button
            type="button"
            class="mt-4 w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500"
            @click="signInWithGoogle"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

