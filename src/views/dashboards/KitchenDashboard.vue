<template>
  <div class="min-h-screen">
    <Header
      title="Kitchen Orders"
      bgImage="header-Kitchen.png"
      position="left"
    />

    <div class="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <DashTable 
        :items="formattedOrders"
        :loading="loading"
        :error="error"
        sideImage="sideKitchen.png"
        imageAlt="Kitchen"
        @accept-order="acceptOrder"
        @mark-ready="markAsReady"
      />
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/Header.vue'
import DashTable from '../../components/dashboard/DashTable.vue'
import { collection, getDocs, query, where, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/config'

export default {
  name: "KitchenDashboard",
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
        address: this.getAllItems(order.items),
        city: order.address?.city || '',
        price: order.totalPrice,
        status: order.status || 'Order Placed',
        isComplete: order.status === 'Preparing',
        isCustomized: order.items?.some(item => item.removedIngredients?.length),
        removedIngredients: this.getAllRemovedIngredients(order.items)
      }));
    }
  },
  methods: {
    getAllItems(items) {
      if (!items || !items.length) return 'No items';
      return items.map(item => item.name).join(', ');
    },

    getAllRemovedIngredients(items) {
      if (!items) return [];
      return items
        .filter(item => item.removedIngredients?.length)
        .flatMap(item => item.removedIngredients);
    },

    setupOrdersListener() {
      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("status", "in", ["Order Placed", "Preparing", "On Delivery"])
        );
        
        this.unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
          this.orders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            items: doc.data().items || [],
            timestamp: doc.data().timestamp,
            address: doc.data().address || {}
          }));
          this.loading = false;
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        this.error = "Failed to set up real-time orders";
        this.loading = false;
      }
    },

    async acceptOrder(orderId) {
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
          status: "Preparing",
          updatedAt: new Date()
        });
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },

    async markAsReady(orderId) {
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
          status: "On Delivery",
          updatedAt: new Date()
        });
      } catch (error) {
        console.error("Error updating order:", error);
      }
    }
  },

  created() {
    this.setupOrdersListener();
  },
  beforeUnmount() {
    if (this.unsubscribeOrders) {
      this.unsubscribeOrders();
    }
  }
}
</script>