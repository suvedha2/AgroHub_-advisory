import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/marketplace">Marketplace</a></li>
            <li><a href="/advisory">Advisory</a></li>
            <li><a href="/weather">Weather</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Email: support@agrohub.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123, Green Lane, Agro City, India</p>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
