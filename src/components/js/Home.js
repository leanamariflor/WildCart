import React, { useState, useEffect } from "react";
import Header from "./Header";
import Product from "./ProductsPage"
import "../css/HomePage.css";

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
      {/* Reusable header */}
      <Header />

      {/* Banner */}
      <header className="banner">
        <h1>“Wild Deals Within Reach.”</h1>
      </header>

      {/* Slider */}
      <div className="slider">
        {images.map((img, index) => (
          <div key={index} className={`slide ${index === current ? "active" : ""}`}>
            <img src={img} alt={`Slide ${index}`} />
          </div>
        ))}

        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
      <Product />
    </div>
  );
}
