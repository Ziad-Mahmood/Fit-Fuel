<template>
  <div class="min-h-screen">
    <Header
      title="Kitchen Orders"
      bgImage="header-Kitchen.png"
      position="left"
    />
    
    <div class="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <DashTable 
        :items="orders"
        sideImage="sideKitchen.png"
        imageAlt="Kitchen"
        @accept-order="acceptOrder"
      />
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/Header.vue'
import DashTable from '../../components/dashboard/DashTable.vue'

export default {
  name: 'KitchenDashboard',
  components: {
    Header,
    DashTable
  },
  data() {
    return {
      orders: [
        {
          id: '123456',
          date: 'Feb 28, 2025',
          address: 'Weekly Plan',
          isComplete: true
        },
        {
          id: '123457',
          date: 'Feb 28, 2025',
          address: 'Weekly Plan',
          isComplete: true
        },
        {
          id: '123458',
          date: 'Feb 28, 2025',
          address: 'Weekly Plan',
          isComplete: true
        },
        {
          id: '123459',
          date: 'Feb 28, 2025',
          address: 'Weekly Plan',
          isComplete: true
        }
      ]
    }
  },
  methods: {
    acceptOrder(orderId) {
      console.log('Accepted order:', orderId)
    }
  }
}
</script>