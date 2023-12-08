import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './index.css'
import router from './router'

const app = createApp(App)
const toastOptions: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 2000
}
app.use(Toast, toastOptions)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
