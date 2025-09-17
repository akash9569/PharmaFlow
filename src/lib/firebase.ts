// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-6099401193-3e7d1",
  "appId": "1:816107923052:web:bf641a93a4d28e0abb5a49",
  "storageBucket": "studio-6099401193-3e7d1.firebasestorage.app",
  "apiKey": "AIzaSyDgKmiST7Lq8oZ9oqViHMRLrADgbjsFDvY",
  "authDomain": "studio-6099401193-3e7d1.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "816107923052"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };