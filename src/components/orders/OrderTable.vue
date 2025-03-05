<template>
  <div class="flex-grow bg-white p-10">
    <table class="w-full">
      <thead>
        <tr class="text-gray-600">
          <th class="text-center py-4 w-2/12 text-sm lg:text-lg">Order ID</th>
          <th class="text-center py-4 w-2/12 text-sm lg:text-lg">Order Date</th>
          <th class="text-center py-4 w-3/12 text-sm lg:text-lg">
            Delivery Address
          </th>
          <th class="text-center py-4 w-2/12 text-sm lg:text-lg">Price</th>
          <th class="text-center py-4 w-3/12 text-sm lg:text-lg">Status</th>
        </tr>
      </thead>
      <tbody>
        <order-item
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
  },
};
</script>
