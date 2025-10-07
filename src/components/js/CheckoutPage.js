import React, { useState } from "react";
import "../css/CheckoutPage.css";
import { useCart } from "../../context/CartContext";
import Header from "./Header"; 


export default function CheckoutPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handlePay = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Show popup
    setShowPopup(true);
    // Optional: clear cart after a delay
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
  <Header />      

      {/* MAIN CONTENT */}
      <main className="checkout-container">
        {/* Payment Section */}
        <section className="payment-section">
          <h1>Checkout</h1>
          <h3>Payment Method: Cash</h3>
          <button className="pay-btn" onClick={handlePay}>
            Pay ₱ {total.toFixed(2)}
          </button>
        </section>

        {/* Cart Section */}
        <section className="cart-section">
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.seller}</p>
                  <span>₱ {item.price.toFixed(2)} x {item.quantity}</span>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty.</p>
          )}
        </section>
      </main>

      {/* PAYMENT SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>✅ Payment Successful!</h2>
            <p>Your cash payment has been received.</p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
