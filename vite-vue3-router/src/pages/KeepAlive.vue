<template>
  <div>
    <div>keepAlive</div>
    <div>keepAlive component, 页面移除前不会触发</div>
    <div>
      <label><input type="radio" v-model="current" :value="Name" /> A</label>
      <label><input type="radio" v-model="current" :value="Name2" /> B</label>
      <KeepAlive >
        <component :is="current"/>
      </KeepAlive>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, onBeforeUnmount, shallowRef, ref} from 'vue'
import Name from '../components/Name.vue';
import Name2 from '../components/Name2.vue';

let current = shallowRef(Name)

const text = ref('aaa')

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