<template>
  <div class="container mx-auto px-4 py-12">
    <div class="flex flex-wrap gap-6 justify-center mb-12">
      <button
        v-for="(category, i) in categories"
        :key="i"
        @click="filterMeals(category)"
        :class="seletedCategory === category ? 'btn py-2 px-5' : 'btn-outline py-2 px-5'"
      >
        {{ category }}
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[80%]">
      <div class="card flex justify-center" v-for="(meal, i) in filterAllMeals" :key="i">
        <MealCard :meal="meal" />
      </div>
    </div>
  </div>
</template>

<script>
import MealCard from './MealCard.vue'
import mealImage from '@/assets/images/meal.jpg';
import meal2Image from '@/assets/images/meal2.jpg';
import meal3Image from '@/assets/images/meal3.jpg';
import meal10Image from '@/assets/images/meal10.jpg';

export default {
  name: 'HomeCategory',
  components: {
    MealCard,
  },
  data() {
    return {
      categories: ['Breakfast', 'Lunch', 'Dinner', 'Salads', 'Desserts', 'Drinks'],
      seletedCategory: 'Breakfast',
      meals: [
        {
          name: 'Strawberry Salad',
          price: '120 EG',
          category: 'Breakfast',
          image: mealImage,
        },
        {
          name: 'Strawberry Salad',
          price: '120 EG',
          category: 'Salads',
          image: mealImage,
        },
        {
          name: 'Oat Meal',
          price: '120 EG',
          category: 'Breakfast',
          image: meal3Image,
        },
        {
          name: 'Avocado Sandwich',
          price: '120 EG',
          category: 'Breakfast',
          image: meal2Image,
        },
        {
          name: 'Grilled Chicken',
          price: '150EG',
          category: 'Dinner',
          image: mealImage,
        },
        {
          name: 'Grilled Chicken',
          price: '150EG',
          category: 'Lunch',
          image: meal10Image,
        },
        {
          name: 'Chocolate Cake',
          price: '100EG',
          category: 'Desserts',
          image: mealImage,
        },
        {
          name: 'Fresh Orange Juice',
          price: '50EG',
          category: 'Drinks',
          image: mealImage,
        },
      ],
    }
  },
  methods: {
    filterMeals(category) {
      this.seletedCategory = category
      console.log(this.seletedCategory)
    },
  },
  computed: {
    filterAllMeals() {
      return this.meals.filter((meal) => meal.category === this.seletedCategory)
    },
  },
}
</script>

<style scoped></style>