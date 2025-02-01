// src/components/Buyer/InboxWidget.jsx
import React from "react";
import { Link } from "react-router-dom";

const InboxWidget = ({ isOpen, onToggle, icon }) => {
  return (
    <div style={styles.container}>
      <div onClick={onToggle} style={styles.icon}>
        {icon}
      </div>
      {isOpen && (
        <div style={styles.dropdown}>
          {/* Recent Messages */}
          <div style={styles.message}>
            <p>Seller XYZ: Your order has been shipped!</p>
            <button style={styles.actionButton}>Reply</button>
          </div>
          <div style={styles.message}>
            <p>Seller ABC: Your order is out for delivery.</p>
            <button style={styles.actionButton}>Reply</button>
          </div>

          {/* Link to Inbox Page */}
          <Link to="/inbox" style={styles.inboxLink}>
            Go to Inbox
          </Link>
        </div>
      )}
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    position: "relative",
  },
  icon: {
    cursor: "pointer",
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: "30px",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  message: {
    marginBottom: "10px",
  },
  actionButton: {
    marginTop: "5px",
    padding: "2px 5px",
    cursor: "pointer",
  },
  inboxLink: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    color: "#333",
    marginTop: "10px",
    padding: "5px",
    borderTop: "1px solid #ddd",
  },
};

export default InboxWidget;