import React, { useState } from "react";
import SellerDashboard from "../../components/Seller/SellerDashboard";
import Navbar from "../../components/Buyer/Navbar"; 

// SELLER CENTER EMPTY

const SellerCenterPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); 

  return (
    <div>
      <Navbar /> 
      <div style={styles.container}>
        {activeTab === "dashboard" && <SellerDashboard />}
      </div>
    </div>
  );
};


const styles = {
  container: {
    padding: "20px",
  },
};

export default SellerCenterPage;
