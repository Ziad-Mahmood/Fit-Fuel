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
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'KitchenDashboard',
  components: {
    Header,
    DashTable
  },
  data() {
    return {
      orders: [],
      loading: true,
      error: null
    }
  },
  computed: {
    formattedOrders() {
      return this.orders.map(order => ({
        id: order.id,
        date: order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A',
        address: order.items?.map(item => item.name).join(', ') || 'No items',
        price: order.totalPrice,
        status: order.status || 'Order Placed',
        isComplete: order.status === 'Preparing'
      }));
    }
  },
  async created() {
    await this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        this.loading = true;
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('status', 'in', ['Order Placed', 'Preparing', 'On Delivery'])
        );
        
        const querySnapshot = await getDocs(q);
        this.orders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        this.orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } catch (error) {
        console.error('Error fetching orders:', error);
        this.error = 'Failed to load orders';
      } finally {
        this.loading = false;
      }
    },

    async markAsReady(orderId) {
      try {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, {
          status: 'On Delivery'
        });
        await this.fetchOrders();
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }, 

    async acceptOrder(orderId) {
      try {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, {
          status: 'Preparing'
        });
        await this.fetchOrders();
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  }
}
</script>