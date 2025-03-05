<template>
  <div class="flex flex-col gap-6 py-10  border-b border-[#339e3f]">
    <div class="flex flex-col md:flex-row justify-between items-start">
      <h1 class="text-[32px] font-bold text-[#191919]">{{ name }}</h1>
      <div class="flex items-center gap-1">
        <span class=" text-[14px] text-gray-600">Category:</span>
        <span class="text-[14px] text-[#339e3f]">{{ category }}</span>
      </div>
    </div>

    <p class="text-[14px] text-gray-600 leading-6 border-b border-[#339e3f] py-4">{{ description }}</p>
<div class="flex flex-col md:flex-row  justify-between" >
    <h2 class="text-[28px] font-bold text-[#191919]">{{ price }} EG</h2>

    <div class="flex items-center gap-1">
      <button
        @click="decreaseQuantity"
        class="w-10 h-10 border border-gray-200 rounded grid place-items-center text-gray-600 hover:bg-gray-50"
      >
        -
      </button>
      <div
        class="w-10 h-10 border border-gray-200 rounded grid place-items-center"
      >
        {{ quantity }}
      </div>
      <button
        @click="increaseQuantity"
        class="w-10 h-10 border border-gray-200 rounded grid place-items-center text-gray-600 hover:bg-gray-50"
      >
        +
      </button>
    </div>
    </div>
    
    <button
      @click="addToCart"
      class="bg-[#339e3f] text-white h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-[#2b843a] transition-colors"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  name: "DesiredMeal",
  props: {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: [String, Number],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      this.$emit("add-to-cart", {
        name: this.name,
        price: this.price,
        quantity: this.quantity,
      });
    },
  },
};
</script>
