// src/pages/Buyer/InboxPage.jsx
import React from "react";
import Navbar from "../../components/Buyer/Navbar";

const InboxPage = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>Inbox</h1>
        <div style={styles.message}>
          <p>Message from Seller XYZ:</p>
          <p>"Your order has been shipped!"</p>
          <button style={styles.button}>Order Received & Leave a Review</button>
          <button style={styles.button}>Resolve an Issue</button>
          <button style={styles.button}>Cancel Transaction</button>
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

export default InboxPage;