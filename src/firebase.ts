import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfZqFf9gTUz_IzjG5iLykFUrOldFm4p-s",
  authDomain: "movieapp-a0a1b.firebaseapp.com",
  projectId: "movieapp-a0a1b",
  storageBucket: "movieapp-a0a1b.firebasestorage.app",
  messagingSenderId: "867073124837",
  appId: "1:867073124837:web:d88ecd8f480ed276d3670c",
  measurementId: "G-SL8J6CVMYL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Paste your TMDB API Key (v3) between the quotes
export const TMDB_KEY = "PASTE_YOUR_TMDB_KEY";