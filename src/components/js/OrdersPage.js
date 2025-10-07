import React, { useState } from "react";
import "../css/OrdersPage.css";
import favicon from "../../assets/favicon.png";
import { Search, HelpCircle, ShoppingCart, Settings, ChevronDown } from "lucide-react";

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("7days");

  const orders = [
    { id: "001", name: "Cookies", status: "In stock", amount: "₱15.00", address: "NGE Study Area", date: "2025-09-10", delivery: "Delivered" },
    { id: "002", name: "Bracelet", status: "Made to order", amount: "₱50.00", address: "Espacio", date: "2025-09-11", delivery: "Processing" },
    { id: "003", name: "Mac and cheese", status: "In stock", amount: "₱55.00", address: "Canteen", date: "2025-09-12", delivery: "Out for delivery" },
    { id: "004", name: "Flower bouquet", status: "Limited stock", amount: "₱100.00", address: "Espacio", date: "2025-09-11", delivery: "Delivered" },
    { id: "005", name: "Waffles", status: "In stock", amount: "₱30.00", address: "Covered Court", date: "2025-09-13", delivery: "Processing" },
  ];

  return (
    <div className="orders-page">
      <header className="order-header">
        <div className="header-container">
          <div className="header-content">
            <div classgName="loo-container">
              <img src={favicon} alt="WildCart Logo" className="small-logo" />      
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-button">
                <Search className="w-4 h-4 text-gray-900" />
              </button>
            </div>

            <div className="header-actions">
              <button className="header-button">
                <HelpCircle className="w-6 h-6" />
              </button>
              <button className="header-button">Profile</button>
              <button className="cart-button">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="header-button">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="orders-section">
        <div className="sort-container">
          <div className="sort-wrapper">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="sort-select"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="3months">Last 3 months</option>
              <option value="all">All orders</option>
            </select>
            <ChevronDown className="sort-icon w-4 h-4" />
          </div>
        </div>

        <h2>My Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER NO.</th>
              <th>PRODUCT NAME</th>
              <th>PRODUCT STATUS</th>
              <th>AMOUNT</th>
              <th>ADDRESS</th>
              <th>ORDER DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.status}</td>
                <td>{order.amount}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.delivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrdersPage;
