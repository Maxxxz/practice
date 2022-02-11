<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Parent from './components/parent.vue'

const sname="ha1"
const arr = ['a', 'b', 'c']

function getsname(index){
  return "ha"+index
}

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Parent :arr="arr">
    <template v-for="(val, index) in arr" v-slot:[getsname(index)]="item">
      <p>sleo1ee {{item.val}}</p>
    </template>
  </Parent>
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
