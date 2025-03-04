<template>
  <!-- Dashboard Nav -->
  <div v-if="isDashboardRoute" class="w-full h-[92px] fixed z-50 bg-white flex items-center justify-center shadow-sm">
    <div class="w-full h-[39px] flex items-center justify-between px-4 m-auto py-8 md:px-0 md:w-[810px] md:h-[39px]">
      <!-- Logo -->
      <div class="w-[110px] h-[35px] self-end">
        <router-link to="/">
          <img src="@/assets/images/Logo.png" alt="FitFuel Logo" class="h-16 w-auto" />
        </router-link>
      </div>

      <!-- User Profile -->
      <div class="flex items-center gap-4 md:w-[115px] md:h-[35px]">
        <router-link to="/profile" class="hover:opacity-80 transition-opacity">
          <img src="@/assets/images/user.png" alt="Profile" class="w-5 h-5" />
        </router-link>
        <span class="text-[#339e3f] font-bold font-['Poppins']">name</span>
      </div>
    </div>
  </div>

  <!-- Regular Nav -->
  <div v-else class="w-full h-[92px] fixed z-50 opacity-60 bg-[#d9d9d9] flex items-center justify-center">
    <div class="w-full h-[39px] flex items-center justify-between px-4 m-auto py-8 md:px-0 md:w-[810px] md:h-[39px]">
      <!-- Logo -->
      <div class="w-[110px] h-[35px] self-end">
        <router-link to="/">
          <img src="@/assets/images/Logo.png" alt="FitFuel Logo" class="h-16 w-auto" />
        </router-link>
      </div>
      
      <!-- Navigation Links -->
      <div class="hidden md:inline-flex justify-center items-center gap-[33px]">
        <router-link 
          to="/"
          class="text-base font-['Poppins'] transition-colors"
          :class="$route.path === '/' ? 'text-[#339e3f] font-bold' : 'text-[#333333]'"
        >
          Home
        </router-link>
        <router-link 
          to="/menu"
          class="text-base font-['Poppins'] transition-colors"
          :class="$route.path === '/menu' ? 'text-[#339e3f] font-bold' : 'text-[#333333]'"
        >
          Menu
        </router-link>
        <router-link 
          to="/meal-plans"
          class="text-base font-['Poppins'] transition-colors"
          :class="$route.path === '/meal-plans' ? 'text-[#339e3f] font-bold' : 'text-[#333333]'"
        >
          Meal plans
        </router-link>
        <router-link 
          to="/my-orders"
          class="text-base font-['Poppins'] transition-colors"
          :class="$route.path === '/my-orders' ? 'text-[#339e3f] font-bold' : 'text-[#333333]'"
        >
          My Orders
        </router-link>
        <router-link 
          to="/about"
          class="text-base font-['Poppins'] transition-colors"
          :class="$route.path === '/about' ? 'text-[#339e3f] font-bold' : 'text-[#333333]'"
        >
          About
        </router-link>
        <router-link 
          to="/contact"
          class="text-base font-['Poppins'] transition-colors"
          :class="$route.path === '/contact' ? 'text-[#339e3f] font-bold' : 'text-[#333333]'"
        >
          Contact
        </router-link>
      </div>
      
      <!-- Icons -->
      <div class="flex items-center gap-4 md:w-[115px] md:h-[35px]">
        <button class="hover:opacity-80 transition-opacity" aria-label="Search">
          <img src="@/assets/images/search.png" alt="Search" class="w-5 h-5" />
        </button>
        <router-link to="/profile" class="hover:opacity-80 transition-opacity">
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
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden fixed top-[92px] left-0 w-full bg-white shadow-md"
    >
      <div class="flex flex-col py-4">
        <router-link 
          v-for="(link, index) in ['Home', 'Menu', 'Meal plans', 'My Orders', 'About', 'Contact']"
          :key="index"
          :to="link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`"
          class="px-4 py-3 text-base font-['Poppins'] transition-colors"
          :class="$route.path === (link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`) ? 'text-[#339e3f] font-bold' : 'text-[#333333]'"
          @click="toggleMenu"
        >
          {{ link }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    isDashboardRoute() {
      return this.$route.path.includes('dashboard');
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
};
</script>
