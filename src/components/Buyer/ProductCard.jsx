import React from "react";

const ProductCard = ({ product }) => {
  const productImage = product.image || "/assets/pics/product.png";

  return (
    <div style={styles.card}>

      {/* Display seller information */}
      {product.seller && (
        <div style={styles.sellerInfo}>
          <img
            //src={product.seller.profilePic || "/assets/pics/product.jpg"}  // Fallback for profile pic
            src={"/assets/pics/product.jpg"}
            alt={product.seller.name}
            style={styles.sellerImage}
          />
          <p style={styles.sellerName}><strong>Seller:</strong> {product.seller.name}</p>
        </div>
      )} 

      {/* Display the product image */}
      <img src={productImage} alt={product.name} style={styles.image} />
      
      <div style={styles.details}>
        {/* Display product name */}
        <h3 style={styles.productName}>{product.name}</h3>
        
        {/* Display product description */}
        <p style={styles.description}>{product.description}</p>
        
        {/* Display product price */}
        <p style={styles.price}><strong>Price:</strong> ₱{product.price}</p>

      </div>
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
