import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section glass">
      <div className="container footer-container">
        
        {/* Column 1: Brand */}
        <div className="footer-col footer-brand">
          <img src={`${import.meta.env.BASE_URL}assets/logo.gif`} alt="Moszkva Café" className="footer-logo" />
          <div className="social-links">
             <a href="https://www.facebook.com/MoszkvaCafe" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}assets/facebook.png`} alt="Facebook" />
             </a>
             <a href="https://www.instagram.com/moszkvacafe" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}assets/instagram.png`} alt="Instagram" />
             </a>
          </div>
        </div>

        {/* Column 2: Reservations */}
        <div className="footer-col contact-block">
          <h4>Reservations</h4>
          <p><a href="tel:+40771692891">+40771692891</a></p>
          <p><a href="mailto:moszkvapr@gmail.com">moszkvapr@gmail.com</a></p>
        </div>
        
        {/* Column 3: Event Management */}
        <div className="footer-col contact-block">
          <h4>Event Management</h4>
          <p><a href="tel:+40770168728">+40770168728</a></p>
          <p><a href="mailto:moszkvapr@gmail.com">moszkvapr@gmail.com</a></p>
        </div>
        
        {/* Column 4: Management & Hours */}
        <div className="footer-col">
          <div className="contact-block footer-spacing">
            <h4>Management</h4>
            <p><a href="tel:+40753471899">+40753471899</a></p>
            <p><a href="mailto:arpad.schmieder@gmail.com">arpad.schmieder@gmail.com</a></p>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Moszkva Café. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
