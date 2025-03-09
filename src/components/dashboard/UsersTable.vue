<template>
  <div class="overflow-x-auto">
    <div class="w-[100%] lg:w-[80%] m-auto">
      <!-- Header -->
      <div class="grid grid-cols-6 text-gray-800 mb-5 text-center">
        <div class="py-4 font-medium">User ID</div>
        <div class="py-4 font-medium">Name</div>
        <div class="py-4 font-medium">Phone Number</div>
        <div class="py-4 font-medium">Email</div>
        <div class="py-4 font-medium">Address</div>
        <div class="py-4 font-medium">City</div>
      </div>

      <!-- Rows -->
      <div
        v-for="user in users"
        :key="user.id"
        class="grid grid-cols-6 text-gray-700 border-b border-gray-300 text-center"
      >
        <div class="py-10 break-words">#{{ user.id }}</div>
        <div class="py-10 break-words">{{ user.name }}</div>
        <div class="py-10 break-words">{{ user.phone }}</div>
        <div class="py-10 break-words">{{ user.email }}</div>
        <div class="py-10 break-words">
          {{ user.address.street || "No Address" }}
        </div>
        <div class="py-10 break-words">{{ user.city }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersTable",
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>
