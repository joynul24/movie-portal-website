import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyD3vPNEsvfHCNhd2KyVgdyVr4W894DFp0w",
//   authDomain: "movie-prtal-website.firebaseapp.com",
//   projectId: "movie-prtal-website",
//   storageBucket: "movie-prtal-website.firebasestorage.app",
//   messagingSenderId: "263703385555",
//   appId: "1:263703385555:web:1ea001820e40a01c830b26",
//   measurementId: "G-SJFQ33JVY6"
// };

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export default auth;
