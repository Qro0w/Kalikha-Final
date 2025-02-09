import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

const testFirebaseConnection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    console.log("✅ Firebase is connected successfully!");
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);
  }
};

export default testFirebaseConnection;
