// src/components/Buyer/ProfileWidget.jsx
import React from "react";

const ProfileWidget = ({ isOpen, onToggle, icon }) => {
  return (
    <div style={styles.container}>
      <div onClick={onToggle} style={styles.icon}>
        {icon}
      </div>
      {isOpen && (
        <div style={styles.dropdown}>
          <p>Welcome, User!</p>
          <button style={styles.actionButton}>Edit Profile</button>
          <button style={styles.actionButton}>Logout</button>
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
    width: "200px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  actionButton: {
    marginTop: "5px",
    padding: "2px 5px",
    cursor: "pointer",
  },
};

export default ProfileWidget;