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

onMounted(()=>{
  const instance = getCurrentInstance();
  console.log('maxilog onMounted about', instance)
})
onBeforeUnmount(() => {
  console.log('maxilog onBeforeUnmount')
})
</script>
<style lang="scss">

</style>