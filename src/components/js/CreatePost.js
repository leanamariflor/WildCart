// src/components/PostProduct.js
import React, { useState } from "react";
import Header from "./Header";
import "../css/CreatePost.css";

const PostProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product posted successfully!");
  };

  return (
    <div className="postproduct-page">
      <Header />

      {/* Banner */}
      <header className="post">
        <h1>“Post a New Product”</h1>
      </header>

      <div className="postproduct-container">
        {/* ✅ White Card Wrapper */}
        <div className="postproduct-card">
          <form className="postproduct-form" onSubmit={handleSubmit}>
            <div className="image-upload">
              <label htmlFor="productImage" className="image-label">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="preview-image"
                  />
                ) : (
                  <div className="image-placeholder">
                    <i className="fa-regular fa-image"></i>
                  </div>
                )}
              </label>
              <input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <p className="note">Note: Pls upload 4 Photos of the product</p>
            </div>

            <div className="form-fields">
              <div className="form-row">
                <label className="label">Product Name</label>
                <input type="text" className="input wide" required />
              </div>

              <div className="form-grid">
                <div>
                  <label className="label">Price</label>
                  <div className="price-field">
                    <span>₱</span>
                    <input type="number" required />
                  </div>
                </div>

                <div>
                  <label className="label">Product description</label>
                  <input type="text" className="input" required />
                </div>

                <div>
                  <label className="label">Stocks</label>
                  <input type="number" className="input" min="1" required />
                </div>

                <div>
                  <label className="label">Address</label>
                  <input type="text" className="input" required />
                </div>

                <div>
                  <label className="label">Category</label>
                  <select className="input" required>
                    <option value="">Select</option>
                    <option>Foods</option>
                    <option>Drinks</option>
                    <option>Accessories</option>
                    <option>Collectibles</option>
                  </select>
                </div>

                <div>
                  <label className="label">Note to Buyers</label>
                  <input type="text" className="input" />
                </div>
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => (window.location.href = "/sellerprofile")}
                >
                  CANCEL
                </button>
                <button type="submit" className="post-btn">
                  POST
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* End of white card */}
      </div>
    </div>
  );
};

export default PostProduct;
