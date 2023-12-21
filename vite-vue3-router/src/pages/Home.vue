<template>
  <div>
    home
  </div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onBeforeUnmount} from 'vue'
onMounted(()=>{
  const instance = getCurrentInstance();
  console.log('maxilog onMounted', instance)
})
onBeforeUnmount(() => {
  const instance = getCurrentInstance();
  console.log('maxilog onBeforeUnmount', instance)
})
</script>
<style lang="scss">

</style>