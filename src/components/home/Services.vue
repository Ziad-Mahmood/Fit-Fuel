<template>
  <section class="container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-lg text-green-600 font-medium mb-2">WHAT WE SERVE</h2>
      <h3 class="text-3xl font-bold text-gray-800">Your Healthy Food</h3>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      <service-card
        v-for="service in services"
        :key="service.title"
        v-bind="service"
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
          icon: new URL(
            "../../assets/images/easy to order.png",
            import.meta.url
          ).href,
          title: "Easy To Order",
          description: "You only need a few steps in ordering food",
        },
        {
          icon: new URL(
            "../../assets/images/fastest delivery.png",
            import.meta.url
          ).href,
          title: "Fastest Delivery",
          description: "Delivery that is always ontime even faster",
        },
        {
          icon: new URL("../../assets/images/best quality.png", import.meta.url)
            .href,
          title: "Best Quality",
          description: "Not only fast for us quality is also number one",
        },
      ],
    };
  },
};
</script>
