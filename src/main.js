import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useDemoDataStore from '@stores/demo-data'

import App from './App.vue'
import router from './router'

import Components from '@components'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Components)

// 应用挂载前初始化 store
const demoStore = useDemoDataStore()
demoStore.init()

app.mount('#app')
