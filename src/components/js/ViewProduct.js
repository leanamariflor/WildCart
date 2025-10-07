import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Search, HelpCircle, ShoppingCart, Settings } from "lucide-react";
import "../css/ViewProduct.css";
import favicon from "../../assets/favicon.png";

export default function ViewProduct() {
  const { addToCart, cartItems } = useCart(); // ✅ single context for cart
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const product = {
    id: 1,
    name: "Chocolate Chip Cookies",
    price: 15.0,
    seller: "Cookie Corner",
    image:
      "https://images.unsplash.com/photo-1606755962773-0c48e8aa8c9a?auto=format&fit=crop&w=800&q=80",
  };

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // ✅ instantly adds
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="viewproduct-page">
      {/* HEADER */}
      <header className="cart-header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo-container">
              <img src={favicon} alt="WildCart Logo" className="small-logo" />
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
              />
              <button className="search-button">
                <Search className="w-4 h-4 text-gray-900" />
              </button>
            </div>

            <div className="header-actions">
              <button className="header-button">
                <HelpCircle className="w-6 h-6" /> Help
              </button>
              <button className="header-button">Profile</button>

              <button className="cart-button" onClick={handleGoToCart}>
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </button>

              <button className="header-button">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="viewproduct-content">
        <div className="product-gallery">
          <img
            alt="Cookies"
          />
          <img
            alt="Cookies"
          />
          <img
            alt="Cookies"
          />
          <img
            alt="Cookies"
          />
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <h3>₱ {product.price.toFixed(2)}</h3>
          <p className="description">
            Soft, chewy chocolate chip cookies made fresh daily with real butter
            and rich chocolate—perfect for snacking or gifting.
          </p>
          <p className="note">
            Note: I am only available at 3 PM and 6 PM in the study area.
          </p>

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
