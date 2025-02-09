// src/components/Seller/SellerInbox.jsx
import React, { useState } from "react";

const SellerInbox = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Handle sending message logic here
    console.log("Message Sent:", message);
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h1>Seller Inbox</h1>
      <div style={styles.messages}>
        {/* Display messages here */}
        <div style={styles.message}>
          <strong>Buyer:</strong> Hello, when will my order ship?
        </div>
      </div>
      <form onSubmit={handleSendMessage} style={styles.form}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

// Minimal styling
const styles = {
  container: {
    padding: "20px",
  },
  messages: {
    height: "300px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  message: {
    marginBottom: "5px",
  },
  form: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SellerInbox;