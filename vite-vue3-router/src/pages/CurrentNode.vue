<template>
    <div id="divInstance" ref="divInstance">
      currentNode 点击切换文案
    </div>
    <div>
      {{a}}
    </div>
  </template>
  <style>
  </style>
  <script lang="ts" setup>
  import { onMounted, getCurrentInstance, onBeforeUnmount, ref, computed} from 'vue'
  // const instance = getCurrentInstance();
  const divInstance = ref(null)
  const a = ref('文案1')
  const instance = getCurrentInstance();

  function click(){
    a.value = '文案2'
    console.log('instance', instance, instance.isMounted);
    console.log('a', a)
  }
  onMounted(()=>{
    const instance = getCurrentInstance();
    divInstance.value.addEventListener('click', click.bind(instance))
  })
  onBeforeUnmount(() => {

  })
  </script>
  <style lang="scss">
  
  </style>