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
        text="Kitchen Staff"
        :isActive="activeTab === 'kitchen'"
        @click="activeTab = 'kitchen'"
      />
      <tab-button
        text="Delivery Staff"
        :isActive="activeTab === 'delivery'"
        @click="activeTab = 'delivery'"
      />
    </div>

    <div class="bg-white p-6">
      <!-- Users Tab Content -->
      <div v-if="activeTab === 'users'">
        <users-table :users="users" />
      </div>
      
      <!-- Kitchen Staff Tab Content -->
      <div v-if="activeTab === 'kitchen'">
        <div class="mb-4 flex justify-between items-center">
          <button 
            @click="showAddStaffModal('kitchen')" 
            class="bg-[#339E3F] text-white px-4 py-2 rounded hover:bg-[#2b843a]"
          >
            Add Kitchen Staff
          </button>
        </div>
        <users-table :users="chefs" />
      </div>
      
      <!-- Delivery Staff Tab Content -->
      <div v-if="activeTab === 'delivery'">
        <div class="mb-4 flex justify-between items-center">
          <button 
            @click="showAddStaffModal('delivery')" 
            class="bg-[#339E3F] text-white px-4 py-2 rounded hover:bg-[#2b843a]"
          >
            Add Delivery Staff
          </button>
        </div>
        <users-table :users="drivers" />
      </div>
    </div>

    <!-- Add Staff Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-medium mb-4">Add {{ staffRoleText }}</h2>
        
        <div v-if="modalError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ modalError }}
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              v-model="staffForm.displayName" 
              type="text" 
              class="w-full p-2 border rounded focus:ring-[#339E3F] focus:border-[#339E3F]"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="staffForm.email" 
              type="email" 
              class="w-full p-2 border rounded focus:ring-[#339E3F] focus:border-[#339E3F]"
              placeholder="staff@example.com"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              v-model="staffForm.password" 
              type="password" 
              class="w-full p-2 border rounded focus:ring-[#339E3F] focus:border-[#339E3F]"
              placeholder="********"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
            <input 
              v-model="staffForm.phone" 
              type="tel" 
              class="w-full p-2 border rounded focus:ring-[#339E3F] focus:border-[#339E3F]"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="closeModal" 
            class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="addStaffAccount" 
            :disabled="isAddingStaff"
            class="px-4 py-2 bg-[#339E3F] text-white rounded hover:bg-[#2b843a] disabled:bg-gray-400"
          >
            {{ isAddingStaff ? 'Adding...' : 'Add Staff' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabButton from "@/components/dashboard/TabButton.vue";
import UsersTable from "@/components/dashboard/UsersTable.vue";
import Header from "@/components/layout/Header.vue";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { createStaffAccount } from "@/firebase/auth";

export default {
  name: "AdminDashboard",
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
      unsubscribeUsers: null,
      unsubscribeChefs: null,
      unsubscribeDrivers: null,
      showModal: false,
      staffForm: {
        displayName: '',
        email: '',
        password: '',
        phone: '',
        role: ''
      },
      isAddingStaff: false,
      modalError: null
    };
  },
  computed: {
    staffRoleText() {
      return this.staffForm.role === 'kitchen' ? 'Kitchen Staff' : 'Delivery Staff';
    }
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
    
    showAddStaffModal(role) {
      this.staffForm = {
        displayName: '',
        email: '',
        password: '',
        phone: '',
        role: role
      };
      this.modalError = null;
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    async addStaffAccount() {
      this.modalError = null;
      
      // Validate form
      if (!this.staffForm.displayName) {
        this.modalError = "Please enter a name";
        return;
      }
      
      if (!this.staffForm.email) {
        this.modalError = "Please enter an email";
        return;
      }
      
      if (!this.staffForm.password || this.staffForm.password.length < 6) {
        this.modalError = "Password must be at least 6 characters";
        return;
      }
      
      try {
        this.isAddingStaff = true;
        
        await createStaffAccount(
          this.staffForm.email,
          this.staffForm.password,
          this.staffForm.displayName,
          this.staffForm.role,
          this.staffForm.phone
        );
        
        this.closeModal();
        
        // Show success message
        alert(`${this.staffRoleText} account created successfully`);
      } catch (error) {
        let errorMessage = `Failed to create ${this.staffRoleText.toLowerCase()} account`;
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "This email is already in use";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "Invalid email format";
        }
        
        this.modalError = errorMessage;
        console.error(error);
      } finally {
        this.isAddingStaff = false;
      }
    }
  },
};
</script>