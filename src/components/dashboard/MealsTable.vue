<template>
  <div class="overflow-x-auto">
    <!-- Loading overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-[80%] max-w-4xl">
        <h3 class="text-lg font-medium mb-4">{{ loadingMessage }}</h3>
        
        <!-- Table placeholder -->
        <div class="w-full">
          <!-- Header -->
          <div class="grid grid-cols-5 text-gray-800 text-center mb-5">
            <div class="py-4 font-medium">Meal ID</div>
            <div class="py-4 font-medium">Name</div>
            <div class="py-4 font-medium">Price</div>
            <div class="py-4 font-medium">Category</div>
            <div class="py-4 font-medium">Actions</div>
          </div>
          
          <!-- Placeholder rows -->
          <div v-for="i in 5" :key="i" class="grid grid-cols-5 text-gray-700 border-b border-gray-300 text-center items-center py-5">
            <div v-for="j in 5" :key="j" class="py-4">
              <div class="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-[100%] lg:w-[80%] m-auto">
      <div
        v-if="isEditing"
        class="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50"
      >
        <MealForm
          :meal="editedMeal"
          :categories="categories"
          :isEditMode="true"
          @cancel="cancelEdit"
          @save="updateMeal"
        />
      </div>
      <div class="grid grid-cols-5 text-gray-800 text-center mb-5">
        <div class="py-4 font-medium">Meal ID</div>
        <div class="py-4 font-medium">Name</div>
        <div class="py-4 font-medium">Price</div>
        <div class="py-4 font-medium">Category</div>
        <div class="py-4 font-medium">Actions</div>
      </div>
      <div
        v-for="meal in meals"
        :key="meal.id"
        class="grid grid-cols-5 text-gray-700 border-b border-gray-300 text-center items-center py-5"
      >
        <div class="py-4 break-words">#{{ meal.id }}</div>
        <div class="py-4 break-words">{{ meal.name }}</div>
        <div class="py-4 break-words">${{ meal.price }}</div>
        <div class="py-4 break-words">{{ meal.category }}</div>
        <div class="py-4 flex justify-center gap-5">
          <button
            @click="openEditForm(meal)"
            class="meal-btn px-5 py-2 text-md cursor-pointer"
          >
            Edit
          </button>
          <button @click="deleteMeal(meal)" class="delete-btn px-5 py-2 text-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";
import MealForm from "./MealForm.vue";

export default {
  name: "MealsTable",
  components: {
    MealForm,
  },
  props: {
    meals: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editedMeal: {},
      loading: false,
      loadingMessage: "Loading meals...",
      categories: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Salads",
        "Desserts",
        "Drinks",
      ],
    };
  },
  methods: {
    async deleteMeal(meal) {
      try {
        const result = await Swal.fire({
          text: `Want to delete ${meal.name}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#339e3f",
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          this.loading = true;
          this.loadingMessage = `Deleting ${meal.name}...`;
          
          await deleteDoc(doc(db, "meals", meal.id));
          
          this.loading = false;
          Swal.fire("Delete!", "Meal deleted successfully", "success");
        }
      } catch (error) {
        console.log("Error:", error);
        this.loading = false;
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    },
    openEditForm(meal) {
      this.editedMeal = { ...meal };
      this.isEditing = true;
    },

    async updateMeal(updatedMeal) {
      try {
        this.loading = true;
        this.loadingMessage = `Updating ${updatedMeal.name}...`;
        
        const mealRef = doc(db, "meals", updatedMeal.id);
        await updateDoc(mealRef, {
          name: updatedMeal.name,
          price: updatedMeal.price,
          category: updatedMeal.category,
          description: updatedMeal.description,
          mealDetails: updatedMeal.mealDetails,
          ingredients: updatedMeal.ingredients,
          coreIngredients: updatedMeal.coreIngredients,
          image: updatedMeal.image,
        });

        this.loading = false;
        Swal.fire("Updated", "Meal updated successfully", "success");
        this.isEditing = false;
      } catch (error) {
        console.error("Error updating meal:", error);
        this.loading = false;
        Swal.fire("Error", "Failed to update meal.", "error");
      }
    },

    cancelEdit() {
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
