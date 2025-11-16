import React, { useState } from "react";
import Header from "./Header";
import "../css/RulePage.css";

const RulesPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const rulesData = [
    {
      title: "1. Introduction",
      content: `Welcome to Wildcart! To ensure a safe, fair, and enjoyable marketplace for all students, please follow these rules when buying or selling on our platform.`
    },
    {
      title: "2. General Rules",
      content: [
        "Only registered students may use Wildcart.",
        "All products must be suitable for school and campus environment.",
        "Users must provide accurate personal and product information.",
        "No impersonation of other users.",
        "Users must respect others and communicate politely."
      ]
    },
    {
      title: "3. Buying Rules",
      content: [
        "Buyers must confirm meet-up and payment in person (FTF).",
        "Buyers should inspect products before paying.",
        "No false complaints or fake claims.",
        "Do not harass sellers for unavailable items."
      ]
    },
    {
      title: "4. Selling Rules",
      content: [
        "Sellers must post accurate product descriptions.",
        "No prohibited or unsafe items (e.g., weapons, alcohol).",
        "Sellers must meet buyers at agreed school locations.",
        "Payments are FTF only — do not request online transfers.",
        "Sellers must update order status after transaction completion."
      ]
    },
    {
      title: "5. Order & Payment Rules",
      content: [
        "All payments must be done face-to-face.",
        "Orders must be confirmed as Paid only after receiving money.",
        "Cancelled orders must be marked properly.",
        "Refunds, if applicable, are the seller’s responsibility."
      ]
    },
    {
      title: "6. Feedback & Review Rules",
      content: [
        "Feedback should be honest and constructive.",
        "Do not post offensive or false reviews.",
        "Report suspicious reviews or behavior via Wildcart Support."
      ]
    },
    {
      title: "7. Safety & Security Rules",
      content: [
        "Meet only in school-approved locations.",
        "Do not share personal contact info unnecessarily.",
        "Report any suspicious activity immediately.",
        "Do not engage in scamming, bullying, or harassment."
      ]
    },
    {
      title: "8. Consequences",
      content: [
        "Violating these rules may lead to:",
        "Warnings",
        "Temporary account suspension",
        "Permanent account ban",
        "Removal of products/orders from the platform"
      ]
    },
  ];

  return (
    <div className="rules-page">
      <Header />
      <div className="rules-card">
        <div className="rules-header">
          <h1 className="rules-title">Wildcart Rules</h1>
        </div>

        {rulesData.map((section, index) => (
          <div className="rules-section" key={index}>
            <h2
              className="section-title"
              onClick={() => toggleSection(index)}
            >
              {section.title} <span className="toggle-icon">{openSection === index ? "-" : "+"}</span>
            </h2>
            {openSection === index && (
              <div className="section-content">
                {Array.isArray(section.content) ? (
                  <ul>
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesPage;
