<script setup lang="ts">
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-vue-next';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const handleSubmit = () => {
  // Handle form submission here
  console.log('Form submitted:', formData);
  // Reset form
  formData.name = '';
  formData.email = '';
  formData.subject = '';
  formData.message = '';
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-burgundy-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Contactanos
          </h1>
          <p class="text-xl text-gray-200 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta, 
            sugerencia o si necesitas asistencia con tu experiencia en viñedosya.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form and Info -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                  v-model="formData.name"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                  v-model="formData.email"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                  v-model="formData.subject"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="general">Consulta General</option>
                  <option value="support">Soporte Técnico</option>
                  <option value="vineyard">Registrar mi Viñedo</option>
                  <option value="partnership">Alianzas Comerciales</option>
                  <option value="feedback">Sugerencias</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                  v-model="formData.message"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                class="w-full bg-burgundy-600 text-white py-3 px-4 rounded-md hover:bg-burgundy-700 transition-colors font-semibold flex items-center justify-center"
              >
                <Send class="h-5 w-5 mr-2" />
                Enviar Mensaje
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
              
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="bg-burgundy-100 rounded-full p-3">
                    <Mail class="h-6 w-6 text-burgundy-600" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Email</h3>
                    <p class="text-gray-600">info@viñedosya.com</p>
                    <p class="text-gray-600">soporte@viñedosya.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="bg-burgundy-100 rounded-full p-3">
                    <Phone class="h-6 w-6 text-burgundy-600" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Teléfono</h3>
                    <p class="text-gray-600">+54 11 4567-8900</p>
                    <p class="text-gray-600">+54 11 4567-8901 (Soporte)</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="bg-burgundy-100 rounded-full p-3">
                    <MapPin class="h-6 w-6 text-burgundy-600" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Dirección</h3>
                    <p class="text-gray-600">Av. Corrientes 1234</p>
                    <p class="text-gray-600">Buenos Aires, Argentina</p>
                    <p class="text-gray-600">C1043AAZ</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="bg-burgundy-100 rounded-full p-3">
                    <Clock class="h-6 w-6 text-burgundy-600" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Horarios de Atención</h3>
                    <p class="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                    <p class="text-gray-600">Sábados: 9:00 - 14:00</p>
                    <p class="text-gray-600">Domingos: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ Section -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
              
              <div class="space-y-4">
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">¿Cómo puedo registrar mi viñedo?</h3>
                  <p class="text-gray-600 text-sm">
                    Puedes registrar tu viñedo creando una cuenta como "Propietario de Viñedo" 
                    o contactándonos directamente para recibir asistencia personalizada.
                  </p>
                </div>
                
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">¿Hacen envíos a todo el país?</h3>
                  <p class="text-gray-600 text-sm">
                    Sí, realizamos envíos a toda Argentina. Los tiempos de entrega varían 
                    según la ubicación y el tipo de producto.
                  </p>
                </div>
                
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">¿Puedo cancelar mi pedido?</h3>
                  <p class="text-gray-600 text-sm">
                    Puedes cancelar tu pedido dentro de las primeras 2 horas después de realizarlo, 
                    siempre que no haya sido procesado para envío.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h2>
          <p class="text-xl text-gray-600">
            Visítanos en nuestras oficinas en el corazón de Buenos Aires
          </p>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-4">
          <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <div class="text-center text-gray-500">
              <MapPin class="h-16 w-16 mx-auto mb-4" />
              <p class="text-lg font-semibold">Mapa Interactivo</p>
              <p class="text-sm">Av. Corrientes 1234, Buenos Aires</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
