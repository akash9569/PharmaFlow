// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgKmiST7Lq8oZ9oqViHMRLrADgbjsFDvY",
  authDomain: "studio-6099401193-3e7d1.firebaseapp.com",
  projectId: "studio-6099401193-3e7d1",
  storageBucket: "studio-6099401193-3e7d1.firebasestorage.app",
  messagingSenderId: "816107923052",
  appId: "1:816107923052:web:bf641a93a4d28e0abb5a49"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
