<template>
  <div class="min-h-screen">
    <Header
      title="Order Delivery"
      bgImage="header-delivery.png"
      position="left"
    />
    
    <div class="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <DashTable 
        :items="orders"
        sideImage="SideDelivery.png"
        imageAlt="Delivery"
        @accept-order="acceptOrder"
      />
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/Header.vue'
import DashTable from '../../components/dashboard/DashTable.vue'

export default {
  name: 'DriverDashboard',
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
          address: '123 Main Street, Cairo',
          isComplete: true
        },
        {
          id: '123457',
          date: 'Feb 28, 2025',
          address: '456 Park Avenue, Cairo',
          isComplete: true
        },
        {
          id: '123458',
          date: 'Feb 28, 2025',
          address: '789 River Road, Cairo',
          isComplete: true
        },
        {
          id: '123459',
          date: 'Feb 28, 2025',
          address: '321 Lake View, Cairo',
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