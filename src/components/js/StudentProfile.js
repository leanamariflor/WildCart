import React, { useState } from "react";
import Header from "./Header";
import "../css/StudentProfile.css";
import { Link } from "react-router-dom";
const StudentProfile = () => {
  const ordersIcon = "https://cdn-icons-png.flaticon.com/512/1007/1007959.png";
  const orderHistoryIcon = "https://cdn-icons-png.flaticon.com/512/2822/2822537.png";

  // Profile info states
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Luna R. Rodriguez");
  const [studentId, setStudentId] = useState("21-0987-431");
  const [mobile, setMobile] = useState("09562315883");
  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/1200x/e8/d3/70/e8d370b7c8d07f1d74405dc9aa8346d9.jpg"
  );

  // Handle Edit Profile button toggle
  const handleEditClick = () => setIsEditing(!isEditing);

  // Handle Save
  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  // Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  // Click actions for cards
  const handleCardClick = (title) => {
    alert(`You clicked on "${title}"`);
  };

  return (
    <div className="profile-page">
      {/* Reusable Header */}
      <Header />

      {/* Main Content */}
      <div className="profile-container">
        {/* Left Section: Profile */}
        <div className="profile-left">
          <label htmlFor="profileUpload">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              title="Click to change photo"
            />
          </label>
          {isEditing && (
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          )}

          {isEditing ? (
            <>
              <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div>
                <button className="edit-profile-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-profile-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="profile-name">{name}</h2>
              <p className="profile-info">{studentId}</p>
              <p className="profile-info">Mobile No.: {mobile}</p>
              <button className="edit-profile-btn" onClick={handleEditClick}>
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Right Section: Actions */}
<div className="profile-right">
  <Link
    to="/cart"
    className="card"
    title="View your current orders"
  >
    <img src={ordersIcon} alt="Orders Icon" className="card-icon-img" />
    <h3>Orders</h3>
  </Link>

  <Link
    to = "/orders"
    className="card"
    title="View your order history"
  >
    <img
      src={orderHistoryIcon}
      alt="Order History Icon"
      className="card-icon-img"
    />
    <h3>Order History</h3>
  </Link>
</div>

      </div>
    </div>
  );
};

export default StudentProfile;
