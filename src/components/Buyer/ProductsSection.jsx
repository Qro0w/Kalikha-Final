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
          setLoading(false);  // Stop loading if subcategory is undefined
          return;
        }

        const db = getFirestore();
        
        // Normalize the subcategory to match Firestore's case (e.g., "Painting" -> "Painting")
        const normalizedSubcategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
        
        // Log the Firestore path we are querying
        console.log(`Executing Firestore query for subcategory: ${normalizedSubcategory}`);
        console.log(`Firestore path: categories/Visual Arts/${normalizedSubcategory}`);
        
        // Fetch products under the subcategory
        const productsRef = collection(db, "categories", "Visual Arts", normalizedSubcategory);
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
            <p></p>
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
