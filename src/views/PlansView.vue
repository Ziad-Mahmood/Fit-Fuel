<template>
  <div v-if="$store.state.plans.loading">Loading...</div>
  <div v-else>
    <Header
      title="Meals Plans"
      bgImage="header-plans.png"
      position="left"
    />
    <div class="min-h-screen py-12">
      <div class="container mx-auto px-4">
        <PlanSelector 
          :selected-plan="selectedPlan"
          @select-plan="handlePlanSelection"
        />
        
        <PlanDetails
          :plan-type="selectedPlan"
          :subtitle="currentPlan.subtitle"
          :price="currentPlan.price"
          :plan-image="currentPlan.image"
          :meal-types="currentMealTypes"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
  computed: {
    ...mapState('plans', ['selectedPlan']),
    ...mapGetters('plans', ['currentPlan', 'currentMealTypes'])
  },
  methods: {
    ...mapActions('plans', ['selectPlan']),
    handlePlanSelection(plan) {
      this.selectPlan(plan)
    }
  },
  mounted() {
    const planFromQuery = this.$route.query.plan
    if (planFromQuery && ['Daily', 'Weekly', 'Monthly'].includes(planFromQuery)) {
      this.selectPlan(planFromQuery)
    }
    window.scrollTo(0, 0);
    this.$store.dispatch('plans/initializePlansData');
  },
  watch: {
    '$route.query.plan'(newPlan) {
      if (newPlan && ['Daily', 'Weekly', 'Monthly'].includes(newPlan)) {
        this.selectPlan(newPlan)
      }
    }
  }
}
</script>