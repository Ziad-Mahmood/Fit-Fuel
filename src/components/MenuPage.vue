<template>
  <div class="menu-section">
    <div class="menu-header h-[300px] relative bg-amber-300">
      <h2
        class="menu-info text-4xl font-bold absolute bottom-[35%] right-[20%]"
      >
        Menu
      </h2>
    </div>
    <!-- <Header title="Menu" bgImage="menu-banner.png" position="right" /> -->
    <div class="w-[80%] m-auto">
      <div class="menu-filter my-10 flex flex-col md:flex-row items-center gap-10 ml-5">
        <div class="form-group flex md:gap-5 items-center">
          <label for="search">Search for meals</label>
          <div
            class="input-feild border rounded w-[350px] px-3 py-2 border-[#E0E0E0] flex justify-between items-center"
          >
            <input
              type="search"
              placeholder="Search"
              class="search-input text-sm w-[100%] py-1"
              id="search"
            />
            <i class="fa-solid fa-magnifying-glass text-[#3d3d3d]"></i>
          </div>
        </div>
        <div class="form-group flex gap-3 items-center">
          <label for="search">Filter By </label>
          <select class="border rounded w-[200px] px-5 py-2 border-[#E0E0E0]">
            <option value="" v-for="(category, i) in categories" :key="i">
              {{ category }}
            </option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <MealCard
          v-for="meal in meals"
          :key="meal.id"
          :meal="meal"
          class="mx-auto"
        />
      </div>

      <div class="flex justify-center mt-8 space-x-2">
        <button class="px-4 py-2 border border-[#E0E0E0] rounded-sm text-[#339e3f]">«</button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="px-4 py-2 border border-[#E0E0E0] rounded-sm text-[#339e3f]"
        >
          {{ page }}
        </button>

        <button @click="nextPage" class="px-4 py-2 border border-[#E0E0E0] rounded-sm text-[#339e3f]">»</button>
      </div>
    </div>
  </div>
</template>

<script>
import MealCard from "./HomePage/MealCard.vue";
import meal8Image from "@/assets/images/meal8.jpg";
import meal7Image from "@/assets/images/meal7.jpg";
import meal9Image from "@/assets/images/meal9.jpg";
import meal6Image from "@/assets/images/meal6.jpg";
import meal5Image from "@/assets/images/meal5.jpg";
import meal4Image from "@/assets/images/meal4.jpg";
import Header from "./layout/Header.vue";

export default {
  components: { MealCard, Header },
  data() {
    return {
      meals: [
        {
          name: "Steak",
          price: "120 EG",
          category: "Dinner",
          image: meal8Image,
        },
        {
          name: "Egg Sandwich",
          price: "120 EG",
          category: "Breakfast",
          image: meal7Image,
        },
        {
          name: "Grilled Chicken",
          price: "120 EG",
          category: "Lunch",
          image: meal9Image,
        },
        {
          name: "Grilled Meat",
          price: "150EG",
          category: "Dinner",
          image: meal6Image,
        },
        {
          name: "Cauliflower Salad",
          price: "150EG",
          category: "Brealfast",
          image: meal5Image,
        },
        {
          name: "Salmon",
          price: "150EG",
          category: "Lunch",
          image: meal4Image,
        },
      ],
      categories: [
        "All Categories",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Salads",
        "Desserts",
        "Drinks",
      ],
      totalPages: [1, 2, 3],
    };
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
