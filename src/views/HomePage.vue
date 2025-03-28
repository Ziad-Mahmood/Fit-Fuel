<template>
  <div v-if="isLoading" class="loading-container">
    <div class="placeholder-container">
      <div class="placeholder-header"></div>
      <div class="placeholder-section">
        <div class="placeholder-card"></div>
        <div class="placeholder-card"></div>
        <div class="placeholder-card"></div>
      </div>
      <div class="placeholder-section">
        <div class="placeholder-text"></div>
        <div class="placeholder-text"></div>
        <div class="placeholder-text"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <Header
      class="md:hidden"
      title=""
      bgImage="hero.png"
      position="right"
    />
    <HomeHeader />
    <HomeCategory />
    <HomeWork />
    <HomeAbout />
    <HomeReviewes />
    <HomePlans />
    <HomeContact />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import HomeHeader from '../components/HomePage/HomeHeader.vue'
import HomeCategory from '../components/HomePage/HomeCategory.vue'
import HomeWork from '../components/HomePage/HomeWork.vue'
import HomeContact from '../components/HomePage/HomeContact.vue'
import HomeAbout from '../components/HomePage/HomeAbout.vue'
import HomeReviewes from '@/components/HomePage/HomeReviewes.vue'
import HomePlans from '@/components/HomePage/HomePlans.vue'

export default {
  name: 'HomePage',
  components: {
    Header,
    HomeHeader,
    HomeCategory,
    HomeWork,
    HomeContact,
    HomeAbout,
    HomeReviewes,
    HomePlans,
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
</script>

<style scoped>
.loading-container {
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.placeholder-container {
  max-width: 1200px;
  margin: 0 auto;
}

.placeholder-header {
  height: 300px;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 8px;
  margin-bottom: 30px;
  animation: shimmer 1.5s infinite linear;
  background-size: 200% 100%;
}

.placeholder-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.placeholder-card {
  width: 30%;
  height: 200px;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 8px;
  animation: shimmer 1.5s infinite linear;
  background-size: 200% 100%;
}

.placeholder-text {
  width: 100%;
  height: 30px;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 4px;
  margin-bottom: 15px;
  animation: shimmer 1.5s infinite linear;
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@media (max-width: 768px) {
  .placeholder-card {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
