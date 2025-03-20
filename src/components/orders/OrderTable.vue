<template>
  <div class="flex-grow bg-white p-10">
    <table class="w-full">
      <thead>
        <tr class="text-gray-600">
          <th class="text-center py-4 w-2/12 text-sm lg:text-lg">Order ID</th>
          <th class="text-center py-4 w-2/12 text-sm lg:text-lg">Order Date</th>
          <th class="text-center py-4 w-3/12 text-sm lg:text-lg">Delivery Address</th>
          <th class="text-center py-4 w-2/12 text-sm lg:text-lg">Price</th>
          <th class="text-center py-4 w-3/12 text-sm lg:text-lg">Status</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loading placeholder -->
        <tr v-if="loading" v-for="n in 5" :key="n" class="border-b border-gray-300 animate-pulse">
          <td class="py-4 px-2">
            <div class="h-4 bg-gray-200 rounded mx-auto w-20"></div>
          </td>
          <td class="py-4 px-2">
            <div class="h-4 bg-gray-200 rounded mx-auto w-28"></div>
          </td>
          <td class="py-4 px-2">
            <div class="h-4 bg-gray-200 rounded mx-auto w-36"></div>
          </td>
          <td class="py-4 px-2">
            <div class="h-4 bg-gray-200 rounded mx-auto w-16"></div>
          </td>
          <td class="py-4 px-2">
            <div class="h-4 bg-gray-200 rounded mx-auto w-24"></div>
          </td>
        </tr>
        <!-- Actual order items -->
        <order-item
          v-else
          class="border-b border-gray-300"
          v-for="order in orders"
          :key="order.id"
          :order="order"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderItem from "./OrderItem.vue";

export default {
  name: "OrderTable",
  components: {
    OrderItem,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
};
</script>
