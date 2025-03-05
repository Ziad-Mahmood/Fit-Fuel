<template>
  <button
    @click="$emit('click')"
    :class="[
      'px-8 py-2 rounded-full text-base transition-colors',
      isActive
        ? 'bg-green-600 text-white'
        : 'border border-gray-300 text-gray-600 hover:bg-gray-50',
    ]"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "TabButton",
  props: {
    text: String,
    isActive: Boolean,
  },
};
</script>
