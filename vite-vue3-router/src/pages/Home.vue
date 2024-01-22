<template>
  <div id="homeTest">
    home
  </div>
  <span id="homeTest0">
    event
  </span>
  <span id="homeTest1">
    home
  </span>
  <span id="homeTest2">
    home
  </span>
  <span id="homeTest3">
    home
  </span>
  <span id="homeTest4">
    home
  </span>
  <span id="homeTest5">
    home
  </span>
  <span id="homeTest6">
    home
  </span>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onBeforeUnmount, ref} from 'vue'
console.log('home setup')
const aa = ref('111');
const instance = getCurrentInstance();

// 匿名函数 + 引用了vue实例，组件实例才不会被卸载
// 具名函数 + 引用了vue实例 + 没有主动remove，组件实例也不会被
// 具名+打印ref+没有主动remove，会被卸载
// 具名函数 + 引用了vue实例 + 主动remove，会被卸载

const obj: any = {}
function cc(){
  // 增加引用this后，实例不会被释放
  console.log('maxilog click instance', instance, instance.isUnmounted)
  instance.isUnmounted
  console.log('aa', aa)
}

onMounted(()=>{
  
  // obj.instance = getCurrentInstance();
  // console.log('maxilog onMounted', instance)
  document.querySelector('#homeTest').addEventListener('click', cc)

  // document.body.addEventListener('size', function(){
  //   console.log('size change', obj)
  // })
})
onBeforeUnmount(() => {
  // const instance = getCurrentInstance();
  // console.log('maxilog onBeforeUnmount', instance)

  // document.querySelector('#homeTest').removeEventListener('click', cc)
})
</script>
<style lang="scss">

</style>