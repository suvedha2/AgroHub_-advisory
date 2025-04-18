import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Marketplace.css";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const Marketplace = ({ users, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Farm Equipment", "Vegetables", "Pesticides", "Dairy Products", "Livestock"];

  // Maintain user session
  const user = JSON.parse(localStorage.getItem("user")); // Fetch logged-in user

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // Adjust API URL if needed
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Products:", data); // Debug API Response
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products by category
  const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <Navbar user={user}  />
      <div className="marketplace-container">
        <h1 className="marketplace-title">
          Welcome, {user ? user.name : "Guest"}! Explore Our Marketplace
        </h1>
        
        {/* Category Toggle Buttons */}
        <div className="category-toggle">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className={selectedCategory === category ? "active" : ""} 
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="product-list">
          {filteredProducts.length === 0 ? (
            <p>No products available</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                {/*<Link to={`/product/${product._id}`} className="details-btn">View Details</Link>*/}
                <button className="buy-btn" onClick={() => addToCart(product)}>Buy Now</button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Function to add products to cart
const addToCart = (product) => {
  const user = JSON.parse(sessionStorage.getItem("user")) || JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please log in to add items to cart.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Optional: Prevent duplicate entries
  const isAlreadyInCart = cart.some(
    (item) => item._id === product._id && item.userEmail === user.email
  );
  if (isAlreadyInCart) {
    alert("Product already in cart");
    return;
  }

  const updatedCart = [...cart, { ...product, userEmail: user.email }];
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  window.location.href = "/cart";
};


export default Marketplace;
