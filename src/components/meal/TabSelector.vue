<template>
  <div class="flex gap-12 border-b border-gray-100 mb-8">
    <button 
      v-for="tab in tabs" 
      :key="tab"
      @click="$emit('update:modelValue', tab)"
      class="relative pb-3 text-[15px]"
      :class="[
        modelValue === tab 
          ? 'text-[#339e3f] font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#339e3f]' 
          : 'text-gray-400'
      ]"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabSelector',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>