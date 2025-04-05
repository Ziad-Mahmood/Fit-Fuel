<template>
  <div v-if="show" class="mt-4 rounded-lg shadow-md overflow-x-auto bg-white dark:bg-[var(--color-surface)] transition-colors duration-300">
    <table class="w-full">
      <thead>
        <tr class="border-b dark:border-[var(--color-border)]">
          <th class="px-4 py-2 text-[#191919] dark:text-[var(--color-heading)] text-base font-semibold">Order ID</th>
          <th class="px-4 py-2 text-[#191919] dark:text-[var(--color-heading)] text-base font-semibold">Order Date</th>
          <th class="px-4 py-2 text-[#191919] dark:text-[var(--color-heading)] text-base font-semibold">Items</th>
          <th class="px-4 py-2 text-[#191919] dark:text-[var(--color-heading)] text-base font-semibold">Total</th>
          <th class="px-4 py-2 text-[#191919] dark:text-[var(--color-heading)] text-base font-semibold">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading" v-for="n in a" :key="n" class="animate-pulse">
          <td v-for="i in 5" :key="i" class="px-4 py-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </td>
        </tr>
        <tr v-else-if="orders.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500 dark:text-[var(--color-text-mute)]">No orders found</td>
        </tr>
        <tr v-else v-for="order in orders" :key="order.id" 
            class="border-t dark:border-[var(--color-border)] hover:bg-gray-50 dark:hover:bg-[var(--color-background-mute)] transition-colors duration-200">
          <td class="px-4 py-2 text-center dark:text-[var(--color-text)]">{{ order.id.slice(-6) }}</td>
          <td class="px-4 py-2 text-center dark:text-[var(--color-text)]">{{ formatDate(order.timestamp) }}</td>
          <td class="px-4 py-2 text-center dark:text-[var(--color-text)]">{{ getAllItems(order.items) }}</td>
          <td class="px-4 py-2 text-center dark:text-[var(--color-text)]">${{ order.totalPrice }}</td>
          <td class="px-4 py-2 text-center">
            <span class="px-2 py-1 rounded-full text-sm" 
                  :class="getStatusClass(order.status)">
              {{ order.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
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
      loading: true
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    },
    getAllItems(items) {
      return items?.map(item => item.name).join(', ') || 'No items'
    },
    getStatusClass(status) {
      const classes = {
        'Delivered': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
        'Completed': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
        'Pending': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
      }
      return classes[status] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
    },
    async fetchOrders() {
      try {
        const ordersRef = collection(db, 'orders')
        const q = query(
          ordersRef,
          where('userId', '==', this.userId),
          where('status', '==', 'Delivered'),
          orderBy('timestamp', 'desc')
        )
        const querySnapshot = await getDocs(q)
        this.orders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchOrders()
      }
    }
  }
}
</script>
