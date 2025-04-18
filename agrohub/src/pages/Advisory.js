import React, { useState } from "react";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import advisoryData from "../data/advisoryData.json";
import "./Advisory.css";

const AdvisoryBlog = () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || JSON.parse(localStorage.getItem("user"));
  const [filter, setFilter] = useState("recent");
  const [expandedId, setExpandedId] = useState(null);

  const getFilteredBlogs = () => {
    const sorted = [...advisoryData];
    if (filter === "popular") return sorted.sort((a, b) => b.popularity - a.popularity);
    if (filter === "seasonal") return sorted.filter((post) => post.category.toLowerCase() === "rabi");
    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <Navbar user={user} />

      <div className="advisory-hero">
        <h1>🌿 Agro Advisory Blog</h1>
        <p className="catch-phrase">“Empowering Farmers with the Wisdom of Seasons”</p>
        {user && <p className="user-greeting">Hi, {user.name} 👋</p>}
      </div>

      <div className="filter-buttons">
        <button className={filter === "recent" ? "active" : ""} onClick={() => setFilter("recent")}>Recent</button>
        <button className={filter === "popular" ? "active" : ""} onClick={() => setFilter("popular")}>Popular</button>
        <button className={filter === "seasonal" ? "active" : ""} onClick={() => setFilter("seasonal")}>Seasonal</button>
      </div>

      <div className="blog-grid">
        {getFilteredBlogs().map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="card-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="tags">
                {post.tags.map((tag, i) => (
                  <span key={i}>#{tag}</span>
                ))}
              </div>
              <button className="read-more" onClick={() => toggleExpand(post.id)}>
                {expandedId === post.id ? "Hide Details ↑" : "Read More ↓"}
              </button>
              {expandedId === post.id && (
                <div className="expanded-content">
                  <p>{post.content}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default AdvisoryBlog;
