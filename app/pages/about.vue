<script setup lang="ts">
import { Award, Users, Target, Heart } from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-burgundy-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Acerca de viñedosya
          </h1>
          <p class="text-xl text-gray-200 max-w-3xl mx-auto">
            Conectamos a los amantes del vino con los mejores viñedos de Argentina, 
            creando experiencias únicas y promoviendo la cultura vitivinícola nacional.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
            <p class="text-lg text-gray-700 mb-6">
              En viñedosya, creemos que cada botella de vino cuenta una historia única. 
              Nuestra misión es conectar directamente a los productores con los consumidores, 
              eliminando intermediarios y garantizando que cada vino llegue a tu mesa con 
              toda su autenticidad y calidad.
            </p>
            <p class="text-lg text-gray-700">
              Trabajamos incansablemente para promover la rica tradición vitivinícola 
              argentina y hacer que los mejores vinos del país sean accesibles para todos.
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Viñedos argentinos"
              class="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
          <p class="text-xl text-gray-600">
            Los principios que guían nuestro trabajo diario
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-burgundy-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Award class="h-10 w-10 text-burgundy-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Calidad</h3>
            <p class="text-gray-600">
              Seleccionamos cuidadosamente cada viñedo para garantizar la máxima calidad en todos nuestros productos.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-gold-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Users class="h-10 w-10 text-gold-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Comunidad</h3>
            <p class="text-gray-600">
              Construimos una comunidad sólida que conecta productores, expertos y amantes del vino.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-green-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Target class="h-10 w-10 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Transparencia</h3>
            <p class="text-gray-600">
              Ofrecemos información completa y honesta sobre cada producto y productor en nuestra plataforma.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-red-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Heart class="h-10 w-10 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Pasión</h3>
            <p class="text-gray-600">
              Compartimos la pasión por el vino y trabajamos para transmitir esa emoción en cada experiencia.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
          <p class="text-xl text-gray-600">
            Profesionales apasionados por el vino y la tecnología
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <img
              src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="CEO"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-bold text-gray-900 mb-2">María González</h3>
            <p class="text-burgundy-600 mb-2">CEO & Fundadora</p>
            <p class="text-gray-600">
              Sommelier certificada con más de 15 años de experiencia en la industria vitivinícola.
            </p>
          </div>
          
          <div class="text-center">
            <img
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="CTO"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-bold text-gray-900 mb-2">Carlos Rodríguez</h3>
            <p class="text-burgundy-600 mb-2">CTO</p>
            <p class="text-gray-600">
              Ingeniero en sistemas especializado en plataformas de e-commerce y experiencia de usuario.
            </p>
          </div>
          
          <div class="text-center">
            <img
              src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Head of Operations"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-bold text-gray-900 mb-2">Ana Martínez</h3>
            <p class="text-burgundy-600 mb-2">Directora de Operaciones</p>
            <p class="text-gray-600">
              Experta en logística y relaciones con productores, garantiza la calidad en cada proceso.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-burgundy-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Nuestro Impacto</h2>
          <p class="text-xl text-gray-200">
            Números que reflejan nuestro compromiso con la excelencia
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">50+</div>
            <div class="text-gray-300">Viñedos Partner</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">500+</div>
            <div class="text-gray-300">Vinos Disponibles</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">10k+</div>
            <div class="text-gray-300">Clientes Satisfechos</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">98%</div>
            <div class="text-gray-300">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

