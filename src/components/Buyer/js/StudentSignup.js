import React, { useState } from "react";
import YellowPanel from "../../Shared/js/YellowPanel";
import favicon from "../../../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import "../css/StudentSignup.css";
import axios from "axios";

const StudentSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/buyers/register", {
        studentId: formData.studentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        number: formData.number,
        password: formData.password
      });

      console.log(response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      let errorMsg = "Unknown error";
      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          errorMsg = error.response.data;
        } else if (error.response.data.errors) {
          errorMsg = error.response.data.errors.map(e => e.defaultMessage || JSON.stringify(e)).join("\n");
        } else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        } else {
          errorMsg = JSON.stringify(error.response.data);
        }
      } else {
        errorMsg = error.message;
      }
      console.error("Registration failed:", errorMsg);
      alert("Registration failed: " + errorMsg);
    }
  };

  return (
    <div className="signup-container">
      <YellowPanel />
      <div className="right-panel">
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>SIGN-UP STUDENT</h2>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>STUDENT-ID</label>
            <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>FIRSTNAME</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>LASTNAME</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>EMAIL</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>NUMBER</label>
              <input type="text" name="number" value={formData.number} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>PASSWORD</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CONFIRM PASSWORD</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          <button type="button" className="btn confirm" onClick={handleConfirm}>
            CONFIRM
          </button>
          <button type="button" className="btn cancel" onClick={() => navigate("/signup")}>
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
