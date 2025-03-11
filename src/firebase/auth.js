import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  updateProfile
} from 'firebase/auth';
import { auth, db } from './config'; 
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';

const DEFAULT_ROLE = 'client';

export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserRole(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const fetchUserRole = async (user) => {
  if (!user) return null;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      localStorage.setItem('userRole', userData.role || DEFAULT_ROLE);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userDisplayName', user.displayName || userData.displayName || '');
      return userData.role || DEFAULT_ROLE;
    } else {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || '',
        role: DEFAULT_ROLE,
        createdAt: new Date()
      });
      localStorage.setItem('userRole', DEFAULT_ROLE);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userDisplayName', user.displayName || '');
      return DEFAULT_ROLE;
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    return DEFAULT_ROLE;
  }
};

export const createStaffAccount = async (email, password, displayName, role, phoneNumber = '', address = '', city = '') => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw { code: 'auth/email-already-in-use' };
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, {
      displayName: displayName
    });
    
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      displayName: displayName,
      role: role,
      phone: phoneNumber,
      address: {
        street: address || '',
        city: city || ''
      },
      createdAt: new Date()
    });
    
    await signOut(auth);
    
    return {
      uid: user.uid,
      email: email,
      displayName: displayName,
      role: role
    };
  } catch (error) {
    throw error;
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await fetchUserRole(result.user);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Logout user
export const logoutUser = async () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userDisplayName');
  return signOut(auth);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Get user's home route based on role
export const getUserHomeRoute = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'kitchen':
      return '/dashboard/kitchen';
    case 'delivery':
      return '/dashboard/delivery';
    case 'client':
    default:
      return '/';
  }
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: newRole
    });
    return true;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export const createAdminAccount = async (email, password, displayName = 'Administrator') => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("role", "==", "admin"));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw { code: 'admin/already-exists', message: 'An admin account already exists' };
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, {
      displayName: displayName
    });
    
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      displayName: displayName,
      role: 'admin',
      createdAt: new Date()
    });
    
    return {
      uid: user.uid,
      email: email,
      displayName: displayName,
      role: 'admin'
    };
  } catch (error) {
    throw error;
  }
};