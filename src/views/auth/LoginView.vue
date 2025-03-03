<template>
  <div class="min-h-screen w-screen relative">
    <div 
      class="w-full h-full fixed left-0 top-0 bg-cover bg-center backdrop-blur-md" 
      :style="{ 
        backgroundImage: `url(${backgroundImage})`,
        filter: 'blur(5px)'
      }"
    ></div>
    
    <!-- Form Card Container -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
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
              <h2 class="text-[#a9a9a9] text-xl md:text-2xl font-bold font-['Poppins'] mb-6 md:mb-12">Welcome back</h2>
              <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import LoginForm from '@/components/auth/LoginForm.vue'
  import backgroundImage from '@/assets/images/login-background.png'
  
  export default {
    name: 'LoginView',
    components: {
      LoginForm
    },
    data() {
      return {
        backgroundImage
      }
    }
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto:wght@400;500&display=swap');
  </style>
  
  