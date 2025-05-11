// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'react-gear-bc3b7.firebaseapp.com',
  projectId: 'react-gear-bc3b7',
  storageBucket: 'react-gear-bc3b7.firebasestorage.app',
  messagingSenderId: '1010128342180',
  appId: '1:1010128342180:web:1b82c238e5c66f05c76a31',
  measurementId: 'G-4Z6FXKMW9C',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
// export const storage = getStorage();
// const analytics = getAnalytics(app);
