import React, { useState } from "react";
import "../css/CheckoutPage.css";
import { useCart } from "../../../context/CartContext";
import { useOrders } from "../../../context/OrdersContext";
import Header from "../../Shared/js/Header";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const { addOrder } = useOrders();

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handlePay = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await addOrder(cartItems);
      setShowPopup(true);
    } catch (err) {
      console.error("Failed to create order", err);
      alert("There was a problem creating your order. Please try again later.");
      return;
    }

    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-page">
      <Header />

      <main className="checkout-container">
        <section className="payment-section">
          <h1>Checkout</h1>
          <h3>Payment Method: Cash</h3>
          <button className="pay-btn" onClick={handlePay}>
            Pay ₱ {total.toFixed(2)}
          </button>
        </section>

        <section className="checkout-section">
          <h2>Your Cart</h2>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                {/* 🚀 FIXED — use safe image reference */}
                <img
                  src={item.imageUrls?.[0] || "/placeholder.png"}
                  alt={item.name}
                />

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.seller}</p>
                  <span>
                    ₱ {item.price.toFixed(2)} x {item.quantity}
                  </span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty.</p>
          )}
        </section>
      </main>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Payment Successful!</h2>

            <button
              className="popup-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
