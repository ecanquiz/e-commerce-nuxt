<script setup lang="ts">
// Navigation (using i18n)
const navigation = [
  { name: 'navigation.home', href: '/' },
  { name: 'navigation.vineyards', href: '/vineyards' },
  { name: 'navigation.products', href: '/products' },
  { name: 'navigation.about', href: '/about' },
  { name: 'navigation.contact', href: '/contact' }
];
</script>

<template>
  <nav class="hidden md:flex space-x-8">
    <NuxtLink 
      v-for="item in navigation"
      :key="item.name"
      :to="item.href"
      class="px-3 py-2 text-sm font-medium transition-colors"
      :class="{
        'text-[color:var(--color-burgundy)] border-b-2 border-[color:var(--color-burgundy)]': $route.path === item.href,
        'text-gray-700 hover:text-[color:var(--color-burgundy)]': $route.path !== item.href
      }"
    >
      {{ $t(item.name) }}
    </NuxtLink>
  </nav>    
</template>