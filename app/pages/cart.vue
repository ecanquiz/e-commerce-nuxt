<script setup lang="ts">
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-vue-next';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();
const { t } = useI18n()


// Cargar carrito al montar el componente
onMounted(async () => {
  await cartStore.loadCart();
});

const items = computed(() => cartStore.items);
const total = computed(() => cartStore.total);

const updateQuantity = async (productId: string, vineyardId: string, quantity: number) => {
  await cartStore.updateQuantity(productId, vineyardId, quantity);
};

const removeItem = async (productId: string, vineyardId: string) => {
  await cartStore.removeItem(productId, vineyardId);
};

const clearCart = async () => {
  await cartStore.clearCart();
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="items.length === 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center py-12">
        <ShoppingCart class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          {{ t('cart.empty.title') }}
        </h2>
        <p class="text-gray-600 mb-8">
          {{ t('cart.empty.description') }}
        </p>
        <NuxtLink
          to="/products"
          class="bg-burgundy-600 text-white px-8 py-3 rounded-lg hover:bg-burgundy-700 transition-colors inline-flex items-center"
        >
          <ArrowLeft class="h-5 w-5 mr-2" />
          {{ t('cart.empty.continueShoppingButton') }}
        </NuxtLink>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ t('cart.title') }}</h1>
        <button
          @click="clearCart"
          class="text-red-600 hover:text-red-700 transition-colors"
        >
          {{ t('cart.clearCart') }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ t('cart.products') }} ({{ items.length }})
              </h2>
            </div>
            
            <div class="divide-y divide-gray-200">
              <div
                v-for="item in items"
                :key="`${item.product.id}-${item.vineyard ? item.vineyard.id: 'falta el item.vineyard.id' }`"
                class="px-6 py-4"
              >
                <div class="flex items-center space-x-4">
                  <img
                    :src="item.product.image"
                    :alt="item.product.name"
                    class="h-20 w-20 object-cover rounded-lg"
                  />
                  
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ item.product.name }}
                    </h3>
                    <p class="text-sm text-gray-600">
                      {{ item.vineyard ? item.vineyard.name : 'falta el item.vineyard.name'}}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ item.product.category }} • {{ item.product.vintage }}
                    </p>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <button
                      @click="updateQuantity(item.product.id, item.vineyard ? item.vineyard.id : '', item.quantity - 1)"
                      class="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                      :disabled="item.quantity <= 1"
                    >
                      <Minus class="h-4 w-4" />
                    </button>
                    
                    <span class="w-8 text-center font-medium">
                      {{ item.quantity }}
                    </span>
                    
                    <button
                      @click="updateQuantity(item.product.id, item.vineyard ? item.vineyard.id : '', item.quantity + 1)"
                      class="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                      :disabled="item.quantity >= item.product.stock"
                    >
                      <Plus class="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div class="text-right">
                    <p class="text-lg font-semibold text-gray-900">
                      ${{ (item.product.price * item.quantity).toLocaleString() }}
                    </p>
                    <button
                      @click="removeItem(item.product.id, item.vineyard ? item.vineyard.id : '')"
                      class="text-red-600 hover:text-red-700 transition-colors mt-1"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div>
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              {{ t('cart.orderSummary') }}
            </h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t('cart.subtotal') }}</span>
                <span class="text-gray-900">${{ total.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t('cart.shipping') }}</span>
                <span class="text-gray-900">{{ t('cart.freeShipping') }}</span>
              </div>
              <div class="border-t pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900">{{ t('cart.total') }}</span>
                  <span class="text-lg font-bold text-burgundy-600">
                    ${{ total.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
            
            <NuxtLink
              to="/checkout"
              class="block w-full bg-burgundy-600 text-white py-3 rounded-lg hover:bg-burgundy-700 transition-colors font-semibold text-center"
            >
              {{ t('cart.proceedToCheckout') }}
            </NuxtLink>
            
            <NuxtLink
              to="/products"
              class="block text-center text-burgundy-600 hover:text-burgundy-700 transition-colors mt-4"
            >
              {{ t('cart.continueShopping') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

