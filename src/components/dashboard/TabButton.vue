<template>
  <button
    @click="$emit('click')"
    :class="[
      'px-8 py-2',
      isActive
        ? 'btn'
        : 'btn-outline',
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
