import React, { useState } from "react";
import {
  Search,
  HelpCircle,
  ShoppingCart,
  Settings,
  CheckSquare,
  Square,
  Plus,
  Minus,
} from "lucide-react";
import "../css/CartPage.css";
import favicon from "../../assets/favicon.png";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // ✅ for navigation

  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setSelectedProducts((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty >= 1) updateQuantity(id, newQty);
  };

  const selectedItems = cartItems.filter((item) =>
    selectedProducts.includes(item.id)
  );
  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

  // ✅ Go to checkout page
  const handleGoToCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one product to checkout.");
      return;
    }
    navigate("/checkout", { state: { selectedItems } });
  };

  return (
    <div className="cart-page">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              <button className="cart-button">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="header-button">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="cart-content">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`cart-item ${
                    selectedProducts.includes(item.id) ? "selected" : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />

                  <div className="cart-item-info-wrapper">
                    <h3>{item.name}</h3>
                    <p className="seller-name">{item.seller}</p>
                    <p className="price">₱ {item.price.toFixed(2)}</p>

                    <div className="quantity-wrapper">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <Minus />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            Number(e.target.value)
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions-right">
                    <button
                      className={`check-btn ${
                        selectedProducts.includes(item.id) ? "active" : ""
                      }`}
                      onClick={() => toggleSelect(item.id)}
                    >
                      {selectedProducts.includes(item.id) ? (
                        <CheckSquare className="check-icon active" />
                      ) : (
                        <Square className="check-icon" />
                      )}
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-cart">Your cart is empty.</p>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-box">
              {selectedItems.length > 0 ? (
                <>
                  {selectedItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₱ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="summary-item total">
                    <span>Total</span>
                    <span>₱ {total.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <p>No item selected.</p>
              )}
              <button className="checkout-btn" onClick={handleGoToCheckout}>
                Continue to checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
