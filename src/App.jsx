import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Buyer/LandingPage";
import InboxPage from "./pages/Buyer/InboxPage";
import OrdersPage from "./pages/Buyer/OrdersPage";
import SellerCenterPage from "./pages/Seller/SellerCenterPage";
import ProductsSection from "./components/Buyer/ProductsSection"; 
import { db } from "./firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom"; 

function App() {
  // FIREBASE CONNECTIVITY CHECK
  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages")); 
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

  // ROUTING AND DYNAMIC LOADING FOR CATEGORIES
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/seller-center" element={<SellerCenterPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/subcategories/:category/:subcategory" element={<ProductsWithSubcategory />} />
      </Routes>
    </Router>
  );
}

const ProductsWithSubcategory = () => {
  const { category, subcategory } = useParams(); 
  console.log("Category and Subcategory:", category, subcategory); 
  return <ProductsSection category={category} subcategory={subcategory} />; 
};

export default App;
