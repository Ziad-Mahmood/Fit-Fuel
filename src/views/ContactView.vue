<template>
  <div class="relative">
    <Header
      :title="$t('contact.title')"
      bgImage="contact-header.jpg"
      position="right"
    />

    <!-- Contact Form Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="flex flex-row gap-12 max-w-6xl mx-auto">
        <!-- Left Side - Form -->
        <div class="w-full lg:w-1/2">
          <div class="mb-8" :class="{ 'text-right': isRTL }">
            <h2
              class="text-[#339e3f] text-2xl font-semibold font-['Poppins'] mb-3"
            >
              {{ $t("contact.header.title") }}
            </h2>
            <p class="text-black text-base font-normal font-['Poppins']">
              {{ $t("contact.header.description") }}
            </p>
          </div>
          <div class="max-w-[450px]" :class="{ 'ms-auto': isRTL }">
            <ContactForm />
          </div>
        </div>

        <!-- Right Side - Image -->
        <div class="hidden sm:block w-full lg:w-1/2">
          <img
            src="@/assets/images/contact.png"
            alt="Contact Illustration"
            class="w-full h-auto ml-auto xl:max-w-[450px] lg:max-w-[400px] md:max-w-[350px] sm:max-w-[300px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import headerImage from "@/assets/images/contact-header.jpg";
import Header from "@/components/layout/Header.vue";

export default {
  name: "ContactView",
  components: {
    ContactForm,
    Header,
  },
  data() {
    return {
      headerImage,
    };
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === "ar";
    },
  },
};
</script>
