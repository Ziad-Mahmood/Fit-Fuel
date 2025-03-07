import { ref, computed } from 'vue';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const user = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Initialize auth state listener
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
  isLoading.value = false;
});

export const useAuth = () => {
  const isAuthenticated = computed(() => user.value !== null);
  
  const setError = (errorMessage) => {
    error.value = errorMessage;
    setTimeout(() => {
      error.value = null;
    }, 5000);
  };
  
  const clearError = () => {
    error.value = null;
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    setError,
    clearError
  };
};