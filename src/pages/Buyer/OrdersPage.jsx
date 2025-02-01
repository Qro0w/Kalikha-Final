// src/pages/Buyer/OrdersPage.jsx
import React from "react";
import Navbar from "../../components/Buyer/Navbar";

const OrdersPage = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>Orders</h1>
        <div style={styles.order}>
          <p>Order #123 - Shipped</p>
          <button style={styles.button}>Track Order</button>
        </div>
        <div style={styles.order}>
          <p>Order #456 - Delivered</p>
          <button style={styles.button}>Leave a Review</button>
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
  order: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    margin: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default OrdersPage;