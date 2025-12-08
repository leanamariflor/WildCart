import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Categories
export async function fetchCategories() {
  const res = await api.get('/category/getAllCategory');
  // Map backend CategoryEntity -> { id, name }
  return res.data.map((c) => ({ id: c.categoryId ?? c.id, name: c.name }));
}

// Orders
export async function fetchOrders() {
  const res = await api.get('/order/getAllOrders');
  return res.data;
}

export async function createOrder(order) {
  // order should be { orderName, amount, status }
  const res = await api.post('/order/insertOrder', order);
  return res.data;
}

// Order items
export async function createOrderItem(item) {
  // item should be { orderId, productName, quantity, price }
  const res = await api.post('/orderitem/insertOrderItem', item);
  return res.data;
}

export async function fetchOrderItemsByOrderId(orderId) {
  const res = await api.get(`/orderitem/getByOrderId?orderId=${orderId}`);
  return res.data;
}

// Cart
export async function addToCart(cartId, productId, quantity = 1) {
  const res = await api.post('/api/carts/addToCart', { cartId, productId, quantity });
  return res.data;
}

export async function getCart(cartId) {
  const res = await api.get(`/api/carts/${cartId}`);
  return res.data;
}

export async function getCartItems(cartId) {
  const res = await api.get(`/api/carts/${cartId}/items`);
  return res.data;
}

export async function deleteCartItem(cartItemId) {
  const res = await api.delete(`/api/cart-items/${cartItemId}`);
  return res.data;
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const res = await api.put(`/api/cart-items/${cartItemId}`, { quantity });
  return res.data;
}

export async function createPayment(payment) {
  const res = await api.post("/payment/create", payment);
  return res.data;
}


export default api;
