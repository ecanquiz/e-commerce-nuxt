<script setup lang="ts">
import { Grape } from 'lucide-vue-next';
</script>

<template>
  <NuxtLink to="/" class="flex items-center space-x-2">
    <Grape class="h-8 w-8 text-[color:var(--color-burgundy)]" />
    <span class="text-2xl font-bold text-[color:var(--color-burgundy)]">viñedosya</span>
  </NuxtLink>
</template>