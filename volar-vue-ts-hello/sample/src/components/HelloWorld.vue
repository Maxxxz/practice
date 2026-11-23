<script setup lang="ts">
import { ref } from 'vue';

const showTip = ref(false);
const tipMessage = ref('');

function handleHelloClick(): void {
	showTip.value = true;
	tipMessage.value = '👋 你点击了 Hello World！这是基于 Volar + Vue 3 + TypeScript 的提示。';
}

function closeTip(): void {
	showTip.value = false;
}
</script>

<template>
	<div class="hello">
		<h1
			class="hello-text"
			@click="handleHelloClick"
			title="点击我"
		>
			Hello World
		</h1>

		<p class="hint">点击上方文字查看 tips 提示</p>

		<Transition name="tip-fade">
			<div v-if="showTip" class="tip-overlay" @click.self="closeTip">
				<div class="tip-box" role="alert">
					<p>{{ tipMessage }}</p>
					<button type="button" @click="closeTip">知道了</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.hello {
	text-align: center;
	padding: 2rem;
}

.hello-text {
	display: inline-block;
	font-size: 2.5rem;
	color: #42b983;
	cursor: pointer;
	user-select: none;
	transition: transform 0.2s ease, color 0.2s ease;
}

.hello-text:hover {
	color: #2c8f6b;
	transform: scale(1.05);
}

.hint {
	color: #666;
	font-size: 0.9rem;
}

.tip-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.35);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.tip-box {
	background: #fff;
	border-radius: 12px;
	padding: 1.5rem 2rem;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	max-width: 360px;
	text-align: center;
}

.tip-box p {
	margin: 0 0 1rem;
	line-height: 1.6;
	color: #333;
}

.tip-box button {
	background: #42b983;
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 0.5rem 1.5rem;
	cursor: pointer;
	font-size: 0.95rem;
}

.tip-box button:hover {
	background: #2c8f6b;
}

.tip-fade-enter-active,
.tip-fade-leave-active {
	transition: opacity 0.25s ease;
}

.tip-fade-enter-from,
.tip-fade-leave-to {
	opacity: 0;
}
</style>
