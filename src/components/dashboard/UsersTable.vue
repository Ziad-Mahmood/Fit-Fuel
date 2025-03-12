<template>
  <div class="overflow-x-auto">
    <div class="w-[100%] lg:w-[80%] m-auto">
      <!-- Header -->
      <div class="grid grid-cols-8 text-gray-800 mb-5 text-center">
        <div class="py-4 font-medium">User ID</div>
        <div class="py-4 font-medium">Name</div>
        <div class="py-4 font-medium">Phone Number</div>
        <div class="py-4 font-medium">Email</div>
        <div class="py-4 font-medium">Address</div>
        <div class="py-4 font-medium">City</div>
        <div class="py-4 font-medium">Status</div>
        <div class="py-4 font-medium">Actions</div>
      </div>

      <!-- Rows -->
      <div
        v-for="user in users"
        :key="user.id"
        class="grid grid-cols-8 text-gray-700 border-b border-gray-300 text-center items-center"
      >
        <div class="py-4 break-words">#{{ user.id }}</div>
        <div class="py-4 break-words">{{ user.name }}</div>
        <div class="py-4 break-words">{{ user.phone }}</div>
        <div class="py-4 break-words">{{ user.email }}</div>
        <div class="py-4 break-words">
          {{ user.address || "No Address" }}
        </div>
        <div class="py-4 break-words">{{ user.city }}</div>
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
        <div class="py-4 flex justify-center gap-2">
          <!-- Staff Actions -->
          <template v-if="isStaff">
            <button
              @click="toggleWarn(user)"
              class="bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 px-2 py-1 text-sm"
            >
              {{ user.warned ? 'Remove Warning' : 'Warn' }}
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
              {{ user.banned ? 'Unban' : 'Ban' }}
            </button>
            <button
              @click="deleteUser(user)"
              class=" bg-red-500 text-white rounded hover:bg-red-600 px-2 py-1 text-sm"
            >
              Delete
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">{{ confirmationMessage }}</h3>
        <div class="flex justify-end gap-4">
          <button @click="showConfirmModal = false" class="border border-gray-300 rounded hover:bg-gray-100 px-4 py-2">
            Cancel
          </button>
          <button @click="confirmAction" class=" bg-red-500 text-white rounded hover:bg-red-600 px-4 py-2">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import Swal from 'sweetalert2'

export default {
  name: "UsersTable",
  props: {
    users: {
      type: Array,
      required: true,
    },
    isStaff: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showConfirmModal: false,
      confirmationMessage: '',
      pendingAction: null,
      pendingUser: null
    }
  },
  methods: {
    async toggleWarn(user) {
      this.confirmationMessage = `Are you sure you want to ${user.warned ? 'remove warning from' : 'warn'} ${user.name}?`
      this.pendingAction = 'warn'
      this.pendingUser = user
      this.showConfirmModal = true
    },

    async removeStaff(user) {
      this.confirmationMessage = `Are you sure you want to remove ${user.name}?`
      this.pendingAction = 'remove'
      this.pendingUser = user
      this.showConfirmModal = true
    },

    async toggleBan(user) {
      this.confirmationMessage = `Are you sure you want to ${user.banned ? 'unban' : 'ban'} ${user.name}?`
      this.pendingAction = 'ban'
      this.pendingUser = user
      this.showConfirmModal = true
    },

    async deleteUser(user) {
      this.confirmationMessage = `Are you sure you want to delete ${user.name}?`
      this.pendingAction = 'delete'
      this.pendingUser = user
      this.showConfirmModal = true
    },

    async confirmAction() {
      try {
        const userRef = doc(db, 'users', this.pendingUser.id)
        
        switch (this.pendingAction) {
          case 'warn':
            await updateDoc(userRef, {
              warned: !this.pendingUser.warned,
              warnedAt: !this.pendingUser.warned ? new Date().toISOString() : null
            })
            Swal.fire({
              title: this.pendingUser.warned ? 'Warning Removed' : 'Warning Issued',
              text: `Staff member has been ${this.pendingUser.warned ? 'cleared' : 'warned'}`,
              icon: this.pendingUser.warned ? 'success' : 'warning'
            })
            break

          case 'remove':
            await deleteDoc(userRef)
            Swal.fire({
              title: 'Removed',
              text: 'Staff member has been removed',
              icon: 'success'
            })
            break

          case 'ban':
            await updateDoc(userRef, {
              banned: !this.pendingUser.banned,
              bannedAt: this.pendingUser.banned ? null : new Date().toISOString()
            })
            Swal.fire({
              title: this.pendingUser.banned ? 'Unbanned' : 'Banned',
              text: `User has been ${this.pendingUser.banned ? 'unbanned' : 'banned'}`,
              icon: 'success'
            })
            break

          case 'delete':
            await deleteDoc(userRef)
            Swal.fire({
              title: 'Deleted',
              text: 'User has been deleted',
              icon: 'success'
            })
            break
        }
      } catch (error) {
        console.error('Error performing action:', error)
        Swal.fire({
          title: 'Error',
          text: 'Failed to perform action',
          icon: 'error'
        })
      } finally {
        this.showConfirmModal = false
        this.pendingAction = null
        this.pendingUser = null
      }
    }
  }
}
</script>

