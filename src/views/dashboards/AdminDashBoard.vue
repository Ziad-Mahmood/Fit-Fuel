<template>
  <Header title="Admin" bgImage="admin header.png" position="right" />

  <div class="flex gap-4 mt-15 mb-10 justify-center">
    <tab-button
      text="Users"
      :isActive="activeTab === 'users'"
      @click="activeTab = 'users'"
    />
    <tab-button
      text="Chefs"
      :isActive="activeTab === 'chefs'"
      @click="activeTab = 'chefs'"
    />
    <tab-button
      text="Drivers"
      :isActive="activeTab === 'drivers'"
      @click="activeTab = 'drivers'"
    />
  </div>

  <div
    class="bg-white p-6 text-xs break-words sm:text-sm sm:break-words md:text-base md:break-normal"
  >
    <users-table v-if="activeTab === 'users'" :users="users" />
    <users-table v-if="activeTab === 'chefs'" :users="chefs" />
    <users-table v-if="activeTab === 'drivers'" :users="drivers" />
  </div>
</template>

<script>
import TabButton from "@/components/dashboard/TabButton.vue";
import UsersTable from "@/components/dashboard/UsersTable.vue";
import Header from "@/components/layout/Header.vue";

export default {
  name: "Dashboard",
  components: {
    Header,
    TabButton,
    UsersTable,
  },
  data() {
    return {
      activeTab: "users",
      users: [
        {
          id: "123456",
          name: "user1",
          phone: "012345678",
          email: "user1@gmail.com",
          address: "123 Main Street, Cairo",
          city: "Cairo",
        },
        {
          id: "123456",
          name: "user2",
          phone: "012345678",
          email: "user2@gmail.com",
          address: "123 Main Street, Cairo",
          city: "Cairo",
        },
        {
          id: "123456",
          name: "user3",
          phone: "012345678",
          email: "user3@gmail.com",
          address: "123 Main Street, Cairo",
          city: "Cairo",
        },
      ],
      chefs: [
        {
          id: "123456",
          name: "chef",
          phone: "012345678",
          email: "chef@gmail.com",
          address: "123 Main Street, Cairo",
          city: "Cairo",
        },
      ],
      drivers: [
        {
          id: "123456",
          name: "driver1",
          phone: "012345678",
          email: "driver1@gmail.com",
          address: "123 Main Street, Cairo",
          city: "Cairo",
        },
        {
          id: "123456",
          name: "driver2",
          phone: "012345678",
          email: "driver2@gmail.com",
          address: "123 Main Street, Cairo",
          city: "Cairo",
        },
        {
          id: "123456",
          name: "driver3",
          phone: "012345678",
          email: "driver3@gmail.com",
          address: "123 Main Street, Cairo",
          city: "Cairo",
        },
      ],
    };
  },
};
</script>
