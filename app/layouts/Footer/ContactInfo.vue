<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next';

</script>

<template>
<div>
  <h3 className="text-lg font-semibold mb-4">Contacto</h3>
  <div className="space-y-3">
    <div className="flex items-center space-x-3">
      <Mail className="h-5 w-5 text-[color:var(--color-gold)]" />
      <span className="text-gray-300">info@viñedosya.com</span>
    </div>
    <div className="flex items-center space-x-3">
      <Phone className="h-5 w-5 text-[color:var(--color-gold)]" />
      <span className="text-gray-300">+54 11 4567-8900</span>
    </div>
    <div className="flex items-center space-x-3">
      <MapPin className="h-5 w-5 text-[color:var(--color-gold)]" />
      <span className="text-gray-300">Buenos Aires, Argentina</span>
    </div>
  </div>
</div>
</template>