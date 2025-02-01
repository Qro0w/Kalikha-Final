// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getAuth } from "firebase/auth"; // For authentication
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAR_apVG1gRItYNd0p0b_VVGdC3HIlPMI4",
    authDomain: "kalikha-5e87c.firebaseapp.com",
    projectId: "kalikha-5e87c",
    storageBucket: "kalikha-5e87c.firebasestorage.app",
    messagingSenderId: "905676848360",
    appId: "1:905676848360:web:270d52220218d7fc425d5d",
    measurementId: "G-LT9TQ6NLMW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore database
const auth = getAuth(app); // Authentication
const analytics = getAnalytics(app);

export { db, auth };