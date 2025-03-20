<template>
  <div>
    <Header
      title="Forbidden"
      bgImage="403.jpg"
      position="right"
    />
    
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-[#339e3f] mb-4">403</h1>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Access Forbidden</h2>
        <p class="text-gray-600 mb-8">Sorry, you don't have permission to access this page.</p>
        <div class="space-x-4">
          <router-link v-if="isStaff" to="/dashboard" class="btn px-6 py-2">
            Go to Dashboard
          </router-link>
          <router-link v-else to="/" class="btn px-6 py-2">
            Go Home
          </router-link>
          <router-link to="/login" class="text-[#339e3f] hover:underline">
            Login with different account
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import { auth } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'Forbidden',
  components: {
    Header      
  },
  data() {
    return {
      isStaff: false
    }
  },
  async created() {
    if (auth.currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.isStaff = ['admin', 'kitchen', 'delivery'].includes(userData.role);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    }
  }
}
</script>