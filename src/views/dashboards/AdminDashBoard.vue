<template>
  <div class="mb-20">
    <Header title="Admin" bgImage="admin header.png" position="right" />

    <div class="flex flex-col mt-15 mb-10">
      <div class="flex gap-4 justify-center mb-4">
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
      
      <!-- Conditional Add Staff Button -->
      <div class="flex justify-end">
        <button 
          v-if="activeTab === 'kitchen'"
          @click="showAddStaffModal('kitchen')" 
          class="px-4 py-2 md:py-3 btn"
        >
          Add Kitchen Staff
        </button>
        
        <button 
          v-if="activeTab === 'delivery'"
          @click="showAddStaffModal('delivery')" 
          class="px-4 py-2 md:py-3 btn"
        >
          Add Delivery Staff
        </button>
      </div>
    </div>

    <div class="bg-white p-6">
      <!-- Users Tab Content -->
      <div v-if="activeTab === 'users'">
        <users-table :users="users" />
      </div>
      
      <!-- Kitchen Staff Tab Content -->
      <div v-if="activeTab === 'kitchen'">
        <users-table :users="chefs" />
      </div>
      
      <!-- Delivery Staff Tab Content -->
      <div v-if="activeTab === 'delivery'">
        <users-table :users="drivers" />
      </div>
    </div>

    <!-- Add Staff Form -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-5 w-full max-w-3xl shadow-lg border border-gray-300">
        <h2 class="text-lg font-medium mb-3">Add {{ staffRoleText }}</h2>
        
        <div v-if="modalError" class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
          {{ modalError }}
        </div>
        
        <div class="space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput
              label="Full Name"
              v-model="staffForm.displayName"
              iconType="user"
              placeholder="User Name"
              class="custom-form-input"
            />      
            <FormInput
              label="Email"
              v-model="staffForm.email"
              iconType="email"
              inputType="email"
              placeholder="staff@example.com"
              class="custom-form-input"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput
              label="Password"
              v-model="staffForm.password"
              iconType="password"
              :inputType="showPassword ? 'text' : 'password'"
              placeholder="********"
              :isPassword="true"
              @toggle-password="showPassword = !showPassword"
              class="custom-form-input"
            />
            
            <FormInput
              label="Phone"
              v-model="staffForm.phone"
              iconType="phone"
              inputType="tel"
              placeholder="+1 234 567 8900"
              class="custom-form-input"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput
              label="Address"
              v-model="staffForm.address"
              iconType="address"
              placeholder="123 Main St"
              class="custom-form-input"
            />
            
            <FormInput
              label="City"
              v-model="staffForm.city"
              iconType="address"
              placeholder="Cairo"
              class="custom-form-input"
            />
          </div>
        </div>
        
        <div class="mt-5 flex justify-end space-x-3">
          <button 
            @click="closeModal" 
            class="btn-outline py-3 px-7"
          >
            Cancel
          </button>
          <button 
            @click="addStaffAccount" 
            :disabled="isAddingStaff"
            class="btn py-3 px-7"
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
import FormInput from "@/components/auth/FormInput.vue";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { createStaffAccount } from "@/firebase/auth";
import Swal from 'sweetalert2'

export default {
  name: "AdminDashboard",
  components: {
    Header,
    TabButton,
    UsersTable,
    FormInput,
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
      showPassword: false,
      staffForm: {
        displayName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
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
    if (this.unsubscribeUsers) this.unsubscribeUsers();
    if (this.unsubscribeChefs) this.unsubscribeChefs();
    if (this.unsubscribeDrivers) this.unsubscribeDrivers();
  },
  methods: {
    setupUsersListeners() {
      try {
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
        address: '',
        city: '',
        role: role
      };
      this.showPassword = false;
      this.modalError = null;
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    async addStaffAccount() {
      this.modalError = null;
      
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
        
        const newUser = await createStaffAccount(
          this.staffForm.email,
          this.staffForm.password,
          this.staffForm.displayName,
          this.staffForm.role,
          this.staffForm.phone
        );

        if (this.staffForm.address || this.staffForm.city) {
          const userRef = doc(db, 'users', newUser.uid);
          
          await updateDoc(userRef, {
            address: {
              street: this.staffForm.address || '',
              city: this.staffForm.city || ''
            }
          });
        }
        
        this.closeModal();

        Swal.fire({
  title: "Created Successfully!",
  icon: "success",
  draggable: true
});
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
