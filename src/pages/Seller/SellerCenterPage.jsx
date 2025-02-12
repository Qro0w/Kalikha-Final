import React, { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import Navbar from "../../components/Buyer/Navbar"; // Adjust the path based on your project structure

const SellerCenterPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to dashboard

  return (
    <div>
      <Navbar /> {/* Integrated Navbar here */}
      <div style={styles.container}>
        {activeTab === "dashboard" && <SellerDashboard />}
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
