<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          v-model="formData.firstName"
          label="First Name"
          icon-type="user"
        />
  
        <FormInput
          v-model="formData.lastName"
          label="Last Name"
          icon-type="user"
        />
  
        <FormInput
          v-model="formData.email"
          label="Email Address"
          icon-type="email"
          input-type="email"
        />
  
        <FormInput
          v-model="formData.phone"
          label="Phone Number"
          icon-type="phone"

        />
      </div>
  
      <FormInput
        v-model="formData.address"
        label="Address"
        icon-type="address"
      />
  
      <div class="flex gap-4 mt-4">
        
        <button type="submit" class="w-full py-2 md:py-3 btn">Save Changes</button>
        <button 
          type="button"
          class="px-6 py-2 border border-slate-300 rounded-full text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </template>
  
  <script>
  import FormInput from '@/components/auth/FormInput.vue'
  
  export default {
    name: 'ProfileForm',
    components: {
      FormInput,
      
    },
    data() {
      return {
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: ''
        }
      }
    },
  }
  </script>