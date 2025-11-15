import React, { useState } from "react";
import "../css/OrdersPage.css";
import Header from "../../Shared/js/Header"; 
import { ChevronDown } from "lucide-react";
import { useOrders } from "../../../context/OrdersContext";

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("7days");
  const { orders } = useOrders();

  return (
    <div className="orders-page">
            <Header />


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
        {orders.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              No orders yet
            </td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.status}</td>
              <td>{order.amount}</td>
              <td>{order.address}</td>
              <td>{order.date}</td>
              <td>{order.delivery}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>

      </section>
    </div>
  );
};

export default OrdersPage;
