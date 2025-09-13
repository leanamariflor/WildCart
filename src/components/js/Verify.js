import React, { useEffect, useState } from "react";
import "../css/verify.css";
import YellowPanel from "./YellowPanel";
import favicon from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [status, setStatus] = useState("waiting"); // "waiting" | "verified"
  const navigate = useNavigate();

  useEffect(() => {
    // After 3 seconds, change status to verified and navigate
    const timer = setTimeout(() => {
      setStatus("verified");
      navigate("/success");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="signup-container">
      <YellowPanel />

      <div className="signup-right">
        <img src={favicon} alt="WildCart Logo" className="small-logo" />

        {status === "waiting" && (
          <>
            <h2>WAITING FOR</h2>
            <h2>VERIFICATION</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
