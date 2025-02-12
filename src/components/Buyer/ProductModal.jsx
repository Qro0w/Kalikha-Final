import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();

  if (!product) return null; // Prevents crashes if product data is missing

  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "/assets/pics/product.png");

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div id="modal-overlay" style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        <div style={styles.content}>
          {/* Left Side: Image Section */}
          <div style={styles.imageSection}>
            {/* Main Image */}
            <img src={selectedImage} alt="Product" style={styles.mainImage} />

            {/* Thumbnails */}
            <div style={styles.thumbnails}>
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    ...styles.thumbnail,
                    border: selectedImage === img ? "2px solid black" : "none",
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div style={styles.details}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p style={styles.price}>
              <strong>Price:</strong> ₱{product.price} or Offer
            </p>

            {/* Seller Info Section */}
            {product.seller && (
              <div style={styles.sellerBox}>
                <div style={styles.sellerInfo}>
                  <img
                    src={"/assets/pics/product.jpg"}
                    alt={product.seller.name}
                    style={styles.sellerImage}
                  />
                  <p>
                    <strong>Seller:</strong> {product.seller.name}
                  </p>
                </div>

                {/* Buttons (Vertically Aligned) */}
                <div style={styles.actions}>
                  <button style={styles.button} onClick={() => navigate("/inbox")}>
                    Chat with Seller
                  </button>
                  <button style={styles.button} onClick={() => navigate("/inbox")}>
                    Make Offer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Styles
const styles = {
  overlay: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    width: "700px",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    gap: "20px",
  },
  imageSection: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainImage: {
    width: "250px",
    height: "250px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  thumbnails: {
    display: "flex",
    marginTop: "10px",
    gap: "5px",
  },
  thumbnail: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    cursor: "pointer",
    objectFit: "cover",
  },
  details: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  sellerBox: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sellerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sellerImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    marginTop: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ProductModal;
