import React from "react";

const WishlistWidget = ({ isOpen, onToggle, icon }) => {
  return (
    <div style={styles.container}>
      <div onClick={onToggle} style={styles.icon}>
        {icon}
      </div>
      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.item}>
            <p>Product 1</p>
            <button style={styles.actionButton}>Remove</button>
          </div>
          <div style={styles.item}>
            <p>Product 2</p>
            <button style={styles.actionButton}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

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
  item: {
    marginBottom: "10px",
  },
  actionButton: {
    marginTop: "5px",
    padding: "2px 5px",
    cursor: "pointer",
  },
};

export default WishlistWidget;