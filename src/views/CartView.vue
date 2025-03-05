<template>
  <div>
    <Header
      class="mb-10"
      title="Shopping Cart"
      bgImage="cart header.png"
      position="right"
    />
    <cart-list />
  </div>
</template>

<script>
import CartList from "@/components/CartList.vue";
import Header from "@/components/layout/Header.vue";
export default {
  name: "CartView",
  components: {
    CartList,
    Header,
  },
};
</script>
