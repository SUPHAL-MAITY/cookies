import React, { useState } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu open/close
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <h2>eBlogs</h2>
          </div>

          {/* Hamburger Icon for mobile view */}
          <div className="menu-icon" onClick={handleMenuToggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Navbar Links */}
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li className="nav_links_menu">
              <NavLink to="/">Home</NavLink>{" "}
            </li>
            <li className="nav_links_menu">
              <NavLink to="/blogs">Blogs</NavLink>
            </li>

            <li className="nav_links_menu">
              <NavLink to="/login">login</NavLink>
            </li>
            <li className="nav_links_menu">
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li className="nav_links_menu">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>

          <div className="social_media">
            <span className="social_media_icons">
              <i class="fa-brands fa-facebook-f"></i>
            </span>
            <span className="social_media_icons">
              <i class="fa-brands fa-twitter"></i>
            </span>
            <span className="social_media_icons">
              <i class="fa-brands fa-youtube"></i>
            </span>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
