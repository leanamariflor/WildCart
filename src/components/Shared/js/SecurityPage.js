import React from "react";
import Header from "./Header";
import "../css/SecurityPage.css";
import favicon from "../../assets/favicon.png";

const SecurityPage = () => {
  return (
    <div className="security-page">
      <Header />

      <div className="security-card">
        <div className="security-header">
          <h1 className="security-title">Security</h1>
        </div>

        {/* INTRODUCTION */}
        <section className="security-section">
          <h2 className="section-title">1. Introduction</h2>
          <p>
            At <strong>WildCart</strong>, we prioritize the safety and privacy of all students using our platform. 
            This Security Page outlines the measures we take to protect accounts, data, and transactions.
          </p>
        </section>

        {/* ACCOUNT SECURITY */}
        <section className="security-section">
          <h2 className="section-title">2. Account Security</h2>
          <ul>
            <li>All passwords are hashed before storage to ensure they cannot be accessed by anyone, including administrators.</li>
            <li>Secure login process with session management and logout protection.</li>
            <li>Rate limiting is applied to prevent brute force attacks.</li>
            <li>We encourage users to create strong, unique passwords.</li>
          </ul>
        </section>

        {/* FACE-TO-FACE TRANSACTION SAFETY */}
        <section className="security-section">
          <h2 className="section-title">3. Safety During Face-to-Face Transactions</h2>
          <ul>
            <li>Meet only in school grounds or approved areas.</li>
            <li>Prefer well-lit, populated areas for meetups.</li>
            <li>Never share sensitive personal information.</li>
            <li>Always confirm the product before making payment.</li>
          </ul>
          <p className="safety-label">WildCart encourages safe in-school meetups only.</p>
        </section>

        {/* SYSTEM MONITORING */}
        <section className="security-section">
          <h2 className="section-title">4. System Monitoring</h2>
          <ul>
            <li>Suspicious login attempts are monitored.</li>
            <li>Abnormal posting behaviors are flagged.</li>
            <li>Large numbers of canceled orders are reviewed.</li>
            <li>Reports of abuse or fraud are investigated.</li>
          </ul>
        </section>

        {/* DEVICE & BROWSER RECOMMENDATIONS */}
        <section className="security-section">
          <h2 className="section-title">5. Device & Browser Recommendations</h2>
          <ul>
            <li>Keep your device and browser updated.</li>
            <li>Do not share your password with anyone.</li>
            <li>Use strong, unique passwords for your account.</li>
            <li>Avoid using public or unsafe Wi-Fi networks.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SecurityPage;
