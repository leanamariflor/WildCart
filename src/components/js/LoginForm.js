import React, { useState } from "react";
import YellowPanel from "./YellowPanel";
import { useNavigate } from "react-router-dom";   
import "../css/LoginForm.css";
import favicon from "../../assets/favicon.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();  

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in as ${username}`);
  };

  return (
    <div className="login-page-wrapper">
      <YellowPanel />
      <form className="login-form" onSubmit={handleLogin}>
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>LOGIN</h2>

        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
