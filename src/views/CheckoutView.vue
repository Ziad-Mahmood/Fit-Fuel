<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center">
      <shipping-form />
      <payment-form />
    </div>
  </div>
</template>

<script>
import ShippingForm from "@/components/ShippingForm.vue";
import PaymentForm from "@/components/PaymentForm.vue";

export default {
  name: "CheckoutView",
  components: {
    ShippingForm,
    PaymentForm,
  },
};
</script>
