import React from "react";
import Header from "./Header";
import "../css/FeedbackPage.css";

const FeedbackPage = () => {
  return (
    <div className="feedback-page">
      <Header />

      <div className="feedback-card">

      
        <h1 className="feedback-title">Feedback & Ratings</h1>

       
        <div className="top-summary">

          <div className="summary-box">
            <h3>Average Rating</h3>
            <p className="rating-number">⭐ 4.8 / 5</p>
          </div>

          <div className="summary-box">
            <h3>Total Reviews</h3>
            <p className="rating-number">57 Reviews</p>
          </div>

          <div className="summary-box breakdown">
            <h3>Rating Breakdown</h3>
            <ul>
              <li>⭐ 5 stars — <strong>42</strong></li>
              <li>⭐ 4 stars — <strong>10</strong></li>
              <li>⭐ 3 stars — <strong>3</strong></li>
              <li>⭐ 2 stars — <strong>1</strong></li>
              <li>⭐ 1 star — <strong>1</strong></li>
            </ul>
          </div>

        </div>

       
        <h2 className="recent-title">Recent Feedback</h2>

        <div className="feedback-list">

         
          <div className="feedback-item">
            <div className="feedback-rating">⭐ 5.0</div>
            <p className="feedback-text">
              “Super crispy chicken skin! Worth the price!”
            </p>
            <p className="feedback-info">
              — <strong>John D.</strong>, bought <strong>Chicken Skin</strong> (Nov 14, 2025)
            </p>
            <span className="verified-badge">✔ Verified FTF Purchase</span>
          </div>

        
          <div className="feedback-item">
            <div className="feedback-rating">⭐ 4.0</div>
            <p className="feedback-text">
              “Good quality and fast transaction. Will order again.”
            </p>
            <p className="feedback-info">
              — <strong>Sarah M.</strong>, bought <strong>Classic Siomai</strong> (Nov 12, 2025)
            </p>
            <span className="verified-badge">✔ Verified FTF Purchase</span>
          </div>

        
          <div className="feedback-item">
            <div className="feedback-rating">⭐ 5.0</div>
            <p className="feedback-text">
              “Seller is very kind. Item is fresh and delicious!”
            </p>
            <p className="feedback-info">
              — <strong>Anonymous</strong>, bought <strong>Fruit Cup</strong> (Nov 10, 2025)
            </p>
            <span className="verified-badge">✔ Verified FTF Purchase</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
