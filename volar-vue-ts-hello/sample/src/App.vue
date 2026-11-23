<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
	<div id="app">
		<HelloWorld />
	</div>
</template>

<style>
* {
	box-sizing: border-box;
}

body {
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	background: #f8f9fa;
}

#app {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
