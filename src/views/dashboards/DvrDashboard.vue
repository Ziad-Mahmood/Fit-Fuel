<template>
  <div class="min-h-screen bg-gray-50">
    <Header
      title="Order Delivery"
      bgImage="header-delivery.png"
      position="left"
    />
    
    <!-- Orders Table Section -->
        <div class="container mx-auto px-8 py-12">
          <div class="flex items-end gap-8">
            <div class="bg-white rounded-lg shadow-sm overflow-x-auto flex-1">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="py-4 px-6 text-left text-black font-bold text-lg">Order ID</th>
                    <th class="py-4 px-6 text-left text-black font-bold text-lg">Order Date</th>
                    <th class="py-4 px-6 text-left text-black font-bold text-lg">Delivery Address</th>
                    <th class="py-4 px-6 text-left text-black font-bold text-lg">Order</th>
                    <th class="py-4 px-6 text-left text-black font-bold text-lg">Is Complete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id" class="border-b">
                    <td class="py-4 px-6 text-black">#{{ order.id }}</td>
                    <td class="py-4 px-6 text-black">{{ order.date }}</td>
                    <td class="py-4 px-6 text-black">{{ order.address }}</td>
                    <td class="py-4 px-6">
                      <button 
                        class="bg-[#339e3f] text-white px-4 py-1 rounded-full text-sm hover:bg-[#2b843a] transition-colors"
                        @click="acceptOrder(order.id)"
                      >
                        Accept
                      </button>
                    </td>
                    <td class="py-4 px-6">
                      <img 
                        v-if="order.isComplete" 
                        src="@/assets/images/Check Mark.png"
                        alt="Complete" 
                        class="w-6 h-6"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <img 
              src="@/assets/images/SideDelivery.png" 
              alt="Delivery" 
              class="w-48 h-auto"
            />
          </div>
        </div>
  </div>
</template>

<script>
import Header from '../../components/layout/Header.vue'

export default {
  name: 'DriverDashboard',
  components: {
    Header
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
          id: '123456',
          date: 'Feb 28, 2025',
          address: '123 Main Street, Cairo',
          isComplete: true
        },
        {
          id: '123456',
          date: 'Feb 28, 2025',
          address: '123 Main Street, Cairo',
          isComplete: true
        },
        {
          id: '123456',
          date: 'Feb 28, 2025',
          address: '123 Main Street, Cairo',
          isComplete: true
        }
      ]
    }
  },
  methods: {
    acceptOrder(orderId) {
      // Handle order acceptance
      console.log('Accepted order:', orderId)
    }
  }
}
</script>