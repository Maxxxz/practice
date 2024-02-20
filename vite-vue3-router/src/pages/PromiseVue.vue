<template>
    <div>
      <button ref="divInstance">Promise 点击发起两个promise </button>
    </div>
    <div>
      addEventListener 监听当前dom点击，没有 remove
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

  function timeoutPromise(timeMS){
    return new Promise((res)=>{
      setTimeout(()=>{
        console.log('promise callback')
        res('promise')
      }, timeMS)
    })
  }
  
  function timeoutRej(timeMS){
    return new Promise((res, rej)=>{
      setTimeout(()=>{
        rej('timeout rej')
        console.log('rej')
      }, timeMS)
    })
  }

  function Promise1(){
    return timeoutPromise(100).then((res)=>{
      console.log(' 1 end')
      console.log('1 instance', instance)
      return res
    })
  }

  function Promise2(){
    // return Promise.race([timeoutPromise(1000 * 3 * 1000)]).then((res)=>{
    //   console.log('p2 ok', res)
    //   return res
    // }).catch((err)=>{
    //   console.log('p2 err', err)
    // })
    return Promise.reject('err')
  }

  function click(){
    Promise.race([Promise1(), Promise2()]).then((res)=>{
      console.log('click end', res)
      console.log('ok instance', instance)
      instance.isUnmounted
    }).catch((err)=>{
      console.log('click err', err)
      console.log('err instance', instance)
      instance.isUnmounted
      // instance.isUnmounted
    })
    
  }
  onMounted(()=>{
    divInstance.value.addEventListener('click', click)
  })
  onBeforeUnmount(() => {

  })
  </script>
  <style lang="scss">
  
  </style>