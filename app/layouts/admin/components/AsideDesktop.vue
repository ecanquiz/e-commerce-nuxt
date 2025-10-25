<script setup lang="ts">
import useCurrentUserRole from '../composables/useCurrentUserRole';

const currentUseRole = useCurrentUserRole();
</script>
<template>
  <aside class="hidden lg:block w-64 bg-white border-r shadow-sm">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-burgundy-800">Panel {{ currentUseRole }}</h2>
    </div>
    <nav class="p-4 space-y-2">
      <NuxtLink 
        to="/admin" 
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Dashboard
      </NuxtLink>

      <NuxtLink 
        to="/admin/inventory" 
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin/inventory' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Inventario
      </NuxtLink>
      
      <NuxtLink 
        to="/admin/users" 
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin/users' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Usuarios
      </NuxtLink>

      <NuxtLink 
        to="/products" 
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin/products' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Productos
      </NuxtLink>
      
      <NuxtLink 
        to="/orders" 
        class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors"
        :class="{ 'bg-burgundy-50 text-burgundy-700': $route.path === '/admin/orders' }"
      >
        <Icon name="lucide:package" size="18" class="mr-3" />
        Órdenes
      </NuxtLink>
    </nav>
    <div class="mt-auto p-4 border-t border-gray-200">
        <NuxtLink to="/" class="text-sm text-gray-600 hover:text-burgundy-600 hover:underline transition-colors">
          Ver sitio público
        </NuxtLink>
    </div>
  </aside>
</template>