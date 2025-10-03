import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaCog } from "react-icons/fa";
import "../css/HomePage.css";
import favicon from "../../assets/favicon.png";


export default function Home() {
  const images = [
    "https://picsum.photos/id/1015/1200/500",
    "https://picsum.photos/id/1016/1200/500",
    "https://picsum.photos/id/1018/1200/500",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={favicon} alt="WildCart Logo" className="small-logo"/>
          <span className="brand">WildCart</span>
        </div>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="nav-links">
          <span>Help</span>
          <span>Profile</span>
          <FaShoppingCart className="icon" />
          <FaCog className="icon" />
        </div>
      </nav>

      {/* Banner */}
      <header className="banner">
        <h1>“Wild Deals Within Reach.”</h1>
      </header>

      {/* Slider */}
      <div className="slider">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
          >
            <img src={img} alt={`Slide ${index}`} />
          </div>
        ))}
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
