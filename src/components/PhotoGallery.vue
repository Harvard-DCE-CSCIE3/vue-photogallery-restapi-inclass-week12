<script setup lang="ts">
    import { type Photo, listPhotos } from '../services/photoData.ts'
    import PhotoCard from './PhotoCard.vue';
    import { ref, onMounted } from 'vue'

  const photos = ref<Photo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)  

//    let favouritePhotoId = 'None Assigned Yet'
    const favouritePhotoId = ref<string | null>("None Assigned Yet");

    onMounted( () => {
      loadPhotos()
    })

    async function loadPhotos() {
      loading.value = true
      error.value = null
      try {
        photos.value = await listPhotos()
      } catch (e) {
        error.value = 'Could not load photos'
      } finally {
        loading.value = false
      }
    }
    
    function handleUpvote(photoId: string) {
      console.log('upvoted photo', photoId);
      favouritePhotoId.value = photoId;
  }   
</script>

<template>
  <div>
    <h1>Photo Gallery</h1>
    <div v-if="loading" class="alert alert-info">Loading photos...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else-if="photos.length === 0" class="alert alert-secondary">
      No photos yet.
    </div>
    <div v-else>
      <p>Favourite Photo: {{ favouritePhotoId }}</p>
      <div class="row">
        <PhotoCard v-for="photo in photos" :key="photo._id" :photo="photo" v-on:upvote="handleUpvote"/>
      </div>
    </div>
  </div>

</template>

