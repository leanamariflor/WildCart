import React, { useState, useContext } from "react";
import YellowPanel from "../../Shared/js/YellowPanel";
import { useNavigate } from "react-router-dom";
import "../css/LoginForm.css";
import favicon from "../../../assets/favicon.png";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const savedRole = localStorage.getItem("selectedRole")
        ? String(localStorage.getItem("selectedRole")).toLowerCase()
        : null;

      
      let loginUrl = "";
      if (savedRole === "seller") {
        loginUrl = "http://localhost:8080/api/sellers/login";
      } else {
        loginUrl = "http://localhost:8080/api/buyers/login";
      }

      const response = await axios.post(loginUrl, {
        email: email,
        password: password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      alert("Login successful!");

     
      const finalRole = savedRole || "buyer"; 

      const userWithRole = { ...response.data, role: finalRole };
      setUser(userWithRole);

    
      if (finalRole === "seller") {
        navigate("/seller_profile");
      } else if (finalRole === "buyer" || finalRole === "student") {
        navigate("/home");
      } else {
        console.warn("Unknown role:", finalRole);
        navigate("/home");
      }

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="login-page-wrapper">
      <YellowPanel />
      <form className="login-form" onSubmit={handleLogin}>
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>LOGIN</h2>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="forgot-password">Forgot Password?</p>

        <button type="submit" className="login-btn">Login</button>

        <p>Don't have an account yet?</p>
        <button
          type="button"
          className="signup-btn"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
