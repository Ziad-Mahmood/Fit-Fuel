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
      <div class="relative min-h-screen flex items-center justify-center">
        <div class="w-[1000px] h-[550px] bg-white rounded-[10px] border border-[#e9e9e9] flex overflow-hidden">
          <!-- Left side - Image -->
          <div class="w-[500px]">
            <img 
              class="w-full h-full object-cover rounded-tl-[10px] rounded-bl-[10px]" 
              src="@/assets/images/pasta.jpeg" 
              alt="Healthy Food"
            />
          </div>
          
          <!-- Right side - Form -->
          <div class="w-[500px] p-12 relative">
            <div>
              <div class="flex flex-col gap-10">
                <h2 class="text-[#a9a9a9] text-2xl font-bold font-['Poppins'] mb-12">Welcome back</h2>
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
  
  