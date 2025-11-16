import { ChevronDown } from "lucide-react";
import Header from "../../Shared/js/Header"; 
import React from "react";
import "../css/PostedPage.css";

function PostedPage() {
  const posts = [
    { id: "001", name: "Cookies", status: "In stock", amount: "3x", address: "NGE Study Area", date: "2025-09-10", postStatus: "Posted" },
    { id: "002", name: "Bracelet", status: "In stock", amount: "5x", address: "Espacio", date: "2025-09-11", postStatus: "Posted" },
    { id: "003", name: "Mac and cheese", status: "In stock", amount: "4x", address: "Canteen", date: "2025-09-12", postStatus: "Posted" },
    { id: "004", name: "Flower bouquet", status: "In stock", amount: "4x", address: "Espacio", date: "2025-09-11", postStatus: "Posted" },
    { id: "005", name: "Waffles", status: "Out of stock", amount: "0", address: "Covered Court", date: "2025-09-13", postStatus: "Hide" },
  ];

  return (
    <div className="app-container">
      <Header /> {}

      <main className="main-content">
        <div className="content-header">
          <h1 className="page-title">My Posts</h1>
          <div className="filter-dropdown">
            <button className="dropdown-button">
              <span>Last 7 days</span>
              <ChevronDown className="dropdown-icon" />
            </button>
          </div>
        </div>

        <h2 className="table-title">My Posts</h2>

        <div className="table-container">
          <table className="posts-table">
            <thead>
              <tr className="table-header">
                <th>PRODUCT NO.</th>
                <th>PRODUCT NAME</th>
                <th>PRODUCT STATUS</th>
                <th>AMOUNT</th>
                <th>ADDRESS</th>
                <th>POST DATE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="table-row">
                  <td>{post.id}</td>
                  <td>{post.name}</td>
                  <td>{post.status}</td>
                  <td>{post.amount}</td>
                  <td>{post.address}</td>
                  <td>{post.date}</td>
                  <td>
                    <div className="status-cell">
                      <span>{post.postStatus}</span>
                      <button className="dropdown-toggle">
                        <ChevronDown className="toggle-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default PostedPage;
