<template>
  <div class="grid grid-cols-4 items-center py-4 border-b border-gray-200">
    <!-- Product Info -->
    <div class="flex flex-col md:flex-row items-center gap-4">
      <img
        :src="getImageSrc"
        :alt="item.name"
        class="w-20 h-20 object-cover rounded-lg"
      />
      <div class="flex flex-col items-center md:items-start">
        <span class="font-medium text-gray-800 text-center">{{ item.name }}</span>
        <span v-if="item.isCustomized" class="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
          Customized
        </span>
        <div v-if="item.removedIngredients?.length" class="text-xs text-gray-500 mt-1">
          Without: {{ item.removedIngredients.join(', ') }}
        </div>
      </div>
    </div>

    <!-- Price -->
    <div class="text-gray-800 text-center lg:text-left">
      {{ item.price }} EG
    </div>

    <!-- Quantity -->
    <div class="flex items-center px-2 w-3/12">
      <button
        @click="updateQuantity(item.quantity - 1)"
        class="w-8 h-8 flex items-center justify-center text-green-600 text-xl font-medium hover:text-green-700 hover:cursor-pointer"
        :disabled="item.quantity <= 1"
      >
        -
      </button>
      <input
        type="number"
        v-model="item.quantity"
        class="w-10 text-center bg-transparent focus:outline-none text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min="1"
      />
      <button
        @click="updateQuantity(item.quantity + 1)"
        class="w-8 h-8 flex items-center justify-center text-green-600 text-xl font-medium hover:text-green-700 hover:cursor-pointer"
      >
        +
      </button>
    </div>

    <!-- Total -->
    <div class="flex items-center justify-between">
      <span class="text-gray-800">{{ item.price * item.quantity }} EG</span>
      <button
        @click="$emit('remove-item', item.id)"
        class="text-gray-400 hover:text-gray-600 text-xl font-medium hover:cursor-pointer"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getImageSrc() {
      return new URL(`${this.item.image}`, import.meta.url).href;
    },
  },
  methods: {
    updateQuantity(newQuantity) {
      if (newQuantity >= 1) {
        this.$emit("update-quantity", this.item.id, newQuantity);
      }
    },
  },
};
</script>
