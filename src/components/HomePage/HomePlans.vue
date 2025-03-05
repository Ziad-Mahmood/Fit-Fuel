<template>
  <section class="meal-plans px-6 lg:px-15 text-center my-20 w-[80%] m-auto">
    <h2 class="text-3xl lg:text-4xl font-bold my-20">Flexible Meal Plans</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18">
      <div
        v-for="plan in mealPlans"
        :key="plan.id"
        class="meal-card hover:shadow-2xl py-10 px-5 border-2 border-[#339e40e0] rounded-lg"
      >
        <div class="icon-container">
          <img :src="plan.img" :alt="plan.name" class="w-25 h-25 m-auto" />
        </div>
        <h3 class="text-2xl font-bold text-[#339E3F] my-7">{{ plan.name }}</h3>
        <p class="text-gray-600 my-7 lg:w-[80%] m-auto">{{ plan.description }}</p>
        <button class="view-plan text-[#339E3F] font-bold cursor-pointer" @click="$router.push('/meal-plans')">View Plan</button>
      </div>
    </div>
  </section>
</template>

<script>
import dailyPlan from '@/assets/images/home-plan1.png'
import weeklyPlan from '@/assets/images/home-plan2.png'
import monthlyPlan from '@/assets/images/home-plan3.png'

export default {
  name: 'HomePlans',
  data() {
    return {
      mealPlans: [
        {
          id: 1,
          name: 'Daily Plan',
          description: 'A full day of balanced and fresh meals.',
          img: dailyPlan,
        },
        {
          id: 2,
          name: 'Weekly Plan',
          description: 'A week of nutritious meals delivered to your door.',
          img: weeklyPlan,
        },
        {
          id: 3,
          name: 'Monthly Plan',
          description: 'Consistent healthy eating with a month-long plan.',
          img: monthlyPlan,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
