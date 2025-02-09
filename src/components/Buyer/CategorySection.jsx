// src/components/Buyer/CategorySection.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductsSection from "./ProductsSection"; // Import the ProductsSection component

const categories = [
  {
    name: "Visual Arts",
    image: "/assets/categories/finearts.png",
    subcategories: [
      { name: "Painting", path: "visual-arts/painting" },
      { name: "Sculpture", path: "visual-arts/sculpture" },
      { name: "Digital Art", path: "visual-arts/digital-art" },
      { name: "Printmaking", path: "visual-arts/printmaking" },
    ],
  },
  {
    name: "Crafts",
    image: "/assets/categories/crafts.png",
    subcategories: [
      { name: "Textile", path: "crafts/textile" },
      { name: "Ceramics", path: "crafts/ceramics" },
      { name: "Woodwork", path: "crafts/woodwork" },
      { name: "Glass", path: "crafts/glass" },
    ],
  },
  {
    name: "Literary Arts",
    image: "/assets/categories/literaryarts.png",
    subcategories: [
      { name: "Poetry", path: "literary-arts/poetry" },
      { name: "Prose", path: "literary-arts/prose" },
      { name: "Drama", path: "literary-arts/drama" },
      { name: "Essays", path: "literary-arts/essays" },
    ],
  },
  {
    name: "Photography",
    image: "/assets/categories/photography.png",
    subcategories: [
      { name: "Portrait", path: "photography/portrait" },
      { name: "Landscape", path: "photography/landscape" },
      { name: "Street", path: "photography/street" },
      { name: "Macro", path: "photography/macro" },
    ],
  },
];

const CategorySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Store selected subcategory

  // Handle subcategory selection to display products in the current page
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory); // Set the selected subcategory
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Categories</h2>
      <div style={styles.categories}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              ...styles.category,
              backgroundImage: `url(${category.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{
                ...styles.overlay,
                opacity: hoveredIndex === index ? 0.6 : 0,
              }}
            />
            <p
              style={{
                ...styles.categoryName,
                opacity: hoveredIndex === index ? 0 : 1,
              }}
            >
              {category.name}
            </p>
            <div
              style={{
                ...styles.subcategories,
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? "translateY(0)" : "translateY(-20px)",
              }}
            >
              {category.subcategories.map((sub, i) => (
                <div key={i} style={styles.subcategory} onClick={() => handleSubcategoryClick(sub.name)}>
                  {sub.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Render the ProductsSection component below categories when a subcategory is selected */}
      {selectedSubcategory && (
        <div style={styles.productsSection}>
          <h3 style={styles.selectedSubcategoryTitle}>{selectedSubcategory}</h3>
          <ProductsSection subcategory={selectedSubcategory} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "20px",
    textAlign: "center",
    padding: "40px 20px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "left",
    fontSize: "34px",
    font: "Arial",
    paddingBottom: "20px",
  },
  categories: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  },
  category: {
    position: "relative",
    width: "24%",
    height: "auto",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    minHeight: "400px",
    transition: "filter 0.4s ease",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgb(0, 0, 0)",
    zIndex: 0,
    transition: "opacity 0.4s ease",
  },
  categoryName: {
    position: "absolute",
    font: "AmstelvarAlpha",
    fontSize: "52px",
    color: "#fff",
    transition: "opacity 0.4s ease",
    zIndex: 1,
  },
  subcategories: {
    position: "absolute",
    top: "0",
    transform: "translateX(-50%) translateY(-20px)",
    opacity: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "#fff",
    padding: "80px",
    borderRadius: "5px",
    width: "50%",
    transition: "opacity 0.4s ease, transform 0.4s ease",
    zIndex: 2,
  },
  subcategory: {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "2px solid white",
    textAlign: "center",
    fontSize: "24px",
    color: "#fff",
    cursor: "pointer",
    transition: "color 0.3s, background-color 0.3s",
  },
  productsSection: {
    marginTop: "40px",
  },
  selectedSubcategoryTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  '@media (max-width: 1200px)': {
    category: {
      width: "30%",
    },
  },
  '@media (max-width: 768px)': {
    category: {
      width: "45%",
    },
  },
  '@media (max-width: 480px)': {
    category: {
      width: "100%",
    },
    subcategories: {
      width: "100%",
    },
  },
};

export default CategorySection;
