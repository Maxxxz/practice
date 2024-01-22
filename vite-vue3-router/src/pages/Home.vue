<template>
  <div id="homeTest">
    home
  </div>
  <div>
    <span id="homeTest0">
      event
    </span>
    <span id="homeTest1">
      {{aa}}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onBeforeUnmount, ref} from 'vue'
console.log('home setup')
const aa = ref('home');
const instance = getCurrentInstance();

// 匿名函数 + 引用了vue实例，组件实例才不会被卸载
// 具名函数 + 引用了vue实例 + 没有主动remove，组件实例也不会被
// 具名+打印ref+没有主动remove，会被卸载
// 具名函数 + 引用了vue实例 + 主动remove，会被卸载
function cc(){
  // 增加引用instance后，实例不会被释放
  console.log('maxilog click instance', instance.isUnmounted)
  instance.isUnmounted
  // aa.value = '333'
  // console.log('aa', aa)
}

onMounted(()=>{
  window.addEventListener('resize', cc)
})
onBeforeUnmount(() => {
  // const instance = getCurrentInstance();
  // console.log('maxilog onBeforeUnmount', instance)
})
</script>
<style lang="scss">

</style>