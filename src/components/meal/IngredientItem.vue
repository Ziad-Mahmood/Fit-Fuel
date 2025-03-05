<template>
  <div class="flex items-start gap-2">
    <span class="text-gray-500 mt-[7px]">•</span>
    <span class="text-[14px] leading-6 text-gray-600">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'IngredientItem',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>