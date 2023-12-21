import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import memoryMixn from './memoryCheck'

const app = createApp(App);
app.mixin(memoryMixn)
app.mount('#app')
