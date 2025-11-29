import React from "react";
import { Heart, Users, Target } from "lucide-react";
import Header from "./Header";
import "../css/AboutPage.css";

import dev1 from "../../../assets/dev1.jpg";
import dev2 from "../../../assets/dev2.jpg";
import dev3 from "../../../assets/dev3.jpg";

function AboutPage() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="about-hero">
          <h1 className="about-title">About Us</h1>
        </div>

        <div className="developers-section">
          <div className="developers-grid">
            <div className="developer-card">
              <div className="developer-photo">
                <img src={dev1} alt="Developer 1" />
              </div>
              <h3 className="developer-name">Leana Belaguas</h3>
              <p className="developer-role">Developer</p>
            </div>

            <div className="developer-card">
              <div className="developer-photo">
                <img src={dev2} alt="Developer 2" />
              </div>
              <h3 className="developer-name">Edralyn Bibera</h3>
              <p className="developer-role">Developer</p>
            </div>

            <div className="developer-card">
              <div className="developer-photo">
                <img src={dev3} alt="Developer 3" />
              </div>
              <h3 className="developer-name">Richelle Jaducana</h3>
              <p className="developer-role">Developer</p>
            </div>
          </div>
        </div>

        <div className="values-section">
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Heart className="icon" />
              </div>
              <h3 className="value-title">Community First</h3>
              <p className="value-description">
                We prioritize building strong connections between School buyers and sellers,
                fostering trust and collaboration within neighborhoods.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Users className="icon" />
              </div>
              <h3 className="value-title">Support Local</h3>
              <p className="value-description">
                We're committed to helping local businesses and entrepreneurs thrive by providing
                them with the tools and platform they need to succeed.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Target className="icon" />
              </div>
              <h3 className="value-title">Quality & Trust</h3>
              <p className="value-description">
                We maintain high standards for products and services, ensuring a safe and
                reliable marketplace experience for everyone.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AboutPage;
