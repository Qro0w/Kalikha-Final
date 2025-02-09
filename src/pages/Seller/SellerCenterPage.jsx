// src/pages/Seller/SellerCenterPage.jsx
import React, { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import SellerInbox from "../../components/Seller/SellerInbox";
import SellerNavbar from "../../components/Seller/SellerNavbar";

const SellerCenterPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to dashboard

  return (
    <div>
      <SellerNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={styles.container}>
        {activeTab === "dashboard" && <SellerDashboard />}
        {activeTab === "inbox" && <SellerInbox />}
        {/* Add more tabs as needed */}
      </div>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    padding: "20px",
  },
};

export default SellerCenterPage;