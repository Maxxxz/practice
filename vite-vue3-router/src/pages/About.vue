<template>
  <div>
    about
    <button @click="handleClick" id="aaa">{{ text }}</button>
    <button @click="handleClick" id="bbb">bbb</button>
    <label><input type="radio" v-model="current" :value="Name" /> A</label>
    <label><input type="radio" v-model="current" :value="Name2" /> B</label>
    <KeepAlive >
      <component :is="current"/>
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onBeforeUnmount, shallowRef, ref} from 'vue'
import Name from '../components/Name.vue';
import Name2 from '../components/Name2.vue';

let current = shallowRef(Name)

const text = ref('aaa')

const handleClick = function(){
  console.log('click')
}


const registry = new window.FinalizationRegistry((value) => {
  console.log(`[maxilog] Finalize: ${value}`);
});

onMounted(()=>{
  const instance = getCurrentInstance();
  console.log('maxilog onMounted about', instance)
  // const weakRefa = new window.WeakRef(document.querySelector('#aaa'));
  // const weakRefb = new window.WeakRef(document.querySelector('#bbb'));
  // // const dom = document.querySelector('#aaa')
  // const obj = {a: 1}
  // console.log('maxilog weakRef',  weakRefa, weakRefb)
  // console.log('maxilog weakRefobj',  obj)
  // registry.register(weakRefa, 'weakRefa');
  // registry.register(weakRefa, 'weakRefb');
  // registry.register(obj, 'obj');
})
onBeforeUnmount(() => {
  // const instance = getCurrentInstance();
  console.log('maxilog onBeforeUnmount')
})
</script>
<style lang="scss">

</style>