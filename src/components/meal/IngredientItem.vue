<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-start gap-2">
      <span class="text-gray-500 mt-[7px]">•</span>
      <span 
        :class="[
          'text-[14px] leading-6',
          isRemoved ? 'text-red-500 line-through' : 'text-gray-600'
        ]"
      >
        {{ name }}
      </span>
    </div>
    <button 
      v-if="!isCore"
      @click="toggleIngredient"
      :class="[
        'px-2 py-1 rounded text-sm',
        isRemoved ? 'text-green-600 hover:text-green-700' : 'text-red-500 hover:text-red-600'
      ]"
    >
      {{ isRemoved ? 'Restore' : 'Remove' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'IngredientItem',
  props: {
    name: {
      type: String,
      required: true
    },
    isCore: {
      type: Boolean,
      default: false
    },
    isRemoved: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleIngredient'],
  methods: {
    toggleIngredient() {
      this.$emit('toggleIngredient', {
        name: this.name,
        removed: !this.isRemoved
      })
    }
  }
}
</script>
