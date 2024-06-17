import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import logo from "../../assets/logo2.png";

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
        <span>WordCards</span>
      </Link>
      <div className="mode-toggle">
        <Link to="/" className="mode-link">
          Word List
        </Link>
        <Link to="/training" className="mode-link">
          Training Mode
        </Link>
        <Link to="/carousel" className="mode-link">
          Word Carousel
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
