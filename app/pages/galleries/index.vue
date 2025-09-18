<script setup lang="ts">
//import { useVineyardsStore } from '~/store/vineyards'
import GalleryTab from './components/GalleryTab.vue';
import GalleryModal from './components/GalleryModal.vue';
import VideoModal from './components/VideoModal.vue';

const route = useRoute()
//const vineyard = ref<Vineyard>();
//const storeVineyardsStore = useVineyardsStore();
//vineyard.value = storeVineyardsStore.getVineyardById(route.params.id as string);

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
  <div>
    <!--GalleryTab
      v-if="vineyard" 
      :vineyard="vineyard"
      :open-gallery="openGallery"
      :open-video="openVideo"
    /-->

    <GalleryModal
      v-if="galleryModal.isOpen"
      :is-open="galleryModal.isOpen"
      :images="galleryModal.images"
      :current-index="galleryModal.currentIndex"
      :title="galleryModal.title"
      @close="closeGallery"
      @update:current-index="galleryModal.currentIndex = $event"
    />

    <VideoModal
      v-if="videoModal.isOpen"
      :is-open="videoModal.isOpen"
      :video-url="videoModal.videoUrl"
      :title="videoModal.title"
      @close="closeVideo"
    />
  </div>

</template>