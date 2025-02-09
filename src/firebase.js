// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics"; // Ensure correct imports

// 🔥 Your Firebase Config (Replace with your actual config)
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
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Conditionally initialize Analytics
let analytics;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("✅ Firebase Analytics initialized");
    } else {
      console.log("⚠️ Firebase Analytics is not supported in this environment.");
    }
  })
  .catch((error) => console.error("❌ Error checking Analytics support:", error));

export { app, db, auth, analytics };
