import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
window.Swal = Swal

emailjs.init("service_p7anetg")


const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')

