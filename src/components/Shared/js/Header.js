import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaCog } from "react-icons/fa";
import favicon from "../../../assets/favicon.png";
import "../css/Header.css"; 
import { UserContext } from "../../../context/UserContext";
import { useCart } from "../../../context/CartContext"; 

const Header = () => {
  const { user } = useContext(UserContext);
  const { cartItems } = useCart();

  const savedRole = localStorage.getItem("selectedRole")
    ? String(localStorage.getItem("selectedRole")).toLowerCase()
    : null;
  const resolvedRole = user?.role ? String(user.role).toLowerCase() : savedRole;
  const profilePath = resolvedRole === "seller" ? "/seller_profile" : "/student_profile";

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={favicon} alt="WildCart Logo" className="small-logo"/>
        <span className="brand">WildCart</span>
      </div>

      <div className="search">
        <input type="text" placeholder="Search..." />
        <button><FaSearch /></button>
      </div>

      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/help" className="nav-link">Help</Link>
        <Link to={profilePath} className="nav-link">Profile</Link>
        <Link to="/cart" className="nav-link cart-icon">
          <FaShoppingCart className="icon" />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
        <Link to="/settings" className="nav-link">
          <FaCog className="icon" />
        </Link>
        {user && <span className="username">Hello, {user.firstName}</span>}
      </div>
    </nav>
  );
};

export default Header;
