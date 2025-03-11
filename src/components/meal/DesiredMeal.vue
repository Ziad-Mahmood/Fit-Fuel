<template>
  <div class="flex flex-col gap-4">
    
    <div class="flex flex-col md:flex-row justify-between items-start">
      <div>
        <h1 class="text-[32px] font-bold text-[#191919]">{{ meal.name }}</h1>
        <span v-if="isCustomized" class="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
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
import { auth } from '@/firebase/config'

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
      quantity: 1,
      isAdding: false
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
      if (!auth.currentUser) {
        this.$router.push('/login')
        return
      }

      try {
        this.isAdding = true
        const cartItem = {
          name: this.meal.name,
          price: Number(this.meal.price),
          image: this.meal.image,
          category: this.meal.category,
          quantity: this.quantity,
          total: this.totalPrice,
          removedIngredients: this.removedIngredients,
          isCustomized: this.isCustomized,
          userId: auth.currentUser.uid,
          addedAt: new Date().toISOString()
        }
        
        await this.addToCart({ 
          id: this.meal.id, 
          item: cartItem 
        })
        await this.loadCart()
        this.$router.push('/cart')
      } catch (error) {
        console.error('Error adding to cart:', error)
      } finally {
        this.isAdding = false
      }
    }
  }
}
</script>
