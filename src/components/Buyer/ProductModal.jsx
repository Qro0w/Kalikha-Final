import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // Adjust import based on your project structure
import { collection, doc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";

const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "/assets/pics/product.png");
  const [offerAmount, setOfferAmount] = useState(""); // Store user input for offer
  const [user, setUser] = useState({
    uid: "user_123", // Use the mock user ID
    name: "Mock User", // Use the mock user name
  });

  // Function to send an offer message
  const handleMakeOffer = async () => {
    if (!offerAmount) return alert("Please enter an offer amount.");
  
    try {
      const buyerId = "user_123"; // Use the mock user ID
      const sellerId = product.seller?.id || "seller_123"; // Ensure we're using the mock seller ID
  
      // Generate a unique conversation ID (for now, based on mock user IDs)
      const convoId = `${buyerId}-${sellerId}`;
  
      // Reference to the conversation document
      const convoRef = doc(db, "conversations", convoId);
      const convoSnap = await getDoc(convoRef);
  
      // If the conversation doesn't exist, create a new one
      if (!convoSnap.exists()) {
        await setDoc(convoRef, {
          participants: [buyerId, sellerId],
          lastMessage: `Offer: ₱${offerAmount}`,
          lastTimestamp: serverTimestamp(),
        });
      }
  
      // Reference to the messages subcollection
      const messagesRef = collection(db, "conversations", convoId, "messages");
  
      // Add the offer message to the conversation
      await addDoc(messagesRef, {
        sender: buyerId,
        recipient: sellerId,
        text: `Offer: ₱${offerAmount}`,
        timestamp: serverTimestamp(),
        imageURL: "", // No image for now
      });
  
      // Navigate to the inbox page after sending the offer
      navigate("/inbox");
    } catch (error) {
      console.error("Error sending offer:", error);
    }
  };

  return (
    <div id="modal-overlay" style={styles.overlay} onClick={(e) => e.target.id === "modal-overlay" && onClose()}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>✖</button>

        <div style={styles.content}>
          <div style={styles.imageSection}>
            <img src={selectedImage} alt="Product" style={styles.mainImage} />
            <div style={styles.thumbnails}>
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ ...styles.thumbnail, border: selectedImage === img ? "2px solid black" : "none" }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          <div style={styles.details}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p style={styles.price}><strong>Price:</strong> ₱{product.price} or Offer</p>

            {product.seller && (
              <div style={styles.sellerBox}>
                <div style={styles.sellerInfo}>
                  <img src={"/assets/pics/product.jpg"} alt={product.seller.name} style={styles.sellerImage} />
                  <p><strong>Seller:</strong> {product.seller.name}</p>
                </div>

                <button style={styles.button} onClick={() => navigate("/inbox")}>
                  Chat with Seller
                </button>

                <div style={styles.makeOfferContainer}>
                  <input
                    type="number"
                    placeholder="Enter offer"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    style={styles.offerInput}
                  />
                  <button style={styles.offerButton} onClick={handleMakeOffer}>
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


// Updated Styles (Make Offer Section Fixed)
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
  button: {
    width: "85%",
    padding: "15px",
    border: "none",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "17px",
    marginTop: "20px",
    marginBottom: "10px",
  },
  makeOfferContainer: {
    display: "flex",
    width: "85%",
    alignItems: "center",
    border: "2px solid #ccc",
    borderRadius: "17px",
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  offerInput: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "transparent",
  },
  offerButton: {
    padding: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ProductModal;
