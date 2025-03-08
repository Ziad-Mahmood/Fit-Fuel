<template>
  <div class="bg-gray-50">
    <div v-if="isLoading" class="min-h-screen flex justify-center items-center">
      <div class="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="userData">
      <ProfileForm 
      :user="userData" 
        @update:email="updateEmail($event)" 
        @update:phone="userData.phone = $event"
        @update:address="userData.address = $event" 
        @orders-click="handleOrdersClick" />

      <div class="flex justify-center items-center ">
        <button @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center">
          <span>Logout</span>
        </button>
      </div>
    </div>

    <div v-else class="min-h-screen p-4 flex flex-col items-center justify-center">
      <p class="text-lg mb-4">Please sign in to view your profile</p>
      <router-link to="/login" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Sign In
      </router-link>
    </div>
  </div>
</template>

<script>
import ProfileForm from "@/components/ProfileForm.vue";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';


export default {
  name: "ProfileView",
  components: {
    ProfileForm,
  },
  data() {
    return {
      isLoading: true,
      userData: null,
      user: null
    };
  },
  mounted() {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user) {
        this.userData = {
          name: user.displayName || 'User',
          username: user.displayName ? '@' + user.displayName.toLowerCase().replace(/\s+/g, '') : '@user',
          profilePicture: "/src/assets/images/logo.png",
          email: user.email || '',
          phone: "+201153528835",
          address: "Maadi, Cairo, Egypt",
          deliveredOrders: "5",

        };
      } else {
        this.userData = null;
      }

      this.isLoading = false;
    });
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        this.$router.push('/login');
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  }
};
</script>
