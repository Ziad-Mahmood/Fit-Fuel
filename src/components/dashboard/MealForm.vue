<template>
  <div
    class="bg-gray-100 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto drop-shadow-2xl"
  >
    <h2 class="text-2xl font-bold mb-4">
      {{ isEditMode ? "Edit Meal" : "Add Meal" }}
    </h2>
    <div class="mb-3 flex justify-center" v-if="isEditMode">
      <img
        :src="meal.image"
        alt="Meal Image"
        class="w-40 h-40 object-cover rounded"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-[#339e3f] font-medium my-3">Name</label>
        <input
          v-model="meal.name"
          type="text"
          class="w-full border p-2 rounded"
          placeholder="Enter Meal Name"
        />
      </div>

      <div>
        <label class="block text-[#339e3f] font-medium my-3">Price</label>
        <input
          v-model="meal.price"
          type="number"
          class="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label class="block text-[#339e3f] font-medium my-3">Category</label>
        <select v-model="meal.category" class="w-full border p-2 rounded">
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-[#339e3f] font-medium my-3">Image URL</label>
        <input
          v-model="meal.image"
          type="text"
          class="w-full border p-2 rounded"
          placeholder="Enter Image URL"
        />
      </div>
    </div>

    <div class="mt-3">
      <label class="block text-[#339e3f] font-medium my-3">Description</label>
      <textarea
        v-model="meal.description"
        class="w-full border p-2 rounded"
        placeholder="Enter Meal Description"
      ></textarea>
    </div>

    <div class="mt-3">
      <label class="block text-[#339e3f] font-medium my-3">Meal Details</label>
      <textarea
        v-model="meal.mealDetails"
        class="w-full border p-2 rounded"
        placeholder="Enter Meal Details"
      ></textarea>
    </div>

    <div class="mt-3">
      <label class="block text-[#339e3f] font-medium my-3">Ingredients</label>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(ingredient, index) in meal.ingredients"
          :key="index"
          class="flex gap-2 mb-1"
        >
          <input
            v-model="meal.ingredients[index]"
            type="text"
            class="w-full border p-2 rounded"
            placeholder="Enter ingredient "
          />
          <button
            @click="removeIngredient(index)"
            class="text-white px-2 rounded"
          >
            <i class="fa-solid fa-trash text-[#339e3f] cursor-pointer"></i>
          </button>
        </div>
      </div>
      <button
        @click="addIngredient"
        class="btn-outline px-5 py-2 my-3 cursor-pointer"
      >
        Add Ingredient
      </button>
    </div>
    <div class="mt-3">
      <label class="block text-[#339e3f] font-medium my-3">Core Ingredients</label>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(core, index) in meal.coreIngredients"
          :key="index"
          class="flex gap-2 mb-1"
        >
          <input
            v-model="meal.coreIngredients[index]"
            type="text"
            class="w-full border p-2 rounded"
            placeholder="Enter core Ingredient"

          />
          <button
            @click="removeCoreIngredient(index)"
            class="text-white px-2 rounded"
          >
            <i class="fa-solid fa-trash text-[#339e3f] cursor-pointer"></i>
          </button>
        </div>
      </div>
      <button
        @click="addCoreIngredient"
        class="btn-outline px-5 py-2 my-3 cursor-pointer"
      >
      Add Core Ingredient
      </button>
    </div>

    <div class="flex justify-between gap-2 mt-4">
      <button @click="cancel" class="delete-btn px-5 py-2">
        Cancel
      </button>
      <button @click="save" class="meal-btn px-5 py-2">
        {{ isEditMode ? "Save" : "Add Meal" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MealForm",
  props: {
    meal: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addIngredient() {
      this.meal.ingredients.push("");
    },
    removeIngredient(index) {
      this.meal.ingredients.splice(index, 1);
    },
    addCoreIngredient() {
      this.meal.coreIngredients.push("");
    },
    removeCoreIngredient(index) {
      this.meal.coreIngredients.splice(index, 1);
    },
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save", this.meal);
    },
  },
};
</script>
