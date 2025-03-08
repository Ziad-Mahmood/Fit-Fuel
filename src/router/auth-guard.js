import authStore from '@/store/auth'

export const requireAuth = (to, from, next) => {
  if (authStore.state.isLoading) {
    const waitForAuth = setInterval(() => {
      if (!authStore.state.isLoading) {
        clearInterval(waitForAuth)
        
        if (authStore.isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      }
    }, 100)
  } else {
    if (authStore.isAuthenticated()) {
      next()
    } else {
      next('/login')
    }
  }
}

export const redirectIfAuthenticated = (to, from, next) => {
  if (authStore.state.isLoading) {
    const waitForAuth = setInterval(() => {
      if (!authStore.state.isLoading) {
        clearInterval(waitForAuth)
        
        if (authStore.isAuthenticated()) {
          next('/')
        } else {
          next()
        }
      }
    }, 100)
  } else {
    if (authStore.isAuthenticated()) {
      next('/')
    } else {
      next()
    }
  }
}
export const requireRole = (allowedRoles) => {
  return (to, from, next) => {
    if (authStore.state.isLoading) {
      // Wait for auth state to be determined
      const waitForAuth = setInterval(() => {
        if (!authStore.state.isLoading) {
          clearInterval(waitForAuth);
          checkUserRole();
        }
      }, 100);
    } else {
      checkUserRole();
    }

    function checkUserRole() {
      if (!authStore.isAuthenticated()) {
        next('/login');
      } else {
        const userRole = localStorage.getItem('userRole');
        
        if (allowedRoles.includes(userRole)) {
          next(); 
        } else {
          const homeRoute = getUserHomeRoute(userRole);
          next(homeRoute);
        }
      }
    }
  };
};