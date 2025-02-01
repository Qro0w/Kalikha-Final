// src/pages/Buyer/LandingPage.jsx
import React from "react";
import Navbar from "../../components/Buyer/Navbar";
import CategorySection from "../../components/Buyer/CategorySection";
import ProductsSection from "../../components/Buyer/ProductsSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <CategorySection />
        <ProductsSection />
      </div>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    padding: "20px",
  },
};

export default LandingPage;