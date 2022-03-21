import { createSSRApp } from 'vue'
import App from './App.vue'
import { renderToString } from 'vue/server-renderer'


const app = createSSRApp(App)


;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()

// this runs in Node.js on the server.
// import { createSSRApp } from 'vue'
// // Vue's server-rendering API is exposed under `vue/server-renderer`.
// import { renderToString } from 'vue/server-renderer'

// const app = createSSRApp({
//   data: () => ({ count: 1 }),
//   template: `<button @click="count++">{{ count }}</button>`
// })

// renderToString(app).then((html) => {
//   console.log(html)
// })