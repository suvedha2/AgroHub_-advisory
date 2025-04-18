import React, { useEffect, useState } from "react";
import "./CategorySection.css";
import ProductCard from "./ProductCard";

const CategorySection = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on category (Later we will connect this to the backend)
    fetch(`/api/products?category=${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  return (
    <div className="category-section">
      <h2 className="category-title">{category}</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
