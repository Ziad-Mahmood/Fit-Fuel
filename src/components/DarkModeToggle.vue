<template>
  <button
    @click="toggleDarkMode"
    class="fixed bottom-6 right-6 p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
    :class="isDark ? 'bg-blue-600 text-white' : 'bg-yellow-400 text-gray-900'"
  >
    <span class="text-xl">
      {{ isDark ? '🌙' : '☀️' }}
    </span>
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DarkModeToggle',
  computed: {
    ...mapState('theme', ['isDark'])
  },
  methods: {
    ...mapActions('theme', ['toggleDarkMode'])
  }
}
</script>
