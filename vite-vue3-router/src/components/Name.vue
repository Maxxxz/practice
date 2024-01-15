<template>
  <div>
    keep alive
  </div>
</template>

<script lang="ts" setup>
    import { onActivated, onDeactivated, onUnmounted } from 'vue'

        onActivated(() => {
            // called on initial mount
            // and every time it is re-inserted from the cache
            console.log('maxilog name onActivated')
        })

        onDeactivated(() => {
            // called when removed from the DOM into the cache
            // and also when unmounted
            console.log('maxilog name onDeactivated')
        })

        onUnmounted(()=>{
            console.log('maxilog name onUnmounted')
        })
</script>
<style lang="scss">

</style>