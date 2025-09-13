import React from "react";
import YellowPanel from "./YellowPanel";
import favicon from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import "../css/StudentSignup.css";

const SellerSignup = () => {
    const navigate = useNavigate();
  
  return (
    <div className="signup-container">
       <YellowPanel />

      {/* Right Panel */}
      <div className="right-panel">
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>SIGN-UP SELLER</h2>

        <form className="signup-form">
          <div className="form-group">
            <label>STUDENT-ID</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>FIRSTNAME</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>LASTNAME</label>
              <input type="text" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>USERNAME</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>NUMBER</label>
              <input type="text" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>PASSWORD</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>CONFIRM PASSWORD:</label>
              <input type="password" />
            </div>
          </div>

           <button
          type="button" className="btn confirm" onClick={() => navigate("/verify")}  
        >
            CONFIRM
          </button>
          <button
          type="button"
          className="btn cancel"
          onClick={() => navigate("/signup")}  
        >
         CANCEL
        </button>
        </form>
      </div>
    </div>
  );
};

export default SellerSignup;
