import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'


import i18n from './i18n'; 


emailjs.init("service_p7anetg")

const savedLocale = localStorage.getItem('userLocale') || 'en';
document.documentElement.setAttribute('lang', savedLocale);
document.documentElement.setAttribute('dir', savedLocale === 'ar' ? 'rtl' : 'ltr');

const app = createApp(App)

// Add error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err, info);
};

app.use(store)
app.use(router)
app.use(i18n)

// Wait for router to be ready
router.isReady().then(() => {
  app.mount('#app')
});

app.config.globalProperties.$swal = Swal

