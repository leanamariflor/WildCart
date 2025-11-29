import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "../css/ViewProduct.css";
import Header from "../../Shared/js/Header"; 

export default function ViewProduct() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product || {
    id: 0,
    name: "Unknown Product",
    price: 0,
    images: [],
    category: "N/A",
    description: "No description available.",
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  const handleAddToCart = () => addToCart({ ...product, quantity });
  const handleGoToCart = () => navigate("/cart");

  return (
    <div className="viewproduct-page">
      <Header />

      <main className="viewproduct-content">
        <div className="product-gallery">
          {product.imageUrls?.map((img, idx) => (
            <img key={idx} src={img} alt={product.name} />
          ))}
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <h3>₱ {product.price.toFixed(2)}</h3>
          <p className="description">{product.description}</p>

          <div className="quantity-section">
            <h4>Quantity</h4>
            <div className="quantity-box">
              <button onClick={decrement}>-</button>
              <span>{quantity}</span>
              <button onClick={increment}>+</button>
            </div>
          </div>

          <button className="add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="checkout-btn" onClick={handleGoToCart}>
            Continue to checkout
          </button>
        </div>
      </main>
    </div>
  );
}
