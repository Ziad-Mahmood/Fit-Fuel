<template>
  <div class="mb-10">
    <Header
      class="mb-10"
      title="Your Orders"
      bgImage="order header.png"
      position="center"
    />
    <div class="flex gap-8">
      <!-- Order Table Component -->
      <order-table :orders="orders" />

      <!-- Tracking Illustration -->
      <div class="w-75 flex items-center hidden md:flex">
        <img
          src="../assets/images/order tracking.png"
          alt="Tracking Illustration"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import OrderTable from "@/components/orders/OrderTable.vue";

export default {
  name: "OrderTrackingView",
  components: {
    Header,
    OrderTable,
  },
  data() {
    return {
      orders: [
        {
          id: "123456",
          date: "Feb 28, 2025",
          address: "123 Main Street, Cairo",
          price: "120",
          status: "Order Placed",
        },
        {
          id: "123456",
          date: "Feb 28, 2025",
          address: "123 Main Street, Cairo",
          price: "120",
          status: "On Delivery",
        },
        {
          id: "123456",
          date: "Feb 28, 2025",
          address: "123 Main Street, Cairo",
          price: "120",
          status: "Preparing",
        },
        {
          id: "123456",
          date: "Feb 28, 2025",
          address: "123 Main Street, Cairo",
          price: "120",
          status: "Delivered",
        },
      ],
    };
  },
};
</script>
