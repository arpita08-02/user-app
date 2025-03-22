// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyAWS-i7-kPtO3frvy81s8acChgxPpt0B2k",
//   authDomain: "avijo-48c48.firebaseapp.com",
//   projectId: "avijo-48c48",
//   storageBucket: "avijo-48c48.appspot.com",
//   messagingSenderId: "1027908636450",
//   appId: "1:1027908636450:web:4d44a3115f212f23371f7b",
//   measurementId: "G-T8DCVDFEBN",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider };







import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAWS-i7-kPtO3frvy81s8acChgxPpt0B2k", // Firebase API Key
  authDomain: "avijo-48c48.firebaseapp.com", // Firebase Auth Domain
  projectId: "avijo-48c48", // Firebase Project ID
  storageBucket: "avijo-48c48.appspot.com", // Firebase Storage Bucket
  messagingSenderId: "1027908636450", // Firebase Messaging Sender ID
  appId: "1:1027908636450:web:4d44a3115f212f23371f7b", // Firebase App ID
  measurementId: "G-T8DCVDFEBN", // Firebase Measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
// const auth = getAuth(app);
const auth = getAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export Firebase modules
export { auth, googleProvider };