<template>
  <section 
    class="meal-plans px-6 lg:px-15 text-center my-20 w-[80%] m-auto"
    :dir="dir"
  >
    <h2 class="text-3xl lg:text-4xl font-bold my-20">
      {{ isRTL ? 'خطط وجبات مرنة' : 'Flexible Meal Plans' }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18">
      <div
        v-for="plan in mealPlans"
        :key="plan.id"
        class="meal-card hover:shadow-2xl py-10 px-5 border-2 border-[#339e40e0] rounded-lg"
      >
        <button class="cursor-pointer w-full" @click="goToPlan(plan.type)">
          <div class="icon-container">
            <img :src="plan.img" :alt="isRTL ? plan.arabicName : plan.name" class="w-25 h-25 m-auto" />
          </div>
          <h3 class="text-2xl font-bold text-[#339E3F] my-7">
            {{ isRTL ? plan.arabicName : plan.name }}
          </h3>
          <p class="text-gray-600 my-7 lg:w-[80%] m-auto">
            {{ isRTL ? plan.arabicDescription : plan.description }}
          </p>
          <p class="view-plan text-[#339E3F] font-bold">
            {{ isRTL ? 'عرض الخطة' : 'View Plan' }}
          </p>
        </button>
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
          arabicName: 'الخطة اليومية',
          type: 'Daily',
          description: 'A full day of balanced and fresh meals.',
          arabicDescription: 'يوم كامل من الوجبات المتوازنة والطازجة',
          img: dailyPlan,
        },
        {
          id: 2,
          name: 'Weekly Plan',
          arabicName: 'الخطة الأسبوعية',
          type: 'Weekly',
          description: 'A week of nutritious meals delivered to your door.',
          arabicDescription: 'أسبوع من الوجبات المغذية يتم توصيلها إلى باب منزلك',
          img: weeklyPlan,
        },
        {
          id: 3,
          name: 'Monthly Plan',
          arabicName: 'الخطة الشهرية',
          type: 'Monthly',
          description: 'Consistent healthy eating with a month-long plan.',
          arabicDescription: 'نظام غذائي صحي متسق مع خطة شهرية',
          img: monthlyPlan,
        },
      ],
    }
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar'
    },
    dir() {
      return this.isRTL ? 'rtl' : 'ltr'
    }
  },
  methods: {
    goToPlan(planType) {
      this.$router.push({
        path: '/meal-plans',
        query: { plan: planType }
      })
    }
  }
}
</script>

<style scoped>
[dir="rtl"] .meal-plans {
  text-align: center;
}
</style>