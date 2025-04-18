import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import "./Home.css";
import farmer from "../assets/farmer3.png"; 
import { ProductSection } from "../pages/products";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* Navbar Component */}
     <Navbar user={user} onLogout={handleLogout} />

      {/* Main Section */}
      <div className="main-section">
        <div className="text-content">
          <h1>Welcome To AgroHub<br /> Order fresh farm products.</h1>
          <p>Buy & Sell Agricultural Products, Get Expert Advice & Weather Updates</p>
         {/* <div className="delivery-options">
            <span className="active-option">Search Products</span>
          </div>*/}
        </div>
        <div className="image-section">
          <img src={farmer} alt="Delivery" />
        </div>
      </div>

      {/* Product Section */}
      <ProductSection />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
