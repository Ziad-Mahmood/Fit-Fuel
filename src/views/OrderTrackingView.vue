<template>
  <div v-if="user" class="mb-10">
    <Header
      class="mb-10"
      title="Your Orders"
      bgImage="order header.png"
      position="center"
    />
    <div class="flex gap-8">
      <order-table 
        :orders="formattedOrders" 
        :loading="loading"
        :error="error"
      />

      <!-- Tracking Illustration -->
      <div class="w-75 flex items-center hidden md:flex">
        <img
          src="../assets/images/order tracking.png"
          alt="Tracking Illustration"
          class="w-full"
        />
      </div>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen p-4 flex flex-col items-center justify-center"
  >
    <p class="text-lg mb-4">Please sign in to view your profile</p>
    <router-link
      to="/login"
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Sign In
    </router-link>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import OrderTable from "@/components/orders/OrderTable.vue";
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: "OrderTrackingView",
  components: {
    Header,
    OrderTable,
  },
  data() {
    return {
      orders: [],
      loading: true,
      error: null,
      user: null
    };
  },
  computed: {
    formattedOrders() {
      return this.orders.map(order => ({
        id: order.id,
        date: new Date(order.timestamp).toLocaleString(),
        address: `${order.shippingDetails.city}, ${order.shippingDetails.state}`,
        price: order.totalPrice,
        status: order.status || 'Order Placed',
        paymentMethod: order.paymentDetails.method,
        items: order.items
      }));
    }
  },
  created() {
    this.loading = true;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchOrders(user.uid);
      } else {
        this.user = null;
        this.error = 'Please login to view your orders';
        this.loading = false;
      }
    });
  },
  methods: {
    async fetchOrders(userId) {
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', userId)
        );
        
        const querySnapshot = await getDocs(q);
        this.orders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort orders by timestamp locally
        this.orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } catch (error) {
        console.error('Error fetching orders:', error);
        this.error = 'Failed to load orders. Please try again later.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
