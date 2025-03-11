<template>
  <section class="container mx-auto px-4 py-16" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="grid md:grid-cols-2 items-end">
      <div class="space-y-8">
        <div class="space-y-4 md:ms-35">
          <h2 class="text-lg text-green-600 font-medium ms-23 md:ms-0">
            {{ $t('valueProposition.title') }}
          </h2>
          <h3 class="text-3xl font-bold text-gray-800">
            {{ $t('valueProposition.description') }}
          </h3>
        </div>
        <div class="space-y-8 mt-10 mb-10 ms-10 md:ms-25">
          <div
            v-for="value in values"
            :key="value.title"
            class="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-lg w-[90%]"
          >
            <img :src="value.icon" :alt="$t(value.title)" class="w-8 h-8" />
            <span class="text-gray-700">{{ $t(value.title) }}</span>
          </div>
        </div>
      </div>
      <div>
        <img
          src="../../assets/images/about us3.png"
          alt="Man with groceries"
          class="rounded-lg w-[80%] ms-12 md:ms-0"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      values: [
        {
          icon: new URL("../../assets/images/Vegan Food.png", import.meta.url).href,
          title: "valueProposition.balancedMeals",
        },
        {
          icon: new URL("../../assets/images/Best Seller.png", import.meta.url).href,
          title: "valueProposition.highQuality",
        },
        {
          icon: new URL("../../assets/images/Add Shopping Cart.png", import.meta.url).href,
          title: "valueProposition.easyOrdering",
        },
        {
          icon: new URL("../../assets/images/Delivery.png", import.meta.url).href,
          title: "valueProposition.reliableDelivery",
        },
      ],
    };
  },
};
</script>
