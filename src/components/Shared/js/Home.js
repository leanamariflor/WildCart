import React, { useState, useEffect } from "react";
import Header from "../../Shared/js/Header"; 
import Product from "../../Products/js/ProductsPage"
import "../css/HomePage.css";
import { products } from '../../../data/mockdata';


import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";
import banner3 from "../../../assets/banner3.jpg";

export default function Home() {
  const latestProducts = [...products]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 3);

  const images = latestProducts.map(product => product.images[0]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="homepage">
      <Header />
      <header className="banner">
        <h1>“Wild Deals Within Reach.”</h1>
      </header>

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

      <Product className="product"/>
    </div>
  );
}
