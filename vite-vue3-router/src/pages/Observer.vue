<template>
    <div id="divObe" ref="divObe">
      Oberver
    </div>
    <div>
      IntersectionObserver 监听元素显示隐藏，没有 disconnect
    </div>
    <div id="divObeHide" ref="divObeHide">
      123
    </div>
  </template>
  <style>
    #divObeHide {
      position: absolute;
      left: -100%;
      bottom: 0;
  
    }
  </style>
  <script lang="ts" setup>
  import { onMounted, getCurrentInstance, onBeforeUnmount, ref} from 'vue'
  const instance = getCurrentInstance();
  const divObeHide = ref(null)
  const divObe = ref(null)
  onMounted(()=>{
    // console.log('maxilog onMounted', instance)
    const observer = new IntersectionObserver((entries, obs)=>{
      console.log('observer entries', entries, obs)
      console.log('observer', instance)
    })
  
    observer.observe(divObe.value)
    observer.observe(divObeHide.value)
  })
  onBeforeUnmount(() => {
    // const instance = getCurrentInstance();
    // console.log('maxilog onBeforeUnmount', instance)
  })
  </script>
  <style lang="scss">
  
  </style>