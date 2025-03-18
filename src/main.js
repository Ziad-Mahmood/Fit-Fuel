import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

window.Swal = Swal

import i18n from './i18n'; 


emailjs.init("service_p7anetg")

const savedLocale = localStorage.getItem('userLocale') || 'en';
document.documentElement.setAttribute('lang', savedLocale);
document.documentElement.setAttribute('dir', savedLocale === 'ar' ? 'rtl' : 'ltr');

const app = createApp(App)

app.use(store)
app.use(router)

app.config.globalProperties.$swal = Swal

app.use(i18n)
app.mount('#app')

