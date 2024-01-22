<template>
    <div @click="handleClick">
      emitterEvent
    </div>
    <div>
      {{a}}
    </div>
  </template>
  <style>
  </style>
  <script lang="ts" setup>
  import { onMounted, getCurrentInstance, onBeforeUnmount, ref, computed} from 'vue'
  import Emitter from './../utils/eventBus'
  const a = ref('文案2')
  const instance = getCurrentInstance();

  // Emitter.on('maxiTest', function(){
  //   console.log('emitter on', {a: 1})
  //   a.value = 'emit'
  // })

  const handleClick = function(){
    console.log('emit success')
    Emitter.emit('maxiTest', {instance})
  }

  onMounted(()=>{

  })
  onBeforeUnmount(() => {
    // const instance = getCurrentInstance();
    // console.log('maxilog onBeforeUnmount', instance)
  })
  </script>
  <style lang="scss">
  
  </style>