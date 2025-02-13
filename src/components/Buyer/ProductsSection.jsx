import React, { useState, useEffect } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCard"; // Import the ProductCard component

const ProductsSection = ({ subcategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!subcategory) {
          console.log("No subcategory available.");
          setLoading(false);  
          return;
        }

        const db = getFirestore();
        const normalizedSubcategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);

        // MAPPING SUBCATEGORY TO CATEGORY
        const categoryMapping = {
          "Painting": "Visual Arts",
          "Sculpture": "Visual Arts",
          "Digital Art": "Visual Arts",
          "Printmaking": "Visual Arts",
          "Textile": "Crafts",
          "Ceramics": "Crafts",
          "Woodwork": "Crafts",
          "Glass": "Crafts",
          "Poetry": "Literary Arts",
          "Prose": "Literary Arts",
          "Drama": "Literary Arts",
          "Essays": "Literary Arts",
          "Portrait": "Photography",
          "Landscape": "Photography",
          "Street": "Photography",
          "Macro": "Photography"
        };

        const category = categoryMapping[normalizedSubcategory];
        if (!category) {
          console.log(`No matching category found for subcategory: ${normalizedSubcategory}`);
          setLoading(false);
          return;
        }

        // FIRESTORE QUERY
        console.log(`Executing Firestore query for subcategory: ${normalizedSubcategory}`);
        console.log(`Firestore path: categories/${category}/${normalizedSubcategory}`);

        // FETCH UNDER SUBCATEGORY
        const productsRef = collection(db, "categories", category, normalizedSubcategory);
        const q = query(productsRef);

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No products found for this category and subcategory.");
        } else {
          const productsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched products:", productsData);
          setProducts(productsData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategory]);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={styles.productsContainer}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  productsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
};

export default ProductsSection;
