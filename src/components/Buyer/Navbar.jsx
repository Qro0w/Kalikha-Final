// src/components/Buyer/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaBell, FaUser, FaInbox } from "react-icons/fa"; // Import icons
import NotificationsWidget from "./NotificationsWidget";
import WishlistWidget from "./WishlistWidget";
import ProfileWidget from "./ProfileWidget";
import InboxWidget from "./InboxWidget"; // Import InboxWidget

const Navbar = () => {
  const [activeWidget, setActiveWidget] = useState(null);

  // Close all widgets when clicking outside
  const closeWidgets = () => {
    setActiveWidget(null);
  };

  return (
    <nav style={styles.navbar} onClick={closeWidgets}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        Kalikha
      </Link>

      {/* Search and Filter */}
      <div style={styles.searchFilter}>
        <input type="text" placeholder="Search products..." style={styles.searchInput} />
        <button style={styles.filterButton}>Filter</button>
      </div>

      {/* Right Side Links */}
      <div style={styles.navRight} onClick={(e) => e.stopPropagation()}>
        {/* Seller Center (Text Link) */}
        <Link to="/seller-center" style={styles.link}>
          Seller Center
        </Link>

        {/* My Orders (Text Link) */}
        <Link to="/orders" style={styles.link}>
          My Orders
        </Link>

        {/* Inbox (Icon with Widget) */}
        <InboxWidget
          isOpen={activeWidget === "inbox"}
          onToggle={() => setActiveWidget(activeWidget === "inbox" ? null : "inbox")}
          icon={<FaInbox size={20} />}
        />

        {/* Wishlist (Icon with Widget) */}
        <WishlistWidget
          isOpen={activeWidget === "wishlist"}
          onToggle={() => setActiveWidget(activeWidget === "wishlist" ? null : "wishlist")}
          icon={<FaHeart size={20} />}
        />

        {/* Notifications (Icon with Widget) */}
        <NotificationsWidget
          isOpen={activeWidget === "notifications"}
          onToggle={() => setActiveWidget(activeWidget === "notifications" ? null : "notifications")}
          icon={<FaBell size={20} />}
        />

        {/* Profile (Icon with Widget) */}
        <ProfileWidget
          isOpen={activeWidget === "profile"}
          onToggle={() => setActiveWidget(activeWidget === "profile" ? null : "profile")}
          icon={<FaUser size={20} />}
        />
      </div>
    </nav>
  );
};

// Minimal styling
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#333",
  },
  searchFilter: {
    display: "flex",
    gap: "10px",
  },
  searchInput: {
    padding: "5px",
    width: "300px",
  },
  filterButton: {
    padding: "5px 10px",
    cursor: "pointer",
  },
  navRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
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
  },
};

export default Navbar;