import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchOrders, createOrder, createOrderItem } from "../api/api";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // load orders from backend (falls back to localStorage if backend fails)
  useEffect(() => {
    let mounted = true;
    fetchOrders()
      .then((data) => {
        if (!mounted) return;
        // map backend OrderEntity to UI shape used by the app
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
        // fallback to localStorage (previous behavior)
        const saved = localStorage.getItem("orders");
        setOrders(saved ? JSON.parse(saved) : []);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const addOrder = async (cartItems) => {
    // Build payload expected by backend
    const orderPayload = {
      orderName: cartItems.map((item) => item.name).join(", "),
      amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: "Pending",
    };

    try {
      const saved = await createOrder(orderPayload);
      const createdOrderId = saved.orderId || saved.id; // backend returns orderId

      // create order items in backend
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

      // push to local state (UI-friendly shape)
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

      // update local storage as a fallback store
      try {
        localStorage.setItem("orders", JSON.stringify([...orders, uiOrder]));
      } catch (e) {
        // ignore storage errors
      }

      return uiOrder;
    } catch (err) {
      console.error("Error creating order on backend, falling back to local only: ", err);

      // fallback: create locally (previous behavior)
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
