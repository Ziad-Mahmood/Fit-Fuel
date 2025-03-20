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
import { collection, query, orderBy, where, onSnapshot, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

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
      user: null,
      unsubscribe: null,
      deliveredOrdersCount: 0  
    };
  },

  methods: {
    async fetchOrders(userId) {
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', userId)
        );
        
        this.unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "modified") {
              const newData = change.doc.data();
              const oldStatus = this.orders.find(o => o.id === change.doc.id)?.status;
              
              if (oldStatus && oldStatus !== newData.status) {
                const audio = new Audio('/src/assets/sounds/notification.mp3');
                audio.play().catch(e => console.log('Audio play failed:', e));
                
                Swal.fire({
                  title: 'Order Updated',
                  text: `Your order status changed to: ${newData.status}`,
                  icon: 'info',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 5000
                });
              }
            }
          });
          
          this.orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          this.deliveredOrdersCount = this.orders.filter(order => order.status === 'Delivered').length;
          
          try {
            const userRef = doc(db, 'users', userId);
            updateDoc(userRef, {
              deliveredOrders: this.deliveredOrdersCount
            }).catch(err => console.error('Error updating delivered orders count:', err));
          } catch (error) {
            console.error('Error updating delivered orders count:', error);
          }
          
          this.orders.sort((a, b) => {
            if (a.timestamp && b.timestamp) {
              return new Date(b.timestamp) - new Date(a.timestamp);
            }
            return 0;
          });
          
          this.loading = false;
          
          this.markOrdersAsSeen();
        }, (error) => {
          console.error('Error fetching orders:', error);
          this.error = 'Failed to load orders. Please try again later.';
          this.loading = false;
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
        this.error = 'Failed to load orders. Please try again later.';
        this.loading = false;
      }
    },
    
    markOrdersAsSeen() {
      if (this.orders.length > 0) {
        this.$store.dispatch('notifications/markOrdersAsSeen');
      }
    }
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
        
        localStorage.setItem('lastSeenOrderUpdate', new Date().toISOString());
      } else {
        this.user = null;
        this.error = 'Please login to view your orders';
        this.loading = false;
      }
    });
  },
  
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
</script>
