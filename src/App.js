import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudentSignup from "./components/Buyer/js/StudentSignup";
import StudentProfile from "./components/Buyer/js/StudentProfile";
import OrdersPage from "./components/Buyer/js/OrdersPage";
import CartPage from "./components/Buyer/js/CartPage";
import DoneOrdersPage from "./components/Shared/js/DoneOrdersPage";


import SellerSignup from "./components/Seller/js/SellerSignup";
import SellerProfile from "./components/Seller/js/SellerProfile";
import PostedPage from "./components/Seller/js/PostedPage";
import CreatePost from "./components/Seller/js/CreatePost";
import HeaderSeller from "./components/Seller/js/HeaderSeller";


import LandingPage from "./components/Shared/js/LandingPage";
import LoginForm from "./components/Shared/js/LoginForm";
import Signup from "./components/Shared/js/Signup";
import Verify from "./components/Shared/js/Verify";
import Success from "./components/Shared/js/Success";
import Home from "./components/Shared/js/Home";
import HelpPage from "./components/Shared/js/HelpPage";
import AboutPage from "./components/Shared/js/AboutPage";
import SettingsPage from "./components/Shared/js/SettingsPage";
import Header from "./components/Shared/js/Header";


import ProductsPage from "./components/Products/js/ProductsPage";
import ViewProduct from "./components/Products/js/ViewProduct";

import SecurityPage from "./components/Shared/js/SecurityPage";
import PrivacyPage from "./components/Shared/js/PrivacyPage";
import FeedbackPage from "./components/Shared/js/FeedbackPage";
import EarningPage from "./components/Shared/js/EarningPage";
import RulePage from "./components/Shared/js/RulePage";

import CheckoutPage from "./components/Products/js/CheckoutPage";

import { UserProvider } from "./context/UserContext";
import { SelectionProvider } from "./context/SelectionContext";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <SelectionProvider>
          <OrdersProvider>
            <CartProvider>
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
                <Route path="/done-orders" element={<DoneOrdersPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/viewproduct" element={<ViewProduct />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/posted" element={<PostedPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/create_post" element={<CreatePost />} />
                <Route path="/viewproduct/:id" element={<ViewProduct />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/earnings" element={<EarningPage />} />
                <Route path="/rules" element={<RulePage />} />
              </Routes>
            </CartProvider>
          </OrdersProvider>
        </SelectionProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
