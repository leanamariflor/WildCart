import React, { useState } from "react";
import YellowPanel from "./YellowPanel";
import favicon from "../../assets/favicon.png";
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
// StudentSignup.js (inside handleConfirm)
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
      // ✅ Move to login after success
      navigate("/login");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed: " + (error.response?.data || error.message));
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
