import React from "react";
import "../css/Signup.css";
import YellowPanel from "./YellowPanel";
import studentIcon from "../../assets/student.png"; 
import sellerIcon from "../../assets/seller.png"; 
import favicon from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <YellowPanel />

      <div className="signup-right">
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>SIGN UP</h2>
        <p>Pick if you are signing in as a:</p>

        <div className="role-options">
          <div className="role-card" onClick={() => navigate("/signup/student")}>
            <img src={studentIcon} alt="Student" />
            <span>STUDENT</span>
          </div>

          <div className="role-card" onClick={() => navigate("/signup/seller")}>
            <img src={sellerIcon} alt="Seller" />
            <span>SELLER</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
