import React, { createContext, useContext, useState, useEffect } from "react";
import { addToCart as addToCartAPI, getCartItems, deleteCartItem } from "../api/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(() => {
    try {
      const saved = localStorage.getItem("cartId");
      return saved ? parseInt(saved) : null;
    } catch {
      return null;
    }
  });

  // Load stored cart safely
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart state
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (cartId) {
      localStorage.setItem("cartId", cartId.toString());
    }
  }, [cartItems, cartId]);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!cartId) return;
    try {
      const items = await getCartItems(cartId);
      // Map backend cart items to frontend format
      const mapped = items.map(item => ({
        id: item.product.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        seller: item.product.seller,
        imageUrls: item.product.imageUrls || [],
        cartItemId: item.cartItemId, // Store backend cart item ID
      }));
      setCartItems(mapped);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, [cartId]);

  // ADD ITEM TO CART
  const addToCart = async (item) => {
    try {
      // Call backend API
      const response = await addToCartAPI(cartId, item.id, item.quantity || 1);
      
      // Update cartId if new cart was created
      if (response.cartId && !cartId) {
        setCartId(response.cartId);
      }

      // Update local state
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);

        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1), cartItemId: response.cartItem.cartItemId }
              : i
          );
        } else {
          return [
            ...prev,
            {
              ...item,
              quantity: item.quantity || 1,
              imageUrls: Array.isArray(item.imageUrls) ? item.imageUrls : [],
              cartItemId: response.cartItem.cartItemId,
            },
          ];
        }
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      // Fallback to local storage only
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);

        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        } else {
          return [
            ...prev,
            {
              ...item,
              quantity: item.quantity || 1,
              imageUrls: Array.isArray(item.imageUrls) ? item.imageUrls : [],
            },
          ];
        }
      });
    }
  };

  // REMOVE ITEM
  const removeFromCart = async (id) => {
    const item = cartItems.find(i => i.id === id);
    
    if (item?.cartItemId) {
      try {
        await deleteCartItem(item.cartItemId);
      } catch (err) {
        console.error("Error deleting cart item from backend:", err);
      }
    }
    
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // UPDATE QUANTITY
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    // Note: You might want to delete the cart from backend here too
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

