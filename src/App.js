import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/js/LandingPage";
import LoginForm from "./components/js/LoginForm";
import Signup from "./components/js/Signup";
import StudentSignup from "./components/js/StudentSignup";
import SellerSignup from "./components/js/SellerSignup";
import Verify from "./components/js/Verify";
import Success from "./components/js/Success";
import Home from "./components/js/Home";
import StudentProfile from "./components/js/StudentProfile";
import SellerProfile from "./components/js/SellerProfile";
import ProductsPage from "./components/js/ProductsPage";
import OrdersPage from "./components/js/OrdersPage";
import CartPage from "./components/js/CartPage";
import ViewProduct from "./components/js/ViewProduct";
import CheckoutPage from "./components/js/CheckoutPage";
import Header from "./components/js/Header";
import HelpPage from "./components/js/HelpPage";
import PostedPage from "./components/js/PostedPage";
import AboutPage from "./components/js/AboutPage";
import { UserProvider } from "./context/UserContext";
import { SelectionProvider } from "./context/SelectionContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <UserProvider>
      <SelectionProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup/student" element={<StudentSignup />} />
              <Route path="/signup/seller" element={<SellerSignup />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/success" element={<Success />} />
              <Route path="/get-started-btn" element={<LoginForm />} />
              <Route path="/seller_profile" element={<SellerProfile />} />
              <Route path="/student_profile" element={<StudentProfile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/view-product" element={<ViewProduct />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/posted" element={<PostedPage />} />
              <Route path="/about" element={<AboutPage />} />

            </Routes>
          </Router>
        </CartProvider>
      </SelectionProvider>
    </UserProvider>
  );
}

export default App;
