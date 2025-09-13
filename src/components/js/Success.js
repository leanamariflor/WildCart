import React from "react";
import YellowPanel from "./YellowPanel";
import favicon from "../../assets/favicon.png";
import success from "../../assets/success.png";
import { useNavigate } from "react-router-dom";
import "../css/verify.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      {/* Left yellow panel */}
      <YellowPanel />

      {/* Right panel */}
      <div className="success-right">
        <img src={favicon} alt="WildCart Logo" className="small-logo" />

        <h2>VERIFICATION SUCCESSFUL</h2>

        <img src={success} alt="WildCart Logo" className="success" />

        <button className="get-started-btn" onClick={() => navigate("/login")}>
          GET STARTED!
        </button>
      </div>
    </div>
  );
};

export default Success;
