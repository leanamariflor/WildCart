import React from "react";
import Header from "./Header";
import "../css/SettingsPage.css";
import { Link } from "react-router-dom";
import gearIcon from "../../assets/gear.png";

function SettingsPage() {
  return (
    <div className="settings-container">
      <Header />

      <main className="settings-main">
        <div className="settings-left">
          <img src={gearIcon} alt="Settings Gear" className="settings-gear" />
        </div>

        <div className="settings-right">
          <div className="settings-buttons">
            <div className="button-row">
              <Link to="/about" className="settings-btn">About Us</Link>
              <Link to="/security" className="settings-btn">Security</Link>
            </div>
            <div className="button-row">
              <Link to="/privacy" className="settings-btn">Privacy</Link>
              <Link to="/earnings" className="settings-btn">Earnings</Link>
            </div>
            <div className="button-row">
              <Link to="/feedback" className="settings-btn">Feedbacks</Link>
              <Link to="/rules" className="settings-btn">Rules</Link>
            </div>
          </div>
          <button className="logout-btn">LOGOUT</button>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
