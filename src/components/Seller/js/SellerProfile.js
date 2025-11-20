import React, { useState, useEffect, useContext } from "react";
import HeaderSeller from "./HeaderSeller";
import "../css/SellerProfile.css";
import { Link } from "react-router-dom";
import axios from "axios";

import favicon from "../../../assets/favicon.png";
import defaultAvatar from "../../../assets/avatar.png";
import { UserContext } from "../../../context/UserContext";

const SellerProfile = () => {
  const productsPostedIcon = "https://cdn-icons-png.flaticon.com/512/1950/1950373.png";
  const ordersReservationsIcon = "https://cdn-icons-png.flaticon.com/512/7841/7841177.png";
  const doneOrdersIcon = "https://cdn-icons-png.flaticon.com/512/3877/3877266.png";
  const postProductIcon = "https://cdn-icons-png.flaticon.com/512/3032/3032220.png";

  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(defaultAvatar);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:8080/api/sellers/${user.id}`)
        .then((res) => {
          setProfile(res.data);
          setFirstName(res.data.firstName || "");
          setLastName(res.data.lastName || "");
          setSellerId(res.data.sellerId || "");
          setMobile(res.data.number || "");
        })
        .catch((err) => console.error("Error fetching seller profile:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    console.log("SellerProfile user:", user);
    console.log("SellerProfile profile:", profile);
  }, [user, profile]);

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = () => {
    if (!user?.id) {
      alert("No user logged in");
      return;
    }

    const updatedSeller = {
      ...profile,
      firstName,
      lastName,
      sellerId,
      number: mobile,
    };

    console.log("Updating seller. URL:", `http://localhost:8080/api/sellers/${user.id}`);
    console.log("Updating seller. Payload:", updatedSeller);

    axios
      .put(`http://localhost:8080/api/sellers/${user.id}`, updatedSeller)
      .then((res) => {
        setProfile(res.data);
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating seller:", err);
        const status = err?.response?.status;
        const respData = err?.response?.data;
        const msg = `Failed to update profile${status ? ` (status ${status})` : ''}: ${respData || err.message}`;
        alert(msg);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
    }
  };

  const handleCardClick = (title) => {
    alert(`You clicked on "${title}"`);
   
  };

  return (
    <div className="profile-page">
      <HeaderSeller />

      <div className="profile-header">
        <div className="header-left">
          <img src={favicon} alt="WildCart Logo" className="small-logo" />
        </div>
        <div className="header-right">
          <button className="help-btn">Help</button>
          <button className="profile-btn">Profile</button>
          <button className="cart-btn">
            <span className="icon">🛒</span>
          </button>
          <button className="settings-btn">
            <span className="icon">⚙️</span>
          </button>
        </div>
      </div>

     
      <div className="profile-container">
       
        <div className="profile-left">
          <label htmlFor="sellerImageUpload">
            <img
              src={image || defaultAvatar}
              alt="Seller"
              className="profile-image"
              title={isEditing ? "Click to change image" : ""}
              style={{ cursor: isEditing ? "pointer" : "default" }}
            />
          </label>
          {isEditing && (
            <input
              id="sellerImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          )}

          {isEditing ? (
            <>
              <input
                type="text"
                className="input-field"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Seller ID"
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Mobile Number"
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
              <h2 className="profile-name">
                {profile ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() : 'Seller'}
              </h2>
              <p className="profile-info">Seller ID: {profile?.sellerId || user?.sellerId || sellerId}</p>
              <p className="profile-info">Mobile: {profile?.number || mobile}</p>
              <button className="edit-profile-btn" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </>
          )}
        </div>

     
        <div className="profile-right">
          <Link
          to="/posted"
            className="card"
            title="View your posted products"
          >
            <img
              src={productsPostedIcon}
              alt="Products Posted"
              className="card-icon-img"
              />
            <h3>Products Posted</h3>
            </Link>
          
          <Link
          to="/orders"
            className="card"
            title="Check pending orders"
          >
            <img
              src={ordersReservationsIcon}
              alt="Orders & Reservations"
              className="card-icon-img"
            />
            <h3>Orders & Reservations</h3>
          </Link>
          <Link
          to="/done-orders"
            className="card"
            title="View completed orders"
          >
            <img
              src={doneOrdersIcon}
              alt="Done Orders"
              className="card-icon-img"
            />
            <h3>Done Orders</h3>
          </Link>
          <Link
          to="/create_post"
            className="card"
            title="Add a new product listing"
          >
            <img
              src={postProductIcon}
              alt="Post a Product"
              className="card-icon-img"
            />
            <h3>Post a Product</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
