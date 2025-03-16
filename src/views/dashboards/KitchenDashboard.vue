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
import { collection, getDocs, query, where, updateDoc, doc, onSnapshot, getDoc, addDoc } from 'firebase/firestore'
import { db, auth } from '@/firebase/config'
import Swal from 'sweetalert2'

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
          // Check for new orders
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added" && change.doc.data().status === "Order Placed") {
              // Play sound for new order
              const audio = new Audio('/src/assets/sounds/notification.mp3');
              audio.play().catch(e => console.log('Audio play failed:', e));
              
              // Show toast notification
              Swal.fire({
                title: 'New Order!',
                text: 'A new order has been placed',
                icon: 'info',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
            }
          });
          
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
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().warned) {
          throw new Error("You are currently warned and cannot accept new orders");
        }

        await updateDoc(orderRef, {
          status: "Preparing",
          updatedAt: new Date()
        });
      } catch (error) {
        console.error("Error updating order:", error);
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error'
        });
      }
    },

    async markAsReady(orderId) {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderDoc = await getDoc(orderRef);
        const orderData = orderDoc.data();
        
        await updateDoc(orderRef, {
          status: "On Delivery",
          updatedAt: new Date()
        });
        
        // Create notification for user
        if (orderData && orderData.userId) {
          await addDoc(collection(db, "notifications"), {
            userId: orderData.userId,
            title: "Order Ready for Delivery",
            message: `Your order #${orderId.slice(0, 6)} is now ready for delivery.`,
            read: false,
            createdAt: new Date()
          });
        }
        
        // Notify delivery drivers
        Swal.fire({
          title: 'Order Ready',
          text: 'Order has been marked ready for delivery',
          icon: 'success',
          timer: 2000
        });
      } catch (error) {
        console.error("Error updating order:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to mark order as ready',
          icon: 'error'
        });
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