<script setup lang="ts">
</script>

<template>
  <nav class="navbar navbar-dark bg-dark px-3">
    <RouterLink to="/" class="navbar-brand">Photo Gallery</RouterLink>

    <div class="navbar-nav flex-row">
      <RouterLink to="/" class="nav-link text-white">Gallery</RouterLink>
      <RouterLink to="/photos/new" class="nav-link text-white">Add Photo</RouterLink>
    </div>
  </nav>
</template>
