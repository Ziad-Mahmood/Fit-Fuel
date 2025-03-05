<template>
  <div>
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
    </div>
  </div>

  <!-- Checkout Button -->
  <div class="text-center mb-10">
    <router-link to="/checkout">
    <button
      class="px-10 py-3 btn"
    >
      Check Out
    </button>
    </router-link>
  </div>
</div>
</template>

<script>
import CartItem from "./CartItem.vue";

export default {
  name: "CartList",
  components: {
    CartItem,
  },
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: "Salmon",
          price: 120,
          quantity: 1,
          image: "../assets/images/salmon.png",
        },
        {
          id: 2,
          name: "Oat Meal",
          price: 120,
          quantity: 1,
          image: "../assets/images/oatmeal.png",
        },
        {
          id: 3,
          name: "Grilled Meat",
          price: 120,
          quantity: 1,
          image: "../assets/images/grilled-meat.png",
        },
        {
          id: 4,
          name: "Steak",
          price: 120,
          quantity: 1,
          image: "../assets/images/steak.png",
        },
      ],
    };
  },
  methods: {
    updateQuantity(id, newQuantity) {
      const item = this.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },
  },
};
</script>
