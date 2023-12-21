<script setup lang="ts">
import { ref, computed } from 'vue'
import HelloWorld from './pages/HelloWorld.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'

const routes = {
  '/': Home,
  '/about': About,
  '/hello': HelloWorld
}

const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>
  <div>
    <a href="#/">Home</a> |
    <a href="#/about">About</a> |
    <a href="#/hello">hello</a> |
    <a href="#/non-existent-path">Broken Link</a>
  </div>
  <component :is="currentView" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
