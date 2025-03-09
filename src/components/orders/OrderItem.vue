<template>
  <tr class="text-gray-700 h-30">
    <td class="py-4 text-center text-sm lg:text-base">#{{ order.id }}</td>
    <td class="py-4 text-center text-sm lg:text-base">{{ order.date }}</td>
    <td class="py-4 text-center text-sm lg:text-base">{{ order.address }}</td>
    <td class="py-4 text-center text-sm lg:text-base">{{ order.price }} EG</td>
    <td class="py-4 text-center text-sm lg:text-base">
      <span
        :class="{
          'text-blue-600': order.status === 'Order Placed',
          'text-yellow-600': order.status === 'On Delivery',
          'text-orange-600': order.status === 'Preparing',
          'text-green-600': order.status === 'Delivered',
          'text-purple-600': order.status === 'Being Delivered'
        }"
        class="text-sm lg:text-base"
      >
        {{ order.status }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>
