import { useAuth } from '@/store/auth'

export const requireAuth = (to, from, next) => {
  const { isAuthenticated, isLoading } = useAuth()
  
  // Wait for auth to initialize
  if (isLoading.value) {
    // You could show a loading screen here
    const unwatch = watch(isLoading, (loading) => {
      if (!loading) {
        unwatch()
        requireAuth(to, from, next)
      }
    })
    return
  }
  
  if (isAuthenticated.value) {
    next()
  } else {
    next('/login')
  }
}

export const redirectIfAuthenticated = (to, from, next) => {
  const { isAuthenticated, isLoading } = useAuth()
  
  // Wait for auth to initialize
  if (isLoading.value) {
    const unwatch = watch(isLoading, (loading) => {
      if (!loading) {
        unwatch()
        redirectIfAuthenticated(to, from, next)
      }
    })
    return
  }
  
  if (isAuthenticated.value) {
    next('/')
  } else {
    next()
  }
}