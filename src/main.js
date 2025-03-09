import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import { createStaticUsers } from './firebase/auth'
import emailjs from '@emailjs/browser'

emailjs.init("service_p7anetg")

createStaticUsers().then(() => {
    console.log('Static users initialized')
  }).catch(error => {
    console.error('Failed to initialize static users:', error)
  })

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')

