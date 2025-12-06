import React, { useState, useEffect } from "react";
import Header from "../../Shared/js/Header";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import "../css/CreatePost.css";


export default function PostProduct() {

  const navigate = useNavigate();

    const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stocks: "",
    address: "",
    category: "",
    noteToBuyer: ""
  });

  const [images, setImages] = useState([]); 

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [categories, setCategories] = useState([]);


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 4) {
      alert("⚠ Only 4 images allowed.");
      return;
    }

    setImages(prev => [...prev, ...files]);
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  let uploadedUrls = [];

  // Identify new files if editing
  const newFiles = images.filter(img => !img.existing);

  if (newFiles.length > 0) {
    const formData = new FormData();
    newFiles.forEach(file => formData.append("files", file));

    const uploadRes = await fetch("http://localhost:8080/api/products/upload", {
      method: "POST",
      body: formData
    });

    uploadedUrls = await uploadRes.json();
  }

  const payload = {
    ...product,
    imageUrls: [
      ...images.filter(i => i.existing).map(i => i.url),
      ...uploadedUrls
    ]
  };

  const endpoint = isEdit
    ? `http://localhost:8080/api/products/update/${id}`
    : `http://localhost:8080/api/products/add`;

  const method = isEdit ? "PUT" : "POST";

  const saveRes = await fetch(endpoint, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (saveRes.ok) {
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/products");
    }, 2000);
  } else {
    setShowError(true);
  }
};


  useEffect(() => {
    import('../../../api/api')
      .then(({ fetchCategories }) => fetchCategories())
      .then((c) => setCategories(c))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8080/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct({
            name: data.name,
            price: data.price,
            description: data.description,
            stocks: data.stocks,
            address: data.address,
            category: data.category,
            noteToBuyer: data.noteToBuyer
          });

          setImages(data.imageUrls?.map(url => ({ existing: true, url })) || []);
        });
    }
  }, [isEdit, id]);

  return (
    <div className="postproduct-page">
      <Header/>
      <header className="post"><h1>“Post a New Product”</h1></header>

      <div className="postproduct-container">
        <div className="postproduct-card">

          <form onSubmit={handleSubmit} className="postproduct-form">

           
            <div className="image-upload">
              <label htmlFor="productImage" className="image-label">
                {images.length ? (
                  <div className="preview-grid">
                    {images.map((img,i)=>(
                      <div key={i} className="image-box">
                        
                        <img 
                          src={img.existing ? img.url : URL.createObjectURL(img)} 
                          className="preview-image"
                        />

                        <button className="delete-img" onClick={(e)=>{
                          e.preventDefault()
                          setImages(images.filter((_,idx)=>idx!==i))
                        }}>
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="image-placeholder"><i className="fa-regular fa-image"></i></div>
                )}
              </label>

              <input type="file" id="productImage" accept="image/*" multiple
                style={{display:"none"}}
                onChange={handleImageUpload}
              />

              <p className="image-count">{images.length}/4 uploaded</p>
              {images.length>0 && <button className="view-btn" onClick={(e)=>{e.preventDefault();setShowViewer(true)}}>View</button>}
            </div>


            
            <div className="form-fields">
              <div className="form-row">
                <label>Product Name</label>
                <input required onChange={(e)=>setProduct({...product,name:e.target.value})}/>
              </div>

              <div className="form-grid">
                <div>
                  <label>Price</label>
                  <div className="price-field"><span>₱</span>
                    <input type="number" required onChange={(e)=>setProduct({...product,price:e.target.value})}/>
                  </div>
                </div>

                <div><label>Description</label><input required onChange={(e)=>setProduct({...product,description:e.target.value})}/></div>
                <div><label>Stocks</label><input type="number" min="1" required onChange={(e)=>setProduct({...product,stocks:e.target.value})}/></div>
                <div><label>Address</label><input required onChange={(e)=>setProduct({...product,address:e.target.value})}/></div>

                <div>
                  <label>Category</label>
                  <select required value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}>
                    <option value="">Select</option>
                    {categories.length? categories.map(c=> <option key={c.id} value={c.name}>{c.name}</option>) :
                      <>
                        <option value="Foods">Foods</option><option value="Drinks">Drinks</option><option value="Accessories">Accessories</option><option value="Collectables">Collectables</option>
                      </>
                    }
                  </select>
                </div>

                <div><label>Note To Buyer</label><input onChange={(e)=>setProduct({...product,noteToBuyer:e.target.value})}/></div>
              </div>

              <div className="form-buttons">
                <button type="button" className="cancel-btn" onClick={()=>navigate('/seller_profile')}>CANCEL</button>
                <button type="submit" className="post-btn">POST</button>
              </div>
            </div>
          </form>
        </div>
      </div>


      
      {showViewer && (
        <div className="image-viewer">
          <div className="viewer-content">
            <h3>Uploaded Images</h3>
            <div className="viewer-grid">
              {images.map((img,i)=>(
                <div key={i} className="viewer-box">
                  <img src={img.existing ? img.url : URL.createObjectURL(img)} />
                  <button onClick={()=>setImages(images.filter((_,idx)=>idx!==i))}>Delete</button>
                </div>
              ))}
            </div>
            <button className="close-view" onClick={()=>setShowViewer(false)}>Close</button>
          </div>
        </div>
      )}

     
      {showSuccess && (
        <div className="success-toast">
          <span className="check-icon">✔</span>
          <p>Product Posted Successfully</p>
        </div>
      )}

      
      {showError && (
        <div className="error-toast">
          <span className="error-icon">✖</span>
          <p>Upload Failed</p>
        </div>
      )}

    </div>
  );
}
