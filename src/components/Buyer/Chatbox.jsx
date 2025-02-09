// src/components/Buyer/Chatbox.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

const Chatbox = ({ userId, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId || !recipientId) return;

    const messagesRef = collection(db, "messages");

    // Ensure the query retrieves messages between ONLY these two users
    const q = query(
      messagesRef,
      where("participants", "array-contains", userId), // Filter messages where userId is a participant
      orderBy("timestamp") // Order messages by time
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((msg) =>
          msg.participants.includes(userId) && msg.participants.includes(recipientId)
        ); // Ensure messages belong to this conversation

      setMessages(messagesList);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [userId, recipientId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      timestamp: serverTimestamp(), // Use Firestore timestamp
      senderId: userId,
      recipientId: recipientId,
      participants: [userId, recipientId].sort(), // Ensure consistent ordering
    });

    setNewMessage(""); // Clear input field
  };

  return (
    <div style={styles.chatbox}>
      <div style={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
              backgroundColor: msg.senderId === userId ? "#007bff" : "#f1f1f1",
              color: msg.senderId === userId ? "#fff" : "#000",
            }}
          >
            <strong>{msg.senderId === userId ? "You" : "Seller"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

// Chatbox styles
const styles = {
  chatbox: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
  },
  messages: {
    height: "300px",
    overflowY: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "5px",
    marginBottom: "5px",
    maxWidth: "70%",
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

export default Chatbox;
