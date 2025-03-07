import { createRouter, createWebHistory } from "vue-router";
import { requireAuth, redirectIfAuthenticated } from './auth-guard';

import LoginView from "@/views/auth/LoginView.vue";
import HomePage from "@/views/HomePage.vue";
import Register from "@/views/auth/RegisterView.vue";
import CartView from "@/views/CartView.vue";

import MenuView from "@/views/MenuView.vue";
import MealDetails from "@/views/MealDetails.vue";

import CheckoutView from "@/views/CheckoutView.vue";
import DvrDashboard from "@/views/dashboards/DvrDashboard.vue";
import KitchenDashboard from "@/views/dashboards/KitchenDashboard.vue";
import PlansView from "@/views/PlansView.vue";

import OrderTrackingView from "@/views/OrderTrackingView.vue";

import ContactView from "@/views/ContactView.vue";
import ProfileView from "@/views/ProfileView.vue";

import AdminDashBoard from "@/views/dashboards/AdminDashBoard.vue";
import AboutUsView from "@/views/AboutUsView.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      // meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      // beforeEnter: redirectIfAuthenticated
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      // beforeEnter: redirectIfAuthenticated
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      // meta: { requiresAuth: true },
      // beforeEnter: requireAuth
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/menu",
      name: "Menu",
      component: MenuView,
    },
    {
      path: "/meal",
      name: "mealDetails",
      component: MealDetails,
    },
    {
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
      path: "/order-tracking",
      name: "order-tracking",
      component: OrderTrackingView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/dashboard/admin",
      name: "admin",
      component: AdminDashBoard,
    },
    {
      path: "/aboutus",
      name: "about us",
      component: AboutUsView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound
    }
  ]
  ,
  
});


// Navigation guard for authenticated routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    requireAuth(to, from, next)
  } else {
    next()
  }
})

export default router;
