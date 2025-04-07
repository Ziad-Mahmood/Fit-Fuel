<template>
  <div class="container mx-auto px-4 my-30">
    <h2 class="text-4xl font-bold text-center my-20">{{ $t('homeWork.title') }}</h2>
    <div 
      class="grid grid-cols-2 lg:grid-cols-4 w-[80%] mx-auto gap-8"
      :style="{ 'direction': isRTL ? 'rtl' : 'ltr' }"
    >
      <div class="text-center" v-for="(work, i) in works" :key="i">
        <img :src="work.img" :alt="$t(`homeWork.works.${i}.title`)" class="mx-auto mb-4 w-[125px] h-[125px]" />
        <h3 class="text-xl font-bold mb-2 text-[#434343]">{{ $t(`homeWork.works.${i}.title`) }}</h3>
        <p class="text-[#434343] text-normal">{{ $t(`homeWork.works.${i}.description`) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Icon1 from '@/assets/images/home-Icon1.png'
import Icon2 from '@/assets/images/home-icon2.png'
import Icon3 from '@/assets/images/home-icon3.png'
import Icon4 from '@/assets/images/home-icon4.png'

export default {
  name: 'HomeWork',
  data() {
    return {
      works: [
        {
          img: Icon1,
          title: 'Select location',
          description: 'Choose the location where your food will be delivered.',
        },
        {
          img: Icon2,
          title: 'Choose order',
          description: 'Check over hundreds of items to pick your favorite food.',
        },
        {
          img: Icon3,
          title: 'Pay advanced',
          description: "It's quick, safe, and simple. Select payment method.",
        },
        {
          img: Icon4,
          title: 'Enjoy meals',
          description: 'Food is made and delivered directly to your home.',
        },
      ],
    }
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar';
    }
  }
}
</script>

<style scoped>
.flex-row-reverse {
  direction: rtl;
  display: flex;
  flex-wrap: wrap;
}
</style>