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
import { collection, query, where, onSnapshot } from "firebase/firestore";
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
  created() {
    this.setupUsersListeners();
  },
  beforeUnmount() {
    // Clean up listeners when component is destroyed
    if (this.unsubscribeUsers) this.unsubscribeUsers();
    if (this.unsubscribeChefs) this.unsubscribeChefs();
    if (this.unsubscribeDrivers) this.unsubscribeDrivers();
  },
  data() {
    return {
      activeTab: "users",
      users: [],
      chefs: [],
      drivers: [],
      unsubscribeUsers: null,
      unsubscribeChefs: null,
      unsubscribeDrivers: null,
    };
  },
  methods: {
    setupUsersListeners() {
      try {
        // Set up real-time listener for clients
        const clientsQuery = query(
          collection(db, "users"),
          where("role", "==", "client")
        );
        this.unsubscribeUsers = onSnapshot(
          clientsQuery,
          (snapshot) => {
            this.users = snapshot.docs.map((doc) => {
              const userData = doc.data();
              return {
                id: doc.id,
                name: userData.displayName || "No Name",
                phone: userData.phone || "No Phone Number",
                email: userData.email || "No Email",
                address: userData.address?.street || "No Address",
                city: userData.address?.city || "No City",
                ...userData,
              };
            });
          },
          (error) => {
            console.error("Error fetching users:", error);
          }
        );

        // Set up real-time listener for kitchen staff
        const chefsQuery = query(
          collection(db, "users"),
          where("role", "==", "kitchen")
        );
        this.unsubscribeChefs = onSnapshot(
          chefsQuery,
          (snapshot) => {
            this.chefs = snapshot.docs.map((doc) => {
              const userData = doc.data();
              return {
                id: doc.id,
                name: userData.displayName || "No Name",
                phone: userData.phone || "No Phone Number",
                email: userData.email || "No Email",
                address: userData.address?.street || "No Address",
                city: userData.address?.city || "No City",
                ...userData,
              };
            });
          },
          (error) => {
            console.error("Error fetching chefs:", error);
          }
        );

        // Set up real-time listener for delivery staff
        const driversQuery = query(
          collection(db, "users"),
          where("role", "==", "delivery")
        );
        this.unsubscribeDrivers = onSnapshot(
          driversQuery,
          (snapshot) => {
            this.drivers = snapshot.docs.map((doc) => {
              const userData = doc.data();
              return {
                id: doc.id,
                name: userData.displayName || "No Name",
                phone: userData.phone || "No Phone Number",
                email: userData.email || "No Email",
                address: userData.address?.street || "No Address",
                city: userData.address?.city || "No City",
                ...userData,
              };
            });
          },
          (error) => {
            console.error("Error fetching drivers:", error);
          }
        );
      } catch (error) {
        console.error("Error setting up listeners:", error);
      }
    },
  },
};
</script>
