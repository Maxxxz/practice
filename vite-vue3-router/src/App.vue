<script setup lang="ts">
import { ref, computed } from 'vue'
import HelloWorld from './pages/HelloWorld.vue'
import Home from './pages/Home.vue'
import KeepAlive from './pages/KeepAlive.vue'
import Observer from './pages/Observer.vue'
import CurrentNode from './pages/CurrentNode.vue'
import EventBusEmit from './pages/EventBusEmit.vue'
import EventBusOn from './pages/EventBusOn.vue'

const routes = {
  '/': Home,
  '/currentNode': CurrentNode,
  '/observer': Observer,
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
  <div class="menu">
    <a href="#/">Home</a> |
    <a href="#/currentNode">CurrentNode</a> |
    <a href="#/observer">Observer</a> |
    <a href="#/keeplaive">KeepAlive</a> |
    <!-- <a href="#/hello">hello</a> | -->
    <a href="#/eventBusEmit">EventBusEmit</a> |
    <a href="#/eventBusOn">EventBusOn</a> |
  </div>
  <component :is="currentView" />
</template>

<style scoped>

.menu {
  margin-bottom: 10px;
}
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
