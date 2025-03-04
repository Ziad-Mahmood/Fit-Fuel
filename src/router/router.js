
import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/auth/LoginView.vue';
import HomePage from '@/views/HomePage.vue';
import Register from '@/views/auth/RegisterView.vue'
import CartView from "@/views/CartView.vue";



import MenuView from '@/views/MenuView.vue';


import CheckoutView from "@/views/CheckoutView.vue";
import DvrDashboard from "@/views/dashboards/DvrDashboard.vue";
import KitchenDashboard from "@/views/dashboards/KitchenDashboard.vue";
import PlansView from "@/views/PlansView.vue";
import ContactView from '@/views/ContactView.vue';


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

      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/dashboard/delivery",
      name: "dvrDashboard",
      component: DvrDashboard,
    },
    {
      path: "/dashboard/kitchen",
      name: "kitchenDashboard",
      component: KitchenDashboard,
    },
    {
      path: "/meal-plans",
      name: "plans",
      component: PlansView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },

  ],
});

export default router;
