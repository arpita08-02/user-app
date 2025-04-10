import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
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

export { auth };
export default app;