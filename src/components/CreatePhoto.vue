<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPhoto } from '../services/photoData.ts'

const router = useRouter()

const title = ref('')
const description = ref('')
const selectedFile = ref<File | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  selectedFile.value = input.files?.[0] ?? null
}

async function submitCreatePhoto() {
  if (!selectedFile.value) {
    error.value = 'Please choose an image file.'
    return
  }

  loading.value = true
  error.value = null

  try {
    const newPhoto = await createPhoto(
      title.value,
      selectedFile.value,
      description.value || undefined
    )

    router.push(`/photos/${newPhoto._id}`)
  } catch (e) {
    error.value = 'Could not create photo'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="container py-3">
    <h1 class="h3 mb-3">Add Photo</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="alert alert-info">Creating photo...</div>

    <form @submit.prevent="submitCreatePhoto" class="card p-3">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-control"
          required
          :disabled="loading"
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input
          id="description"
          v-model="description"
          type="text"
          class="form-control"
          :disabled="loading"
        />
      </div>

      <div class="mb-3">
        <label for="photo" class="form-label">Image</label>
        <input
          id="photo"
          type="file"
          class="form-control"
          accept="image/*"
          required
          :disabled="loading"
          @change="handleFileChange"
        />
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Adding Photo...' : 'Add Photo' }}
        </button>
        <RouterLink to="/" class="btn btn-outline-secondary" :class="{ disabled: loading }">
          Cancel
        </RouterLink>
      </div>
    </form>
  </section>
</template>
