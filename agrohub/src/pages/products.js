import React from "react";
import "./ProductSection.css";
import advisory from "../assets/advisory1.jpeg";
import marketplace from "../assets/buy-sell.jpg";
import weather from "../assets/weather1.jpeg";
import vegetables from "../assets/vegetables.jpeg";
import farmeq from "../assets/farmeq.jpeg";
import dairy from "../assets/dairy.jpeg";
import grains from "../assets/grains.jpeg";

export const ProductSection = () => {
  return (
    <div className="product-section-container">
      {/* Product Cards Section */}
      <div className="card-section">
        <div className="card">
          <img src={marketplace} alt="Marketplace" />
          <h3>Marketplace</h3>
          <p><i>Buy and Sell farm products directly from farmers to customers.</i></p>
        </div>

        <div className="card">
          <img src={advisory} alt="Advisory" />
          <h3>Expert Advisory</h3>
          <p><i>Get expert advice on farming, pest control, and crop management.</i></p>
        </div>

        <div className="card">
          <img src={weather} alt="Weather" />
          <h3>Weather Updates</h3>
          <p><i>Stay updated with accurate weather reports for your region.</i></p>
        </div>
      </div>

      {/* Best Selling Products Section */}
      <div className="best-products-section">
        <h2 className="section-title">Our Top Selling Products</h2>
        <div className="product-cards">
          <div className="product-card">
            <img src={vegetables} alt="Fresh Vegetables" />
            <h3>Fresh Vegetables</h3>
            <p>Get fresh and organic vegetables directly from farmers.</p>
          </div>

          <div className="product-card">
            <img src={farmeq} alt="Farm Equipments" />
            <h3>Farm Equipments</h3>
            <p>Purchase high-quality farming tools and equipment.</p>
          </div>

          <div className="product-card">
            <img src={dairy} alt="Dairy Products" />
            <h3>Dairy Products</h3>
            <p>Buy fresh dairy products from trusted local farmers.</p>
          </div>

          <div className="product-card">
            <img src={grains} alt="Grains" />
            <h3>Grains</h3>
            <p>Get high-quality grains and pulses at reasonable prices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
