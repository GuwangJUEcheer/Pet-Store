// Footer.tsx
import React from 'react';
import '../css/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about/">About Us</a>
          <a href="/contact/">Contact Us</a>
          <a href="/privacy/">Privacy Policy</a>
        </div>
        <div className="copyright">
          <p>© 2024 Cat Lounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
