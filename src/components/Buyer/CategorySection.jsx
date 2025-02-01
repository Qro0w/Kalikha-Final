// src/components/Buyer/CategorySection.jsx
import React from "react";

const CategorySection = () => {
  return (
    <div style={styles.container}>
      <h2>Categories</h2>
      <div style={styles.categories}>
        <div style={styles.category}>Category 1</div>
        <div style={styles.category}>Category 2</div>
        <div style={styles.category}>Category 3</div>
      </div>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    marginBottom: "20px",
  },
  categories: {
    display: "flex",
    gap: "10px",
  },
  category: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
};

export default CategorySection;