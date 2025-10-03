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

function App() {
  return (
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
         <Route path="/home" element={<Home />} />

         
      </Routes>
    </Router>
  );
}

export default App;
