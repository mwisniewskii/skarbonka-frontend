import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="website-rights">
          © {new Date().getFullYear()} Grosz do grosza{" "}
        </div>
        <div className="website-autors">
          Web App by <b>TeamIO2</b>{" "}
        </div>
      </div>
    </>
  );
}

export default Footer;