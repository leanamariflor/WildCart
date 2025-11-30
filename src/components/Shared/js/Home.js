import React, { useState, useEffect } from "react";
import Header from "../../Shared/js/Header"; 
import Product from "../../Products/js/ProductsPage";
import "../css/HomePage.css";

import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";
import banner3 from "../../../assets/banner3.jpg";

export default function Home() {
  const [imageUrls, setImageUrls] = useState([banner1, banner2, banner3]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inject Cloudinary transformation for better quality & sizing
  const transformCloudinary = (url) => {
    if (!url || typeof url !== 'string') return url;
    // Only transform Cloudinary-hosted images
    if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
    // Avoid double insertion
    if (url.match(/\/upload\/.*(w_1600|q_auto)/)) return url;
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_1600,h_700,c_fill,dpr_2/');
  };

  // Fetch latest products from backend and extract first image of each
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => {
        const sorted = Array.isArray(data)
          ? [...data]
              .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
              .slice(0, 5)
          : [];
        const imgs = sorted
          .map(p => (Array.isArray(p.imageUrls) ? transformCloudinary(p.imageUrls[0]) : null))
          .filter(Boolean);
        if (imgs.length) {
          setImageUrls(imgs);
        }
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load product images");
        setLoading(false);
      });
  }, []);

  // Slide animation
  useEffect(() => {
    if (!imageUrls.length) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % imageUrls.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [imageUrls]);

  return (
    <div className="homepage">
      <Header />
      <header className="banner">
        <h1>“Wild Deals Within Reach.”</h1>
      </header>

      <div className="slider">
        {loading && (
          <div className="slide loading-slide">Loading latest products...</div>
        )}
        {!loading && error && (
          <div className="slide error-slide">{error}</div>
        )}
        {!loading && !error && imageUrls.map((img, index) => (
          <div key={index} className={`slide ${index === current ? "active" : ""}`}>
            <img src={img} alt={`Slide ${index}`} />
          </div>
        ))}

        {!loading && !error && (
          <div className="dots">
            {imageUrls.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        )}
      </div>

      <Product className="product" />
    </div>
  );
}
