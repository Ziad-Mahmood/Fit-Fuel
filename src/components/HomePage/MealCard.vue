<template>
  <button
    class="meal-card w-[370px] h-[484px] rounded-3xl  shadow-md text-start overflow-hidden hover:shadow-2xl hover:cursor-pointer"
    :style="{ backgroundImage: `url(${meal.image})` }"
    @click="goToMealDetails">
    <div class="pl-5 pb-5 bg-opacity-80 rounded-b-lg absolute bottom-0 w-full card-content leading-12">
    <h3  class="text-2xl text-white font-medium mb-2">{{ meal.name }}</h3>
      <p class="text-xl font-medium text-white">{{ meal.price }} EG</p>
      <p class="text-white font-normal ">
        Order Now <i class="fa-solid fa-chevron-right"></i>
      </p>
    </div>
  </button>
</template>

<script>
export default {
  name: "MealCard",
  props: {
    meal: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToMealDetails() {
      this.$router.push(`/meal/${this.meal.id}`)
    },
  },
}
</script>

<style scoped>
.meal-card {
  background-size: cover;
  background-position: center;
  position: relative;
}
.meal-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.409);
}
.card-content {
  z-index: 1;
}
</style>
