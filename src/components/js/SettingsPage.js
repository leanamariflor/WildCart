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
              <button className="settings-btn">Security</button>
            </div>
            <div className="button-row">
              <button className="settings-btn">Privacy</button>
              <button className="settings-btn">Earnings</button>
            </div>
            <div className="button-row">
              <button className="settings-btn">Feedbacks</button>
              <button className="settings-btn">Rules</button>
            </div>
          </div>
          <button className="logout-btn">LOGOUT</button>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
