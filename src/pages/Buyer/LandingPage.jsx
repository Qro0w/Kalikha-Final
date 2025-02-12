// src/pages/Buyer/LandingPage.jsx
import React from "react";
import Navbar from "../../components/Buyer/Navbar";
import HomepageSection from "../../components/Buyer/HomepageSection";
import CategorySection from "../../components/Buyer/CategorySection";
import ProductsSection from "../../components/Buyer/ProductsSection";

const LandingPage = () => {
  return (
    <div style={styles.bodypage}>
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
  bodypage: {
    backgroundColor: "#808080",
    overflowY: "scroll", // Allow scrolling
    overflowX: "hidden",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  },
  container: {
    backgroundColor: "#f8f9fa",
  },
};


export default LandingPage;