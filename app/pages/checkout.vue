<script setup lang="ts">
import { CreditCard, MapPin, Lock, ArrowLeft } from 'lucide-vue-next';
import { useCartStore } from '~/store/cart';
import { useAuthStore } from '~/store/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const items = computed(() => cartStore.items);
const total = computed(() => cartStore.total);

const loading = ref(false);
const errors = ref<Record<string, string>>({});

const formData = reactive({
  firstName: authStore.user?.name?.split(' ')[0] || '',
  lastName: authStore.user?.name?.split(' ')[1] || '',
  email: authStore.user?.email || '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardName: '',
});

// Cargar carrito al montar el componente
onMounted(async () => {
  await cartStore.loadCart();
});

const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.length ? parts.join(' ') : v;
};

const handleCardNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  formData.cardNumber = formatCardNumber(target.value);
  clearError('cardNumber');
};

const clearError = (field: string) => {
  if (errors.value[field]) {
    errors.value[field] = '';
  }
};

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  const requiredFields = [
    'firstName', 'lastName', 'email', 'phone', 'address', 
    'city', 'state', 'zipCode', 'cardNumber', 'expiryDate', 'cvv', 'cardName'
  ];
  
  requiredFields.forEach(field => {
    if (!formData[field as keyof typeof formData]) {
      newErrors[field] = 'Este campo es requerido';
    }
  });
  
  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email inválido';
  }
  
  if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length !== 16) {
    newErrors.cardNumber = 'Número de tarjeta inválido';
  }
  
  if (formData.cvv && formData.cvv.length !== 3) {
    newErrors.cvv = 'CVV debe tener 3 dígitos';
  }
  
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  loading.value = true;
  
  try {
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Limpiar carrito y redirigir
    await cartStore.clearCart();
    await navigateTo('/order-success');
  } catch (error) {
    console.error('Error en el pago:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div v-if="items.length === 0" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h2>
        <NuxtLink
          to="/products"
          class="bg-burgundy-600 text-white px-6 py-3 rounded-lg hover:bg-burgundy-700 transition-colors"
        >
          Continuar comprando
        </NuxtLink>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <NuxtLink
          to="/cart"
          class="flex items-center text-burgundy-600 hover:text-burgundy-700 mb-4"
        >
          <ArrowLeft class="h-5 w-5 mr-2" />
          Volver al carrito
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Checkout Form -->
          <div class="space-y-8">
            <!-- Shipping Information -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin class="h-6 w-6 mr-2 text-burgundy-600" />
                Información de Envío
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    v-model="formData.firstName"
                    @input="clearError('firstName')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.firstName ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    v-model="formData.lastName"
                    @input="clearError('lastName')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.lastName ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    v-model="formData.email"
                    @input="clearError('email')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.email ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    v-model="formData.phone"
                    @input="clearError('phone')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.phone ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    v-model="formData.address"
                    @input="clearError('address')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.address ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    v-model="formData.city"
                    @input="clearError('city')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.city ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Provincia
                  </label>
                  <select
                    name="state"
                    v-model="formData.state"
                    @change="clearError('state')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.state ? 'border-red-500' : 'border-gray-300']"
                  >
                    <option value="">Seleccionar provincia</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                  </select>
                  <p v-if="errors.state" class="text-red-500 text-sm mt-1">{{ errors.state }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    v-model="formData.zipCode"
                    @input="clearError('zipCode')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.zipCode ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.zipCode" class="text-red-500 text-sm mt-1">{{ errors.zipCode }}</p>
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard class="h-6 w-6 mr-2 text-burgundy-600" />
                Información de Pago
              </h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    v-model="formData.cardNumber"
                    @input="handleCardNumberInput"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.cardNumber" class="text-red-500 text-sm mt-1">{{ errors.cardNumber }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nombre en la Tarjeta
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    v-model="formData.cardName"
                    @input="clearError('cardName')"
                    :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                            errors.cardName ? 'border-red-500' : 'border-gray-300']"
                  />
                  <p v-if="errors.cardName" class="text-red-500 text-sm mt-1">{{ errors.cardName }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Vencimiento
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      v-model="formData.expiryDate"
                      @input="clearError('expiryDate')"
                      placeholder="MM/AA"
                      maxlength="5"
                      :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300']"
                    />
                    <p v-if="errors.expiryDate" class="text-red-500 text-sm mt-1">{{ errors.expiryDate }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      v-model="formData.cvv"
                      @input="clearError('cvv')"
                      placeholder="123"
                      maxlength="3"
                      :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500', 
                              errors.cvv ? 'border-red-500' : 'border-gray-300']"
                    />
                    <p v-if="errors.cvv" class="text-red-500 text-sm mt-1">{{ errors.cvv }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
            
            <div class="space-y-4 mb-6">
              <div
                v-for="item in items"
                :key="`${item.product.id}-${item.vineyard ? item.vineyard.id : 'falta el item.vineyard.id'}`"
                class="flex items-center space-x-4"
              >
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="h-16 w-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">{{ item.product.name }}</h3>
                  <p class="text-sm text-gray-600">{{ item.vineyard ? item.vineyard.name : 'falta item.vineyard.name'}}</p>
                  <p class="text-sm text-gray-600">Cantidad: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">
                    ${{ (item.product.price * item.quantity).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
            
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">${{ total.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Envío</span>
                <span class="text-gray-900">Gratis</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Impuestos</span>
                <span class="text-gray-900">${{ Math.round(total * 0.21).toLocaleString() }}</span>
              </div>
              <div class="border-t pt-2">
                <div class="flex justify-between">
                  <span class="text-lg font-bold text-gray-900">Total</span>
                  <span class="text-lg font-bold text-burgundy-600">
                    ${{ Math.round(total * 1.21).toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              :disabled="loading"
              :class="['w-full bg-burgundy-600 text-white py-3 rounded-lg hover:bg-burgundy-700 transition-colors font-semibold mt-6 flex items-center justify-center', 
                      loading ? 'opacity-50 cursor-not-allowed' : '']"
            >
              <template v-if="loading">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Procesando...
              </template>
              <template v-else>
                <Lock class="h-5 w-5 mr-2" />
                Finalizar Compra
              </template>
            </button>
            
            <div class="mt-4 text-center">
              <p class="text-xs text-gray-500">
                Tu información está protegida con encriptación SSL
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

