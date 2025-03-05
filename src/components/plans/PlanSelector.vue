<template>
  <div class="flex justify-center gap-4 mb-8">
    <button 
      v-for="plan in plans" 
      :key="plan"
      @click="$emit('select-plan', plan)"
      :class="[
        'px-6 py-2 ',
        selectedPlan === plan 
          ? 'btn' 
          : 'btn-outline'
      ]"
    >
      {{ plan }} Plan
    </button>
  </div>
</template>

<script>
export default {
  name: 'PlanSelector',
  props: {
    selectedPlan: {
      type: String,
      required: true
    },
    plans: {
      type: Array,
      default: () => ['Daily', 'Weekly', 'Monthly']
    }
  },
  emits: ['select-plan']
}
</script>