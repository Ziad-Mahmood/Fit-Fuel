<template>
    <div class="relative pt-[92px]">
      <div 
        class="w-full h-full fixed left-0 top-0 bg-cover bg-center backdrop-blur-md -z-10" 
        :style="{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(5px)'
        }"
      ></div>
      
      <!-- Form Card Container -->
      <div class="relative min-h-[calc(100vh-92px)] flex items-center justify-center p-4">
        <div class="w-[90%] sm:w-[95%] max-w-[1000px] min-h-[550px] bg-white rounded-[10px] border border-[#e9e9e9] flex flex-col md:flex-row overflow-hidden">
          <!-- Left side - Image -->
          <div class="w-full md:w-1/2 h-[200px] md:h-auto">
            <img 
              class="w-full h-full object-cover md:rounded-tl-[10px] md:rounded-bl-[10px]" 
              src="@/assets/images/pasta.jpeg" 
              alt="Healthy Food"
            />
          </div>
          
          <!-- Right side - Form -->
          <div class="w-full md:w-1/2 p-6 md:p-12 relative">
            <div>
              <div class="flex flex-col gap-6 md:gap-10">
                <h2 class="text-[#a9a9a9] text-xl md:text-2xl font-bold font-['Poppins'] mb-6 md:mb-12">Create Account</h2>
                <RegisterForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import RegisterForm from '@/components/auth/RegisterForm.vue'
  import backgroundImage from '@/assets/images/login-background.png'
  
  export default {
    name: 'RegisterView',
    components: {
      RegisterForm
    },
    data() {
      return {
        backgroundImage
      }
    }
  }
  </script>