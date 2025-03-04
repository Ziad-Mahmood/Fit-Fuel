<template>
  <div class="container">
    <cart-list />
  </div>
</template>

<script>
import CartList from "@/components/CartList.vue";

export default {
  name: "CartView",
  components: {
    CartList,
  },
};
</script>
