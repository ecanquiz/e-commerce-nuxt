<script setup lang="ts">
import { Grape } from 'lucide-vue-next';

const quickLinks = [
  { name: 'navigation.vineyards', href: '/vineyards' },
  { name: 'navigation.products', href: '/products' },
  { name: 'navigation.about', href: '/about' },
  { name: 'navigation.contact', href: '/contact' }
];
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <Grape class="h-8 w-8 text-[color:var(--color-gold)]" />
            <span class="text-2xl font-bold text-[color:var(--color-gold)]">viñedosya</span>
          </div>
          <p class="text-gray-300 mb-4 max-w-md">
            {{ $t('footer.description') }}
          </p>
          <SocialIcons />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.quickLinks') }}</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks">
              <NuxtLink :to="link.href" class="text-gray-300 hover:text-gold-400 transition-colors">
                {{ $t(link.name) }}
              </NuxtLink>
            </li>
          </ul>
        </div>        
        <ContactInfo />
      </div>
      <Copyright />
    </div>
  </footer>
</template>
