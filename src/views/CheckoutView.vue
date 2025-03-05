<template>
  <Header
    class="mb-10"
    title="Check Out"
    bgImage="checkout header.png"
    position="center"
  />
  <div class="container mx-auto px-4 py-8">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center mb-10"
    >
      <shipping-form />
      <payment-form />
    </div>
  </div>
</template>

<script>
import ShippingForm from "@/components/ShippingForm.vue";
import PaymentForm from "@/components/PaymentForm.vue";
import Header from "@/components/layout/Header.vue";

export default {
  name: "CheckoutView",
  components: {
    ShippingForm,
    PaymentForm,
    Header,
  },
};
</script>
