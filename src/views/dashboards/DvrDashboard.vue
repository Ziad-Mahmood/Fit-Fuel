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
import { collection, getDocs, query, where, updateDoc, doc , onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';


export default {
  name: "DriverDashboard",
  components: {
    Header,
    DashTable,
  },
 data() {
  return {
    orders: [],
    unsubscribeOrders: null,
    loading: true,
    error: null
  };
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
  await this.fetchOrders(); 
},
beforeUnmount() {
  if (this.unsubscribeOrders) this.unsubscribeOrders(); 
}
,
  methods: {
  setupOrdersListener() {
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("status", "==", "ready_for_delivery")
      );
      this.unsubscribeOrders = onSnapshot(
        ordersQuery,
        (snapshot) => {
          this.orders = snapshot.docs.map((doc) => {
            const orderData = doc.data();
            return {
              id: doc.id,
              date: orderData.orderDate
                ? new Date(orderData.orderDate.toDate()).toLocaleDateString()
                : "No Date",
              address: orderData.address?.street || "No Address",
              city: orderData.address?.city || "No City",
              isComplete: orderData.isComplete || false,
            };
          });
        },
        (error) => {
          console.error("Error fetching orders:", error);
          this.error = "Failed to load orders";
        }
      );
    } catch (error) {
      console.error("Error setting up orders listener:", error);
      this.error = "Failed to set up real-time orders";
    }
  },

  async fetchOrders() {
    try {
      this.loading = true;
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("status", "in", ["On Delivery", "Being Delivered"])
      );

      const querySnapshot = await getDocs(q);
      this.orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      this.orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error("Error fetching orders:", error);
      this.error = "Failed to load orders";
    } finally {
      this.loading = false;
    }
  },

  async acceptOrder(orderId) {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        isAccepted: true,
        status: "Being Delivered",
      });
      const order = this.orders.find((o) => o.id === orderId);
      if (order) {
        order.isAccepted = true;
        order.status = "Being Delivered";
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  },

  async markAsDelivered(orderId) {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "Delivered",
      });
      await this.fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  },
},
