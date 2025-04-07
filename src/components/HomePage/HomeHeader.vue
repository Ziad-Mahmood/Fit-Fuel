<template>
  <div class="hero w-full md:h-screen my-10 md:my-0 flex items-center" :dir="dir">
    <div class="hero-content w-1/2 pl-10 xl:pl-[163px] mt-15" :class="{ 'pr-10 xl:pr-[163px] pl-0': isRTL }">
      <div class="content-head">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-14 lg:leading-16 mb-8 w-full">
          <span class="hero-span">{{ $t('hero.healthy') }} <span class="text-black"> {{  $t('hero.&')  }} </span> {{ $t('hero.delicious') }}</span>
          <br />
          {{ $t('hero.title') }}
        </h2>
      </div>
      <p class="xl:text-[1.1rem] text-[#333333] xl:w-[79%] mb-8">
        {{ $t('hero.description') }}
      </p>
      <button class="btn py-3 px-11" @click="$router.push('/menu')">{{ $t('hero.orderNow') }}</button>
    </div>

    <div class="hero-image xl:w-1/2 flex justify-end items-start" :class="{ 'justify-start': isRTL }">
      <img 
        v-if="!isRTL" 
        src="@/assets/images/hero.png" 
        :alt="$t('hero.imageAlt')" 
        class="md:w-[85%] xl:w-full" 
      />
      <img 
        v-else 
        src="@/assets/images/hero-arabic.png" 
        :alt="$t('hero.imageAlt')" 
        class="md:w-[85%] xl:w-full" 
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar';
    },
    dir() {
      return this.isRTL ? 'rtl' : 'ltr';
    }
  }
}
</script>

<style scoped>
.hero-span {
  color: #339e3f;
}
@media (max-width: 768px) {
  .hero-image {
    display: none;
  }
  .hero-content {
    width: 100%;
  }

  .btn {
    width: 90%;
    margin: auto;
    font-family: inherit;
  }
}

/* RTL specific styles */
[dir="rtl"] .hero-content {
  text-align: right;
}
</style>