<template>
    <div>
      <button @click="handleClick">emitterEvent</button>
    </div>
    <div>
      触发事件传递，传递了自身 instance
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