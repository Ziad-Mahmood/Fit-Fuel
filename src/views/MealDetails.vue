<template>
  <div>
    <Header
      class="mb-10"
      title="Meal Details"
      bgImage="header-meal.png"
      position="right"
    />
    <div v-if="meal" class="flex flex-col lg:flex-row items-center justify-center gap-12 m-auto my-12">
      <div class="w-6/12 lg:w-4/12">
        <img 
          :src="meal.image" 
          :alt="meal.name" 
          class="w-full h-auto rounded-full p-8"
        />
      </div>
      
      <DesiredMeal
        class="w-4/12"
        :meal="meal"
        :removed-ingredients="removedIngredients"
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
        v-for="ingredient in meal?.ingredients" 
        :key="ingredient"
        :name="ingredient"
        :is-core="isCoreIngredient(ingredient)"
        :is-removed="removedIngredients.includes(ingredient)"
        :show-actions="true"
        @toggle-ingredient="toggleIngredient"
      />
    </div>
    
    <div v-if="activeTab === 'Meal Details'" class="w-[50%] m-auto border-b border-[#339e3f] py-4">
      <IngredientItem 
        v-for="detail in nutritionDetails" 
        :key="detail.name"
        :name="`${detail.name}: ${detail.value}`"
        :show-actions="false"
      />
    </div>
    
    <div class="mt-16 container mx-auto px-4 py-12">
      <h3 class="text-4xl font-bold text-[#339e3f] w-[55%] m-auto my-25">Similar Products</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[50%]">
        <div class="flex justify-center" v-for="meal in similarMeals" :key="meal.id">
          <MealCard :meal="meal" class="max-h-96"/> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase/config'
import { doc, getDoc, updateDoc, collection, query, where, getDocs, limit } from 'firebase/firestore'
import Header from "@/components/layout/Header.vue"
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
  data() {
    return {
      meal: null,
      currentPage: 1,
      activeTab: 'Ingredients',
      similarMeals: [],
      removedIngredients: [],
      nutritionDetails: [
        { name: 'Calories', value: '430 kcal' },
        { name: 'Protein', value: '52g' },
        { name: 'Carbohydrates', value: '35g' },
        { name: 'Fat', value: '4.6g' },
        { name: 'Fiber', value: '4g' },
      ]
    }
  },
  methods: {
    async fetchMealDetails() {
      try {
        const mealId = this.$route.params.id
        const mealRef = doc(db, 'meals', mealId)
        const mealDoc = await getDoc(mealRef)
        
        if (mealDoc.exists()) {
          const mealData = mealDoc.data()
          this.meal = {
            id: mealDoc.id,
            ...mealData,
            price: Number(mealData.price),
            nutritionDetails: mealData.nutritionDetails || this.nutritionDetails
          }
          this.removedIngredients = []
          this.fetchSimilarMeals()
        }
      } catch (error) {
        console.error('Error fetching meal:', error)
      }
    },

    isCoreIngredient(ingredientName) {
      return this.meal?.coreIngredients?.includes(ingredientName) || false
    },

    toggleIngredient(ingredientName) {
      if (this.removedIngredients.includes(ingredientName)) {
        this.removedIngredients = this.removedIngredients.filter(ing => ing !== ingredientName)
      } else {
        this.removedIngredients.push(ingredientName)
      }
    },

    async fetchSimilarMeals() {
      if (!this.meal?.category) return
      
      try {
        const mealsRef = collection(db, 'meals')
        const q = query(
          mealsRef,
          where('category', '==', this.meal.category),
          limit(4)
        )
        const querySnapshot = await getDocs(q)
        this.similarMeals = querySnapshot.docs
          .filter(doc => doc.id !== this.meal.id)
          .slice(0, 3)
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            price: Number(doc.data().price)
          }))
      } catch (error) {
        console.error('Error fetching similar meals:', error)
      }
    },

    
    /* toggleIngredient(ingredientName) {
      if (!this.isCoreIngredient(ingredientName)) {
        if (this.removedIngredients.includes(ingredientName)) {
          this.removedIngredients = this.removedIngredients.filter(ing => ing !== ingredientName)
        } else {
          this.removedIngredients.push(ingredientName)
        }
        this.isCustomized = this.removedIngredients.length > 0
      }
    } */

    
    toggleIngredient(ingredientName) {
      if (this.removedIngredients.includes(ingredientName)) {
        this.removedIngredients = this.removedIngredients.filter(ing => ing !== ingredientName)
      } else {
        this.removedIngredients.push(ingredientName)
      }
      this.isCustomized = this.removedIngredients.length > 0
    }
  },
  created() {
    this.fetchMealDetails()
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        if (newId) {
          this.fetchMealDetails()
        }
      },
      immediate: true
    }
  }
}
</script>