<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <div v-if="isLoading" class="flex justify-center p-4">
      <div class="w-8 h-8 border-4 border-[#339E3F] border-t-transparent rounded-full animate-spin"></div>
    </div>
    
    <div v-else-if="user" class="flex flex-col items-center">
      <div class="w-20 h-20 rounded-full bg-[#339E3F] flex items-center justify-center text-white text-2xl font-bold mb-4">
        {{ userInitials }}
      </div>
      
      <h3 class="text-xl font-bold">{{ user.displayName || 'User' }}</h3>
      <p class="text-gray-600">{{ user.email }}</p>
      
      <button @click="logout" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Sign Out
      </button>
    </div>
    
    <div v-else class="text-center p-4">
      <p>Please sign in to view your profile</p>
      <router-link to="/login" class="text-[#339E3F] hover:underline">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/store/auth'
import { logoutUser } from '@/firebase/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UserProfile',
  setup() {
    const router = useRouter()
    const { user, isLoading } = useAuth()
    
    const userInitials = computed(() => {
      if (!user.value || !user.value.displayName) return '?'
      
      return user.value.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
    })
    
    const logout = async () => {
      try {
        await logoutUser()
        router.push('/login')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }
    
    return {
      user,
      isLoading,
      userInitials,
      logout
    }
  }
}
</script>