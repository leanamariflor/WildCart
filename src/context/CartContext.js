import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Optional: Replace these with API calls to Spring Boot later
  const fetchCart = async () => {
    // Example: fetch(`http://localhost:8080/api/cart/${userId}`)
    //  .then(res => res.json())
    //  .then(data => setCartItems(data));
    // For now, do nothing (localStorage already has cart)
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // Update quantity if exists
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prev, item];
      }
    });
    fetchCart(); // placeholder for backend sync
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    fetchCart(); // placeholder
  };

  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
    fetchCart(); // placeholder
  };

  const clearCart = () => {
    setCartItems([]);
    fetchCart(); // placeholder
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart, // optional
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook for easy use
export const useCart = () => useContext(CartContext);
