<script setup lang="ts">
// Navigation (using i18n)
const navigation = [
  { name: 'navigation.home', href: '/' },
  { name: 'navigation.vineyards', href: '/vineyards' },
  { name: 'navigation.products', href: '/products' },
  { name: 'navigation.about', href: '/about' },
  { name: 'navigation.contact', href: '/contact' }
];

const isActive = (routePath: string, itemHref: string) => {
  if (itemHref === '/') {
    return routePath === itemHref;
  }

  return routePath.startsWith(`${itemHref}`);
};

</script>

<template>
  <nav class="hidden md:flex space-x-8">
    <NuxtLink 
      v-for="item in navigation"
      :key="item.name"
      :to="item.href"
      class="px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap"
      :class="{
        'text-burgundy-600 border-b-2 border-burgundy-600': isActive($route.path, item.href),
        'text-gray-700 hover:text-burgundy-600': !isActive($route.path, item.href)
      }"
    >
      {{ $t(item.name) }}
    </NuxtLink>
  </nav>    
</template>