import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; 2024 NoteIt. All rights reserved.</p>
      <div className="footer-links">
        <p href="/privacy-policy">Privacy Policy</p> 
        <p href="/terms-of-service">Terms of Service</p> 
        <p href="/contact">Contact Us</p>
      </div>
    </footer>
  );
};

export default Footer;


