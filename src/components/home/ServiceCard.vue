<template>
  <div class="flex flex-col items-center text-center space-y-4">
    <img :src="icon" :alt="title" class="w-32 h-32 object-contain" />
    <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    description: String,
  },
};
</script>
