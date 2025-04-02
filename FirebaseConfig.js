import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence, GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAWS-i7-kPtO3frvy81s8acChgxPpt0B2k",
  authDomain: "avijo-48c48.firebaseapp.com",
  projectId: "avijo-48c48",
  storageBucket: "avijo-48c48.appspot.com",
  messagingSenderId: "1027908636450",
  appId: "1:1027908636450:web:4d44a3115f212f23371f7b",
  measurementId: "G-T8DCVDFEBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    // If auth is already initialized, use getAuth
    auth = getAuth(app);
  } else {
    throw error;
  }
}

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };