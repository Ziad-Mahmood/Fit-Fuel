
import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/auth/LoginView.vue';
import HomePage from '@/views/HomePage.vue';
import Register from '@/views/auth/RegisterView.vue'
import CartView from "@/views/CartView.vue";


import MenuView from '@/views/MenuView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      path: '/',
      name: 'Home',
      component: HomePage

    },
    {

      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },

    {
      path: "/menu",
      name: "Menu",
      component: MenuView

    }
  ],
});

export default router;
