<script setup lang="ts">
    import { photos } from '../services/photoData.ts'
    import PhotoCard from './PhotoCard.vue';
    import { ref } from 'vue'


//    let favouritePhotoId = 'None Assigned Yet'
    const favouritePhotoId = ref<string | null>("None Assigned Yet");

    function handleUpvote(photoId: string) {
      console.log('upvoted photo', photoId);
      favouritePhotoId.value = photoId;
  }   
</script>

<template>
  <div>
    <h1>Photo Gallery</h1>
    <p>Favourite Photo: {{ favouritePhotoId }}</p>
    <div class="row">
        <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo" v-on:upvote="handleUpvote"/>
    </div>
  </div>

</template>

