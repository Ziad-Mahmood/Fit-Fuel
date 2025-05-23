<template>
  <div class="overflow-x-auto">
    <!-- Loading overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-[80%] max-w-4xl">
        <h3 class="text-lg font-medium mb-4">{{ loadingMessage }}</h3>
        
        <!-- Table placeholder -->
        <div class="w-full">
          <!-- Header -->
          <div class="grid grid-cols-8 text-gray-800 mb-5 text-center">
            <div class="py-4 text-sm md:text-base font-medium">User ID</div>
            <div class="py-4 text-sm md:text-base font-medium">Name</div>
            <div class="py-4 text-sm md:text-base font-medium">Phone Number</div>
            <div class="py-4 text-sm md:text-base font-medium">Email</div>
            <div class="py-4 text-sm md:text-base font-medium">Address</div>
            <div class="py-4 text-sm md:text-base font-medium">City</div>
            <div class="py-4 text-sm md:text-base font-medium">Status</div>
            <div class="py-4 text-sm md:text-base font-medium">Actions</div>
          </div>
          
          <!-- Placeholder rows -->
          <div v-for="i in 5" :key="i" class="grid grid-cols-8 text-gray-700 border-b border-gray-300 text-center items-center">
            <div v-for="j in 8" :key="j" class="py-4">
              <div class="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-[100%] lg:w-[80%] m-auto">
      <!-- Header -->
      <div class="grid grid-cols-8 text-gray-800 mb-5 text-center">
        <div class="py-4 text-sm md:text-base font-medium">User ID</div>
        <div class="py-4 text-sm md:text-base font-medium">Name</div>
        <div class="py-4 text-sm md:text-base font-medium">Phone Number</div>
        <div class="py-4 text-sm md:text-base font-medium">Email</div>
        <div class="py-4 text-sm md:text-base font-medium">Address</div>
        <div class="py-4 text-sm md:text-base font-medium">City</div>
        <div class="py-4 text-sm md:text-base font-medium">Status</div>
        <div class="py-4 text-sm md:text-base font-medium">Actions</div>
      </div>

      <!-- Rows -->
      <div
        v-for="user in users"
        :key="user.id"
        class="grid grid-cols-8 text-gray-700 border-b border-gray-300 text-center items-center"
      >
        <div class="py-4 text-sm md:text-base break-words">#{{ user.id.substring(0, 6) }}</div>
        <div class="py-4 text-sm md:text-base break-words">{{ user.name }}</div>
        <div class="py-4 text-sm md:text-base break-words">{{ user.phone }}</div>
        <div class="py-4 text-sm md:text-base break-words">{{ user.email }}</div>
        <div class="py-4 text-sm md:text-base break-words">
          {{ user.address.street || "No Address" }}
        </div>
        <div class="py-4 text-sm md:text-base break-words">{{ user.city }}</div>
        <div class="py-4">
          <span
            v-if="user.warned"
            class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm cursor-pointer"
            @click="toggleWarn(user)"
          >
            Warned
          </span>
          <span
            v-if="user.banned"
            class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm cursor-pointer"
            @click="toggleBan(user)"
          >
            Banned
          </span>
        </div>
        <div class="py-4 flex flex-col md:flex-row justify-center gap-2">
          <!-- Staff Actions -->
          <template v-if="isStaff">
            <button
              @click="editStaff(user)"
              class="bg-blue-500 text-white rounded hover:bg-blue-600 px-2 py-1 text-sm"
            >
              Edit
            </button>
            <button
              @click="toggleWarn(user)"
              class="bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 px-2 py-1 text-sm"
            >
              {{ user.warned ? "Remove Warning" : "Warn" }}
            </button>
            <button
              @click="removeStaff(user)"
              class="bg-red-500 text-white rounded hover:bg-red-600 px-2 py-1 text-sm"
            >
              Remove
            </button>
          </template>

          <!-- Client Actions -->
          <template v-else>
            <button
              @click="toggleBan(user)"
              class="bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 px-2 py-1 text-sm"
            >
              {{ user.banned ? "Unban" : "Ban" }}
            </button>
            <button
              @click="deleteUser(user)"
              class="bg-red-500 text-white rounded hover:bg-red-600 px-2 py-1 text-sm"
            >
              Delete
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">{{ confirmationMessage }}</h3>
        <div class="flex justify-end gap-4">
          <button
            @click="showConfirmModal = false"
            class="border border-gray-300 rounded hover:bg-gray-100 px-4 py-2"
          >
            Cancel
          </button>
          <button
            @click="confirmAction"
            class="bg-red-500 text-white rounded hover:bg-red-600 px-4 py-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Edit Staff Member</h3>
        <form @submit.prevent="updateStaff" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="editForm.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              v-model="editForm.password"
              type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Leave empty to keep current password"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              v-model="editForm.phone"
              type="tel"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Address</label
            >
            <input
              v-model="editForm.address"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">City</label>
            <input
              v-model="editForm.city"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="showEditModal = false"
              class="border border-gray-300 rounded hover:bg-gray-100 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white rounded hover:bg-blue-600 px-4 py-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";

export default {
  name: "UsersTable",
  props: {
    users: {
      type: Array,
      required: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showConfirmModal: false,
      showEditModal: false,
      confirmationMessage: "",
      pendingAction: null,
      pendingUser: null,
      loading: false,
      loadingMessage: "Processing...",
      editForm: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        password: "",
      },
    };
  },
  methods: {
    async toggleWarn(user) {
      this.confirmationMessage = `Are you sure you want to ${
        user.warned ? "remove warning from" : "warn"
      } ${user.name}?`;
      this.pendingAction = "warn";
      this.pendingUser = user;
      this.showConfirmModal = true;
    },

    async removeStaff(user) {
      this.confirmationMessage = `Are you sure you want to remove ${user.name}?`;
      this.pendingAction = "remove";
      this.pendingUser = user;
      this.showConfirmModal = true;
    },

    async toggleBan(user) {
      this.confirmationMessage = `Are you sure you want to ${
        user.banned ? "unban" : "ban"
      } ${user.name}?`;
      this.pendingAction = "ban";
      this.pendingUser = user;
      this.showConfirmModal = true;
    },

    async deleteUser(user) {
      this.confirmationMessage = `Are you sure you want to delete ${user.name}?`;
      this.pendingAction = "delete";
      this.pendingUser = user;
      this.showConfirmModal = true;
    },

    async confirmAction() {
      this.loading = true;
      this.loadingMessage = `Processing ${this.pendingAction} action...`;
      
      try {
        const userRef = doc(db, "users", this.pendingUser.id);

        if (this.pendingAction === "warn") {
          await updateDoc(userRef, {
            warned: !this.pendingUser.warned,
            warnedAt: !this.pendingUser.warned
              ? new Date().toISOString()
              : null,
          });
          Swal.fire({
            title: this.pendingUser.warned
              ? "Warning Removed"
              : "Warning Issued",
            text: `Staff member has been ${
              this.pendingUser.warned ? "cleared" : "warned"
            }`,
            icon: this.pendingUser.warned ? "success" : "warning",
          });
        } else if (this.pendingAction === "remove") {
          await deleteDoc(userRef);
          Swal.fire({
            title: "Removed",
            text: "Staff member has been removed",
            icon: "success",
          });
        } else if (this.pendingAction === "ban") {
          await updateDoc(userRef, {
            banned: !this.pendingUser.banned,
            bannedAt: this.pendingUser.banned ? null : new Date().toISOString(),
          });
          Swal.fire({
            title: this.pendingUser.banned ? "Unbanned" : "Banned",
            text: `User has been ${
              this.pendingUser.banned ? "unbanned" : "banned"
            }`,
            icon: "success",
          });
        } else if (this.pendingAction === "delete") {
          await deleteDoc(userRef);
          Swal.fire({
            title: "Deleted",
            text: "User has been deleted",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error performing action:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to perform action",
          icon: "error",
        });
      } finally {
        this.loading = false;
        this.showConfirmModal = false;
        this.pendingAction = null;
        this.pendingUser = null;
      }
    },
    
    editStaff(user) {
      this.editForm = {
        id: user.id,
        name: user.name || user.displayName,
        email: user.email,
        phone: user.phone,
        address: user.address?.street || user.address,
        city: user.address?.city || user.city,
        password: "",
      };
      this.showEditModal = true;
    },

    async updateStaff() {
      this.loading = true;
      this.loadingMessage = "Updating staff member...";
      
      try {
        const userRef = doc(db, "users", this.editForm.id);
        const updateData = {
          displayName: this.editForm.name,
          email: this.editForm.email,
          phone: this.editForm.phone,
          address: {
            street: this.editForm.address || "",
            city: this.editForm.city || "",
          },
          updatedAt: new Date().toISOString(),
        };

        if (this.editForm.password) {
          updateData.password = this.editForm.password;
        }

        await updateDoc(userRef, updateData);

        Swal.fire({
          title: "Success",
          text: "Staff member has been updated successfully",
          icon: "success",
        });

        this.showEditModal = false;
        document.body.classList.remove("modal-open");
      } catch (error) {
        console.error("Error updating staff:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "Failed to update staff member",
          icon: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.fixed {
  background: none !important;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
