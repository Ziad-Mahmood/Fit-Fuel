<template>
  <div class="menu-section">
    <Header title="Menu" bgImage="menu-banner.png" position="right" />
    <div class="w-[80%] m-auto">
      <div
        class="menu-filter my-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-0 md:justify-between ml-5"
      >
        <div class="form-group flex md:gap-5 items-center">
          <label for="search">Search for meals</label>
          <div
            class="input-feild border rounded w-[350px] px-3 py-2 border-[#E0E0E0] flex justify-between items-center"
          >
            <input
              type="search"
              placeholder="Search"
              class="search-input text-sm w-[90%] py-1"
              id="search"
              v-model="search"
              @input="searchMeal"
            />
            <i class="fa-solid fa-magnifying-glass text-[#3d3d3d]"></i>
          </div>
        </div>
        <div class="form-group flex gap-3 items-center">
          <!-- <label for="category">Filter By </label> -->
          <select
            class="border rounded w-[100%] md:w-[200px] px-5 py-2 border-[#E0E0E0]"
            v-model="selectedCategory"
            @change="filterByCategory"
          >
            <option value="">All Categories</option>
            <option
              v-for="(category, i) in categories"
              :key="i"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="py-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden mx-auto w-full">
            <div class="h-48 bg-gray-200 animate-pulse"></div>
            <div class="p-4 space-y-3">
              <div class="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div class="flex justify-between items-center pt-2">
                <div class="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div class="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Meals grid -->
      <div v-else>
        <div v-if="filteredMeals.length === 0" class="text-center py-10">
          <h3 class="text-xl text-gray-600">No meals found</h3>
          <p class="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <MealCard
            v-for="meal in renderMeals"
            :key="meal.id"
            :meal="meal"
            class="mx-auto w-full"
          />
        </div>

        <div v-if="filteredMeals.length > 0" class="flex justify-center mt-8 space-x-2">
          <button
            @click="prev"
            class="px-4 py-2 border border-[#E0E0E0] rounded-sm text-[#339e3f] cursor-pointer"
          >
            «
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="
              currentPage === page
                ? 'bg-[#339e3f] px-4 py-2 border border-[#E0E0E0] rounded-sm text-[#fff] cursor-pointer hover:bg-[#2b843a]'
                : 'px-4 py-2 border border-[#E0E0E0] rounded-sm text-[#339e3f] cursor-pointer'
            "
          >
            {{ page }}
          </button>

          <button
            @click="next"
            class="px-4 py-2 border border-[#E0E0E0] rounded-sm text-[#339e3f] cursor-pointer"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MealCard from "./HomePage/MealCard.vue";
import Header from "./layout/Header.vue";
import { db, collection, getDocs } from "@/firebase/config.js";

export default {
  components: { MealCard, Header },
  data() {
    return {
      meals: [],
      filteredMeals: [],
      categories: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Salads",
        "Desserts",
        "Drinks",
      ],
      pageMealsNum: 6,
      currentPage: 1,
      search: "",
      selectedCategory: "",
      loading: true
    };
  },
  methods: {
    async getMeals() {
      this.loading = true;
      try {
        const mealsCollection = collection(db, "meals");
        const allMeals = await getDocs(mealsCollection);
        this.meals = [];
        allMeals.forEach((meal) => {
          this.meals.push({
            id: meal.id,
            ...meal.data(),
          });
        });
        this.filteredMeals = this.meals;
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },

    prev() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    next() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    goToPage(page) {
      this.currentPage = page;
    },

    searchMeal() {
      this.filteredMeals = this.meals.filter((meal) =>
        meal.name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.currentPage = 1;
    },

    filterByCategory() {
      if (this.selectedCategory === "") {
        this.filteredMeals = this.meals;
      } else {
        this.filteredMeals = this.meals.filter(
          (meal) => meal.category === this.selectedCategory
        );
      }
      this.currentPage = 1;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredMeals.length / this.pageMealsNum);
    },

    renderMeals() {
      return this.filteredMeals.slice(
        (this.currentPage - 1) * this.pageMealsNum,
        this.currentPage * this.pageMealsNum
      );
    },
  },
  mounted() {
    this.getMeals();
  },
};
</script>

<style>
.menu-header {
  background-image: url("@/assets/images/menu-banner.png");
  background-size: cover;
}
.search-input:focus,
select:focus {
  outline: none;
}
</style>
