import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

const userId = "user_123"; // USER ID FOR TESTING NO LOGIN

const InboxWidget = ({ isOpen, onToggle, icon }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isOpen) return; 

    const fetchConversations = async () => {
      try {
        const conversationsRef = collection(db, "conversations");

        // FILTER CONVERSATIONS WHERE user_123 IS IN PARTICIPANTS 
        const q = query(conversationsRef, where("participants", "array-contains", userId));
        const conversationSnapshot = await getDocs(q);
        
        const latestMessages = [];

        for (const doc of conversationSnapshot.docs) {
          const conversationId = doc.id;
          const conversationData = doc.data();

          const participants = conversationData.participants;

          // GET MOST RECENT MESSAGE
          if (Array.isArray(participants) && participants.indexOf(userId) !== -1) {
            const messagesRef = collection(db, "conversations", conversationId, "messages");
            const messagesQuery = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
            const messagesSnapshot = await getDocs(messagesQuery);

            if (!messagesSnapshot.empty) {
              const latestMessage = messagesSnapshot.docs[0].data();
              latestMessages.push({
                id: messagesSnapshot.docs[0].id,
                senderId: latestMessage.sender,
                text: latestMessage.text,
                timestamp: latestMessage.timestamp,
              });
            }
          }
        }

        setMessages(latestMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchConversations();
  }, [isOpen]);

  return (
    <div style={styles.container}>
      <div onClick={onToggle} style={styles.icon}>
        {icon}
      </div>
      {isOpen && (
        <div style={styles.dropdown}>
          {/* MESSAGE RENDERING */}
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} style={styles.message}>
                <p>
                  <strong>{msg.senderId === userId ? "Me" : msg.senderId}:</strong> {msg.text}
                </p>
                <button style={styles.actionButton}>Reply</button>
              </div>
            ))
          ) : (
            <p>No new messages</p>
          )}

          <Link to="/inbox" style={styles.inboxLink}>
            Go to Inbox
          </Link>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    position: "relative",
  },
  icon: {
    cursor: "pointer",
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: "30px",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  message: {
    marginBottom: "10px",
  },
  actionButton: {
    marginTop: "5px",
    padding: "2px 5px",
    cursor: "pointer",
  },
  inboxLink: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    color: "#333",
    marginTop: "10px",
    padding: "5px",
    borderTop: "1px solid #ddd",
  },
};

export default InboxWidget;
