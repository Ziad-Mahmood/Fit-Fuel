<template>
  <form @submit.prevent="sendEmail" class="flex flex-col gap-6">
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
    <div v-if="formStatus.message" :class="['text-center p-2 rounded', formStatus.success ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100']">
      {{ formStatus.message }}
    </div>
    <button 
      type="submit" 
      class="w-full py-2 md:py-3 btn"
      :disabled="submitting"
    >
      {{ submitting ? 'Sending...' : 'Send Message' }}
    </button>
  </form>
</template>


<script>
import FormInput from '@/components/auth/FormInput.vue'
import emailjs from '@emailjs/browser';

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
      },
      submitting: false,
      formStatus: {
        success: false,
        message: ''
      }
    }
  },
  methods: {
    validateForm() {
      if (!this.formData.name.trim()) {
        this.formStatus.success = false;
        this.formStatus.message = 'Please enter your name';
        return false;
      }
      
      if (!this.formData.email.trim()) {
        this.formStatus.success = false;
        this.formStatus.message = 'Please enter your email';
        return false;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.formStatus.success = false;
        this.formStatus.message = 'Please enter a valid email address';
        return false;
      }
      
      if (!this.formData.message.trim()) {
        this.formStatus.success = false;
        this.formStatus.message = 'Please enter your message';
        return false;
      }
      
      return true;
    },
    async sendEmail() {
      // Reset status
      this.formStatus.message = '';
      
      // Validate form
      if (!this.validateForm()) {
        return;
      }
      
      this.submitting = true;
      
      try {
        // Prepare template parameters
        const templateParams = {
          from_name: this.formData.name,
          from_email: this.formData.email,
          message: this.formData.message
        };
        
        await emailjs.send(
          'service_p7anetg', 
          'template_oyt1wk6',
          templateParams,
          'HXxNbVMZmtd9w_CJ5'
        );
        
        // Success message
        this.formStatus.success = true;
        this.formStatus.message = 'Your message has been sent successfully!';
        
        // Reset form after successful submission
        this.formData.name = '';
        this.formData.email = '';
        this.formData.message = '';
      } catch (error) {
        console.error('Error sending email:', error);
        this.formStatus.success = false;
        this.formStatus.message = 'Failed to send message. Please try again later.';
      } finally {
        this.submitting = false;
      }
    }
  }
}
</script>