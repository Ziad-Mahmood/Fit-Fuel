<template>
  <div class="w-full px-16 py-6">
    <div class="space-y-8">
      <!-- Cart Header -->
      <div class="grid grid-cols-4 text-gray-700 font-medium pb-4 border-b">
        <div>Product</div>
        <div>Price</div>
        <div class="pl-4">Quantity</div>
        <div>Total</div>
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
  <div class="text-center mt-10">
    <button
      class="bg-green-500 text-white px-10 py-3 rounded-full hover:bg-green-600 transition-colors"
    >
      Check Out
    </button>
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
