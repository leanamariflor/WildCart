// components/LoginForm.js
import React, { useState } from "react";
import YellowPanel from "./YellowPanel";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in as ${username}`);
  };

  return (
    <div className="login-page-wrapper">
      {/* Left yellow panel */}
      <YellowPanel />

      {/* Right login form */}
      <form className="login-form" onSubmit={handleLogin}>
        <img
          src={require("../assets/favicon.png")}
          alt="WildCart Logo"
          className="small-logo"
        />
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
        <button type="submit" className="login-btn">
          Login
        </button>
        <p>Don't have an account yet?</p>
        <button type="button" className="signup-btn">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
