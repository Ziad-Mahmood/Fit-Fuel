<template>
  <footer class="w-full bg-white flex items-center mt-2 py-8">
    <div
      class="w-full flex justify-between px-16"
      :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }"
    >
      <!-- Brand Section -->
      <div
        class="flex flex-col gap-6"
        :class="{ 'items-end text-right': $i18n.locale === 'ar' }"
      >
        <div class="w-12" :class="{ 'ml-auto': $i18n.locale === 'ar' }">
          <router-link to="/">
            <img
              src="@/assets/images/Logo.png"
              alt="FitFuel Logo"
              class="h-13 w-auto"
            />
          </router-link>
        </div>
        <p class="w-80 text-[#191919] text-sm font-normal font-['Poppins']">
          {{ $t("footer.description") }}
        </p>
        <div>
          <img
            src="@/assets/images/Social media.png"
            alt="Social Media Icons"
            class="w-25 h-6"
          />
        </div>
      </div>

      <!-- Pages Section -->
      <div class="hidden md:flex flex-col gap-4">
        <h3 class="text-[#339e3f] text-xl font-semibold font-['Poppins']">
          {{ $t("footer.pages") }}
        </h3>
        <nav class="flex flex-col gap-3">
          <router-link
            to="/"
            class="text-[#191919] text-sm font-normal font-['Poppins'] hover:text-[#339e3f] transition-colors"
          >
          {{ $t("footer.home") }}
          </router-link>
          <router-link
            to="/menu"
            class="text-[#191919] text-sm font-normal font-['Poppins'] hover:text-[#339e3f] transition-colors"
          >
          {{ $t("footer.menu") }}
          </router-link>
          <router-link
            to="/contact"
            class="text-[#191919] text-sm font-normal font-['Poppins'] hover:text-[#339e3f] transition-colors"
          >
          {{ $t("footer.contact") }}
          </router-link>
        </nav>
      </div>

      <!-- Contact Section -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <img src="@/assets/images/Phone.png" alt="Phone" class="w-6 h-auto" />
          <span
            class="hidden md:inline-block ml- text-black text-sm font-normal font-['Inter']"
          >
            +123 488 9652
          </span>
        </div>

        <div class="flex items-center">
          <a href="mailto:FitFuel@gmail.com"
            ><img
              src="@/assets/images/Circled Envelope.png"
              alt="Email"
              class="w-6 h-auto"
          /></a>
          <span
            class="hidden md:inline-block ml- text-black text-sm font-normal font-['Inter']"
          >
            FitFuel@gmail.com
          </span>
        </div>

        <div class="flex items-center">
          <a href="https://www.google.com/maps"
            ><img
              src="@/assets/images/Place Marker.png"
              alt="Location"
              class="w-6 h-auto"
          /></a>
          <span
            class="hidden md:inline-block ml- text-black text-sm font-normal font-['Inter']"
          >
          {{ $t("footer.location") }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
