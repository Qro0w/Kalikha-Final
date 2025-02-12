import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaBell, FaUser, FaInbox } from "react-icons/fa";
import NotificationsWidget from "./NotificationsWidget";
import WishlistWidget from "./WishlistWidget";
import ProfileWidget from "./ProfileWidget";
import InboxWidget from "./InboxWidget";

const Navbar = () => {
  const [activeWidget, setActiveWidget] = useState(null);
  const [visible, setVisible] = useState(true);
  const [profileColor, setProfileColor] = useState("#333");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (!activeWidget) {
        setVisible(window.scrollY < lastScrollY);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeWidget]);

  const closeWidgets = () => {
    setActiveWidget(null);
    setProfileColor("#333");
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    const newActiveWidget = activeWidget === "profile" ? null : "profile";
    setActiveWidget(newActiveWidget);
    setProfileColor(newActiveWidget ? "#007bff" : "#333");  // Highlight color for active widget
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Add filtering logic here if needed
    console.log("Searching for: ", e.target.value);
  };

  return (
    <nav
      style={{
        ...styles.navbar,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
      onClick={closeWidgets}
    >
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        Kalikha
      </Link>

      {/* Search and Filter */}
      <div style={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery} // Bind the input to searchQuery state
          onChange={handleSearchChange} // Update searchQuery on input change
          style={styles.searchInput}
        />
      </div>

      {/* Right Side Links */}
      <div style={styles.navRight} onClick={(e) => e.stopPropagation()}>
        <Link to="/seller-center" style={styles.link}>Seller Center</Link>
        <Link to="/orders" style={styles.link}>My Orders</Link>

        {/* Widgets */}
        <InboxWidget
          isOpen={activeWidget === "inbox"}
          onToggle={() => setActiveWidget(activeWidget === "inbox" ? null : "inbox")}
          icon={<FaInbox size={20} />}
        />
        <WishlistWidget
          isOpen={activeWidget === "wishlist"}
          onToggle={() => setActiveWidget(activeWidget === "wishlist" ? null : "wishlist")}
          icon={<FaHeart size={20} />}
        />
        <NotificationsWidget
          isOpen={activeWidget === "notifications"}
          onToggle={() => setActiveWidget(activeWidget === "notifications" ? null : "notifications")}
          icon={<FaBell size={20} />}
        />

        {/* Profile Widget */}
        <div onClick={handleProfileClick} style={styles.iconLink}>
          <FaUser size={20} style={{ transition: "color 0.3s ease", color: profileColor }} />
        </div>
        {activeWidget === "profile" && (
          <div style={styles.profileWidgetContainer}>
            <ProfileWidget 
              isOpen={activeWidget === "profile"} 
              onToggle={() => setActiveWidget(activeWidget === "profile" ? null : "profile")} 
              icon={<FaUser size={20} />} 
            />
          </div>
        )}
      </div>
    </nav>
  );
};

// Styles
const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    height: "80px",
    backgroundColor: "#f8f9fa",
    borderBottom: "3px solid #ddd",
    borderRadius: "15px",
    zIndex: 1000,
  },
  logo: {
    fontSize: "50px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#333",
  },
  searchInput: {
    padding: "5px",
    width: "600px",
    height: "30px",
  },
  navRight: {
    display: "flex",
    gap: "60px",
    alignItems: "center",
    zIndex: 1100,
    paddingRight: "60px", // Add space between profile icon and the edge
    position: "relative", // Ensure positioning of profile widget
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
  },
  iconLink: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#333",
    width: "40px",  // Ensure there's enough space for the icon
    height: "40px", 
  },
  profileWidgetContainer: {
    position: "absolute",  // Prevents layout shift
    top: "60px", // Adjust as per the height of your navbar
    right: "0",
    zIndex: 999, // Ensure it appears above other elements
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "200px", // Adjust width as needed
  }
};

export default Navbar;
