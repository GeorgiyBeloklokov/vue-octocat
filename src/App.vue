<template>
  <header>
    <div class="wrapper">You did it!</div>
  </header>
  <RepoView />
</template>

<script setup lang="ts">
import RepoView from '@/components/GitHubRepositories.vue'
</script>

<style scoped>
.wrapper {
  font-size: 3rem;
  color: red;
  
}
</style>
