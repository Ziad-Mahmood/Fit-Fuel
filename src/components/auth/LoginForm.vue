<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 md:gap-6">
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {{ error }}
    </div>

    <FormInput 
      v-model="email" 
      label="Email Address" 
      icon-type="email" 
      placeholder="user@gmail.com"
      input-type="email" />

    <FormInput 
      v-model="password" 
      label="Password" 
      icon-type="password" 
      placeholder="********"
      :input-type="showPassword ? 'text' : 'password'" 
      is-password 
      @toggle-password="showPassword = !showPassword" />

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <input 
          v-model="rememberMe" 
          type="checkbox"
          class="h-3 w-3 md:h-4 md:w-4 text-[#339E3F] border-slate-300 rounded focus:ring-[#339E3F]" />
        <label class="text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">Remember me</label>
      </div>
      <a href="#" @click.prevent="handleForgotPassword"
        class="text-xs md:text-sm text-[#339E3F] hover:text-[#2b843a] font-['Plus Jakarta Sans']">Forgot Password?</a>
    </div>

    <button type="submit" :disabled="isLoading" class="w-full py-2 md:py-3 btn">
      <span v-if="isLoading">
        <i class="fas fa-circle-notch fa-spin mr-2"></i>Signing In...
      </span>
      <span v-else>Sign In</span>
    </button>

    <div class="relative flex items-center justify-center w-full my-2">
      <hr class="w-full border-t border-gray-300" />
      <span class="px-2 text-xs md:text-sm text-gray-500 bg-white">OR</span>
      <hr class="w-full border-t border-gray-300" />
    </div>

    <button type="button" @click="handleGoogleSignIn"
      class="w-full flex justify-center items-center gap-2 py-2 md:py-3 border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50">
      <img src="@/assets/images/google.png" alt="Google" class="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>

    <p class="text-center text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">
      Don't have an account?
      <router-link to="/register" class="text-[#339E3F] hover:text-[#2b843a]">Sign Up</router-link>
    </p>
  </form>
</template>

<script>
import FormInput from '@/components/auth/FormInput.vue'
import { loginWithEmail, loginWithGoogle, resetPassword, getUserHomeRoute } from '@/firebase/auth'

export default {
  name: 'LoginForm',
  components: {
    FormInput,
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      isLoading: false,
      error: null
    }
  },
  methods: {
    setError(message) {
      this.error = message
      setTimeout(() => {
        this.error = null
      }, 5000)
    },

    clearError() {
      this.error = null
    },

    redirectBasedOnRole() {
      const userRole = localStorage.getItem('userRole') || 'client'
      const homeRoute = getUserHomeRoute(userRole)
      this.$router.push(homeRoute)
    },

    async handleSubmit() {
      this.clearError()

      if (!this.email || !this.password) {
        this.setError('Please enter both email and password')
        return
      }

      try {
        this.isLoading = true
        await loginWithEmail(this.email, this.password)
        this.redirectBasedOnRole()
      } catch (error) {
        let errorMessage = 'Failed to sign in'

        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid email or password'
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many failed login attempts. Please try again later'
        }

        this.setError(errorMessage)
      } finally {
        this.isLoading = false
      }
    },

    async handleGoogleSignIn() {
      this.clearError()

      try {
        this.isLoading = true
        await loginWithGoogle()
        this.redirectBasedOnRole()
      } catch (error) {
        this.setError('Failed to sign in with Google')
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async handleForgotPassword() {
      if (!this.email) {
        this.setError('Please enter your email address')
        return
      }

      try {
        await resetPassword(this.email)
        alert('Password reset email sent. Please check your inbox.')
      } catch (error) {
        this.setError('Failed to send password reset email')
      }
    }
  }
}  
</script>