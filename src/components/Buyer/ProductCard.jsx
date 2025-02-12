import React, { useState } from "react";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const productImage = product.image || "/assets/pics/product.png";

  return (
    <div style={styles.card} onClick={() => setIsModalOpen(true)}>

      {/* Display seller information (Only if seller exists) */}
      {product.seller && (
        <div style={styles.sellerInfo}>
          <img
            src={product.seller.profilePic || "/assets/pics/product.jpg"}
            alt={product.seller?.name || "Seller"}
            style={styles.sellerImage}
          />
          <p style={styles.sellerName}>
            <strong>Seller:</strong> {product.seller?.name || "Unknown"}
          </p>
        </div>
      )}

      {/* Display product image */}
      <img src={productImage} alt={product.name} style={styles.image} />
      
      <div style={styles.details}>
        {/* Product Name */}
        <h3 style={styles.productName}>{product.name || "Unnamed Product"}</h3>
        
        {/* Product Description */}
        <p style={styles.description}>{product.description || "No description available."}</p>
        
        {/* Product Price */}
        <p style={styles.price}><strong>Price:</strong> ₱{product.price || "N/A"}</p>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

const styles = {
  card: {
    width: "250px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "18vh",
    objectFit: "cover",
  },
  details: {
    padding: "15px",
    textAlign: "left",
  },
  sellerInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    paddingLeft: "10px",
    gap: "10px",
  },
  sellerImage: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    objectFit: "cover",
  },
};

export default ProductCard;
