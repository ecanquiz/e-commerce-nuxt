<script setup lang="ts">
import { Facebook, Twitter, Instagram } from 'lucide-vue-next';

</script>

<template>
<div className="flex space-x-4">
  <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
    <Facebook className="h-5 w-5" />
  </a>
  <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
    <Twitter className="h-5 w-5" />
  </a>
  <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
    <Instagram className="h-5 w-5" />
  </a>
</div>
</template>