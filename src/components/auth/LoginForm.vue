<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 md:gap-6">
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

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <input
          v-model="rememberMe"
          type="checkbox"
          class="h-3 w-3 md:h-4 md:w-4 text-[#339E3F] border-slate-300 rounded focus:ring-[#339E3F]"
        />
        <label class="text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">Remember me</label>
      </div>
      <a href="#" class="text-xs md:text-sm text-[#339E3F] hover:text-[#2b843a] font-['Plus Jakarta Sans']">Forgot Password?</a>
    </div>
    <router-link to="/">
    <button type="submit" class="w-full py-2 md:py-3 btn">Sign In</button>
    </router-link>
    <p class="text-center text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">
      Don't have an account? 
      <router-link to="/register" class="text-[#339E3F] hover:text-[#2b843a]">Sign Up</router-link>
    </p>
  </form>
</template>

<script>
import FormInput from '@/components/auth/FormInput.vue'


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
      rememberMe: false
    }
  }
}
</script>