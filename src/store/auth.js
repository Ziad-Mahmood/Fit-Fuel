import { reactive } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const state = reactive({
  user: null,
  userRole: null,
  isLoading: true
});

onAuthStateChanged(auth, async (user) => {
  state.isLoading = true;
  
  if (user) {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists() && userDoc.data().banned) {
      await signOut(auth);
      alert('Your account has been banned. Please contact support for more information.');
      state.user = null;
      state.userRole = null;
      return;
    }
    
    state.user = user;
    state.userRole = localStorage.getItem('userRole') || 'client';
  } else {
    state.user = null;
    state.userRole = null;
    
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');
    const userDisplayName = localStorage.getItem('userDisplayName');
    
    if (userId && userRole) {
      state.user = {
        uid: userId,
        email: userEmail,
        displayName: userDisplayName
      };
      state.userRole = userRole;
    }
  }
  
  state.isLoading = false;
});

export default {
  state,
  
  isAuthenticated() {
    return !!state.user;
  },
  
  getUserRole() {
    return state.userRole;
  },
  
  getUser() {
    return state.user;
  },
  
  isAdmin() {
    return state.userRole === 'admin';
  },
  
  isKitchen() {
    return state.userRole === 'kitchen';
  },
  
  isDelivery() {
    return state.userRole === 'delivery';
  },
  
  isClient() {
    return state.userRole === 'client';
  }
};