import React, { useState, useContext } from "react";
import YellowPanel from "./YellowPanel";
import favicon from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import "../css/StudentSignup.css"; 
import { UserContext } from "../../context/UserContext";

const StudentSignup = () => {
  const navigate = useNavigate();
  const { setStudentData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",   // ⬅️ corrected naming
    lastName: "",    // ⬅️ corrected naming
    username: "",
    number: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // save data to global context
    setStudentData(formData);

    // go directly to profile
    navigate("/student_profile");
  };

  return (
    <div className="signup-container">
      <YellowPanel />

      <div className="right-panel">
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>SIGN-UP STUDENT</h2>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="studentId">STUDENT-ID</label>
            <input 
              type="text" 
              name="studentId" 
              value={formData.studentId} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">FIRSTNAME</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">LASTNAME</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">USERNAME</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="number">NUMBER</label>
              <input 
                type="text" 
                name="number" 
                value={formData.number} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <button type="button" className="btn confirm" onClick={handleConfirm}>
            CONFIRM
          </button>
          <button 
            type="button" 
            className="btn cancel" 
            onClick={() => navigate("/signup")}
          >
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;


/*import React from "react";
import YellowPanel from "./YellowPanel";
import favicon from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import "../css/StudentSignup.css"; 

const StudentSignup = () => {
    const navigate = useNavigate();
  
  return (
    <div className="signup-container">
       <YellowPanel />

      <div className="right-panel">
        <img src={favicon} alt="WildCart Logo" className="small-logo" />
        <h2>SIGN-UP STUDENT</h2>

        <form className="signup-form">
          <div className="form-group">
            <label>STUDENT-ID</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>FIRSTNAME</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>LASTNAME</label>
              <input type="text" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>USERNAME</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>NUMBER</label>
              <input type="text" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>PASSWORD</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>CONFIRM PASSWORD:</label>
              <input type="password" />
            </div>
          </div>

           <button
          type="button"
          className="btn confirm"
          onClick={() => navigate("/verify")}  
        >
            CONFIRM
          </button>
          <button
          type="button"
          className="btn cancel"
          onClick={() => navigate("/signup")}  
        >
         CANCEL
        </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
*/