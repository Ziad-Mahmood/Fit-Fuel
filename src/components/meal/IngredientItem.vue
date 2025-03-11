<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-start gap-2">
      <span class="text-gray-500 mt-[7px]">•</span>
      <span 
        :class="[
          'text-[14px] leading-6',
          isCore ? 'text-gray-600' : isRemoved ? 'text-red-500 line-through' : 'text-gray-600'
        ]"
      >
        {{ name }}
      </span>
    </div>
    <button 
      v-if="!isCore && isUserLoggedIn"
      @click="$emit('toggle-ingredient', name)"
      :class="[
        'px-2 py-1 rounded text-sm',
        isRemoved ? 'text-green-600 hover:text-green-700' : 'text-red-500 hover:text-red-600'
      ]"
    >
      {{ isRemoved ? 'Add' : 'Remove' }}
    </button>
  </div>
</template>

z<script>
import { auth } from '@/firebase/config'

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
  computed: {
    isUserLoggedIn() {
      return auth.currentUser !== null
    }
  },
  emits: ['toggle-ingredient']
}
</script>
