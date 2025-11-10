import React, { useState } from "react";
import Header from "./Header";
import "../css/SellerProfile.css";
import favicon from "../../assets/favicon.png"; // adjust path if needed

const SellerProfile = () => {
  const productsPostedIcon = "https://cdn-icons-png.flaticon.com/512/1950/1950373.png";
  const ordersReservationsIcon = "https://cdn-icons-png.flaticon.com/512/7841/7841177.png";
  const doneOrdersIcon = "https://cdn-icons-png.flaticon.com/512/3877/3877266.png";
  const postProductIcon = "https://cdn-icons-png.flaticon.com/512/3032/3032220.png";

  // ✅ State for interactivity
  const [isEditing, setIsEditing] = useState(false);
  const [seller, setSeller] = useState({
    name: "Sophia Cruz",
    id: "23-9756-345",
    mobile: "098643624443",
    image: "https://i.pinimg.com/1200x/e8/d3/70/e8d370b7c8d07f1d74405dc9aa8346d9.jpg",
  });

  // Handlers
  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setSeller((prev) => ({ ...prev, image: imgURL }));
    }
  };

  const handleCardClick = (title) => {
    alert(`You clicked on "${title}"`);
    // You can replace with a navigation later, e.g., navigate("/orders")
  };

  return (
    <div className="profile-page">
      <Header />

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

      {/* Main Content */}
      <div className="profile-container">
        {/* LEFT: Profile Info */}
        <div className="profile-left">
          <label htmlFor="sellerImageUpload">
            <img
              src={seller.image}
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
                value={seller.name}
                onChange={(e) =>
                  setSeller((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                className="input-field"
                value={seller.id}
                onChange={(e) =>
                  setSeller((prev) => ({ ...prev, id: e.target.value }))
                }
              />
              <input
                type="text"
                className="input-field"
                value={seller.mobile}
                onChange={(e) =>
                  setSeller((prev) => ({ ...prev, mobile: e.target.value }))
                }
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
              <h2 className="profile-name">{seller.name}</h2>
              <p className="profile-info">{seller.id}</p>
              <p className="profile-info">Mobile No.: {seller.mobile}</p>
              <button className="edit-profile-btn" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* RIGHT: Action Cards */}
        <div className="profile-right">
          <div
            className="card"
            onClick={() => handleCardClick("Products Posted")}
            title="View your posted products"
          >
            <img
              src={productsPostedIcon}
              alt="Products Posted"
              className="card-icon-img"
            />
            <h3>Products Posted</h3>
          </div>
          <div
            className="card"
            onClick={() => handleCardClick("Orders & Reservations")}
            title="Check pending orders"
          >
            <img
              src={ordersReservationsIcon}
              alt="Orders & Reservations"
              className="card-icon-img"
            />
            <h3>Orders & Reservations</h3>
          </div>
          <div
            className="card"
            onClick={() => handleCardClick("Done Orders")}
            title="View completed orders"
          >
            <img
              src={doneOrdersIcon}
              alt="Done Orders"
              className="card-icon-img"
            />
            <h3>Done Orders</h3>
          </div>
          <div
            className="card"
            onClick={() => handleCardClick("Post a Product")}
            title="Add a new product listing"
          >
            <img
              src={postProductIcon}
              alt="Post a Product"
              className="card-icon-img"
            />
            <h3>Post a Product</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
