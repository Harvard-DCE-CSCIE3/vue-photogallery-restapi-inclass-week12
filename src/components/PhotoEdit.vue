<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Photo } from '../services/photoData.ts'
import { deletePhoto, getPhoto, updatePhoto } from '../services/photoData.ts'

const route = useRoute()
const router = useRouter()

const photo = ref<Photo | undefined>(undefined)
const loading = ref(false)
const error = ref<string | null>(null)
const editedTitle = ref('')
const editedDescription = ref('')

watch(
  () => route.params.id,
  (newId) => {
    void loadPhoto(String(newId))
  },
  { immediate: true }
)

async function loadPhoto(id: string) {
  loading.value = true
  error.value = null
  photo.value = undefined

  try {
    photo.value = await getPhoto(id)
    editedTitle.value = photo.value?.title || ''
    editedDescription.value = photo.value?.description || ''
  } catch (e) {
    editedTitle.value = ''
    editedDescription.value = ''
    error.value = 'Could not load photo'
  } finally {
    loading.value = false
  }
}

async function submitPhotoEdit() {
  if (!photo.value) return

  error.value = null

  try {
    const updatedPhoto = await updatePhoto({
      ...photo.value,
      title: editedTitle.value,
      description: editedDescription.value,
    })

    if (!updatedPhoto) {
      error.value = `Could not find a photo with id ${photo.value._id}.`
      return
    }

    router.push(`/photos/${photo.value._id}`)
  } catch (e) {
    error.value = 'Could not update photo'
  }
}

async function onDeletePhoto() {
  if (!photo.value) return

  const confirmed = window.confirm('Are you sure you want to delete this photo?')
  if (!confirmed) return

  error.value = null

  try {
    const deleted = await deletePhoto(photo.value._id)

    if (!deleted) {
      error.value = `Could not find a photo with id ${photo.value._id}.`
      return
    }

    router.push('/')
  } catch (e) {
    error.value = 'Could not delete photo'
  }
}
</script>

<template>
  <section class="container py-3">
    <h1 class="h3 mb-3">Edit Photo</h1>

    <div v-if="loading" class="alert alert-info">Loading photo...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <form v-else-if="photo" @submit.prevent="submitPhotoEdit" class="card p-3">
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
