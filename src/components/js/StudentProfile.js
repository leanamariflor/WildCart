import React, { useContext } from "react";
import "../css/StudentProfile.css";
import { UserContext } from "../../context/UserContext";
import favicon from "../../assets/favicon.png"; // adjust path if needed

const StudentProfile = () => {
  const { studentData } = useContext(UserContext);

  if (!studentData) {
    return <p>No student data found. Please sign up first.</p>;
  }
   // <-- Define icons here
  const ordersIcon = "https://cdn-icons-png.flaticon.com/512/1007/1007959.png";
  const orderHistoryIcon = "https://cdn-icons-png.flaticon.com/512/2822/2822537.png";

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
          <h2 className="profile-name">
            {studentData.firstName} {studentData.lastName}
          </h2>
          <p className="profile-info">{studentData.studentId}</p>
          <p className="profile-info">
            Mobile No. {studentData.number}
          </p>
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



/*import React from "react";
import "../css/StudentProfile.css";

const StudentProfile = () => {
  return (
    <div className="profile-page">
   
      <div className="profile-header">
        <div className="header-left">
          <span className="logo">🦁</span>
        </div>
        <div className="header-right">
          <button className="help-btn">Help</button>
          <button className="cart-btn">🛒</button>
          <button className="settings-btn">⚙️</button>
        </div>
      </div>

    
      <div className="profile-content">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">Sophia A. Cruz</h2>
        <p className="profile-info">21-0987-431</p>
        <p className="profile-info">
          Mobile No. <a href="tel:09562315883">09562315883</a>
        </p>
        <button className="edit-btn">Edit Profile</button>

        <div className="order-section">
          <div className="order-card">
            <span className="order-icon">🛍️</span>
            <p>Orders</p>
          </div>
          <div className="order-card">
            <span className="order-icon">📝</span>
            <p>Order History</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
*/
