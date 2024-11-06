import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-794e7.firebaseapp.com",
  projectId: "mern-blog-794e7",
  storageBucket: "mern-blog-794e7.firebasestorage.app",
  messagingSenderId: "742402902640",
  appId: "1:742402902640:web:014f773ed4d10537cd42b5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
