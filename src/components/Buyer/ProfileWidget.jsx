import React from "react";

const ProfileWidget = ({ isOpen, onToggle, icon }) => {
  return (
    <div style={styles.container}>
      {/* Render the profile icon only when it's not open */}
      {!isOpen && (
        <div onClick={onToggle} style={styles.icon}>
          {icon}
        </div>
      )}
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
    position: "relative", // This ensures the dropdown is positioned relative to the container
  },
  icon: {
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    width: "200px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1200, // Keep it above other content
  },
  actionButton: {
    marginTop: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "#f1f1f1",
    border: "none",
    borderRadius: "3px",
    width: "100%",
    textAlign: "left",
  },
};

export default ProfileWidget;
