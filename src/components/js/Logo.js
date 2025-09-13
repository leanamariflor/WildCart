// components/Logo.js
import React from "react";
import logo from "../assets/logo.png"; // place your uploaded image here

const Logo = () => {
  return <img src={logo} alt="WildCart Logo" className="logo-image" />;
};

export default Logo;
