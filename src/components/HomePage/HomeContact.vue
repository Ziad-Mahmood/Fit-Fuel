<template>
  <div
    class="contact-section w-[70%] m-auto flex flex-col lg:flex-row items-center py-20"
    :dir="dir"
  >
    <div class="contact-info mx-auto text-center md:text-start">
      <h2
        class="text-lg font-semibold text-[#339E3F] mb-5"
        :class="{ 'tracking-[.25em]': !isRTL }"
      >
        {{ isRTL ? "تواصل معنا" : "GET IN TOUCH WITH US" }}
      </h2>
      <p class="text-3xl lg:text-[45px] font-bold lg:w-[90%] leading-18">
        {{
          isRTL
            ? "هل لديك أسئلة أو تحتاج مساعدة؟"
            : "Have questions or need assistance?"
        }}
      </p>
    </div>
    <div class="contact-btn mx-auto">
      <button class="btn py-4 px-15" @click="$router.push('/contact')">
        {{ isRTL ? "اتصل بنا" : "Contact US" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeContact",
  computed: {
    isRTL() {
      return this.$i18n.locale === "ar";
    },
    dir() {
      return this.isRTL ? "rtl" : "ltr";
    },
  },
};
</script>

<style scoped></style>
