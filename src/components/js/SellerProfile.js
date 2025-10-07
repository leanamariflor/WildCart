import React from "react";
import Header from "./Header";
import "../css/SellerProfile.css";
import favicon from "../../assets/favicon.png"; // adjust path if needed

const SellerProfile = () => {

   const productsPostedIcon = "https://cdn-icons-png.flaticon.com/512/1950/1950373.png";
  const ordersReservationsIcon = "https://cdn-icons-png.flaticon.com/512/7841/7841177.png";
  const doneOrdersIcon = "https://cdn-icons-png.flaticon.com/512/3877/3877266.png";
  const postProductIcon = "https://cdn-icons-png.flaticon.com/512/3032/3032220.png";

  return (
    <div className="profile-page">
       <Header />  {/* header first */}
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
          <h2 className="profile-name">Sophia Cruz</h2>
          <p className="profile-info">23-9756-345</p>
          <p className="profile-info">Mobile No.: 098643624443</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        {/* Right Section: Actions */}
        <div className="profile-right">
          <div className="card">
           <img src={productsPostedIcon} alt="Products Posted" className="card-icon-img" />
            <h3>Products Posted</h3>
          </div>
          <div className="card">
             <img src={ordersReservationsIcon} alt="Orders & Reservations" className="card-icon-img" />
            <h3>Orders & Reservations</h3>
          </div>
          <div className="card">
           <img src={doneOrdersIcon} alt="Done Orders" className="card-icon-img" />
            <h3>Done Orders</h3>
          </div>
          <div className="card">
             <img src={postProductIcon} alt="Post a Product" className="card-icon-img" />
            <h3>Post a Product</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
