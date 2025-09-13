import React from "react";
import YellowPanel from "./YellowPanel";
import { useNavigate } from "react-router-dom";
import "../css/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <YellowPanel />
      <div className="right-side">
        <h1>Welcome to WildCart!</h1>
        <p>Shop smart, shop fast. Your one-stop online marketplace.</p>
        <button className="get-started-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
