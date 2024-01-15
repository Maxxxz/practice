<template>
  <div>
    keep alive2
  </div>
</template>

<script lang="ts" setup>
    import { onActivated, onDeactivated, onUnmounted } from 'vue'

        onActivated(() => {
            // called on initial mount
            // and every time it is re-inserted from the cache
            console.log('maxilog name2 onActivated')
        })

        onDeactivated(() => {
            // called when removed from the DOM into the cache
            // and also when unmounted
            console.log('maxilog name2 onDeactivated')
        })

        onUnmounted(()=>{
            console.log('maxilog name2 onUnmounted')
        })
</script>
<style lang="scss">

</style>