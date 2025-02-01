// src/components/Buyer/ProductsSection.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductsSection = () => {
  return (
    <div style={styles.container}>
      <h2>Products</h2>
      <div style={styles.products}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    marginBottom: "20px",
  },
  products: {
    display: "flex",
    gap: "10px",
  },
};

export default ProductsSection;