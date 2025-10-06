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
import ProductsPage from './components/js/ProductsPage';
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <UserProvider>
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
         
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/js/LandingPage";
import LoginForm from "./components/js/LoginForm";
import Signup from "./components/js/Signup";
import StudentSignup from "./components/js/StudentSignup";
import SellerSignup from "./components/js/SellerSignup";
import Verify from "./components/js/Verify";
import Success from "./components/js/Success";
import StudentProfile from "./components/js/StudentProfile";
import { UserProvider } from "./context/UserContext";

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
         <Route path="/get-started-btn" element={<LoginForm />} />
         <Route path="/student_profile" element={<StudentProfile />} /> 
      </Routes>
    </Router>
  );
}
// leana gwapa
export default App;
*/