<template>
  <div class="min-h-screen">
    <Header
      title="Order Delivery"
      bgImage="header-delivery.png"
      position="left"
    />

    <div class="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <DashTable 
        :items="formattedOrders"
        :loading="loading"
        :error="error"
        sideImage="SideDelivery.png"
        imageAlt="Delivery"
        @accept-order="acceptOrder"
        @mark-ready="markAsDelivered"
      />
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/Header.vue'
import DashTable from '../../components/dashboard/DashTable.vue'
import { collection, getDocs, query, where, updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore'
import { db, auth } from '@/firebase/config'
import Swal from 'sweetalert2'

export default {
  name: "DriverDashboard",
  components: {
    Header,
    DashTable
  },
  data() {
    return {
      orders: [],
      unsubscribeOrders: null,
      loading: true,
      error: null
    }
  },
  computed: {
    formattedOrders() {
      return this.orders.map(order => ({
        id: order.id,
        date: order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A',
        address: `${order.shippingDetails?.city}, ${order.shippingDetails?.state}` || 'No address',
        price: order.totalPrice,
        status: order.status || 'On Delivery',
        isComplete: order.status === 'On Delivery'
      }));
    }
  },
  async created() {
    this.setupOrdersListener();  
  },
  beforeUnmount() {
    if (this.unsubscribeOrders) this.unsubscribeOrders(); 
  },
  methods: {
    setupOrdersListener() {
      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("status", "in", ["On Delivery", "Being Delivered"]) 
        );
        
        this.unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
          this.orders = snapshot.docs.map((doc) => {
            const orderData = doc.data();
            return {
              id: doc.id,
              ...orderData,
              timestamp: orderData.timestamp,
              shippingDetails: orderData.shippingDetails || {},
              totalPrice: orderData.totalPrice,
              status: orderData.status
            };
          });
          
          this.orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          this.loading = false;
        }, (error) => {
          console.error("Error fetching orders:", error);
          this.error = "Failed to load orders";
          this.loading = false;
        });
      } catch (error) {
        console.error("Error setting up orders listener:", error);
        this.error = "Failed to set up real-time orders";
        this.loading = false;
      }
    },

    async acceptOrder(orderId) {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().warned) {
          throw new Error("You are currently warned and cannot accept new orders");
        }

        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
          status: "Being Delivered",
          driverId: auth.currentUser.uid,
          updatedAt: new Date()
        });
      } catch (error) {
        console.error("Error accepting order:", error);
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error'
        });
      }
    },

     async markAsDelivered(orderId) {
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
          status: "Delivered",
          updatedAt: new Date()
        });
      } catch (error) {
        console.error("Error updating order:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to mark order as delivered',
          icon: 'error'
        });
      }
    }
  }
}
</script>