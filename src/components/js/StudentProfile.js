import React from "react";
import Header from "./Header";
 // import the reusable Header
import "../css/StudentProfile.css";

const StudentProfile = () => {
  const ordersIcon = "https://cdn-icons-png.flaticon.com/512/1007/1007959.png";
  const orderHistoryIcon = "https://cdn-icons-png.flaticon.com/512/2822/2822537.png";

  return (
    <div className="profile-page">
      {/* Reusable Header */}
      <Header />

      {/* Main Content */}
      <div className="profile-container">
        {/* Left Section: Profile */}
        <div className="profile-left">
          <img
            src="https://i.pinimg.com/1200x/e8/d3/70/e8d370b7c8d07f1d74405dc9aa8346d9.jpg"
            alt="Profile"
            className="profile-image"
          />
          <h2 className="profile-name">Luna R. Rodriguez</h2>
          <p className="profile-info">21-0987-431</p>
          <p className="profile-info">Mobile No.: 09562315883</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        {/* Right Section: Actions */}
        <div className="profile-right">
          <div className="card">
            <img src={ordersIcon} alt="Orders Icon" className="card-icon-img" />
            <h3>Orders</h3>
          </div>
          <div className="card">
            <img src={orderHistoryIcon} alt="Order History Icon" className="card-icon-img" />
            <h3>Order History</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
