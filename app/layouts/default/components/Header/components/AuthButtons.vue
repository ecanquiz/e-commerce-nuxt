<script setup lang="ts">
// No additional logic needed if you use NuxtLink
</script>

<template>
  <div class="flex space-x-2">
    <NuxtLink
      to="/login"
      class="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-burgundy-600 transition-colors"
    >
      <Icon name="lucide:log-in" class="h-4 w-4" />
      <span class="whitespace-nowrap">{{ $t('navigation.login') }}</span>
    </NuxtLink>

    <NuxtLink
      to="/register/customer"
      class="flex items-center space-x-1 px-3 py-2 text-sm font-medium bg-burgundy-600 text-white rounded-md hover:bg-burgundy-dark transition-colors"
    >
      <Icon name="lucide:user-plus" class="h-4 w-4" />
      <span>{{ $t('navigation.register') }}</span>
    </NuxtLink>
  </div>
</template>
