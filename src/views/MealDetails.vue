<template>
  <div>
    
  <Header
      class="mb-10"
      title="Meal Details"
      bgImage="header-meal.png"
      position="right"
    />
      <div class="flex flex-col lg:flex-row items-center justify-center gap-12 m-auto my-12">
        <div class="w-6/12 lg:w-4/12">
          <img 
            src="@/assets/images/Beefsteak.png" 
            alt="Steak" 
            class="w-full h-auto rounded-full  p-8"
          />
        </div>
        
        <DesiredMeal
          class="w-4/12"
          name="Steak"
          category="Dinner"
          price="120"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mae risus. Lacus nisi, et ac dapibus sit eu velit in consequat."
          @add-to-cart="handleAddToCart"
        />
      </div>
      
      <div class="w-[50%] m-auto">
        <TabSelector 
          :tabs="['Ingredients', 'Meal Details']"
          v-model="activeTab"
        />
      </div>
      
      <div v-if="activeTab === 'Ingredients'" class="w-[50%] m-auto border-b border-[#339e3f] py-4">
        <IngredientItem 
          v-for="ingredient in ingredients" 
          :key="ingredient"
          :name="ingredient"
        />
      </div>
      
      <div class="mt-16 container mx-auto px-4 py-12">
        <h3 class="text-4xl font-bold text-[#339e3f] w-[55%] m-auto my-25">Similar Products</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[80%]">
          <div class="flex justify-center" v-for="meal in similarMeals" :key="meal.id">
            <MealCard :meal="meal" /> 
          </div>
        </div>
        
        <!-- Add pagination dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button 
            v-for="index in 3" 
            :key="index"
            class="w-2.5 h-2.5 rounded-full transition-colors"
            :class="index === 1 ? 'bg-[#339e3f]' : 'bg-gray-300'"
            @click="currentPage = index"
          ></button>
        </div>
      </div>
    </div>
   
</template>

<script>
import Header from "@/components/layout/Header.vue";
import MealCard from '../components/HomePage/MealCard.vue'
import TabSelector from '../components/meal/TabSelector.vue'
import IngredientItem from '../components/meal/IngredientItem.vue'
import DesiredMeal from '../components/meal/DesiredMeal.vue'

export default {
  name: 'MealDetails',
  components: {
    Header,
    MealCard,
    TabSelector,
    IngredientItem,
    DesiredMeal
  },
  methods: {
    handleAddToCart() {
      
    }
  },
  data() {
    return {
      currentPage: 1,
      activeTab: 'Ingredients',
      ingredients: [
        'Steak (Lean Cut)',
        'Olive Oil',
        'Garlic',
        'Lemon Juice',
        'Rosemary',
        'Black Pepper & Sea Salt',
        'Sweet Potatoes',
        'Steamed Broccoli',
        'Cherry Tomatoes'
      ],
      similarMeals: [
        {
          id: 1,
          name: 'Lamb Steak ',
          price: '120 EG',
          image: new URL('../assets/images/steak.png', import.meta.url).href
        },
        {
          id: 2,
          name: 'Grilled Meat',
          price: '120 EG',
          image: new URL('../assets/images/Grilled-Meat.png', import.meta.url).href
        },
        {
          id: 3,
          name: 'Salmon',
          price: '120 EG',
          image: new URL('../assets/images/Salmon.png', import.meta.url).href
        }
      ]
    }
  }
}
</script>