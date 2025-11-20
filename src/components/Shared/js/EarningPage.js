import React from "react";
import Header from "./Header";
import "../css/EarningPage.css";
import favicon from "../../../assets/favicon.png";

const EarningsPage = () => {
  return (
    <div className="earnings-page">
      <Header />

      <div className="earnings-card">
        <h1 className="earnings-title">Earnings Overview</h1>

       
        <div className="summary-grid">

          <div className="summary-box">
            <h3>Total Earnings</h3>
            <p className="amount">₱1,450.00</p>
          </div>

          <div className="summary-box">
            <h3>Current Balance</h3>
            <p className="amount">₱850.00</p>
          </div>

          <div className="summary-box">
            <h3>Pending Earnings</h3>
            <p className="amount">₱600.00</p>
          </div>

          <div className="summary-box">
            <h3>Total Withdrawn</h3>
            <p className="amount">₱1,200.00</p>
          </div>
        </div>

    
        <div className="breakdown-section">
          <h2 className="breakdown-title">Earnings Breakdown</h2>

          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Today:</span>
              <p>₱120.00</p>
            </div>

            <div className="breakdown-item">
              <span>This Week:</span>
              <p>₱750.00</p>
            </div>

            <div className="breakdown-item">
              <span>This Month:</span>
              <p>₱1,450.00</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EarningsPage;
