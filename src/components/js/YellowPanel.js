// components/YellowPanel.js
import React from "react";
import "../css/YellowPanel.css";
import logo from "../../assets/logo.png";

const YellowPanel = () => {
  return (
    <div className="yellow-panel">
      <img src={logo} alt="WildCart Logo" className="big-logo" />
    </div>
  );
};

export default YellowPanel;
