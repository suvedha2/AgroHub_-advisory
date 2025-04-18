// src/pages/ProductDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!cart[user.email]) {
      cart[user.email] = [];
    }

    const existingProduct = cart[user.email].find(item => item._id === product._id);
    if (!existingProduct) {
      cart[user.email].push(product);
      alert("Product added to cart!");
    } else {
      alert("This product is already in your cart.");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={() => window.location.href = "/cart"}>Buy Now</button>
      <div className="reviews">
        <h3>Customer Reviews</h3>
        <p>⭐⭐⭐⭐⭐ - Excellent product!</p>
        <p>⭐⭐⭐⭐ - Good quality</p>
      </div>
    </div>
  );
};

export default ProductDetails;
