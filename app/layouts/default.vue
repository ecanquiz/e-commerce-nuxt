<script setup lang="ts">
import Header from './Header/index.vue';
import Footer from './Footer/index.vue';
</script>

<template>
  <!--AuthWrapper--> 
    <!-- CartWrapper-->
      <!--Navbar /-->
      <Header />
      <slot /> 
      <Footer /> 
    <!--/CartWrapper-->
  <!--/AuthWrapper-->
</template>