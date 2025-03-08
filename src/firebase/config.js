import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWRj9o1mSmO6kUpmWNXDAQLtH4C5AjTfY",
  authDomain: "fit-fuel-a552b.firebaseapp.com",
  projectId: "fit-fuel-a552b",
  storageBucket: "fit-fuel-a552b.firebasestorage.app",
  messagingSenderId: "373173305419",
  appId: "1:373173305419:web:a395f8a4070322b6d08dce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
