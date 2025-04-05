import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (replace with your actual env vars)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore instance
const provider = new GoogleAuthProvider();

// Set custom provider parameters
provider.setCustomParameters({
  prompt: "select_account"
});

// Google Sign-In function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error.code, error.message);
    throw new Error(error.message);
  }
};

// Auth state observer utility
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Firestore helper (optional)
export const getUserDocRef = (userId) => {
  return doc(db, "users", userId);
};