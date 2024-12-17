import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer-wave">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="wave"
      >
        <path
          fill="#333"
          fillOpacity="1"
          d="M0,96L48,133.3C96,171,192,245,288,266.7C384,288,480,256,576,234.7C672,213,768,203,864,202.7C960,203,1056,213,1152,213.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
    <div className="footer-content">
      <div className="container">
        <p>© 2024 My News Web App. All rights reserved.</p>
        <p>Created by Chandra Perdana Phang</p>
      </div>
    </div>
  </footer>
);

export default Footer;
