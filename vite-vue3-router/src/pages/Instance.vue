<template>
    <div id="divInstance" ref="divInstance">
      instance {{a}}
    </div>
    <div id="divInsgtance" ref="divInsgtance">
      {{a}}
    </div>
  </template>
  <style>
    #divInsgtance {
      position: absolute;
      left: -100%;
      bottom: 0;
  
    }
  </style>
  <script lang="ts" setup>
  import { onMounted, getCurrentInstance, onBeforeUnmount, ref, computed} from 'vue'
  // const instance = getCurrentInstance();
  const divInsgtance = ref(null)
  const divInstance = ref(null)
  const a = ref('文案11')
  const k = computed(()=>{
    return a.value + '2'
  })
  onMounted(()=>{
    // console.log('maxilog onMounted', instance)
    // console.log('window.kk', (window as any).kk)
    const instance = getCurrentInstance();
    document.querySelector('#divInstance').addEventListener('click', ()=>{
      a.value = '文字2'
      console.log('instance', instance);
    })
  })
  onBeforeUnmount(() => {
    // const instance = getCurrentInstance();
    // console.log('maxilog onBeforeUnmount', instance)
  })
  </script>
  <style lang="scss">
  
  </style>