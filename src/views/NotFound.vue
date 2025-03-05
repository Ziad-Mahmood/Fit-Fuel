<template>
    <div>
    <Header
      title="It's Empty Here"
      bgImage="notfound.jpg"
      position="right"
    />
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-[#339e3f]">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
      <p class="text-gray-600 mt-2 mb-8">The page you're looking for doesn't exist.</p>
      <router-link 
        to="/" 
        class="inline-flex items-center px-6 py-3 bg-[#339e3f] text-white rounded-lg hover:bg-[#2b843a] transition-colors"
      >
        <span class="mr-2">←</span>
        Back to Home
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
export default {
  name: 'NotFound',
  components: {
    Header
  },
}
</script>