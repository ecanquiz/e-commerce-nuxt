<script setup lang="ts">
//import { useVineyardsStore } from '~/store/vineyards'
import GalleryTab from './components/GalleryTab.vue';
import GalleryModal from './components/GalleryModal.vue';
import VideoModal from './components/VideoModal.vue';

const route = useRoute()
const gallery = ref([] as string[])
//const vineyard = ref<Vineyard>();
//const storeVineyardsStore = useVineyardsStore();
//vineyard.value = storeVineyardsStore.getVineyardById(route.params.id as string);

gallery.value = [
  'https://images.pexels.com/photos/1543327/pexels-photo-1543327.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/10039989/pexels-photo-10039989.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800'
]

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
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class=" gap-6">
    <GalleryTab
      v-if="gallery" 
      :gallery="gallery"
      :open-gallery="openGallery"
      :open-video="openVideo"
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

    <VideoModal
      v-if="videoModal.isOpen"
      :is-open="videoModal.isOpen"
      :video-url="videoModal.videoUrl"
      :title="videoModal.title"
      @close="closeVideo"
    />
  </div>
    </div>

      </div>


</template>