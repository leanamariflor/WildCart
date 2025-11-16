
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Header from "../../Shared/js/Header";
import axios from "axios";
import defaultAvatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import "../css/StudentProfile.css";

const StudentProfile = () => {
  const ordersIcon = "https://cdn-icons-png.flaticon.com/512/1007/1007959.png";
  const orderHistoryIcon = "https://cdn-icons-png.flaticon.com/512/2822/2822537.png";
  const { user } = useContext(UserContext); // logged-in user from context
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Local states for editing
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:8080/api/buyers/${user.id}`)
        .then((res) => {
          setProfile(res.data);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setStudentId(res.data.studentId);
          setMobile(res.data.number);
        })
        .catch((err) => console.error("Error fetching profile:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      firstName,
      lastName,
      studentId,
      number: mobile,
    };

    axios
      .put(`http://localhost:8080/api/buyers/${user.id}`, updatedProfile)
      .then((res) => {
        setProfile(res.data);
        alert("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Failed to update profile");
      });
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Please log in to see your profile.</p>;

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <div className="profile-left">

          <img
          src={defaultAvatar}
          alt="Profile Avatar"
          className="profile-image"
          />
          {isEditing ? (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input-field"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="input-field"
              />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student ID"
                className="input-field"
              />
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                className="input-field"
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
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="profile-info">Student ID: {profile.studentId}</p>
              <p className="profile-info">Mobile: {profile.number}</p>
              <button className="edit-profile-btn" onClick={handleEditClick}>
                Edit Profile
              </button>
            </>
          )}
        </div>

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




