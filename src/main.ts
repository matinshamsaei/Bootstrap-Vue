import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import './assets/scss/style.scss'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

createApp(App).use(router).mount('#app')
