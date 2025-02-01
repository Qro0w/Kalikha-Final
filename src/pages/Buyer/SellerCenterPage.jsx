// src/pages/Buyer/SellerCenterPage.jsx
import React from "react";
import Navbar from "../../components/Buyer/Navbar";

const SellerCenterPage = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>Seller Center</h1>
        <div style={styles.section}>
          <h2>Manage Products</h2>
          <button style={styles.button}>Add New Product</button>
          <button style={styles.button}>View Product List</button>
        </div>
        <div style={styles.section}>
          <h2>Sales Overview</h2>
          <p>Total Sales: $1,000</p>
          <p>Orders Completed: 10</p>
        </div>
      </div>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    padding: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  button: {
    margin: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default SellerCenterPage;