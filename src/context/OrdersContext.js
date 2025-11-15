// OrdersContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (cartItems) => {
    const newOrder = {
      id: Date.now(), 
      name: cartItems.map((item) => item.name).join(", "),
      status: "Pending",
      amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      address: "CIT University",
      date: new Date().toLocaleString(),
      delivery: "Processing",
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
