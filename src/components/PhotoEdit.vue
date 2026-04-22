<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Photo } from '../services/photoData.ts'
import { deletePhoto, getPhoto, updatePhoto } from '../services/photoData.ts'

const route = useRoute()
const router = useRouter()

const photo = ref<Photo | undefined>(undefined)
const editedTitle = ref('')
const editedDescription = ref('')

watch(
  () => route.params.id,
  (newId) => {
    photo.value = getPhoto(String(newId))
    editedTitle.value = photo.value?.title || ''
    editedDescription.value = photo.value?.description || ''
  },
  { immediate: true }
)

function submitPhotoEdit() {
  if (!photo.value) return

  updatePhoto({
    ...photo.value,
    title: editedTitle.value,
    description: editedDescription.value,
  })

  router.push(`/photos/${photo.value._id}`)
}

function onDeletePhoto() {
  if (!photo.value) return

  const confirmed = window.confirm('Are you sure you want to delete this photo?')
  if (!confirmed) return

  deletePhoto(photo.value._id)
  router.push('/')
}
</script>

<template>
  <section class="container py-3">
    <h1 class="h3 mb-3">Edit Photo</h1>

    <form v-if="photo" @submit.prevent="submitPhotoEdit" class="card p-3">
      <div class="mb-3">
        <img
          :src="photo.imageUrl"
          :alt="photo.title || photo.originalname"
          class="card-img-top rounded"
        />
      </div>

      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input id="title" v-model="editedTitle" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="editedDescription"
          class="form-control"
          rows="4"
        />
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger" @click="onDeletePhoto">Delete Photo</button>
        <RouterLink :to="`/photos/${String(route.params.id)}`" class="btn btn-outline-secondary">
          Cancel
        </RouterLink>
      </div>
    </form>

    <p v-else class="alert alert-warning mb-0">
      Could not find a photo with id {{ String(route.params.id) }}.
    </p>
  </section>
</template>

<style scoped>
.card-img-top {
  max-height: 420px;
  object-fit: contain;
}
</style>
