<template>
    <div class="relative pt-[92px]">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
          <!-- Profile Header -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex items-center gap-6">
              <div class="w-24 h-24 rounded-full overflow-hidden">
                <img 
                  src="@/assets/images/home-coustomer.png" 
                  alt="Profile Picture"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-slate-800 mb-2">Nagham</h1>
                <p class="text-slate-600">nagham@gmail.com</p>
              </div>
            </div>
          </div>
  
          <!-- Profile Form -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-slate-800 mb-6">Personal Information</h2>
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProfileForm from '@/components/ProfileForm.vue'
  
  export default {
    name: 'ProfileView',
    components: {
      ProfileForm
    }
  }
  </script>