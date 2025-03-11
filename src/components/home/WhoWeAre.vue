<template>
  <section 
    class="container mx-auto px-4 py-16 mt-15" 
    :dir="isRTL ? 'rtl' : 'ltr'"
  >
    <div 
      class="grid md:grid-cols-2 gap-10 items-center" 
      :class="{ 'md:flex-row-reverse': isRTL }"
    >
      <div class="grid grid-cols-2 gap-7">
        <img
          src="@/assets/images/about us1.png"
          alt="Chef cooking"
          class="rounded-lg w-full h-[85%] object-cover"
        />
        <img
          src="@/assets/images/about us2.png"
          alt="Spicy wings"
          class="rounded-lg w-[90%] h-[75%] object-cover mt-25"
        />
      </div>
      <div 
        class="space-y-6 mt-0 md:mt-20"
        :class="isRTL ? 'text-right' : 'text-left'"
      >
        <h2 class="text-5xl font-bold text-gray-800">
          {{ $t('about.title') }}
        </h2>
        <p class="text-gray-600 leading-relaxed text-lg">
          {{ $t('about.description') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutUs',
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar';
    }
  },
  methods: {
    toggleLanguage() {
      const newLang = this.isRTL ? 'en' : 'ar';
      this.$i18n.locale = newLang;
      localStorage.setItem('lang', newLang);
    }
  }
};
</script>
