import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import './assets/scss/style.scss'

const router = createRouter({ history: createWebHashHistory(), routes: [] })

createApp(App).use(router).mount('#app')
