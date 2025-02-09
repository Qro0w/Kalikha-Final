// src/components/Seller/SellerNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const SellerNavbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <button
          onClick={() => setActiveTab("dashboard")}
          style={activeTab === "dashboard" ? styles.activeLink : styles.link}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("inbox")}
          style={activeTab === "inbox" ? styles.activeLink : styles.link}
        >
          Inbox
        </button>
        {/* Add more tabs as needed */}
      </div>
    </nav>
  );
};

// Minimal styling
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  navLeft: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    background: "none",
  },
  activeLink: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    background: "none",
  },
};

export default SellerNavbar;