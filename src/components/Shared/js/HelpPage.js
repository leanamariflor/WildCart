import React from "react";
import Header from "./Header";
import "../css/HelpPage.css";
import favicon from "../../../assets/favicon.png"; 

const HelpPage = () => {
  return (
    <div className="help-page">
      <Header />
      <div className="help-header">
        <div className="header-left">
          <img src={favicon} alt="WildCart Logo" className="small-logo" />
        </div>
        <div className="header-right">
          <button className="help-btn">Help</button>
          <button className="profile-btn">Profile</button>
          <button className="cart-btn"><span className="icon">🛒</span></button>
          <button className="settings-btn"><span className="icon">⚙️</span></button>
        </div>
      </div>

      <div className="help-container">
     
        <div className="help-left">
          <h2 className="section-title">HELP</h2>
          <label htmlFor="concern-select" className="label">What is your concern?</label>
          <select id="concern-select" className="dropdown">
            <option value="">Select a concern</option>
            <option value="login">Login Issues</option>
            <option value="payment">Payment Problems</option>
            <option value="technical">Technical Support</option>
          </select>
          <button className="tutorial-btn">Tutorial on how to use the Website</button>
          <button className="password-btn">How to change password</button>
        </div>

    
        <div className="help-right">
          <h2 className="section-title">TO:</h2>
           <input type="text" className="to-input" />
          <textarea
            className="concern-textarea"
            placeholder="Please type your concerns here..."
          ></textarea>
          <button className="submit-btn">SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;