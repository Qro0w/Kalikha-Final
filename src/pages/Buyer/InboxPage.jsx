import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";  
import { collection, query, where, getDocs, doc, getDoc, addDoc, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const InboxPage = () => {
  const [conversations, setConversations] = useState([]);  // STORE ALL CONVOS
  const [selectedConversationId, setSelectedConversationId] = useState(null);  // TRACK CONVO
  const [messages, setMessages] = useState([]);  // STORE MESSAGES
  const [recipientProfile, setRecipientProfile] = useState(null);  // PROFILE DATA FOR RECIPIENT
  const [message, setMessage] = useState("");  // MESSAGE INPUT
  const [isLoading, setIsLoading] = useState(false);  // LOADING STATE
  const messagesEndRef = useRef(null);  // SCROLL TO BOTTOM OF MESSAGE

  const navigate = useNavigate();  
  const unsubscribeRef = useRef(null);  

  // FETCH ALL CONVOS NO LOGIN YET
  const fetchConversations = async () => {
    try {
      const conversationsRef = collection(db, "conversations");
      const querySnapshot = await getDocs(conversationsRef); 
      const convos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setConversations(convos); // DEFAULT FIRST CONVO 
      if (convos.length > 0) {
        setSelectedConversationId(convos[0].id);  
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // YAWA JUD NI DIRI KALAS ORAS 
  // GETS MESSAGES FROM SELECTED CONVO
  const fetchMessages = async (conversationId) => {
    try {

      const conversationRef = doc(db, "conversations", conversationId);
      const messagesRef = collection(conversationRef, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));

      if (unsubscribeRef.current) {
        unsubscribeRef.current(); 
      }

      unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
        const newMessages = querySnapshot.docs.map(doc => doc.data());
        setMessages(newMessages);
      });

      const recipientId = conversationId.split('-')[1];  // GET RECIPIENT ID FROM CONVO ID FROM DB
      const recipientProfileRef = doc(db, "users", recipientId);
      const recipientProfileSnapshot = await getDoc(recipientProfileRef);

      if (recipientProfileSnapshot.exists()) {
        setRecipientProfile(recipientProfileSnapshot.data());
      }
    } catch (error) {
      console.error("Error fetching messages or profile:", error);
    }
  };

  const handleConversationSelect = (conversationId) => {
    setSelectedConversationId(conversationId);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;  // BAWAL MO SEND MESSAGE KUNG WAY SULOD
    setIsLoading(true);
    try {
      await addDoc(collection(db, "conversations", selectedConversationId, "messages"), {
        sender: "user_123",  // STATIC FOR NOW NO LOGIN FEATURE
        recipient: recipientProfile ? recipientProfile.name : "Unknown", // UNKNOWN = NO RECIPIENT ID
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage("");  
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();  
  }, []);

  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId);  // FETCH FOR SPECIFIC CONVO
    }
  }, [selectedConversationId]);

  return (
    <div style={styles.pageContainer}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>⬅ Back</button>
      <div style={styles.container}>

        <div style={styles.userListContainer}>
          <h3>Conversations</h3>
          {conversations.map(convo => (
            <div key={convo.id} style={styles.userBox} onClick={() => handleConversationSelect(convo.id)}>
              {convo.id}
            </div>
          ))}
        </div>

        <div style={styles.messagesContainer}>
          <div style={styles.profileContainer}>
            {recipientProfile && (
              <>
                <img src={recipientProfile.image} alt="Profile" style={styles.profileImage} />
                <h3>{recipientProfile.name}</h3>
              </>
            )}
          </div>

          <div style={styles.messages}>
            {messages.map((message, index) => (
              <div key={index} style={{ ...styles.message, alignSelf: message.sender === "user_123" ? "flex-end" : "flex-start" }}>
                <p>{message.text}</p>
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
    right: 0,
    maxWidth: "20%",
    border: "0.1px solid",
    margin: "25px",
    padding: "5px",
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
