import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <div className='footer-container'>
        <section class='website-info'>
            <small class='website-rights'>© {new Date().getFullYear()} Grosz do grosza </small>
            <small class='website-autors'>Web APP by <b>TeamIO2</b> </small>
        </section>
      </div>
    </>
  );
}

export default Footer;