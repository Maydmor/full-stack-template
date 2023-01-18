import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useI18n } from '@/composables/useI18n'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(useI18n());

app.mount('#app')
