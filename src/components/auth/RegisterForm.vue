<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 md:gap-6">
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

    <FormButton type="submit">Sign Up</FormButton>

    <p class="text-center text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">
      Already have an account? 
      <router-link to="/login" class="text-[#339E3F] hover:text-[#2b843a]">Login</router-link>
    </p>
  </form>
</template>

<script>
import FormInput from '@/components/auth/FormInput.vue'
import FormButton from '@/components/auth/FormButton.vue'

export default {
  name: 'RegisterForm',
  components: {
    FormInput,
    FormButton
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      showPassword: false,
      acceptTerms: false
    }
  }
}
</script>