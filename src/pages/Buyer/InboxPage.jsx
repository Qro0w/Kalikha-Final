import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import uploadImage from "../../utils/uploadImage";
import { useNavigate } from "react-router-dom"; // Import for navigation

const InboxPage = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recipientProfile, setRecipientProfile] = useState({
    name: "Seller XYZ",
    image: "https://via.placeholder.com/150",
  });

  const navigate = useNavigate(); // Hook for navigating back
  const conversationId = "user_123-seller_321"; // Ensure we're using the correct conversationId for mock users
  const messagesEndRef = useRef(null);

  // Fetch messages from the conversation
  const fetchMessages = async () => {
    try {
      const conversationRef = doc(db, "conversations", conversationId);
      const conversationSnapshot = await getDoc(conversationRef);

      if (conversationSnapshot.exists()) {
        // Listen for real-time updates on the conversation messages
        const messagesRef = collection(conversationRef, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));
        onSnapshot(q, (querySnapshot) => {
          const newMessages = querySnapshot.docs.map(doc => doc.data());
          setMessages(newMessages);
        });
      } else {
        console.log("Conversation doesn't exist, creating...");
        await setDoc(conversationRef, {
          users: ["user_123", "seller_321"],
          timestamp: serverTimestamp(),
        });
      }

      // Fetch recipient profile
      const recipientId = "seller_321"; // Ensure recipient is set
      const recipientProfileRef = doc(db, "users", recipientId);
      const recipientProfileSnapshot = await getDoc(recipientProfileRef);
  
      if (recipientProfileSnapshot.exists()) {
        setRecipientProfile(recipientProfileSnapshot.data());
      }
    } catch (error) {
      console.error("Error fetching messages or profiles:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("Sending message...");

    setIsLoading(true);
    let imageURL = null;

    if (image) {
      try {
        imageURL = await uploadImage(image);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    try {
      const conversationRef = doc(db, "conversations", conversationId);
      const conversationSnapshot = await getDoc(conversationRef);

      if (!conversationSnapshot.exists()) {
        console.log("Conversation doesn't exist, creating...");
        await setDoc(conversationRef, {
          users: ["user_123", "seller_321"],
          timestamp: serverTimestamp(),
        });
      }

      console.log("Adding message...");
      await addDoc(collection(db, "conversations", conversationId, "messages"), {
        sender: "user_123",
        recipient: "seller_321",
        text: message,
        imageURL: imageURL,
        timestamp: serverTimestamp(),
        type: image ? "image" : "text",
      });

      setMessage("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>⬅ Back</button>

      <div style={styles.container}>
        <div style={styles.userListContainer}>
          <h3>Conversation with:</h3>
          <div style={styles.userBox} key={recipientProfile.name}>
            <div style={{ backgroundColor: "#d3f3ff", padding: "10px", borderRadius: "5px" }}>
              {recipientProfile.name}
            </div>
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.messagesContainer}>
          <div style={styles.profileContainer}>
            <img src={recipientProfile.image} alt="Profile" style={styles.profileImage} />
            <h3>{recipientProfile.name}</h3>
          </div>

          <div style={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: message.sender === "user_123" ? "flex-end" : "flex-start",
                  backgroundColor: message.sender === "user_123" ? "#007bff" : "#f1f1f1",
                  color: message.sender === "user_123" ? "#fff" : "#000",
                }}
              >
                {message.type === "image" ? (
                  <img src={message.imageURL} alt="Attachment" style={styles.messageImage} />
                ) : message.type === "offer" ? (
                  <div style={styles.offerMessage}>
                    <p><strong>Offer: ₱{message.text}</strong></p>
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={styles.form}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.input}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            <button type="submit" style={styles.button} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
    alignSelf: "flex-start",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    overflow: "hidden",
  },
  userListContainer: {
    width: "250px",
    padding: "20px",
    borderRight: "1px solid #ddd",
    overflowY: "auto",
    height: "100%",
  },
  userBox: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    margin: "10px 0",
    borderRadius: "5px",
  },
  divider: {
    width: "1px",
    backgroundColor: "#ddd",
    height: "100%",
  },
  messagesContainer: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 120px)",
    border: "2px solid"
  },
  profileContainer: {
    textAlign: "center",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    margin: "10px",
  },
  message: {
    maxWidth: "20%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "10px",
    wordWrap: "break-word",
  },
  messageImage: {
    maxWidth: "100%",
    borderRadius: "10px",
  },
  form: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  fileInput: {
    marginLeft: "10px",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default InboxPage;

