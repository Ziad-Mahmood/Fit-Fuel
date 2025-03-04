<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 md:gap-6">
    <!-- Email Input -->
    <div class="flex flex-col gap-2">
      <div class="text-slate-800 text-xs md:text-sm font-bold font-['Plus Jakarta Sans']">Email Address</div>
      <div class="p-2 md:p-3 bg-white rounded-[123px] border border-slate-300 flex items-center gap-2 md:gap-3">
        <img 
          src="@/assets/images/email.png" 
          alt="Email icon" 
          class="w-4 h-4 md:w-5 md:h-5"
        />
        <input
          v-model="email"
          type="email"
          placeholder="user@gmail.com"
          class="flex-1 text-sm md:text-base text-slate-600 font-medium font-['Poppins'] bg-transparent outline-none"
        />
      </div>
    </div>

    <!-- Password Input -->
    <div class="flex flex-col gap-2">
      <div class="text-slate-800 text-xs md:text-sm font-bold font-['Plus Jakarta Sans']">Password</div>
      <div class="p-2 md:p-3 bg-white rounded-[123px] border border-slate-300 flex items-center gap-2 md:gap-3">
        <img 
          src="@/assets/images/lock.png" 
          alt="Lock icon" 
          class="w-4 h-4 md:w-5 md:h-5"
        />
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="********"
          class="flex-1 text-sm md:text-base text-slate-600 font-medium font-['Plus Jakarta Sans'] bg-transparent outline-none"
        />
        <button type="button">
          <img 
            src="@/assets/images/eye.png" 
            alt="Toggle password visibility" 
            class="w-4 h-4 md:w-5 md:h-5"
          />
        </button>
      </div>
    </div>

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

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full bg-[#339E3F] text-white py-2 md:py-3 rounded-full hover:bg-[#2b843a] transition-colors text-sm md:text-base"
    >
      Sign In
    </button>

    <!-- Register Link -->
    <p class="text-center text-xs md:text-sm text-slate-600 font-['Plus Jakarta Sans']">
      Don't have an account? 
      <router-link to="/register" class="text-[#339E3F] hover:text-[#2b843a]">Sign Up</router-link>
    </p>
  </form>
</template>
<script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        email: '',
        password: '',
        showPassword: false,
      }
    },
  }
</script>