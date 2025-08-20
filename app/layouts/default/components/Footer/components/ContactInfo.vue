<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next';

</script>

<template>
<div>
  <h3 class="text-lg font-semibold mb-4">Contacto</h3>
  <div class="space-y-3">
    <div class="flex items-center space-x-3 whitespace-nowrap">
      <Mail class="h-5 w-5 text-gold-400" />
      <span class="text-gray-300">info@viñedosya.com</span>
    </div>
    <div class="flex items-center space-x-3 whitespace-nowrap">
      <Phone class="h-5 w-5 text-gold-400" />
      <span class="text-gray-300">+54 11 4567-8900</span>
    </div>
    <div class="flex items-center space-x-3 whitespace-nowrap">
      <MapPin class="h-5 w-5 text-gold-400" />
      <span class="text-gray-300">Buenos Aires, Argentina</span>
    </div>
  </div>
</div>
</template>