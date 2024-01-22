<script setup lang="ts">
import { ref, computed } from 'vue'
import HelloWorld from './pages/HelloWorld.vue'
import Home from './pages/Home.vue'
import KeepAlive from './pages/KeepAlive.vue'
import Oberver from './pages/Oberver.vue'
import CurrentNode from './pages/CurrentNode.vue'
import EventBusEmit from './pages/EventBusEmit.vue'
import EventBusOn from './pages/EventBusOn.vue'

const routes = {
  '/': Home,
  '/currentNode': CurrentNode,
  '/oberver': Oberver,
  '/keeplaive': KeepAlive,
  '/hello': HelloWorld,
  '/eventBusEmit': EventBusEmit,
  '/eventBusOn': EventBusOn,
  

}

const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] 
  // || NotFound
})

</script>

<template>
  <div>
    <a href="#/">Home</a> |
    <a href="#/currentNode">CurrentNode</a> |
    <a href="#/oberver">Oberver</a> |
    <a href="#/keeplaive">KeepAlive</a> |
    <!-- <a href="#/hello">hello</a> | -->
    <a href="#/eventBusEmit">EventBusEmit</a> |
    <a href="#/eventBusOn">EventBusOn</a> |
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
