import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
  } from 'firebase/auth';
  import { auth, db } from './config'; 
  import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
  

  const DEFAULT_ROLE = 'client';
  
  export const registerWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  export const createStaticUsers = async () => {
    try {
      const adminDoc = await getDoc(doc(db, 'users', 'admin'));
      const kitchenDoc = await getDoc(doc(db, 'users', 'kitchen'));
      const deliveryDoc = await getDoc(doc(db, 'users', 'delivery'));
      
      if (adminDoc.exists() && kitchenDoc.exists() && deliveryDoc.exists()) {
        console.log('Static users already exist');
        return;
      }
      
      if (!adminDoc.exists()) {
        await setDoc(doc(db, 'users', 'admin'), {
          email: 'admin@example.com',
          displayName: 'Administrator',
          role: 'admin',
          password: 'admin123', 
          createdAt: new Date()
        });
        console.log('Admin user created');
      }
      
      if (!kitchenDoc.exists()) {
        await setDoc(doc(db, 'users', 'kitchen'), {
          email: 'kitchen@example.com',
          displayName: 'Kitchen Staff',
          role: 'kitchen',
          password: 'kitchen123', 
          createdAt: new Date()
        });
        console.log('Kitchen user created');
      }
      
      if (!deliveryDoc.exists()) {
        await setDoc(doc(db, 'users', 'delivery'), {
          email: 'delivery@example.com',
          displayName: 'Delivery Staff',
          role: 'delivery',
          password: 'delivery123', 
          createdAt: new Date()
        });
        console.log('Delivery user created');
      }
    } catch (error) {
      console.error('Error creating static users:', error);
    }
  };
  

  export const loginWithEmail = async (email, password) => {
    const staticUsers = [
      { email: 'admin@example.com', role: 'admin', id: 'admin' },
      { email: 'kitchen@example.com', role: 'kitchen', id: 'kitchen' },
      { email: 'delivery@example.com', role: 'delivery', id: 'delivery' }
    ];
    
    const staticUser = staticUsers.find(user => user.email === email);
    
    if (staticUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', staticUser.id));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (userData.password === password) {
            // Set role in localStorage
            localStorage.setItem('userRole', staticUser.role);
            localStorage.setItem('userId', staticUser.id);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userDisplayName', userData.displayName);
            
            return {
              uid: staticUser.id,
              email: email,
              displayName: userData.displayName
            };
          } else {
            throw { code: 'auth/wrong-password' };
          }
        } else {
          throw { code: 'auth/user-not-found' };
        }
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        await fetchUserRole(userCredential.user);
        return userCredential.user;
      } catch (error) {
        throw error;
      }
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
        localStorage.setItem('userDisplayName', user.displayName || '');
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