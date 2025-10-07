<script lang="ts" setup>
//import { useVineyardsStore } from '~/store/vineyards'
import ReviewsTab from './components/ReviewsTab.vue';

//const storeVineyardsStore = useVineyardsStore();
const route = useRoute()

//const vineyard = ref<Vineyard>();
//vineyard.value = storeVineyardsStore.getVineyardById(route.params.id as string);
const reviewModal = ref(false);

const galleryModal = reactive({
  isOpen: false,
  images: [] as string[],
  currentIndex: 0,
  title: ''
});
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

const handleReviewSubmit = (reviewData: any) => {
  console.log('Nueva reseña enviada:', reviewData);
  reviewModal.value = false;
};


































</script>
<template>
    <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">


  <div class="space-y-8">
    <ReviewsTab
      :open-gallery="openGallery"
      @open-review="reviewModal = true"
    />

    <GalleryModal
      v-if="galleryModal.isOpen"
      :is-open="galleryModal.isOpen"
      :images="galleryModal.images"
      :current-index="galleryModal.currentIndex"
      :title="galleryModal.title"
      @close="closeGallery"
      @update:current-index="galleryModal.currentIndex = $event"
    />

    <!--ReviewModal
      :is-open="reviewModal"
      @close="reviewModal = false"
      :vineyard-name="vineyard?.name || ''"
      @submit="handleReviewSubmit"
    /-->
  </div>
  </div>
  </div>

</template>