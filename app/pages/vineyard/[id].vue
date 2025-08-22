<script setup lang="ts">
import { 
  MapPin, Star, Calendar, ArrowLeft, X, ChevronLeft, ChevronRight, Play, 
  Users, Award, Globe, Phone, Mail, ExternalLink, Eye 
} from 'lucide-vue-next';
import { useVineyardsStore } from '~/store/vineyards'
import type { Product, Vineyard, Service } from '~~/shared/types';
import Overview from './Overview.vue';

const route = useRoute();
const router = useRouter();

const storeVineyardsStore = useVineyardsStore();
//storeVineyardsStore.fetchVineyards();
// const mockVineyards = storeVineyardsStore.vineyards

const id = route.params.id as string;
const vineyard = ref<Vineyard | null>(null);
const activeTab = ref('overview');
const reviewModal = ref(false);
const galleryModal = reactive({
  isOpen: false,
  images: [] as string[],
  currentIndex: 0,
  title: ''
});
const videoModal = reactive({
  isOpen: false,
  videoUrl: '',
  title: ''
});
const productModal = reactive({
  isOpen: false,
  product: null as Product | null,
  vineyard: null as Vineyard | null
});

const tabs = [
  { id: 'overview', label: 'Información General' },
  { id: 'products', label: 'Productos' },
  { id: 'services', label: 'Servicios' },
  { id: 'gallery', label: 'Galería' },
  { id: 'reviews', label: 'Reseñas' },
];

// Upload vineyard data
onMounted(async () => {
  // In production, this would come from an API
  const mockVineyards: Vineyard[] = storeVineyardsStore.vineyards; // Mock data
  vineyard.value = mockVineyards.find(v => v.id === id) || null;
  
  if (!vineyard.value) {
    // Redirect if vineyard not found
    await navigateTo('/vineyards');
  }
});

const openProductModal = (product: Product, vineyard: Vineyard) => {
  productModal.isOpen = true;
  productModal.product = product;
  productModal.vineyard = vineyard;
};

const closeProductModal = () => {
  productModal.isOpen = false;
  productModal.product = null;
  productModal.vineyard = null;
};

const handleReviewSubmit = (reviewData: any) => {
  console.log('Nueva reseña enviada:', reviewData);
  reviewModal.value = false;
};

// Gallery and video functions
const openGallery = (images: string[], startIndex: number = 0, title: string = 'Galería') => {
  galleryModal.isOpen = true;
  galleryModal.images = images;
  galleryModal.currentIndex = startIndex;
  galleryModal.title = title;
};

const closeGallery = () => {
  galleryModal.isOpen = false;
  galleryModal.images = [];
  galleryModal.currentIndex = 0;
  galleryModal.title = '';
};

const openVideo = (videoUrl: string, title: string = 'Video') => {
  videoModal.isOpen = true;
  videoModal.videoUrl = videoUrl;
  videoModal.title = title;
};

const closeVideo = () => {
  videoModal.isOpen = false;
  videoModal.videoUrl = '';
  videoModal.title = '';
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="relative bg-center bg-cover h-96" :style="{ backgroundImage: `url(${vineyard?.coverImage})` }">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative flex items-center h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="text-white">
          <NuxtLink
            to="/vineyards"
            class="inline-flex items-center mb-4 text-white transition-colors hover:text-gold-400"
          >
            <ArrowLeft class="w-5 h-5 mr-2" />
            Volver a viñedos
          </NuxtLink>
          <h1 class="mb-4 text-4xl font-bold md:text-5xl">{{ vineyard?.name }}</h1>
          <div class="flex items-center space-x-6 text-lg">
            <div class="flex items-center">
              <MapPin class="w-5 h-5 mr-2" />
              {{ vineyard?.location }}
            </div>
            <div class="flex items-center">
              <Star class="w-5 h-5 mr-2 text-gold-400" />
              {{ vineyard?.rating }} ({{ vineyard?.reviewCount }} reseñas)
            </div>
            <div class="flex items-center">
              <Calendar class="w-5 h-5 mr-2" />
              Establecido en {{ vineyard?.established }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="bg-white shadow-sm">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex space-x-8 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors"
            :class="activeTab === tab.id
              ? 'border-burgundy-600 text-burgundy-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Overview Tab -->
      <!--div v-if="activeTab === 'overview'" class="grid grid-cols-1 gap-8 lg:grid-cols-3"-->
      <div>

        <!-- ... contenido del overview ... -->
         <Overview v-if = "vineyard"
           :vineyard="vineyard"
           :activeTab="'overview'"
         />
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            Productos ({{ vineyard?.products.length }})
          </h2>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard 
            v-for="product in vineyard?.products"
            :key="product.id"
            :product="product"
            :vineyard="vineyard!"
            @view-details="openProductModal"
          />
        </div>
      </div>

      <!-- Services Tab -->
      <div v-if="activeTab === 'services'">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            Servicios ({{ vineyard?.services.length }})
          </h2>
        </div>
        
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ServiceCard 
            v-for="service in vineyard?.services"
            :key="service.id"
            :service="service"
            :vineyard-name="vineyard?.name || ''"
          />
        </div>
      </div>

      <!-- Gallery Tab -->
      <div v-if="activeTab === 'gallery'">
        <!-- ... contenido de galería ... -->
      </div>

      <!-- Reviews Tab -->
      <div v-if="activeTab === 'reviews'" class="space-y-8">
        <!-- ... contenido de reseñas ... -->
      </div>
    </div>

    <!-- Modales -->
    <ProductDetailModal
      v-if="productModal.isOpen && productModal.product && productModal.vineyard"
      :product="productModal.product"
      :vineyard="productModal.vineyard"
      :is-open="productModal.isOpen"
      @close="closeProductModal"
    />

    <ReviewModal
      :is-open="reviewModal"
      @close="reviewModal = false"
      :vineyard-name="vineyard?.name || ''"
      @submit="handleReviewSubmit"
    />

    <!-- Gallery Modal -->
    <div v-if="galleryModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <!-- ... contenido del modal de galería ... -->
    </div>

    <!-- Video Modal -->
    <div v-if="videoModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <!-- ... contenido del modal de video ... -->
    </div>
  </div>
</template>

