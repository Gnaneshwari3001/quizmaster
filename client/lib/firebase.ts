import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHNgkhAyruDhz1kUi1gvxfeUkR5w8wYEk",
  authDomain: "quiz-f56a5.firebaseapp.com",
  databaseURL: "https://quiz-f56a5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-f56a5",
  storageBucket: "quiz-f56a5.firebasestorage.app",
  messagingSenderId: "377841258924",
  appId: "1:377841258924:web:4e9d7e26521bc0bf846a09",
  measurementId: "G-Q1CR9MW4CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;
