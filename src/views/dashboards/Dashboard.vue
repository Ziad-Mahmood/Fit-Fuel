<template>
  <div class="min-h-screen">
    <Header
      title="Staff Dashboard"
      bgImage="dashboard-header.jpg"
      position="center"
    />
    
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-12">Select Your Dashboard</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Admin Dashboard -->
        <div v-if="userRole === 'admin'" class=" hover:shadow-2xl  border-2 border-white rounded-lg" @click="navigateTo('/dashboard/admin')">
          <img src="@/assets/images/admin.jpeg" alt="Admin Dashboard" class="w-full h-64 object-cover rounded-t-lg">
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold mb-2">Admin Dashboard</h3>
            <p class="text-gray-600 mb-4">Manage users, products, and system settings</p>
            <button class="btn px-6 py-2">Enter Dashboard</button>
          </div>
        </div>
        
        <!-- Kitchen Dashboard -->
        <div v-if="userRole === 'admin' || userRole === 'kitchen'" class=" hover:shadow-2xl  border-2 border-white rounded-lg" @click="navigateTo('/dashboard/kitchen')">
          <img src="@/assets/images/sideKitchen.png" alt="Kitchen Dashboard" class="w-full h-64 object-cover rounded-t-lg">
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold mb-2">Kitchen Dashboard</h3>
            <p class="text-gray-600 mb-4">Manage food orders and preparation</p>
            <button class="btn px-6 py-2">Enter Dashboard</button>
          </div>
        </div>
        
        <!-- Delivery Dashboard -->
        <div v-if="userRole === 'admin' || userRole === 'delivery'" class=" hover:shadow-2xl  border-2 border-white rounded-lg" @click="navigateTo('/dashboard/delivery')">
          <img src="@/assets/images/SideDelivery.png" alt="Delivery Dashboard" class="w-full h-64 object-cover rounded-t-lg">
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold mb-2">Delivery Dashboard</h3>
            <p class="text-gray-600 mb-4">Manage order deliveries and tracking</p>
            <button class="btn px-6 py-2">Enter Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default {
  name: 'Dashboard',
  components: {
    Header
  },
  data() {
    return {
      userRole: null
    }
  },
  async created() {
    if (auth.currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          this.userRole = userDoc.data().role;
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    } else {
      this.$router.push('/403');
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

