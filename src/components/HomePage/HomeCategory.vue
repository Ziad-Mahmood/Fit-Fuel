<template>
  <div class="container mx-auto px-4 py-12">
    <div class="flex flex-wrap gap-6 justify-center mb-12">
      <button
        v-for="(category, i) in categories"
        :key="i"
        @click="filterMeals(category)"
        :class="
          seletedCategory === category
            ? 'btn py-2 px-5'
            : 'btn-outline py-2 px-5'
        "
      >
        {{ category }}
      </button>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[80%]"
    >
      <div
        class="card flex justify-center"
        v-for="(meal, i) in filterAllMeals"
        :key="i"
      >
        <MealCard :meal="meal" />
      </div>
    </div>
  </div>
</template>

<script>
import MealCard from "./MealCard.vue";
import { db, collection, getDocs } from "@/firebase/config.js";

export default {
  name: "HomeCategory",
  components: {
    MealCard,
  },
  data() {
    return {
      categories: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Salads",
        "Desserts",
        "Drinks",
      ],
      seletedCategory: "Breakfast",
      meals: [],
    };
  },
  methods: {
    filterMeals(category) {
      this.seletedCategory = category;
      console.log(this.seletedCategory);
    },
    async getMeals() {
      const mealsCollection = collection(db, "meals");
      const allMeals = await getDocs(mealsCollection);
      allMeals.forEach((meal) => {
        this.meals.push({
          id: meal.id,
          ...meal.data(),
        });
      });
      console.log(this.meals);
    },
  },
  computed: {
    filterAllMeals() {
      return this.meals
        .filter((meal) => meal.category === this.seletedCategory)
        .splice(0, 3);
    },
  },
  mounted() {
    this.getMeals();
  },
};
</script>

<style scoped></style>
