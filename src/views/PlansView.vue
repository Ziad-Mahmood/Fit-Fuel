<template>
  <div>
    <Header
      title="Meals Plans"
      bgImage="header-plans.png"
      position="left"
    />
    <div class="min-h-screen py-12">
      <div class="container mx-auto px-4">
        <PlanSelector 
          :selected-plan="selectedPlan"
          @select-plan="selectedPlan =  $event"
        />
        
        <PlanDetails
          :plan-type="selectedPlan"
          :subtitle="planData.subtitle"
          :price="planData.price"
          :plan-image="planData.image"
          :meal-types="mealTypes"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlanSelector from '../components/plans/PlanSelector.vue'
import PlanDetails from '../components/plans/PlanDetails.vue'
import Header from '@/components/layout/Header.vue'

export default {
  name: 'PlansView',
  components: {
    Header,
    PlanSelector,
    PlanDetails
  },
  data() {
    return {
      selectedPlan: 'Monthly'
    }
  },
  created() {
    // Set selected plan from URL query parameter if available
    const planFromQuery = this.$route.query.plan
    if (planFromQuery && ['Daily', 'Weekly', 'Monthly'].includes(planFromQuery)) {
      this.selectedPlan = planFromQuery
    }
  },
  watch: {
    // Update selected plan when route changes
    '$route.query.plan'(newPlan) {
      if (newPlan && ['Daily', 'Weekly', 'Monthly'].includes(newPlan)) {
        this.selectedPlan = newPlan
      }
    }
  },
  computed: {
    mealTypes() {
      if (this.selectedPlan === 'Daily') {
        return {
          'Breakfast Meals': {
            count: 1,
            details: [
              '1 Egg-Based Dish',
              '1 Toast-Based',
              '1 Smoothie Option'
            ]
          },
          'Lunch Meals': {
            count: 2,
            details: [
              '1 Meat/Chicken Based Meal',
              '1 Fish/Vegetarian Option'
            ]
          },
          'Dinner Meals': {
            count: 1,
            details: [
              '1 Light Protein Meal',
              '1 Low-Carb Option'
            ]
          }
        }
      }
      
      return {
        'Breakfast Meals': {
          count: 7,
          details: [
            '2 Egg-Based Dishes',
            '2 Dairy & Cereal Meals',
            '2 Toast-Based',
            '1 Smoothie Bowl'
          ]
        },
        'Lunch Meals': {
          count: 14,
          details: [
            '5 Meat-Based Meals',
            '5 Chicken-Based Meals',
            '4 Fish-Based Meals'
          ]
        },
        'Dinner Meals': {
          count: 7,
          details: [
            '3 Light Protein Meals',
            '2 Vegetarian Dishes',
            '2 Low-Carb Options'
          ]
        }
      }
    },
    planData() {
      const data = {
        Monthly: {
          subtitle: 'Our Signature Weekly Plan Sent to You Every Week',
          price: '4200',
          image: new URL('../assets/images/plan.png', import.meta.url).href
        },
        Weekly: {
          subtitle: "What's Included in Your Weekly Plan?",
          price: '1250',
          image: new URL('../assets/images/plan.png', import.meta.url).href
        },
        Daily: {
          subtitle: 'Fresh Meals Delivered Daily',
          price: '200',
          image: new URL('../assets/images/plan.png', import.meta.url).href
        }
      }
      return data[this.selectedPlan]
    }
  }
}
</script>