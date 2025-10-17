<script setup lang="ts">

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

      <div class="text-center">
        <p class="text-xs text-gray-500">
          Al registrarte, aceptas nuestros 
          <!--NuxtLink to="/terms" class="text-burgundy-600 hover:text-burgundy-500">Términos y Condiciones</NuxtLink>
          y
          <NuxtLink to="/privacy" class="text-burgundy-600 hover:text-burgundy-500">Política de Privacidad</NuxtLink-->.
        </p>
      </div>
    </div>
  </div>
</template>

