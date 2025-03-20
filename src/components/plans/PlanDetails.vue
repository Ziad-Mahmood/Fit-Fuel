<template>
  <div class="flex justify-around bg-white rounded-lg p-8">
    <img :src="planImage" alt="Plan meals" class="w-4/12 rounded-lg object-cover hidden lg:block" />
    <div class="w-6/12">
      <h2 class="text-3xl font-bold text-[#191919] mb-2">{{ planType }} Plan</h2>
      <p class="text-gray-600 mb-4">A Balanced Plan for a Healthier You!</p>
      <p class="text-[#339e3f] font-medium mb-6">{{ subtitle }}</p>

      <div class="space-y-6">
        <div v-for="(meals, type) in mealTypes" :key="type">
          <h3 class="font-semibold text-lg mb-3">{{ meals.count }} {{ type }}</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li v-for="detail in meals.details" :key="detail" class="text-gray-600 flex items-center gap-2">
              <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 flex flex-col md:flex-row items-center justify-start gap-10">
        <p class="text-2xl font-bold text-[#339e3f]">{{ price }} EG</p>
        <button @click="addPlanToCart" class="px-6 py-2 btn">
          Subscribe Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
import { auth } from '@/firebase/config'

export default {
  name: 'PlanDetails',
  props: {
    planType: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    planImage: {
      type: String,
      required: true
    },
    mealTypes: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    async addPlanToCart() {
      if (!auth.currentUser) {
        this.$router.push('/login')
        return
      }
      
      const planId = `plan-${this.planType.toLowerCase()}`
      const planItem = {
        name: `${this.planType} Plan`,
        price: Number(this.price),
        image: this.planImage,
        category: 'Plan',
        quantity: 1,
        total: Number(this.price),
        details: {
          subtitle: this.subtitle,
          mealTypes: this.mealTypes
        },
        userId: auth.currentUser.uid,
        addedAt: new Date()
      }

      try {
        await this.addToCart({ id: planId, item: planItem })
        this.showCheckoutAlert()
      } catch (error) {
        console.error('Error adding plan to cart:', error)
      }
    },
    showCheckoutAlert() {
      Swal.fire({
        title: "<strong>Plan Added Successfully</strong>",
        icon: "success",
        html: `
      You can view it in your cart
    `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `View cart`,
        cancelButtonText: `Continue Shopping`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push('/cart');
        }
      });
    }
  }
}
</script>