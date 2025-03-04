<template>
  <HomeHeader />
  <HomeCategory />
  <HomeWork />
  <HomeAbout />
  <HomeReviewes />
  <HomePlans />
  <HomeContact />
</template>

<script>
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
    HomeHeader,
    HomeCategory,
    HomeWork,
    HomeContact,
    HomeAbout,
    HomeReviewes,
    HomePlans,
  },
}
</script>

<style></style>
