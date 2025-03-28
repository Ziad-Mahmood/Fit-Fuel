import authStore from '@/store/auth'
import { db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const getUserHomeRoute = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard/admin'
    case 'kitchen':
      return '/dashboard/kitchen'
    case 'delivery':
      return '/dashboard/delivery'
    default:
      return '/'
  }
}

export const requireAuth = (to, from, next) => {
  if (authStore.state.isLoading) {
    const waitForAuth = setInterval(() => {
      if (!authStore.state.isLoading) {
        clearInterval(waitForAuth)
        checkAuth()
      }
    }, 100)
  } else {
    checkAuth()
  }

  function checkAuth() {
    if (authStore.isAuthenticated()) {
      next()
    } else {
      next({
        path: '/403',
        query: { redirect: to.fullPath }
      })
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
      const waitForAuth = setInterval(() => {
        if (!authStore.state.isLoading) {
          clearInterval(waitForAuth)
          checkUserRole()
        }
      }, 100)
    } else {
      checkUserRole()
    }

    async function checkUserRole() {
      if (!authStore.isAuthenticated()) {
        next({
          path: '/403',
          query: { redirect: to.fullPath }
        })
        return
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', authStore.state.user.uid))
        const userData = userDoc.data()
        
        if (!userData || !allowedRoles.includes(userData.role)) {
          if (userData && ['admin', 'kitchen', 'delivery'].includes(userData.role)) {
            next({
              path: '/dashboard',
              query: { redirect: to.fullPath }
            })
          } else {
            next({
              path: '/403',
              query: { redirect: to.fullPath }
            })
          }
        } else {
          next()
        }
      } catch (error) {
        console.error('Error checking user role:', error)
        next({
          path: '/403',
          query: { redirect: to.fullPath }
        })
      }
    }
  }
}

export const restrictStaffToTheirPages = (to, from, next) => {
  if (authStore.state.isLoading) {
    const waitForAuth = setInterval(() => {
      if (!authStore.state.isLoading) {
        clearInterval(waitForAuth)
        checkUserAccess()
      }
    }, 100)
  } else {
    checkUserAccess()
  }

  async function checkUserAccess() {
    if (!authStore.isAuthenticated()) {
      next()
      return
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', authStore.state.user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const role = userData.role
        
        if (['admin', 'kitchen', 'delivery'].includes(role)) {
          const allowedPaths = [
            '/dashboard', 
            '/dashboard/admin', 
            '/dashboard/kitchen', 
            '/dashboard/delivery',
            '/403',
            '/login'
          ]
          
          if (!allowedPaths.some(path => to.path.startsWith(path))) {
            next({
              path: '/403',
              query: { redirect: to.fullPath }
            })
            return
          }
        }
      }
      next()
    } catch (error) {
      console.error('Error checking user role:', error)
      next()
    }
  }
}