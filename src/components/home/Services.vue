<template>
  <section class="container mx-auto px-4 py-16" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="text-center mb-12">
      <h2 class="text-lg text-green-600 font-medium mb-2">{{ $t('services.title') }}</h2>
      <h3 class="text-3xl font-bold text-gray-800">{{ $t('services.description') }}</h3>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      <service-card
        v-for="service in services"
        :key="service.title"
        :icon="service.icon"
        :title="$t(service.title)"
        :description="$t(service.description)"
      />
    </div>
  </section>
</template>

<script>
import ServiceCard from "./ServiceCard.vue";

export default {
  components: {
    ServiceCard,
  },
  data() {
    return {
      services: [
        {
          icon: new URL("../../assets/images/easy to order.png", import.meta.url).href,
          title: "services.easyOrder.title",
          description: "services.easyOrder.description",
        },
        {
          icon: new URL("../../assets/images/fastest delivery.png", import.meta.url).href,
          title: "services.fastDelivery.title",
          description: "services.fastDelivery.description",
        },
        {
          icon: new URL("../../assets/images/best quality.png", import.meta.url).href,
          title: "services.bestQuality.title",
          description: "services.bestQuality.description",
        },
      ],
    };
  },
};
</script>
