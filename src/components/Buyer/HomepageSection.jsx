import React from "react";
import { Link } from "react-scroll";

const HomepageSection = () => {
  return (
    <div style={styles.container}>

      <div style={styles.background}>
  
        <div style={styles.contentBox}>
 
          <div style={styles.titleContainer}>
            <h1 style={styles.title}>EXPLORE TALENT,</h1>
            <h1 style={styles.title}>BUY ART,</h1>
            <h1 style={styles.title}>AND LIST YOUR CREATIONS</h1>
          </div>
          <div style={styles.imageGrid}>
            <img src="/assets/home/image1.png" alt="Art 1" style={styles.image} />
            <img src="/assets/home/image2.png" alt="Art 2" style={styles.image} />
            <img src="/assets/home/image3.png" alt="Art 3" style={styles.image} />
            <img src="/assets/home/image4.png" alt="Art 4" style={styles.image} />
          </div>

          <Link to="categories" smooth={true} duration={800} style={styles.arrow}>
            &#8595;
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: "200px", 
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "25px",
    backgroundImage: "url('/assets/home/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  contentBox: {
    position: "relative",
    width: "96%",
    height: "100%",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    position: "absolute",
    top: "15%",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    letterSpacing: "7px",
    fontFamily: "'AmstelvarAlpha'",
    fontStretch: "condensed",
  },
  title: {
    fontSize: "5vh",
    color: "#fff",
    fontStretch: "condensed",
    fontWeight: "300",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    paddingLeft: "8%",
    paddingRight: "7%",
  },
  arrow: {
    fontSize: "40px",
    color: "#fff",
    position: "absolute",
    bottom: "25%",
    zIndex: 2,
    cursor: "pointer",
    transition: "opacity 0.3s",
  },
};

export default HomepageSection;
