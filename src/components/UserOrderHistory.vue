<template>
  <div v-if="show" class="mt-4 rounded-lg shadow-md bg-white dark:bg-[var(--color-surface)] transition-colors duration-300">
    <div class="responsive-table">
      <table class="w-full">
        <thead>
          <tr class="border-b dark:border-[var(--color-border)]">
            <th class="px-2 py-2 text-[#191919] dark:text-[var(--color-heading)] text-sm md:text-base font-semibold">Order ID</th>
            <th class="px-2 py-2 text-[#191919] dark:text-[var(--color-heading)] text-sm md:text-base font-semibold">Date</th>
            <th class="px-2 py-2 text-[#191919] dark:text-[var(--color-heading)] text-sm md:text-base font-semibold">Items</th>
            <th class="px-2 py-2 text-[#191919] dark:text-[var(--color-heading)] text-sm md:text-base font-semibold">Total</th>
            <th class="px-2 py-2 text-[#191919] dark:text-[var(--color-heading)] text-sm md:text-base font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" v-for="n in 3" :key="n" class="animate-pulse">
            <td v-for="i in 5" :key="i" class="px-2 py-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </td>
          </tr>
          <tr v-else-if="orders.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500 dark:text-[var(--color-text-mute)]">No orders found</td>
          </tr>
          <tr v-else v-for="order in orders" :key="order.id" 
              class="border-t dark:border-[var(--color-border)] hover:bg-gray-50 dark:hover:bg-[var(--color-background-mute)] transition-colors duration-200">
            <td class="px-2 py-2 text-center text-xs md:text-sm dark:text-[var(--color-text)]">{{ order.id.slice(-6) }}</td>
            <td class="px-2 py-2 text-center text-xs md:text-sm dark:text-[var(--color-text)]">{{ formatDateCompact(order.timestamp) }}</td>
            <td class="px-2 py-2 text-center text-xs md:text-sm dark:text-[var(--color-text)]">{{ getCompactItems(order.items) }}</td>
            <td class="px-2 py-2 text-center text-xs md:text-sm dark:text-[var(--color-text)]">${{ order.totalPrice }}</td>
            <td class="px-2 py-2 text-center">
              <span class="px-1 py-0.5 rounded-full text-xs md:text-sm" 
                    :class="getStatusClass(order.status)">
                {{ order.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/config'

export default {
  name: 'UserOrderHistory',
  props: {
    show: Boolean,
    userId: String
  },
  data() {
    return {
      orders: [],
      loading: true,
      unsubscribeOrders: null
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    },
    formatDateCompact(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
    getAllItems(items) {
      return items?.map(item => item.name).join(', ') || 'No items'
    },
    getCompactItems(items) {
      if (!items || items.length === 0) return 'No items';
      if (items.length === 1) return items[0].name;
      return `${items[0].name}${items.length > 1 ? ` +${items.length - 1}` : ''}`;
    },
    getStatusClass(status) {
      const classes = {
        'Delivered': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
        'Completed': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
        'Pending': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
      }
      return classes[status] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
    },
    setupOrdersListener() {
      if (!this.userId) return;
      
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', this.userId),
          where('status', '==', 'Delivered'),
          orderBy('timestamp', 'desc')
        );
        
        this.unsubscribeOrders = onSnapshot(q, (snapshot) => {
          this.orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          this.loading = false;
        }, (error) => {
          console.error('Error listening to orders:', error);
          this.loading = false;
        });
      } catch (error) {
        console.error('Error setting up orders listener:', error);
        this.loading = false;
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal && !this.unsubscribeOrders) {
        this.setupOrdersListener();
      }
    },
    userId(newVal) {
      if (newVal && this.show && !this.unsubscribeOrders) {
        this.setupOrdersListener();
      }
    }
  },
  beforeUnmount() {
    if (this.unsubscribeOrders) {
      this.unsubscribeOrders();
    }
  }
}
</script>

<style scoped>
.responsive-table {
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 380px) {
  .responsive-table {
    display: block;
    width: 100%;
    overflow-x: hidden;
  }
  
  table {
    table-layout: fixed;
    width: 100%;
  }
  
  th, td {
    padding: 0.25rem !important;
    font-size: 0.7rem !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
