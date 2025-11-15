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
          <p className="about-subtitle">
            Connecting communities through local marketplace
          </p>
        </div>

        <div className="about-section">
          <div className="about-content">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              We started with a simple idea: to create a platform where Students can easily buy and sell
              products within their local community. What began as a small project has grown into a
              thriving marketplace that brings students together and supports local commerce.
            </p>
            <p className="section-text">
              Our platform empowers individuals to turn their passions into businesses, whether it's
              homemade cookies, handcrafted jewelry, or fresh flowers. We believe in the power of
              community and the value of supporting local entrepreneurs.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2 className="section-title centered">Our Values</h2>
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

        <div className="mission-section">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              To create the most trusted and vibrant local marketplace where Students from CIT can
              discover unique products, support their classmates, Schoolmates, and friends, and build lasting relationships.
              We envision a world where local commerce thrives and every transaction strengthens
              community bonds.
            </p>
          </div>
        </div>

        <div className="developers-section">
          <h2 className="section-title centered">Our Developers</h2>
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

      </main>
    </div>
  );
}

export default AboutPage;
