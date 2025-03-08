<template>
  <div>
    <div v-if="!cartItems || cartItems.length === 0" class="text-center py-12">
      <h2 class="text-xl text-gray-600 mb-4">Your cart is empty</h2>
      <router-link to="/menu" class="btn px-6 py-2"> Browse Menu </router-link>
    </div>

    <div v-else>
      <div class="w-full md:w-[80%] px-16 py-6 mx-auto">
        <div class="space-y-8">
          <!-- Cart Header -->
          <div class="grid grid-cols-4 text-gray-700 font-medium text-lg pb-4">
            <div class="w-3/12">Product</div>
            <div class="text-center lg:text-left">Price</div>
            <div class="w-3/12">Quantity</div>
            <div class="w-3/12">Total</div>
          </div>

          <!-- Cart Items -->
          <div class="space-y-6">
            <cart-item
              v-for="item in cartItems"
              :key="item.id"
              :item="item"
              @update-quantity="updateQuantity"
              @remove-item="removeItem"
            />
          </div>

          <!-- Cart Total -->
          <div class="flex justify-end items-center gap-4 text-lg">
            <span class="font-medium">Cart Total:</span>
            <span class="font-bold text-[#339e3f]"
              >{{ calculateTotal }} EG</span
            >
          </div>
        </div>
      </div>

      <!-- Checkout Button -->
      <div class="text-center mb-10">
        <router-link to="/checkout">
          <button class="px-10 py-3 btn">Check Out</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
NEW [5:33 PM]
<script>
import { mapState, mapActions } from "vuex";
import CartItem from "./CartItem.vue";

export default {
  name: "CartList",
  components: {
    CartItem,
  },
  computed: {
    ...mapState("cart", ["cartItems"]),
    calculateTotal() {
      return this.cartItems.reduce((total, item) => total + item.total, 0);
    },
  },
  methods: {
    ...mapActions("cart", ["updateCartItem", "removeFromCart"]),
    async updateQuantity(id, newQuantity) {
      if (newQuantity > 0) {
        const item = this.cartItems.find((item) => item.id === id);
        if (item) {
          const updatedItem = {
            ...item,
            quantity: newQuantity,
            total: item.price * newQuantity,
          };
          await this.updateCartItem({ id, item: updatedItem });
        }
      }
    },
    async removeItem(id) {
      await this.removeFromCart(id);
    },
  },
  created() {
    this.$store.dispatch("cart/loadCart");
  },
};
</script>
