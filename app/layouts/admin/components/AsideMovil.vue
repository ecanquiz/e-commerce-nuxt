<script setup lang="ts">
import { useRouter } from 'vue-router';
import useCurrentUserRole from '../composables/useCurrentUserRole';

const emit = defineEmits<{
  (e: 'close'): void;  
}>()

const close = () => emit('close')
const router = useRouter();

const go = (path: string) => {
  close();
  router.push(path);
}
const currentUseRole = useCurrentUserRole();
</script>

<template>
  <aside class="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform">
    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-burgundy-50">
      <div class="text-lg font-semibold text-burgundy-800">Panel {{ currentUseRole }}</div>
      <button 
        class="p-2 rounded-md hover:bg-burgundy-100 transition-colors" 
        aria-label="Cerrar menú" 
        @click="close"
      >
        <Icon name="lucide:x" size="20" class="text-burgundy-700" />
      </button>
    </div>

    <nav class="p-4 space-y-2">
      <button 
        @click="go('/admin')"
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Dashboard
      </button>

      <button 
        @click="go('/merchant')"
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/merchant' }"
      >
        <Icon name="lucide:layout-dashboard" size="18" class="mr-3" />
        Dashboard
      </button>

      <button
        @click="go('/merchant/inventory')"
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/merchant/inventory' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Inventario
      </button>
      
      <button 
        @click="go('/admin/users')"
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin/users' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Usuarios
      </button>

      <button 
        @click="go('/admin/products')"
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin/products' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Productos
      </button>
      
      <button 
        @click="go('/admin/orders')"
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin/orders' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Órdenes
      </button>
    </nav>

    <div class="mt-auto p-4 border-t border-gray-200">
      <NuxtLink 
        to="/" 
        class="text-sm text-gray-600 hover:text-burgundy-600 hover:underline transition-colors"
        @click="close"
      >
        Ver sitio público
      </NuxtLink>
    </div>
  </aside>
</template>
