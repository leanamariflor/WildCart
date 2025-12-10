import React, { useState, useContext } from "react";
import YellowPanel from "../../Shared/js/YellowPanel";
import { useNavigate } from "react-router-dom";   
import "../css/LoginForm.css";
import favicon from "../../../assets/favicon.png";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import DOMPurify from 'dompurify'; 

const LoginForm = () => {
  const { setUser } = useContext(UserContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); 
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();

    // Sanitize inputs before sending
    const sanitizedEmail = DOMPurify.sanitize(email.trim());
    const sanitizedPassword = password; // Don't sanitize password, just send as-is

    try {
      
      const endpoint = role === "seller"
        ? "http://localhost:8080/api/sellers/login"
        : "http://localhost:8080/api/buyers/login";

      const response = await axios.post(endpoint, {
        email: sanitizedEmail,
        password: sanitizedPassword
      });

      // Sanitize response data before using it
      const sanitizedUser = {
        id: response.data.id,
        email: DOMPurify.sanitize(response.data.email || ''),
        firstName: DOMPurify.sanitize(response.data.firstName || ''),
        lastName: DOMPurify.sanitize(response.data.lastName || ''),
        studentId: response.data.studentId ? DOMPurify.sanitize(response.data.studentId) : undefined,
        sellerId: response.data.sellerId ? DOMPurify.sanitize(response.data.sellerId) : undefined,
        number: response.data.number ? DOMPurify.sanitize(response.data.number) : undefined,
        role
      };

      alert("Login successful!");

     
      setUser(sanitizedUser);
      
      try {
        localStorage.setItem("user", JSON.stringify(sanitizedUser));
      } catch (e) {
        console.warn("Failed to persist user to localStorage");
      }
      localStorage.setItem("selectedRole", role);

      navigate("/home");

    } catch (error) {
      let errorMsg = "An error occurred during login. Please try again.";
      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          // Sanitize error message to prevent XSS
          errorMsg = DOMPurify.sanitize(error.response.data);
        } else if (error.response.data.errors) {
          const errors = error.response.data.errors.map(e => 
            DOMPurify.sanitize(e.defaultMessage || 'Validation error')
          );
          errorMsg = errors.join(", ");
        } else if (error.response.data.message) {
          errorMsg = DOMPurify.sanitize(error.response.data.message);
        }
      }
      console.error("Login failed");
      alert(errorMsg);
    }
  };

  return (
    <div className="login-page-wrapper">
      <YellowPanel />
      <form className="login-form" onSubmit={handleLogin}>
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>LOGIN</h2>

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-select"
        >
          <option value="student">Buyer</option>
          <option value="seller">Seller</option>
        </select>

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
