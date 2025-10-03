import React from "react";
import "../css/SellerProfile.css";
import favicon from "../../assets/favicon.png"; // adjust path if needed

const SellerProfile = () => {
  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
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

      {/* Main Content */}
      <div className="profile-container">
        {/* Left Section: Profile */}
        <div className="profile-left">
          <img
            src="https://i.pinimg.com/1200x/e8/d3/70/e8d370b7c8d07f1d74405dc9aa8346d9.jpg"
            alt="Profile"
            className="profile-image"
          />
          <h2 className="profile-name">Seller Name</h2>
          <p className="profile-info">Store Name: Sample Store</p>
          <p className="profile-info">Mobile No. 09XX-XXX-XXXX</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        {/* Right Section: Actions */}
        <div className="profile-right">
          <div className="card">
            <span className="card-icon">📦</span>
            <h3>Products Posted</h3>
          </div>
          <div className="card">
            <span className="card-icon">📑</span>
            <h3>Orders & Reservations</h3>
          </div>
          <div className="card">
            <span className="card-icon">✔</span>
            <h3>Done Orders</h3>
          </div>
          <div className="card">
            <span className="card-icon">＋</span>
            <h3>Post a Product</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
