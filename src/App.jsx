// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Buyer/LandingPage";
import InboxPage from "./pages/Buyer/InboxPage";
import SellerCenterPage from "./pages/Buyer/SellerCenterPage";
import OrdersPage from "./pages/Buyer/OrdersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/seller-center" element={<SellerCenterPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;