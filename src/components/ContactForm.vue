<template>
  <form
    @submit.prevent="sendEmail"
    class="flex flex-col gap-6"
    :dir="isRTL ? 'rtl' : 'ltr'"
  >
    <FormInput
      v-model="formData.name"
      :label="$t('contact.name')"
      icon-type="user"
      :placeholder="$t('contact.placeholder.name')"
      :class="{ 'text-right': isRTL }"
    />
    <FormInput
      v-model="formData.email"
      :label="$t('contact.email')"
      icon-type="email"
      :placeholder="$t('contact.placeholder.email')"
      input-type="email"
      :class="{ 'text-right': isRTL }"
    />
    <!-- Message Input -->
    <div class="flex flex-col gap-2">
      <label
        class="text-slate-800 text-xs md:text-sm font-bold font-['Plus Jakarta Sans']"
        :class="{ 'text-right': isRTL }"
      >
        {{ $t("contact.message") }}
      </label>
      <textarea
        v-model="formData.message"
        rows="4"
        :placeholder="$t('contact.placeholder.message')"
        class="p-3 bg-white rounded-[20px] border border-slate-300 outline-none focus:border-[#339E3F] resize-none text-sm md:text-base text-slate-600 font-medium font-['Poppins']"
        :class="{ 'text-right': isRTL }"
      ></textarea>
    </div>
    <div
      v-if="formStatus.message"
      :class="[
        'text-center p-2 rounded',
        formStatus.success
          ? 'text-green-600 bg-green-100'
          : 'text-red-600 bg-red-100',
        { 'text-right': isRTL },
      ]"
    >
      {{ formStatus.message }}
    </div>
    <button
      type="submit"
      class="w-full py-2 md:py-3 btn"
      :disabled="submitting"
    >
      {{
        submitting ? $t("contact.button.sending") : $t("contact.button.send")
      }}
    </button>
  </form>
</template>

<script>
import FormInput from "@/components/auth/FormInput.vue";
import emailjs from "@emailjs/browser";

export default {
  name: "ContactForm",
  components: {
    FormInput,
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar';
    }
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      submitting: false,
      formStatus: {
        success: false,
        message: "",
      },
    };
  },
  methods: {
    validateForm() {
      if (!this.formData.name.trim()) {
        this.formStatus.success = false;
        this.formStatus.message = this.$t("contact.errors.name");
        return false;
      }

      if (!this.formData.email.trim()) {
        this.formStatus.success = false;
        this.formStatus.message = this.$t("contact.errors.email");
        return false;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.formStatus.success = false;
        this.formStatus.message = this.$t("contact.errors.email_invalid");
        return false;
      }

      if (!this.formData.message.trim()) {
        this.formStatus.success = false;
        this.formStatus.message = this.$t("contact.errors.message");
        return false;
      }

      return true;
    },
    async sendEmail() {
      // Reset status
      this.formStatus.message = "";

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
          message: this.formData.message,
        };

        await emailjs.send(
          "service_p7anetg",
          "template_oyt1wk6",
          templateParams,
          "HXxNbVMZmtd9w_CJ5"
        );

        // Success message
        this.formStatus.success = true;
        this.formStatus.message = this.$t("contact.status.success");

        // Reset form after successful submission
        this.formData.name = "";
        this.formData.email = "";
        this.formData.message = "";
      } catch (error) {
        console.error("Error sending email:", error);
        this.formStatus.success = false;
        this.formStatus.message = this.$t("contact.status.error");
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
