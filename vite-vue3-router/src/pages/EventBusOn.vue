<template>
    <div>
      onEvent
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
  const a = ref('文案1')
  const instance = getCurrentInstance();

  Emitter.on('maxiTest', function(obj){
    console.log('emitter on a', instance.subTree)
    a.value = 'emit'
    console.log('emitter on obj', obj)
  })

  onMounted(()=>{

  })
  onBeforeUnmount(() => {
    // const instance = getCurrentInstance();
    // console.log('maxilog onBeforeUnmount', instance)
  })
  </script>
  <style lang="scss">
  
  </style>