<template>
  <div class="relative w-full h-96">
    <img :src="imageSrc" :alt="title" class="w-full h-full object-cover">
  
    <h1 
      class="absolute text-5xl sm:text-6xl font-bold font-poppins text-[#010f1c]"
      :class="titlePosition"
    >
      {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true
    },
    bgImage: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    titlePosition() {
      const positions = {
        center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
        left: 'left-[184px] top-[189px]',
        right: 'right-[184px] top-[189px]'
      }
      return positions[this.position]
    },
    imageSrc() {
      return new URL(`../../assets/images/${this.bgImage}`, import.meta.url).href
    }
  }
}
</script>
