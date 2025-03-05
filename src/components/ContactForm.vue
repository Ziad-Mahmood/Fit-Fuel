<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
    <FormInput
      v-model="formData.name"
      label="Name"
      icon-type="user"
      placeholder="Your Name"
    />

    <FormInput
      v-model="formData.email"
      label="Email"
      icon-type="email"
      placeholder="your@email.com"
      input-type="email"
    />

    <!-- Message Input -->
    <div class="flex flex-col gap-2">
      <label class="text-slate-800 text-xs md:text-sm font-bold font-['Plus Jakarta Sans']">Message</label>
      <textarea
        v-model="formData.message"
        rows="4"
        placeholder="Your message..."
        class="p-3 bg-white rounded-[20px] border border-slate-300 outline-none focus:border-[#339E3F] resize-none text-sm md:text-base text-slate-600 font-medium font-['Poppins']"
      ></textarea>
    </div>

    <button type="submit" class="w-full py-2 md:py-3 btn">Send Message</button>
  </form>
</template>

<script>
import FormInput from '@/components/auth/FormInput.vue'


export default {
  name: 'ContactForm',
  components: {
    FormInput,
   
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
}
</script>