<template>
    <div class="flex flex-col gap-2">
      <div class="text-slate-800 text-xs md:text-sm font-bold font-['Plus Jakarta Sans']">{{ label }}</div>
      <div class="p-2 md:p-3 bg-white rounded-[123px] border border-slate-300 flex items-center gap-2 md:gap-3">
        <img 
          :src="iconSrc"
          :alt="`${label} icon`"
          class="w-4 h-4 md:w-5 md:h-5"
        />
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :type="inputType"
          :placeholder="placeholder"
          class="flex-1 text-sm md:text-base text-slate-600 font-medium font-['Poppins'] bg-transparent outline-none"
        />
        <button v-if="isPassword" type="button" @click="$emit('toggle-password')">
          <img 
            src="@/assets/images/eye.png" 
            alt="Toggle password visibility" 
            class="w-4 h-4 md:w-5 md:h-5"
          />
        </button>
      </div>
    </div>
  </template>

<script>
import emailIcon from '@/assets/images/email.png'
import lockIcon from '@/assets/images/lock.png'
import userIcon from '@/assets/images/user.png'
import eyeIcon from '@/assets/images/eye.png'

export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    iconType: {
      type: String,
      required: true,
      validator: (value) => ['email', 'password', 'user'].includes(value)
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    },
    isPassword: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconSrc() {
      const icons = {
        email: emailIcon,
        password: lockIcon,
        user: userIcon
      }
      return icons[this.iconType]
    },
    passwordToggleIcon() {
      return eyeIcon
    }
  },
  emits: ['update:modelValue', 'toggle-password']
}
</script>