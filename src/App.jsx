import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Buyer/LandingPage";
import InboxPage from "./pages/Buyer/InboxPage";
import OrdersPage from "./pages/Buyer/OrdersPage";
import SellerCenterPage from "./pages/Seller/SellerCenterPage";
import ProductsSection from "./components/Buyer/ProductsSection"; // Import ProductsSection
import { db } from "./firebase"; // Import Firebase Firestore
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom"; // Import useParams

function App() {
  // 🔥 Check Firebase connection on app load
  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages")); // Change "messages" to a valid collection in Firestore
        querySnapshot.forEach((doc) => {
          console.log(`✅ Firestore Data: ${doc.id} =>`, doc.data());
        });
        console.log("✅ Firebase is connected successfully!");
      } catch (error) {
        console.error("❌ Firebase connection failed:", error);
      }
    };

    testFirebaseConnection();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/seller-center" element={<SellerCenterPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        
        {/* Updated route to match subcategory format */}
        <Route path="/subcategories/:category/:subcategory" element={<ProductsWithSubcategory />} />
      </Routes>
    </Router>
  );
}

// New component to handle dynamic category and subcategory
const ProductsWithSubcategory = () => {
  const { category, subcategory } = useParams(); // Get both category and subcategory from the URL
  console.log("Category and Subcategory:", category, subcategory); // Debug log
  return <ProductsSection category={category} subcategory={subcategory} />; // Pass category and subcategory to ProductsSection
};

export default App;
