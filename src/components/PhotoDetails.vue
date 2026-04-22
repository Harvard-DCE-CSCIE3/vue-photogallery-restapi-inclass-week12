<script setup lang="ts">
import type { Photo } from '../services/photoData.ts'
import { getPhoto } from '../services/photoData.ts'
import { useRoute } from 'vue-router'
import { computed, watch, ref } from 'vue'

        const route = useRoute()
        const photo = ref<Photo | undefined>(undefined);
        const editPath = computed(() => `/photos/${String(route.params.id)}/edit`)

        watch(
            () => route.params.id,
            (newId) => {
                photo.value = getPhoto(String(newId))
            },
            { immediate: true }
        )

        const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A'
            return new Date(dateString).toLocaleString()
            }
</script>

<template>
  <section class="container py-3">
    <h1 class="h3 mb-3">Photo Details</h1>

    <div v-if="photo" class="row g-3">
      <div class="col-12 col-lg-8">
        <article class="card">
          <img
            :src="photo.imageUrl"
            :alt="photo.title || photo.originalname"
            class="card-img-top"
          />

          <div class="card-body">
            <h2 class="h4 card-title mb-2">{{ photo.title || 'Untitled photo' }}</h2>
            <p class="card-text mb-3">{{ photo.description || 'No description yet.' }}</p>
            <small class="text-body-secondary">{{ photo.originalname }} · {{ photo.size }} KB</small>
          </div>
        </article>
      </div>

      <div class="col-12 col-md-8 col-lg-6">
        <ul class="list-group">
          <li class="list-group-item">
            <strong>Created:</strong> {{ formatDate(photo.createdAt) }}
          </li>
          <li class="list-group-item">
            <strong>Last updated:</strong> {{ formatDate(photo.updatedAt) }}
          </li>
        </ul>
      </div>
      <div class="col-12 d-flex gap-2">
        <RouterLink :to="editPath" class="btn btn-primary">Edit Photo</RouterLink>
      </div>
    </div>

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

