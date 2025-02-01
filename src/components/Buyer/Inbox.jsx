// src/components/Buyer/Inbox.jsx
import React from "react";

const Inbox = () => {
  return (
    <div style={styles.container}>
      <h2>Inbox</h2>
      <div style={styles.message}>
        <p>Message from Seller</p>
        <button style={styles.button}>Order Received & Leave a Review</button>
        <button style={styles.button}>Resolve an Issue</button>
        <button style={styles.button}>Cancel Transaction</button>
      </div>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    padding: "20px",
  },
  message: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
  },
  button: {
    margin: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Inbox;