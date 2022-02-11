<script setup>
import { ref } from 'vue'

defineProps({
  arr: Array
})

const count = ref(0)
</script>

<template>
  <p>start</p>

  <template v-for="(val, index) in arr">
    <slot :name="'ha'+index" :val="val"></slot>

  </template>
  
  <p>end</p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
