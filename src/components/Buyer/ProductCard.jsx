// src/components/Buyer/ProductCard.jsx
import React from "react";

const ProductCard = () => {
  return (
    <div style={styles.card}>
      <img src="https://via.placeholder.com/150" alt="Product" style={styles.image} />
      <h3>Product Name</h3>
      <p>Price: $10.00</p>
    </div>
  );
};

// Minimal styling
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    width: "150px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "auto",
  },
};

export default ProductCard;