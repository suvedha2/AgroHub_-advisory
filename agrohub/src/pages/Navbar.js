import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo2.png";
import "./Navbar.css";

const Navbar = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user =
  propUser ||
  JSON.parse(sessionStorage.getItem("user")) ||
  JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/"); // Redirect to Home page
  };

  const handleMarketplaceClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (location.pathname === "/marketplace") {
      // If already on marketplace, force reload
      window.location.reload();
    } else {
      navigate("/marketplace");
    }
  };

  return (
    <nav className="navbar">
    <div className="logo-section"
      onClick={() => {
      if (window.location.pathname === "/") {
        // If already on marketplace, reload
        window.location.reload();
      } else {
        // Navigate to marketplace
        navigate("/");
      }
    }}>
        <img src={logo} alt="AgroHub Logo" className="logo-img" />
        <h1 className="logo-title">AgroHub</h1>
</div>

      <ul className="nav-links">
        <li>
        <li>
  <span
    className="nav-links"
    onClick={() => {
      if (window.location.pathname === "/marketplace") {
        // If already on marketplace, reload
        window.location.reload();
      } else {
        // Navigate to marketplace
        navigate("/marketplace");
      }
    }}
    style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
  >
    MARKETPLACE
  </span>
</li>
        </li>
        <li>
        <span
    className="nav-links"
    onClick={() => {
      if (window.location.pathname === "/advisory") {
        // If already on marketplace, reload
        window.location.reload();
      } else {
        // Navigate to marketplace
        navigate("/advisory");
      }
    }}
    style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
  >
   ADVISORY
  </span>
        </li>
        <li>
        <span
    className="nav-link"
    onClick={() => {
      if (window.location.pathname === "/weather") {
        // If already on marketplace, reload
        window.location.reload();
      } else {
        // Navigate to marketplace
        navigate("/weather");
      }
    }}
    style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
  >
   WEATHER
  </span>
          {/*<Link to="/weather">WEATHER</Link>*/}
        </li>
        {user && (
          <li>
            <Link to="/cart">CART</Link>
          </li>
        )}
        {user ? (
          <>
            <li className="user-greeting">Hi, {user.name}!</li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="register-btn">Register</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
