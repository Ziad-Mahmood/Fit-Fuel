<template>
  <AuthLayout title="Welcome back">
    <LoginForm />
  </AuthLayout>
</template>

<script>
import AuthLayout from './AuthLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    AuthLayout,
    LoginForm
  }
}
</script>