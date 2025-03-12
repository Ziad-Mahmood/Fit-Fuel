<template>
  <div
    class="w-full h-20 fixed z-50 flex items-center justify-center transition-all duration-300"
    :class="[
      isDashboardRoute
        ? isScrolled
          ? 'opacity-0 hover:opacity-80 bg-white'
          : 'bg-white shadow-sm'
        : isScrolled
        ? 'opacity-0 hover:opacity-80 bg-white'
        : 'bg-white',
    ]"
  >
    <div
      class="w-full h-[39px] flex items-center justify-between px-4 m-auto py-8 md:px-0 md:w-[810px] md:h-[39px]"
    >
      <!-- Logo -->
      <div class="w-[110px] h-[35px] self-end">
        <router-link to="/">
          <img
            src="@/assets/images/Logo.png"
            alt="FitFuel Logo"
            class="h-16 w-auto"
          />
        </router-link>
      </div>

      <!-- Navigation Links - Only show in regular nav -->
      <div
        v-if="!isDashboardRoute"
        class="hidden md:inline-flex justify-center items-center gap-[33px]"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="text-base font-['Poppins'] transition-colors"
          :class="
            $route.path === link.path
              ? 'text-[#339e3f] font-bold'
              : 'text-[#333333]'
          "
        >
          {{ link.name }}
        </router-link>
      </div>

      <!-- Icons/login Section -->
      <div class="flex items-center gap-4 md:w-[115px] md:h-[35px]">
        <template v-if="!isDashboardRoute">
          <button
            class="hover:opacity-80 transition-opacity"
            aria-label="Search"
          >
            
          </button>
          <router-link
            :to="isUserLoggedIn ? '/profile' : '/login'"
            class="hover:opacity-80 transition-opacity"
          >
            <img src="@/assets/images/user.png" alt="Profile" class="w-5 h-5" />
          </router-link>
          <router-link to="/cart" class="hover:opacity-80 transition-opacity">
            <img src="@/assets/images/cart.png" alt="Cart" class="w-5 h-5" />
          </router-link>
          <button
            @click="toggleMenu"
            class="md:hidden hover:opacity-80 transition-opacity"
            aria-label="Menu"
          >
            <img src="@/assets/images/menu.png" alt="Menu" class="w-5 h-5" />
          </button>
        </template>
        <template
          v-else-if="
            $route.path.includes('/dashboard/kitchen') ||
            $route.path.includes('/dashboard/delivery') ||
            $route.path.includes('/dashboard/admin')
          "
        >
        <span 
              v-if="currentUser.warned" 
              class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
            >
              Warned
            </span>
          <span
            v-if="isUserLoggedIn && currentUser"
            class="text-[#339e3f] font-bold font-['Poppins']"
            >{{ currentUser.displayName || "User" }}</span
          >

          <div class="flex justify-center items-center">
            <button
              @click="logout"
              class="btn-logout py-1 px-5 flex items-center"
            >
              <span>Logout</span>
            </button>
          </div>
        </template>
        <template v-else>
          <router-link
            :to="isUserLoggedIn ? '/profile' : '/login'"
            class="hover:opacity-80 transition-opacity"
          >
            <img src="@/assets/images/user.png" alt="Profile" class="w-5 h-5" />
          </router-link>
          <span
            v-if="isUserLoggedIn && currentUser"
            class="flex items-center gap-2"
          >
            <span class="text-[#339e3f] font-bold font-['Poppins']">
              {{ currentUser.displayName || "User" }}
            </span>
           
          </span>
        </template>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen && !isDashboardRoute"
      class="md:hidden fixed top-20 left-0 text-center w-full bg-white shadow-md"
    >
      <div class="flex flex-col py-4">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="px-4 py-3 text-base font-['Poppins'] transition-colors"
          :class="
            $route.path === link.path
              ? 'text-[#339e3f] font-bold'
              : 'text-[#333333]'
          "
          @click="toggleMenu"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "Nav",
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false,
      isUserLoggedIn: false,
      currentUser: null,
      userUnsubscribe: null,
      navLinks: [
        { path: "/", name: "Home" },
        { path: "/menu", name: "Menu" },
        { path: "/meal-plans", name: "Meal plans" },
        { path: "/order-tracking", name: "Orders" },
        { path: "/aboutus", name: "About" },
        { path: "/contact", name: "Contact" },
      ],
    };
  },
  computed: {
    isDashboardRoute() {
      return this.$route.path.includes("dashboard");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    this.unsubscribe = onAuthStateChanged(auth, async (user) => {
      this.isUserLoggedIn = !!user;

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            this.currentUser = {
              ...user,
              ...userDoc.data(),
              warned: userDoc.data().warned || false
            };
          } else {
            this.currentUser = user;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          this.currentUser = user;
        }
      } else {
        this.currentUser = null;
      }
    });
    console.log(`user: ${this.currentUser}`);
    console.log(`is logged in: ${this.isUserLoggedIn}`);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);

    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 100;
    },
    async logout() {
      try {
        await signOut(auth);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },
};
</script>
