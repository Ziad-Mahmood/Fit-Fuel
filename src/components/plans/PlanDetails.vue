<template>
  <div class="flex  justify-around bg-white rounded-lg p-8">
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
        <button class="bg-[#339e3f] text-white px-6 py-2 rounded-full hover:bg-[#2b843a] transition-colors">
          Subscribe Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>