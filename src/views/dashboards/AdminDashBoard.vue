<template>
  <div class="mb-20">
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
  </div>
</template>

<script>
import TabButton from "@/components/dashboard/TabButton.vue";
import UsersTable from "@/components/dashboard/UsersTable.vue";
import Header from "@/components/layout/Header.vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

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
      users: [],
      chefs: [],
      drivers: [],
    };
  },
  async created() {
    await this.fetchAllUsers();
  },
  methods: {
    async fetchAllUsers() {
      try {
        // Fetch clients (unchanged)
        const clientsQuery = query(
          collection(db, "users"),
          where("role", "==", "client")
        );
        const clientSnapshot = await getDocs(clientsQuery);
        this.users = clientSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().displayName || "No Name",
          ...doc.data(),
        }));

        // Fetch kitchen staff with phone
        const chefsQuery = query(
          collection(db, "users"),
          where("role", "==", "kitchen")
        );
        const chefsSnapshot = await getDocs(chefsQuery);
        this.chefs = chefsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().displayName || "No Name",
          phone: doc.data().phone || "No Phone Number",
          ...doc.data(),
        }));

        // Fetch delivery staff with phone
        const driversQuery = query(
          collection(db, "users"),
          where("role", "==", "delivery")
        );
        const driversSnapshot = await getDocs(driversQuery);
        this.drivers = driversSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().displayName || "No Name",
          phone: doc.data().phone || "No Phone Number",
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  },
};
</script>
