<script setup lang="ts">
import type { Photo } from '../services/photoData.ts'

const props = defineProps<{ photo: Photo }>()
const emit = defineEmits<{ upvote: [id: string] }>()

console.log(props.photo.title);
</script>

<template>
  <div class="card col-md-4">
    <img
      :src="photo.imageUrl"
      :alt="photo.title || photo.originalname"
      class="card-img-top"
    />

    <div class="card-body">
      <h2 class="h5 card-title">
        <RouterLink :to="`/photos/${photo._id}`">{{ photo.title || 'Untitled photo' }}</RouterLink>
      </h2>
      <p class="card-text mb-2">{{ photo.description || 'No description yet.' }}</p>
      <small class="text-body-secondary">{{ photo.originalname }} · {{ photo.size }} KB</small>
      <button v-on:click="emit('upvote', photo._id)">Upvote</button>
    </div>
  </div>
</template>

<!-- scoped style fixes image height -->
<style scoped>  
  .card-img-top {
    max-height: 220px;
    object-fit: contain;
  }
</style>