
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import Register from '@/views/auth/RegisterView.vue'
import CartView from "@/views/CartView.vue";
import DvrDashboard from "@/views/dashboards/DvrDashboard.vue";
import PlansView from "@/views/PlansView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: "/dashboard/delivery",
      name: "dvrDashboard",
      component: DvrDashboard,
    },
    {
      path: "/meal-plans",
      name: "plans",
      component: PlansView,
    }
  ],
});

export default router;
