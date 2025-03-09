<template>
  <div class="flex flex-col gap-6 py-10 border-b border-[#339e3f]">
    <div class="flex flex-col md:flex-row justify-between items-start">
      <div>
        <h1 class="text-[32px] font-bold text-[#191919]">{{ meal.name }}</h1>
        <span v-if="isCustomized" class="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
          Customized
        </span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-[14px] text-gray-600">Category:</span>
        <span class="text-[14px] text-[#339e3f]">{{ meal.category }}</span>
      </div>
    </div>

    <p class="text-[14px] text-gray-600 leading-6 border-b border-[#339e3f] py-4">
      {{ meal.description }}
    </p>

    <div class="flex flex-col md:flex-row justify-between">
      <h2 class="text-[28px] font-bold text-[#191919]">{{ totalPrice }} EG</h2>
      <div class="flex items-center gap-1">
        <button
          @click="decreaseQuantity"
          class="w-10 h-10 hover:cursor-pointer border border-gray-200 rounded grid place-items-center text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <div class="w-10 h-10 border border-gray-200 rounded grid place-items-center">
          {{ quantity }}
        </div>
        <button
          @click="increaseQuantity"
          class="w-10 h-10 hover:cursor-pointer  border border-gray-200 rounded grid place-items-center text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
    <button @click="handleAddToCart" class="btn py-3 w-full">
      Add to cart
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "DesiredMeal",
  props: {
    meal: {
      type: Object,
      required: true
    },
    removedIngredients: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'loadCart']),
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    async handleAddToCart() {
      try {
        this.isAdding = true
        const cartItem = {
          id: this.meal.id,
          name: this.meal.name,
          price: Number(this.meal.price),
          image: this.meal.image,
          category: this.meal.category,
          quantity: this.quantity,
          total: Number(this.meal.price) * this.quantity,
          removedIngredients: [...this.removedIngredients],
          isCustomized: this.isCustomized,
          ingredients: this.meal.ingredients,
          coreIngredients: this.meal.coreIngredients
        }
        
        await this.addToCart({ id: this.meal.id, item: cartItem })
        await this.loadCart()
        this.$router.push('/cart')
      } catch (error) {
        console.error('Error adding to cart:', error)
      } finally {
        this.isAdding = false
      }
    }
},
  computed: {
    totalPrice() {
      return this.meal.price * this.quantity
    },
    isCustomized() {
      return this.removedIngredients.length > 0
    }
  },
}
</script>
