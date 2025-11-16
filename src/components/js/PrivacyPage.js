import React from "react";
import Header from "./Header";
import "../css/PrivacyPage.css";
import favicon from "../../assets/favicon.png";

const PrivacyPage = () => {
  return (
    <div className="privacy-page">
      <Header />

      <div className="privacy-card">
        <div className="privacy-header">
          <h1 className="privacy-title">Privacy Policy</h1>
        </div>

        {/* INTRODUCTION */}
        <section className="privacy-section">
          <h2 className="section-title">1. Introduction</h2>
          <p>
            Welcome to <strong>WildCart</strong>. We are committed to protecting your privacy 
            and ensuring a safe online experience.
          </p>
          <p>
            This Privacy Policy explains how WildCart collects, uses, and protects your 
            personal information when you use our platform.
          </p>
        </section>

        {/* INFORMATION WE COLLECT */}
        <section className="privacy-section">
          <h2 className="section-title">2. Information We Collect</h2>

          <h3 className="sub-title">A. Information Users Provide</h3>
          <ul>
            <li>Name</li>
            <li>Email Address</li>
            <li>Password</li>
            <li>Phone Number</li>
            <li>Student ID (if applicable)</li>
            <li>Uploaded Product Details</li>
            <li>Images</li>
          </ul>

          <h3 className="sub-title">B. Payment & Transaction Data</h3>
          <ul>
            <li>Items bought or sold</li>
            <li>Transaction time</li>
            <li>Payment method</li>
          </ul>
        </section>

        {/* HOW WE USE INFORMATION */}
        <section className="privacy-section">
          <h2 className="section-title">3. How We Use Your Information</h2>
          <ul>
            <li>To create and manage your account</li>
            <li>To process transactions</li>
            <li>To post your products</li>
            <li>To display listings to buyers</li>
            <li>To improve platform features</li>
            <li>To communicate important updates</li>
            <li>To detect and prevent fraud</li>
            <li>For customer support</li>
            <li>For analytics and performance monitoring</li>
          </ul>
        </section>

        {/* SHARING OF INFORMATION */}
        <section className="privacy-section">
          <h2 className="section-title">4. Sharing of Information</h2>

          <h3 className="sub-title">A. With Other Users</h3>
          <p>Sellers’ name and contact info may be shown to buyers for transaction purposes.</p>

          <h3 className="sub-title">B. With Service Providers</h3>
          <p>Such as cloud hosting providers, analytics tools, and payment processors.</p>

          <h3 className="sub-title">C. For Legal Compliance</h3>
          <p>We may disclose data if required by law or government request.</p>

          <h3 className="sub-title">D. Never Sold</h3>
          <p>We do <strong>not</strong> sell your personal information to any third parties.</p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPage;
