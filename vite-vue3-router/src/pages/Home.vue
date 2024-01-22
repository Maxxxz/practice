<template>
  <div id="homeTest">
    home
  </div>
  <div>
    <div id="homeTest0">
      监听 resize， 没有 removeEvent
    </div>
    <div id="homeTest1">
      {{aa}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onBeforeUnmount, ref} from 'vue'
console.log('home setup')
const aa = ref('文案1');
const instance = getCurrentInstance();

// 匿名函数 + 引用了vue实例，组件实例才不会被卸载
// 具名函数 + 引用了vue实例 + 没有主动remove，组件实例也不会被
// 具名+打印ref+没有主动remove，会被卸载
// 具名函数 + 引用了vue实例 + 主动remove，会被卸载
function cc(e){
  // 增加引用instance后，实例不会被释放
  console.log('maxilog click instance', instance.isUnmounted)
  instance.isUnmounted
  aa.value = e.timeStamp + ''
  // console.log('aa', aa)
}

onMounted(()=>{
  window.addEventListener('resize', cc)
})
onBeforeUnmount(() => {
  // const instance = getCurrentInstance();
  // console.log('maxilog onBeforeUnmount', instance)
  // window.removeEventListener('resize', cc)
})
</script>
<style lang="scss">

</style>