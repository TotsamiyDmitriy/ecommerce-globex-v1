// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIRE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);