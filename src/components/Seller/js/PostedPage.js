import { ChevronDown } from "lucide-react";
import Header from "../../Shared/js/Header"; 
import React, { useEffect, useState } from "react";
import "../css/PostedPage.css";
import { useNavigate } from "react-router-dom"; // <-- added

function PostedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // <-- added

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => console.log("❌ Failed to fetch products"));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await fetch(`http://localhost:8080/api/products/delete/${selectedId}`, { method: "DELETE" });
    setPosts(prev => prev.filter(p => p.id !== selectedId));
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="content-header">
          <h1 className="page-title">My Posts</h1>
        </div>

        <div className="table-container">
          <table className="posts-table">
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Stocks</th>
                <th>Address</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="table-row">
                  <td>{post.id}</td>
                  <td>{post.name}</td>
                  <td>{post.stocks}</td>
                  <td>{post.address}</td>
                  <td>{post.dateAdded?.split("T")[0]}</td>

                  <td>
                    {/* NEW EDIT BUTTON */}
                    <button 
                      className="edit-btn"
                      onClick={() => navigate(`/edit/${post.id}`)}
                    >
                      EDIT ✏️
                    </button>

                    {/* EXISTING DELETE BUTTON */}
                    <button 
                      className="delete-btn"
                      onClick={() => openModal(post.id)}
                    >
                      DELETE ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-box">
            <h3>Are you sure you want to delete this product?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-btn-group">
              <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button className="modal-confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostedPage;
