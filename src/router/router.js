import { createRouter, createWebHistory } from "vue-router";
import { requireAuth, redirectIfAuthenticated, requireRole, restrictStaffToTheirPages } from './auth-guard';


import LoginView from "@/views/auth/LoginView.vue";
import HomePage from "@/views/HomePage.vue";
import Register from "@/views/auth/RegisterView.vue";
import CartView from "@/views/CartView.vue";

import MenuView from "@/views/MenuView.vue";
import MealDetails from "@/views/MealDetails.vue";

import CheckoutView from "@/views/CheckoutView.vue";
import DvrDashboard from "@/views/dashboards/DvrDashboard.vue";
import KitchenDashboard from "@/views/dashboards/KitchenDashboard.vue";
import Dashboard from "@/views/dashboards/Dashboard.vue";
import PlansView from "@/views/PlansView.vue";

import OrderTrackingView from "@/views/OrderTrackingView.vue";

import ContactView from "@/views/ContactView.vue";
import ProfileView from "@/views/ProfileView.vue";

import AdminDashBoard from "@/views/dashboards/AdminDashBoard.vue";
import AboutUsView from "@/views/AboutUsView.vue";
import NotFound from "@/views/NotFound.vue";
import OrderConfirmation from "@/views/OrderConfirmation.vue";
import Forbidden from "@/views/Forbidden.vue";

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
      path: "/meal",
      name: "mealDetails",
      component: MealDetails,
    },
    {
      path: '/meal/:id',
      name: 'mealDetails',
      component: MealDetails,
      props: true
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
      beforeEnter: requireAuth 
    },
    {
      path: "/403",
      name: "forbidden",
      component: Forbidden
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      beforeEnter: requireAuth
    },
    {
      path: "/dashboard/delivery",
      name: "dvrDashboard",
      component: DvrDashboard,
      beforeEnter: requireRole(['delivery'])
    },
    {
      path: "/dashboard/kitchen",
      name: "kitchenDashboard",
      component: KitchenDashboard,
      beforeEnter: requireRole(['kitchen'])
    },
    {
      path: "/dashboard/admin",
      name: "admin",
      component: AdminDashBoard,
      beforeEnter: requireRole(['admin'])
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
      path: "/aboutus",
      name: "about us",
      component: AboutUsView,
    }, {
      path: "/order-confirmation",
      name: "OrderConfirmation",
      component: OrderConfirmation,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: requireAuth
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
}
);

router.beforeEach(restrictStaffToTheirPages);

export default router;
