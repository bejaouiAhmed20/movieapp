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

// TMDB API credentials
export const TMDB_API_KEY = "7abf11b6ce47702ffe68952c66e12e34";
export const TMDB_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWJmMTFiNmNlNDc3MDJmZmU2ODk1MmM2NmUxMmUzNCIsIm5iZiI6MTc5NTU0MDkxOS4wNzIsInN1YiI6IjZiMDVjN2I3ZDRlMjI5ZjJkZjkxYzkwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jmi9HdBayKG1DTv5OYhUuRoJNP2d5m7IwXIoY-MVAUM";
export const TMDB_KEY = TMDB_ACCESS_TOKEN;
