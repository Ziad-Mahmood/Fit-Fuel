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
    :dir="isRTL ? 'rtl' : 'ltr'"
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
          {{ $t(link.name) }}
        </router-link>
      </div>

      <!-- Icons/login Section -->
      <div class="flex items-center gap-4 md:w-[115px] md:h-[35px]">
        <template v-if="!isDashboardRoute">
          <button
            class="hover:opacity-80 transition-opacity"
            aria-label="Search"
          ></button>
          <router-link
            :to="isUserLoggedIn ? '/profile' : '/login'"
            class="hover:opacity-80 transition-opacity"
          >
            <img src="@/assets/images/user.png" alt="Profile" class="w-5 h-5" />
          </router-link>
          <router-link to="/cart" class="hover:opacity-80 transition-opacity">
            <img src="@/assets/images/cart.png" alt="Cart" class="w-5 h-5" />
          </router-link>

          <div class="relative">
            <button @click="toggleLangMenu">
              <i
                class="fa-solid fa-earth-americas hover:opacity-80 transition-opacity text-[#339e3f]"
              ></i>
            </button>
            <div
              v-if="isLangMenuOpen"
              class="absolute bg-white shadow-md right-[-50px] mt-2 w-28 rounded-md top-full"
            >
              <button
                @click="changeLanguage('en')"
                class="block w-full px-4 py-2 hover:bg-gray-100"
              >
                English
              </button>
              <button
                @click="changeLanguage('ar')"
                class="block w-full px-4 py-2 hover:bg-gray-100"
              >
                العربية
              </button>
            </div>
          </div>

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
              v-if="currentUser && currentUser.warned" 
              class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
            >
              Warned
            </span>
          <span
            v-if="isUserLoggedIn && currentUser"
            class="text-[#339e3f] font-bold font-['Poppins']"
          >{{ currentUser.displayName || "User" }}</span>

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
          {{ $t(link.name) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, onSnapshot } from "firebase/firestore";  

export default {
  name: "Nav",
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false,
      isUserLoggedIn: false,
      currentUser: null,
      userUnsubscribe: null,
      isLangMenuOpen: false,
      navLinks: [
        { path: "/", name: "nav.home" },
        { path: "/menu", name: "nav.menu" },
        { path: "/meal-plans", name: "nav.mealPlans" },
        { path: "/order-tracking", name: "nav.orders" },
        { path: "/aboutus", name: "nav.about" },
        { path: "/contact", name: "nav.contact" },
      ],
    };
  },
  computed: {
    isDashboardRoute() {
      return this.$route.path.includes("dashboard");
    },
    isRTL() {
      return this.$i18n.locale === "ar";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    this.unsubscribe = onAuthStateChanged(auth, async (user) => {
      this.isUserLoggedIn = !!user;

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          
          this.userUnsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              this.currentUser = {
                ...user,
                ...doc.data(),
                warned: doc.data().warned || false
              };
            } else {
              this.currentUser = user;
            }
          });
          
        } catch (error) {
          console.error("Error fetching user data:", error);
          this.currentUser = user;
        }
      } else {
        this.currentUser = null;
      }
    });
    
    this.$i18n.locale = localStorage.getItem("lang") || "en";
  },
  
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);

    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.userUnsubscribe) {
      this.userUnsubscribe();
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
    toggleLangMenu(event) {
      this.isLangMenuOpen = !this.isLangMenuOpen;
      event.stopPropagation();
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.isLangMenuOpen = false;
    },
  },
};
</script>
