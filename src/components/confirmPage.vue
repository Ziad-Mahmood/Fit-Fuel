<template>
    <Header
    class="mb-10"
    title="Order Confirmation"
    bgImage="cart header.png"
    position="right"
  />
<div class="container mx-auto px-20">
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-xl text-green-600 font-semibold mb-8">
      Thank you for your purchase! Your order has been placed successfully.
    </h2>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
      <div
        v-for="item in order.items"
        :key="item.id"
        class="flex justify-between items-center mb-4"
      >
        <div class="text-gray-700">
          {{ item.name }} (x{{ item.quantity }})
        </div>
        <div class="text-gray-700">{{ item.price * item.quantity }} EG</div>
      </div>
      <div class="flex justify-between items-center border-t pt-4">
        <div class="text-xl font-semibold text-gray-800">Total</div>
        <div class="text-xl font-semibold text-green-600">
          {{ order.totalPrice }} EG
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Shipping Details
      </h2>
      <div class="text-gray-700">
        <p>
          {{ order.shippingDetails.firstName }}
          {{ order.shippingDetails.lastName }}
        </p>
        <p>{{ order.shippingDetails.address }}</p>
        <p>
          {{ order.shippingDetails.city }}, {{ order.shippingDetails.state }}
          {{ order.shippingDetails.postalCode }}
        </p>
        <p>{{ order.shippingDetails.email }}</p>
        <p>{{ order.shippingDetails.phone }}</p>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Payment Details
      </h2>
      <div class="text-gray-700">
        <p>
          Payment Method:
          {{
            order.paymentDetails.method === "card"
              ? "Credit/Debit Card"
              : "Cash on Delivery"
          }}
        </p>
        <p v-if="order.paymentDetails.paymentIntentId">
          Transaction ID: {{ order.paymentDetails.paymentIntentId }}
        </p>
      </div>
    </div>

    <div class="text-center">
      <router-link to="/menu" class="btn px-6 py-3"
        >Continue Shopping</router-link
      >
    </div>
  </div>
</div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
export default {
name: "confirmPage",
components: {
  Header,
},
data() {
  return {
    order: {
      items: [],
      totalPrice: 0,
      shippingDetails: {},
      paymentDetails: {},
    },
  };
},
created() {
  const savedOrder = localStorage.getItem("order");
  if (savedOrder) {
    this.order = JSON.parse(savedOrder);
  }
},
};
</script>
