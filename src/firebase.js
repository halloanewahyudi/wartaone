// composables/firebaseConfig.js
// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyALKE-hJ4ALrKHFohFlpQBGyMdUqxmQ3v4',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'deft-tube-281204',
    storageBucket: "gs://deft-tube-281204.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
   // appId: "YOUR_APP_ID"
}

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };




