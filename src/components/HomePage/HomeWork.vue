<template>
  <div class="container mx-auto px-4 my-20">
    <h2 class="text-5xl font-bold text-center my-20">How does it work</h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 w-[80%] mx-auto gap-8">
      <div class="text-center" v-for="(work, i) in works" :key="i">
        <img :src="work.img" :alt="work.title" class="mx-auto mb-4 w-[125px] h-[125px]" />
        <h3 class="text-xl font-bold mb-2 text-[#434343]">{{ work.title }}</h3>
        <p class="text-[#434343] text-normal">{{ work.description }}</p>
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
}
</script>

<style scoped></style>
