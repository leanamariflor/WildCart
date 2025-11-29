import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchOrders, createOrder, createOrderItem } from "../api/api";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchOrders()
      .then((data) => {
        if (!mounted) return;
        const mapped = data.map((o) => ({
          id: o.orderId,
          name: o.orderName,
          status: o.status,
          amount: o.amount,
          address: o.address || "CIT University",
          date: o.date || new Date().toLocaleString(),
          delivery: o.delivery || "Processing",
        }));
        setOrders(mapped);
      })
      .catch(() => {
        const saved = localStorage.getItem("orders");
        setOrders(saved ? JSON.parse(saved) : []);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const addOrder = async (cartItems) => {
    const orderPayload = {
      orderName: cartItems.map((item) => item.name).join(", "),
      amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: "Pending",
    };

    try {
      const saved = await createOrder(orderPayload);
      const createdOrderId = saved.orderId || saved.id; 

      
      await Promise.all(
        cartItems.map((item) =>
          createOrderItem({
            orderId: createdOrderId,
            productName: item.name,
            quantity: item.quantity || 1,
            price: item.price,
          })
        )
      );

      const uiOrder = {
        id: createdOrderId,
        name: orderPayload.orderName,
        status: orderPayload.status,
        amount: orderPayload.amount,
        address: "CIT University",
        date: new Date().toLocaleString(),
        delivery: "Processing",
      };

      setOrders((prev) => [...prev, uiOrder]);

      
      try {
        localStorage.setItem("orders", JSON.stringify([...orders, uiOrder]));
      } catch (e) {
      
      }

      return uiOrder;
    } catch (err) {
      console.error("Error creating order on backend, falling back to local only: ", err);

      
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
      try {
        localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
      } catch (e) {}

      return newOrder;
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
