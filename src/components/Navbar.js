import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import img from "../images/logo.png";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="header-logo">
            <img src={img} alt="logo" />
          </Link>
          <div className="navbar-title">WIRTUALNA SKARBONKA</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;