<template>
  <AuthLayout title="Create Account">
    <RegisterForm />
  </AuthLayout>
</template>

<script>
import AuthLayout from './AuthLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
    AuthLayout,
    RegisterForm
  }
}
</script>