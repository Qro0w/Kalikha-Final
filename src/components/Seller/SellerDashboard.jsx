import React, { useState } from "react";

// STATIC SELLER CENTER DASHBOARD

const SellerDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleUploadProduct = (e) => {
    e.preventDefault();

    console.log("Product Uploaded:", { productName, productDescription, productPrice });
  };

  return (
    <div style={styles.container}>
      <h1>Seller Dashboard</h1>
      <form onSubmit={handleUploadProduct} style={styles.form}>
        <h2>Upload Product Listing</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="number"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Upload Product
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  textarea: {
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    height: "100px",
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SellerDashboard;