<template>
  <Header title="About Us" bgImage="aboutPage1..jpg" position="left" />
  <div>
    <who-we-are class="w-[80%]" />
    <services class="w-[80%]" />
    <value-proposition class="w-[80%]" />
  </div>
</template>

<script>
import WhoWeAre from "@/components/home/WhoWeAre.vue";
import Services from "@/components/home/Services.vue";
import ValueProposition from "@/components/home/ValueProposition.vue";
import Header from "@/components/layout/Header.vue";

export default {
  name: "HomeView",
  components: {
    WhoWeAre,
    Services,
    ValueProposition,
    Header,
  },
};
</script>
