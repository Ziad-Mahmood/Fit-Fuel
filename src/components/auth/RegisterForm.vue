<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 md:gap-6">
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {{ error }}
    </div>
    
    <FormInput
      v-model="fullName"
      label="Full Name"
      icon-type="user"
      placeholder="User Name"
    />

    <FormInput
      v-model="email"
      label="Email Address"
      icon-type="email"
      placeholder="user@gmail.com"
      input-type="email"
    />

    <FormInput
      v-model="password"
      label="Password"
      icon-type="password"
      placeholder="********"
      :input-type="showPassword ? 'text' : 'password'"
      is-password
      @toggle-password="showPassword = !showPassword"
    />

    <!-- Terms and Conditions -->
    <div class="flex items-center gap-2">
      <input
        v-model="acceptTerms"
        type="checkbox"
        class="h-3 w-3 md:h-4 md:w-4 text-[#339E3F] border-slate-300 rounded focus:ring-[#339E3F]"
      />
      <label class="text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">
        I agree to the <a href="#" class="text-[#339E3F] hover:text-[#2b843a]">Terms & Conditions</a>
      </label>
    </div>
    
    <button type="submit" :disabled="isLoading" class="w-full py-2 md:py-3 btn">
      {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
    </button>
    
    <div class="relative flex items-center justify-center w-full my-2">
      <hr class="w-full border-t border-gray-300" />
      <span class="px-2 text-xs md:text-sm text-gray-500 bg-white">OR</span>
      <hr class="w-full border-t border-gray-300" />
    </div>
    
    <button 
      type="button" 
      @click="handleGoogleSignUp" 
      class="w-full flex justify-center items-center gap-2 py-2 md:py-3 border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50"
    >
      <img src="@/assets/images/google.png" alt="Google" class="w-5 h-5" />
      <span>Sign up with Google</span>
    </button>
    
    <p class="text-center text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">
      Already have an account? 
      <router-link to="/login" class="text-[#339E3F] hover:text-[#2b843a]">Login</router-link>
    </p>
  </form>
</template>

<script>
import FormInput from '@/components/auth/FormInput.vue'
import { registerWithEmail, loginWithGoogle } from '@/firebase/auth'
import { useAuth } from '@/store/auth'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterForm',
  components: {
    FormInput,
  },
  setup() {
    const router = useRouter()
    const { error, setError, clearError } = useAuth()
    
    return { 
      error, 
      setError, 
      clearError,
      router
    }
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      showPassword: false,
      acceptTerms: false,
      isLoading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.clearError()
      
      if (!this.fullName || !this.email || !this.password) {
        this.setError('Please fill in all fields')
        return
      }
      
      if (!this.acceptTerms) {
        this.setError('Please accept the Terms & Conditions')
        return
      }
      
      if (this.password.length < 6) {
        this.setError('Password must be at least 6 characters')
        return
      }
      
      try {
        this.isLoading = true
        const user = await registerWithEmail(this.email, this.password)
        
        // Update the user profile with the full name
        await updateProfile(auth.currentUser, {
          displayName: this.fullName
        })
        
        this.router.push('/')
      } catch (error) {
        let errorMessage = 'Failed to create account'
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use'
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address'
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak'
        }
        
        this.setError(errorMessage)
      } finally {
        this.isLoading = false
      }
    },
    
    async handleGoogleSignUp() {
      this.clearError()
      
      if (!this.acceptTerms) {
        this.setError('Please accept the Terms & Conditions')
        return
      }
      
      try {
        this.isLoading = true
        await loginWithGoogle()
        this.router.push('/')
      } catch (error) {
        this.setError('Failed to sign up with Google')
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
