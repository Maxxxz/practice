<template>
  <div>
    about
    <button>12e3</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onBeforeUnmount} from 'vue'
onMounted(()=>{
  // const instance = getCurrentInstance();
  console.log('maxilog onMounted')
})
onBeforeUnmount(() => {
  // const instance = getCurrentInstance();
  console.log('maxilog onBeforeUnmount')
})
</script>
<style lang="scss">

</style>