// src/pages/Buyer/LandingPage.jsx
import React from "react";
import Navbar from "../../components/Buyer/Navbar";
import HomepageSection from "../../components/Buyer/HomepageSection";
import CategorySection from "../../components/Buyer/CategorySection";
import ProductsSection from "../../components/Buyer/ProductsSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <HomepageSection />
        <CategorySection />
        <ProductsSection />
      </div>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    backgroundColor: "#f8f9fa",
  },
};

export default LandingPage;