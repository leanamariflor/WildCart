import React, { useContext } from "react";
import Header from "../../Shared/js/Header"; 
import "../css/SettingsPage.css";
import { Link, useNavigate } from "react-router-dom";
import gearIcon from "../../../assets/gear.png";
import { UserContext } from "../../../context/UserContext";
import { useCart } from "../../../context/CartContext";
import { useSelection } from "../../../context/SelectionContext";

function SettingsPage() {
  const navigate = useNavigate();
  const { setUser, setStudentData } = useContext(UserContext);
  const { clearCart: clearCartContext } = useCart();
  const { clearCart: clearSelectionCart } = useSelection();

  const handleLogout = () => {
    
    if (setUser) setUser(null);
    if (setStudentData) setStudentData(null);

    
    try {
      if (clearCartContext) clearCartContext();
      if (clearSelectionCart) clearSelectionCart();
      localStorage.removeItem("cartItems");
      localStorage.removeItem("orders");
      localStorage.removeItem("selectedRole");
      localStorage.removeItem("user");
      localStorage.removeItem("studentData");
    } catch (e) {
      console.warn("Error clearing local storage on logout:", e);
    }


    navigate("/");
  };
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
              <Link to="/rules" className="settings-btn">Rules</Link>
            </div>
            <div className="button-row">
              <Link to="/feedback" className="settings-btn">Feedbacks</Link>
              <Link to="/help" className="settings-btn">Help</Link>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
