// src/components/Buyer/NotificationsWidget.jsx
import React from "react";

const NotificationsWidget = ({ isOpen, onToggle, icon }) => {
  return (
    <div style={styles.container}>
      <div onClick={onToggle} style={styles.icon}>
        {icon}
      </div>
      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.notification}>
            <p>You have a new message from Seller XYZ.</p>
            <button style={styles.actionButton}>Mark as Read</button>
          </div>
          <div style={styles.notification}>
            <p>Your order #123 has been shipped.</p>
            <button style={styles.actionButton}>View Order</button>
          </div>
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
  notification: {
    marginBottom: "10px",
  },
  actionButton: {
    marginTop: "5px",
    padding: "2px 5px",
    cursor: "pointer",
  },
};

export default NotificationsWidget;