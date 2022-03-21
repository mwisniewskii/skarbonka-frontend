import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar () {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='header-logo'>
              Grosz do grosza
          </Link>
          <div className='navbar-title'>
            WIRTUALNA SKARBONKA
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;