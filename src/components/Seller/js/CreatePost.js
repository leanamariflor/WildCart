import React, { useState, useEffect } from "react";
import Header from "../../Shared/js/Header"; 
import { useNavigate } from "react-router-dom";
import "../css/CreatePost.css";

const PostProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const [categories, setCategories] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product posted successfully!");
  };

  useEffect(() => {
    let mounted = true;
    import('../../../api/api').then(({ fetchCategories }) => {
      fetchCategories()
        .then((cats) => mounted && setCategories(cats))
        .catch(() => mounted && setCategories([]));
    }).catch(() => {});

    return () => { mounted = false; };
  }, []);

  const navigate = useNavigate();

  return (
    <div className="postproduct-page">
      <Header />

    
      <header className="post">
        <h1>“Post a New Product”</h1>
      </header>

      <div className="postproduct-container">
      
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
                    {categories.length === 0 ? (
                      <>
                        <option>Foods</option>
                        <option>Drinks</option>
                        <option>Accessories</option>
                        <option>Collectibles</option>
                      </>
                    ) : (
                      categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))
                    )}
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
                  onClick={() => navigate('/seller_profile')}
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
       
      </div>
    </div>
  );
};

export default PostProduct;
