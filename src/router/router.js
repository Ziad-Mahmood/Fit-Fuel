import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/auth/LoginView.vue";
import HomePage from "@/views/HomePage.vue";
import Register from "@/views/auth/RegisterView.vue";
import CartView from "@/views/CartView.vue";

import MenuView from "@/views/MenuView.vue";

import CheckoutView from "@/views/CheckoutView.vue";
import DvrDashboard from "@/views/dashboards/DvrDashboard.vue";
import KitchenDashboard from "@/views/dashboards/KitchenDashboard.vue";
import PlansView from "@/views/PlansView.vue";

import OrderTrackingView from "@/views/OrderTrackingView.vue";

import ContactView from "@/views/ContactView.vue";
import ProfileView from "@/views/ProfileView.vue";

import AdminDashBoard from "@/views/dashboards/AdminDashBoard.vue";
import AboutUsView from "@/views/AboutUsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
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
      path: "/profile",
      name: "profile",
      component: ProfileView,
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
  ],
});

export default router;
