<script setup lang="ts">
import { useVineyardsStore } from '~/store/vineyards';
import { Grape, Star, Award, Users, ArrowRight, MapPin, Tag, TrendingUp } from 'lucide-vue-next';
import type { Promotion, Vineyard } from '~~/shared/types';

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

//const vineyardsStore = useVineyardsStore()
//const { data: vineyards, pending } = await useAsyncData(
//  'vineyards',
//  async () => {
//    if (vineyardsStore.loaded) {
//      return vineyardsStore.vineyards
//    }
//    return await vineyardsStore.fetchVineyards()
//  },
//  {
//    server: true,
//    default: () => []
//  }
//)
//const featuredVineyards = vineyards.value.slice(0, 3);
//const highlightedVineyards = vineyards.value.slice(0, 6);

const vineyardsStore = useVineyardsStore()
const vineyards: Vineyard[] = vineyardsStore.vineyards

const featuredVineyards = vineyards.slice(0, 3);
const highlightedVineyards = vineyards.slice(0, 6);

const carouselSlides = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    description: t('home.hero.description'),
    buttonText: t('home.hero.exploreButton'),
    buttonLink: '/vineyards'
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Experiencias Únicas',
    subtitle: 'Degustaciones y Tours',
    description: 'Vive experiencias inolvidables con catas exclusivas y recorridos por los viñedos más hermosos.',
    buttonText: 'Ver Experiencias',
    buttonLink: '/vineyards'
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Vinos de Colección',
    subtitle: 'Ediciones Limitadas',
    description: 'Accede a vinos exclusivos y ediciones limitadas que no encontrarás en ningún otro lugar.',
    buttonText: 'Ver Colección',
    buttonLink: '/products'
  }
];

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Descuento Especial',
    description: 'Obtén 20% de descuento en tu primera compra de vinos premium',
    discount: '20% OFF',
    validUntil: '31 de Diciembre',
    image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Aprovechar Oferta',
    buttonLink: '/products',
    type: 'discount'
  },
  {
    id: '2',
    title: 'Envío Gratis',
    description: 'Envío gratuito en compras superiores a $50,000',
    discount: 'Envío Gratis',
    validUntil: 'Todo el mes',
    image: 'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Comprar Ahora',
    buttonLink: '/products',
    type: 'free-shipping'
  },
  {
    id: '3',
    title: 'Pack Degustación',
    description: 'Lleva 3 botellas seleccionadas por nuestros sommeliers',
    discount: 'Oferta Especial',
    validUntil: '15 de Enero',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Ver Pack',
    buttonLink: '/products',
    type: 'special-offer'
  }
];
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Carousel -->
    <section class="relative">
      <Carousel :slides="carouselSlides" />
    </section>

    <!-- Promotions Banner -->
    <PromotionBanner :promotions="promotions" />

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ t('home.features.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('home.features.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-burgundy-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Grape class="h-10 w-10 text-burgundy-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Directo del Productor</h3>
            <p class="text-gray-600">
              {{ t('home.features.directProducer.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-gold-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Award class="h-10 w-10 text-gold-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('home.features.qualityGuaranteed.title') }}</h3>
            <p class="text-gray-600">
              {{ t('home.features.qualityGuaranteed.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-green-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Users class="h-10 w-10 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('home.features.exclusiveCommunity.title') }}</h3>
            <p class="text-gray-600">
              {{ t('home.features.exclusiveCommunity.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Vineyards -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ t('home.featuredVineyards.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('home.featuredVineyards.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VineyardCard 
            v-for="vineyard in featuredVineyards" 
            :key="vineyard.id" 
            :vineyard="vineyard" 
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink
            to="/vineyards"
            class="bg-burgundy-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-burgundy-700 transition-colors inline-flex items-center"
          >
            {{ t('home.featuredVineyards.viewAll') }}
            <ArrowRight class="ml-2 h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Highlighted Vineyards Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-4">
            <TrendingUp class="h-8 w-8 text-burgundy-600 mr-3" />
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
              {{ t('home.popularVineyards.title') }}
            </h2>
          </div>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('home.popularVineyards.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(vineyard, index) in highlightedVineyards" 
            :key="vineyard.id" 
            class="relative"
          >
            <div v-if="index < 3" class="absolute -top-2 -right-2 z-10">
              <div class="bg-gold-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {{ index + 1 }}
              </div>
            </div>
            <VineyardCard :vineyard="vineyard" />
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink
            to="/vineyards"
            class="bg-burgundy-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-burgundy-700 transition-colors inline-flex items-center"
          >
            {{ t('home.popularVineyards.exploreAll') }}
            <ArrowRight class="ml-2 h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-burgundy-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">50+</div>
            <div class="text-gray-300">{{ t('home.stats.vineyards') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">500+</div>
            <div class="text-gray-300">{{ t('home.stats.wines') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">10k+</div>
            <div class="text-gray-300">{{ t('home.stats.customers') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gold-400 mb-2">98%</div>
            <div class="text-gray-300">{{ t('home.stats.satisfaction') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-gold-400 to-gold-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          {{ t('home.cta.title') }}
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          {{ t('home.cta.description') }}
        </p>
        <NuxtLink
          to="/register/vineyard"
          class="bg-white text-gold-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
        >
          {{ t('home.cta.registerButton') }}
          <ArrowRight class="ml-2 h-5 w-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

